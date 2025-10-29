import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "T-Shirt Store - Premium Quality Tees",
  description: "Shop our collection of premium quality t-shirts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
