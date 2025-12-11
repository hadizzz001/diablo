"use server";

import { Resend } from "resend";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendEmail1 = async (formData: FormData) => {
  const name = formData.get("name") as string | null;
  const message = formData.get("message") as string | null;

  if (!name || !message) {
    return NextResponse.json(
      { success: false, error: "Name and message are required" },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }

  try {
    await resend.emails.send({
      from: "info@anazon.hadizproductions.com",
      to: "info@diablo.com",
      subject: "New message from your website customer",
      text: `Name: ${name}\nMessage: ${message}`,
    });

    redirect("/thank");

    return NextResponse.json(
      { success: true },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: error.message },
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
};

// Handle OPTIONS preflight
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
