import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // replace * with your Netlify frontend domain for security
  "Access-Control-Allow-Methods": "GET, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function PATCH(request) {
  const { id, color, size, qty } = await request.json();
  console.log("id, color, size, qty: ", id, color, size, qty);

  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Product');

    const quantityToDecrease = parseInt(qty, 10);
    if (!id || !color || !size || isNaN(quantityToDecrease)) {
      return NextResponse.json(
        { error: "Missing or invalid id, color, size, or qty" },
        { status: 400, headers: corsHeaders }
      );
    }

    const objectId = new ObjectId(id);

    const product = await collection.findOne(
      { _id: objectId },
      { projection: { color: 1 } }
    );

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404, headers: corsHeaders });
    }

    const colorEntry = product.color.find(c => c.color === color);
    if (!colorEntry) {
      return NextResponse.json({ error: "Color not found" }, { status: 404, headers: corsHeaders });
    }

    const sizeEntry = colorEntry.sizes.find(s => s.size === size);
    if (!sizeEntry) {
      return NextResponse.json({ error: "Size not found for this color" }, { status: 404, headers: corsHeaders });
    }

    if (sizeEntry.qty < quantityToDecrease) {
      return NextResponse.json({ error: "Insufficient stock for this size" }, { status: 400, headers: corsHeaders });
    }

    const result = await collection.updateOne(
      { _id: objectId },
      { $inc: { "color.$[c].sizes.$[s].qty": -quantityToDecrease } },
      { arrayFilters: [{ "c.color": color }, { "s.size": size }] }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Failed to update quantity" }, { status: 500, headers: corsHeaders });
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders });

  } catch (error) {
    console.error("Error updating color and size quantity:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders });
  }
}

export async function GET(request, { params }) {
  const [id, color, size] = params.id.split(',');
  console.log("productId:", id, "color:", color, "size:", size);

  try {
    const client = await clientPromise;
    const db = client.db("test");
    const collection = db.collection("Product");

    const product = await collection.findOne(
      { _id: new ObjectId(id) },
      { projection: { color: 1 } }
    );

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404, headers: corsHeaders });
    }

    const colorEntry = product.color.find(c => c.color === color);
    if (!colorEntry) {
      return NextResponse.json({ error: "Color not available" }, { status: 404, headers: corsHeaders });
    }

    const sizeEntry = colorEntry.sizes.find(s => s.size === size);
    if (!sizeEntry) {
      return NextResponse.json({ error: "Size not available for this color" }, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json({ qty: sizeEntry.qty }, { status: 200, headers: corsHeaders });

  } catch (error) {
    console.error("Error fetching color and size quantity:", error);
    return NextResponse.json({ error: "Failed to fetch quantity" }, { status: 500, headers: corsHeaders });
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
