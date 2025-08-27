import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export const revalidate = 10;

export async function PATCH(request, { params }) {
  const { id } = params;  
  console.log("PATCH id: ", id);

  try {
    const client = await clientPromise;
    const db = client.db('test'); // Your DB name
    const collection = db.collection('Product'); // Your collection name

    // Fetch the current document
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    if (!doc) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // Convert orders to int, increment by 1
    const currentorders = parseInt(doc.orders || '0', 10); // default 0 if not set
    const neworders = currentorders + 1;

    // Update the document, storing as string
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { orders: neworders.toString() } }
    );

    // Fetch the updated document
    const updatedDoc = await collection.findOne({ _id: new ObjectId(id) });

    return NextResponse.json(updatedDoc);
  } catch (error) {
    console.error('Error updating orders in MongoDB:', error);
    return NextResponse.json({ error: 'Failed to update orders' }, { status: 500 });
  }
}
