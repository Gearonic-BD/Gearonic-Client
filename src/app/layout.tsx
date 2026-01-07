import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import CartFetcher from "@/components/CartFetcher";


export const metadata: Metadata = {
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
