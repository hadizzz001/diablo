"use server";

import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendEmail2 = async (formData: FormData) => {
  const email = formData.get("email") as string | null;
  const fname = formData.get("fname") as string | null;
  const lname = formData.get("lname") as string | null;
  const phone = formData.get("phone") as string | null;
  const address = formData.get("address") as string | null;
  const country = formData.get("country") as string | null;
  const city = formData.get("city") as string | null;
  const apt = formData.get("apt") as string | null;
  const itemsJSON = formData.get("items") as string | null;
  const subtotal = formData.get("subtotal") as string | null;
  const delivery = formData.get("delivery") as string | null;
  const total = formData.get("total") as string | null;

  let items: any[] = [];

  try {
    if (itemsJSON) {
      items = JSON.parse(itemsJSON);
    }
  } catch (error) {
    console.error("Invalid JSON for items:", error);
  }

  const message = `
*Customer Information:*
Email: ${email}
Name: ${fname} ${lname} 
Phone: ${phone}
Country: ${country}
City: ${city}
Apt-Floor: ${apt}
Address: ${address}

*Order Details:*
${items
  .map(
    (item: any, index: number) => `
  Item ${index + 1}:
  - Name: ${item.title} 
  - Quantity: ${item.quantity}
  - Price: $${(() => {
    const colorObj = item.color?.find(
      (c: any) => c.color === item.selectedColor
    );
    const sizeObj = colorObj?.sizes?.find(
      (s: any) => s.size === item.selectedSize
    );
    return sizeObj?.price ?? item.discount;
  })()}
  - Color: ${item.selectedColor}
  - Size: ${item.selectedSize}
  - Image: ${item.img[0]}
`
  )
  .join("\n")}

Subtotal: $${Number(subtotal).toFixed(2)}
Delivery fee: $${delivery}
*Total Amount:* $${total}
`;

  try {
    await resend.emails.send({
      from: "info@anazon.hadizproductions.com",
      to: "info@diablo.com",
      subject: "New Order from Website",
      text: message,
    });

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
    console.error("Error sending order email:", error);
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
