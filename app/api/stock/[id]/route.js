import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // change * to your frontend domain for security
  "Access-Control-Allow-Methods": "GET, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function PATCH(request, { params }) {
  const { id } = params;
  const { qty } = await request.json();

  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Product');

    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404, headers: corsHeaders });
    }

    const currentStock = parseInt(product.stock, 10);
    const quantityToDecrease = parseInt(qty, 10);

    if (isNaN(currentStock) || isNaN(quantityToDecrease)) {
      return NextResponse.json({ error: "Invalid stock or quantity" }, { status: 400, headers: corsHeaders });
    }

    if (currentStock < quantityToDecrease) {
      return NextResponse.json({ error: "Insufficient stock" }, { status: 400, headers: corsHeaders });
    }

    const updatedProduct = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { stock: (currentStock - quantityToDecrease).toString() } },
      { returnDocument: "after" }
    );

    return NextResponse.json({ success: true, product: updatedProduct }, { headers: corsHeaders });

  } catch (error) {
    console.error("Error updating stock:", error);
    return NextResponse.json({ error: "Failed to update stock" }, { status: 500, headers: corsHeaders });
  }
}

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const client = await clientPromise;
    const db = client.db("test");
    const collection = db.collection("Product");

    const product = await collection.findOne(
      { _id: new ObjectId(id) },
      { projection: { stock: 1 } }
    );

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404, headers: corsHeaders });
    }

    const stock = parseInt(product.stock, 10);

    if (isNaN(stock)) {
      return NextResponse.json({ error: "Invalid stock value" }, { status: 400, headers: corsHeaders });
    }

    return NextResponse.json({ stock }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching stock:", error);
    return NextResponse.json({ error: "Failed to fetch stock" }, { status: 500, headers: corsHeaders });
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
