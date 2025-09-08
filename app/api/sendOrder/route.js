import clientPromise from '../../lib/mongodb'; // Adjust path if needed
import { NextResponse } from 'next/server';

export const revalidate = 10;

export async function POST(request) {
  try {
    // Parse request body
    const { inputs, items, total, delivery, code } = await request.json();

    // Basic validation
    if (!inputs || !items || typeof total !== 'number') {
      return NextResponse.json(
        { error: 'Missing or invalid required fields' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('test'); // ⚡ Replace with your DB name
    const collection = db.collection('Order'); // ⚡ Replace with your collection name

    // Get the latest oid and increment it
    const lastOrder = await collection
      .find({}, { projection: { oid: 1 } })
      .sort({ oid: -1 })
      .limit(1)
      .toArray();

    const nextOid = lastOrder.length > 0 ? lastOrder[0].oid + 1 : 1000;

    // Format date (e.g., 5 September 2025)
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // Insert new order
    const result = await collection.insertOne({
      oid: nextOid,
      userInfo: items, // ⚡ Double-check naming: is "userInfo" really items?
      cartItems: inputs,
      total,
      delivery: String(delivery ?? ''), // Ensure delivery is stored as string
      code: code ?? null,
      date: formattedDate,
      createdAt: new Date(), // ⚡ Recommended: for easier sorting
    });

    return NextResponse.json({
      success: true,
      oid: nextOid,
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error('❌ Error inserting order:', error);
    return NextResponse.json(
      { error: 'Failed to insert data' },
      { status: 500 }
    );
  }
}
