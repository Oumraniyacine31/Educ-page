import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { OrderData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json();

    // Check if Google Sheets credentials are configured
    const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS;
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!credentials || !spreadsheetId) {
      console.log("Google Sheets not configured. Order data:", orderData);
      
      // Return success even without Google Sheets configured
      // This allows the app to work without immediate setup
      return NextResponse.json({
        success: true,
        message: "Order received (Google Sheets not configured)",
        orderId: orderData.orderId,
      });
    }

    // Parse credentials
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Prepare row data for Google Sheets
    const itemsString = orderData.items
      .map(
        (item) =>
          `${item.name} (${item.selectedSize}) x${item.quantity} - $${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("; ");

    const row = [
      orderData.orderId,
      new Date(orderData.date).toLocaleString(),
      orderData.customerName,
      orderData.email,
      orderData.phone,
      orderData.address,
      itemsString,
      `$${orderData.total.toFixed(2)}`,
    ];

    // Append to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Orders!A:H",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Order submitted successfully",
      orderId: orderData.orderId,
    });
  } catch (error) {
    console.error("Error submitting order:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit order",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
