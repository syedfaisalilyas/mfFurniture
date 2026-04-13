import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rustic Illusions - Premium Furniture Store",
  description: "Discover premium handcrafted furniture at Rustic Illusions. Quality designs with fast delivery across Pakistan.",
  keywords: "furniture, rustic, handcrafted, home decor, sofa, bed, table",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
