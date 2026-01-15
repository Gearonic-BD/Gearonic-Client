import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import CartFetcher from "@/components/CartFetcher";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Gadget City BD",
  description: "The largest ecommerce platform for electronics in Bangladesh",
  icons: {
    icon: "/fav.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Toaster />
        <CartFetcher />
        <Footer />
        <BottomNavbar />
      </body>
    </html>
  );
}
