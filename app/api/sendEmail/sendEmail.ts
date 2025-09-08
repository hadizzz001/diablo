"use server";

import { Resend } from "resend";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail(formData: FormData) {
  const firstname = formData.get("firstname") as string | null;
  const lastname = formData.get("lastname") as string | null;
  const email = formData.get("email") as string | null;
  const phone = formData.get("phone") as string | null;
  const message = formData.get("message") as string | null;

  try {
    if (firstname) {
      await resend.emails.send({
        from: "info@anazon.hadizproductions.com",
        to: "info@diablo.com",
        subject: "New message from your website customer",
        text: `Name: ${firstname} ${lastname}\nEmail: ${email}\nPhone: ${phone}\n${message}`,
      });

      redirect("/thank");
    } else if (email) {
      await resend.emails.send({
        from: "info@anazon.hadizproductions.com",
        to: email,
        subject: "Offer code from diablo",
        text: "Thanks you for subscribing with diablo your code is: abcd1234",
      });
    }

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
}

// Handle OPTIONS preflight for CORS
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
