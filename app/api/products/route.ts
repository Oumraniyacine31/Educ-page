import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Product } from "@/types";

// Helper function to get Google Sheets client
async function getSheetsClient() {
  const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!credentials || !spreadsheetId) {
    throw new Error("Google Sheets credentials not configured");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(credentials),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return { sheets, spreadsheetId };
}

// GET - Fetch all products
export async function GET() {
  try {
    const { sheets, spreadsheetId } = await getSheetsClient();

    // Read products from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Products!A2:G", // Skip header row
    });

    const rows = response.data.values || [];
    
    const products: Product[] = rows
      .filter((row) => row[6] === "TRUE" || row[6] === "true") // Only active products
      .map((row) => ({
        id: row[0] || "",
        name: row[1] || "",
        price: parseFloat(row[2]) || 0,
        description: row[3] || "",
        image: row[4] || "",
        sizes: row[5] ? row[5].split(",").map((s: string) => s.trim()) : [],
      }));

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    
    // Return default products if Google Sheets is not set up
    const defaultProducts: Product[] = [
      {
        id: "1",
        name: "Classic White Tee",
        price: 29.99,
        description: "Premium cotton white t-shirt, perfect for everyday wear",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        id: "2",
        name: "Black Essential",
        price: 29.99,
        description: "Timeless black tee made from soft, breathable fabric",
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        id: "3",
        name: "Navy Blue Crew",
        price: 32.99,
        description: "Classic navy blue crew neck with a modern fit",
        image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        id: "4",
        name: "Heather Gray",
        price: 27.99,
        description: "Comfortable heather gray tee for casual style",
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        id: "5",
        name: "Olive Green",
        price: 34.99,
        description: "Trendy olive green t-shirt with premium quality",
        image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        id: "6",
        name: "Burgundy Red",
        price: 32.99,
        description: "Rich burgundy color with excellent durability",
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
    ];
    
    return NextResponse.json({ 
      success: true, 
      products: defaultProducts,
      message: "Using default products (Google Sheets not configured)"
    });
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const product: Product = await request.json();
    const { sheets, spreadsheetId } = await getSheetsClient();

    // Generate new ID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Products!A:A",
    });

    const rows = response.data.values || [];
    const newId = rows.length > 1 ? String(rows.length) : "1";

    // Prepare row data
    const row = [
      newId,
      product.name,
      product.price,
      product.description,
      product.image,
      product.sizes.join(", "),
      "TRUE", // Active by default
    ];

    // Append to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Products!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
      product: { ...product, id: newId },
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// PUT - Update product
export async function PUT(request: NextRequest) {
  try {
    const product: Product = await request.json();
    const { sheets, spreadsheetId } = await getSheetsClient();

    // Find the row index for this product
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Products!A:A",
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex((row) => row[0] === product.id);

    if (rowIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // Update the row (rowIndex + 1 because sheets are 1-indexed)
    const row = [
      product.id,
      product.name,
      product.price,
      product.description,
      product.image,
      product.sizes.join(", "),
      "TRUE",
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Products!A${rowIndex + 1}:G${rowIndex + 1}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete product (soft delete by setting active to FALSE)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("id");

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    const { sheets, spreadsheetId } = await getSheetsClient();

    // Find the row index for this product
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Products!A:A",
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex((row) => row[0] === productId);

    if (rowIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // Set active to FALSE (soft delete)
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Products!G${rowIndex + 1}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [["FALSE"]],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
