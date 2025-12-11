import clientPromise from '../../lib/mongodb'; // Adjust path as needed
import { NextResponse } from 'next/server';

export const revalidate = 10;

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstname, lastname, email, phone, type, message } = body;

    const client = await clientPromise;
    const db = client.db('test'); // Replace with your database name
    const collection = db.collection('Order'); // Replace with your collection name

    // Insert document into MongoDB
    const result = await collection.insertOne({
      firstname,
      lastname,
      email,
      phone,
      type,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json(result, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
    return NextResponse.json(
      { error: 'Failed to insert data' },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}
