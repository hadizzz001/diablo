// app/api/sendEmail2/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendEmail2 } from "../sendEmail2/sendEmail2"; // adjust path if needed

// Handle preflight (CORS)
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

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const formData = new FormData();
    formData.set("email", data.inputs.email);
    formData.set("fname", data.inputs.fname);
    formData.set("lname", data.inputs.lname);
    formData.set("phone", data.inputs.phone);
    formData.set("address", data.inputs.address);
    formData.set("country", data.inputs.country);
    formData.set("city", data.inputs.city);
    formData.set("apt", data.inputs.apt);
    formData.set("items", JSON.stringify(data.items));
    formData.set("subtotal", data.subtotal.toString());
    formData.set("delivery", data.delivery.toString());
    formData.set("total", data.total.toString());

    await sendEmail2(formData);

    return new NextResponse(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error: any) {
    console.error("Email API error:", error);
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message }),
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
