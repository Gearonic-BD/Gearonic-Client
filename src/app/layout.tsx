import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gearonic BD",
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
        <Footer />
        <BottomNavbar />
      </body>
    </html>
  );
}
