import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gearonic BD",
  description: "The largest ecommerce platform for electronics in Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
