# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration to automatically save orders from your e-commerce website.

## Prerequisites

- A Google account
- Access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter a project name (e.g., "T-Shirt Store Orders")
4. Click "Create"

## Step 2: Enable Google Sheets API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

## Step 3: Create Service Account Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Enter a name (e.g., "tshirt-store-orders")
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"
6. Click on the created service account email
7. Go to the "Keys" tab
8. Click "Add Key" → "Create new key"
9. Select "JSON" and click "Create"
10. A JSON file will be downloaded - **keep this file secure!**

## Step 4: Create Google Sheets Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "T-Shirt Store Orders" (or any name you prefer)
4. Rename the first sheet to "Orders"
5. Add the following headers in row 1:
   - A1: Order ID
   - B1: Date
   - C1: Customer Name
   - D1: Email
   - E1: Phone
   - F1: Address
   - G1: Items
   - H1: Total

6. **Important:** Share the spreadsheet with the service account email
   - Click "Share" button
   - Paste the service account email (from the JSON file: `client_email`)
   - Give it "Editor" access
   - Uncheck "Notify people"
   - Click "Share"

## Step 5: Get Spreadsheet ID

The Spreadsheet ID is in the URL of your Google Sheet:
```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
```
Copy the ID between `/d/` and `/edit`

## Step 6: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open the downloaded JSON credentials file

3. Copy the **entire JSON content** and paste it as a single line in `.env.local`:
   ```
   GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"..."}
   ```

4. Add your Spreadsheet ID:
   ```
   GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id-here
   ```

## Step 7: Test the Integration

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000
4. Add items to cart and complete a test order
5. Check your Google Sheet - the order should appear!

## Deployment on Vercel

When deploying to Vercel:

1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add both variables:
   - `GOOGLE_SHEETS_CREDENTIALS` (paste the entire JSON as one line)
   - `GOOGLE_SHEETS_SPREADSHEET_ID`
4. Redeploy your application

## Troubleshooting

### Orders not appearing in Google Sheets

1. **Check service account email**: Make sure you shared the spreadsheet with the correct service account email
2. **Check permissions**: The service account needs "Editor" access
3. **Check sheet name**: The sheet must be named "Orders" (case-sensitive)
4. **Check credentials**: Ensure the JSON is properly formatted in the environment variable
5. **Check logs**: Look at the server logs for error messages

### "Failed to submit order" error

1. Verify the Spreadsheet ID is correct
2. Check that the Google Sheets API is enabled in your Google Cloud project
3. Ensure the credentials JSON is valid and not corrupted

## Note

The application will work without Google Sheets configured - orders will be logged to the console but not saved. This allows you to test the application before setting up the integration.

## Security Best Practices

- **Never commit** `.env.local` or credentials files to version control
- Keep your service account credentials secure
- Regularly rotate service account keys
- Use environment variables for all sensitive data
- Limit service account permissions to only what's needed
