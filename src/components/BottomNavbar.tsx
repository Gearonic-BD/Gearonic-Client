"use client";

import { Home, ShoppingCart, User2, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-white border-t shadow-md flex justify-around py-3 xs:hidden">
      <Link
        href="/"
        className={`flex flex-col items-center gap-1 ${
          isActive("/") ? "text-primary" : ""
        }`}
      >
        <Home size={24} />
        Home
      </Link>
      <Link
        href="/offers"
        className={`flex flex-col items-center gap-1 ${
          isActive("/offers") ? "text-primary" : ""
        }`}
      >
        <Zap size={24} />
        Offers
      </Link>
      <Link
        href="/cart"
        className={`relative flex flex-col items-center gap-1 ${
          isActive("/cart") ? "text-primary" : ""
        }`}
      >
        <ShoppingCart size={24} />
        Cart
        <span className="absolute -top-2 -right-2 text-sm bg-primary text-white rounded-full px-1">
          2
        </span>
      </Link>
      <Link
        href="/account"
        className={`flex flex-col items-center gap-1 ${
          isActive("/account") ? "text-primary" : ""
        }`}
      >
        <User2 size={24} />
        Account
      </Link>
    </div>
  );
};

export default BottomNavbar;
