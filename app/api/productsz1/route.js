import clientPromise from "../../lib/mongodb";
import { NextResponse } from "next/server";

export const revalidate = 10;

// Handle preflight (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const collection = db.collection("Product");

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Raw params
    const rawSearch = searchParams.get("q");
    const rawCat = searchParams.get("cat");
    const rawSub = searchParams.get("sub");
    const rawBrnd = searchParams.get("brnd");
    const rawSizes = searchParams.getAll("size");

    // Trimmed params
    const search = rawSearch?.trim();
    const cat = rawCat?.trim();
    const sub = rawSub?.trim();
    const brnd = rawBrnd?.trim();
    const sizes = rawSizes.map((s) => s.trim());

    // Debug logs
    console.log("🔎 RAW PARAMS:", { rawSearch, rawCat, rawSub, rawBrnd, rawSizes });
    console.log("✂️ TRIMMED PARAMS:", { search, cat, sub, brnd, sizes });

    // Build MongoDB query
    const query = {};

    if (search) {
      query.title = { $regex: `${search}\\s*$`, $options: "i" };
    }

    if (cat) {
      if (cat === "yes") {
        query.arrival = "yes";
      } else {
        query.category = { $regex: `^${cat}\\s*$`, $options: "i" };
      }
    }

    if (sub) {
      query.sub = { $regex: `^${sub}\\s*$`, $options: "i" };
    }

    if (brnd) {
      query.factory = { $regex: `^${brnd}\\s*$`, $options: "i" };
    }

    if (sizes.length > 0) {
      query["color.sizes.size"] = { $in: sizes };
    }

    console.log("📝 MONGO QUERY:", query);

    const total = await collection.countDocuments(query);

    const data = await collection
      .find(query)
      .sort({ sort: 1, _id: 1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    console.log("📦 FETCHED DATA (first 3):", data.slice(0, 3));

    return new NextResponse(
      JSON.stringify({
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasMore: page * limit < total,
        products: data,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("❌ Error fetching data from MongoDB:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
