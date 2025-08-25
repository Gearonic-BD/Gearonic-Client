"use client";
import { SearchIcon, ShoppingCart, User2, Zap, Menu } from "lucide-react";
import Link from "next/link";
import SideNavbar from "./SideNavbar";
import { useState } from "react";
import NavCategoryLink from "./NavbarCategories";
import useCartTotalItems from "@/hooks/useCartTotalItems";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const itemsLen = useCartTotalItems();

  return (
    <>
      <nav className="w-full h-fit shadow-sm border-b border-gray-100 fixed top-0 left-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="container max-w-[1280px] sm:py-3 mx-auto flex items-center justify-between px-4 gap-4 lg:gap-8">
          <div className="flex items-center gap-3">
            {/* Sidebar Toggle (visible on small screens) */}
            <button
              className="block ml:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>

            {/* Logo */}
            <Link href={"/"} className="flex-shrink-0">
              <img className="w-28 lg:w-32" src="/logo.svg" alt="Gearonic BD" />
            </Link>
          </div>

          {/* Search (hidden on mobile) */}
          <div className="flex-1 hidden sm:block max-w-lg lg:max-w-xl xl:max-w-2xl mx-4">
            <div className="flex items-stretch rounded-lg overflow-hidden shadow-sm border border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <input
                className="w-full text-sm px-4 py-2.5 outline-none placeholder:text-gray-400"
                type="text"
                placeholder="Search for products..."
              />
              <button className="bg-primary hover:bg-primary/90 cursor-pointer px-4 flex items-center justify-center transition-colors">
                <SearchIcon className="text-white" size={18} />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button
              className="block sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setShowMobileSearch((prev) => !prev)}
            >
              <SearchIcon size={20} />
            </button>

            <Link
              href={"/offers"}
              className="xs:flex hidden items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors group"
            >
              <Zap
                size={18}
                className="group-hover:text-primary transition-colors"
              />
              <span className="hidden md:block text-sm font-medium">
                Offers
              </span>
            </Link>

            <div className="relative">
              <Link
                href={"/cart"}
                className="xs:flex hidden items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors group relative"
              >
                <ShoppingCart
                  size={18}
                  className="group-hover:text-primary transition-colors"
                />
                <span className="hidden md:block text-sm font-medium">
                  Cart
                </span>
                {itemsLen > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {itemsLen}
                  </span>
                )}
              </Link>
            </div>

            <Link
              href={"/account"}
              className="xs:flex hidden items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors group"
            >
              <User2
                size={18}
                className="group-hover:text-primary transition-colors"
              />

              <span className="hidden md:block text-sm font-medium">
                Account
              </span>
            </Link>
          </div>
        </div>

        {/* Desktop category bar (visible on medium+) */}
        <div className=" container max-w-[1280px] bg-white/50 mx-auto px-4 hidden ml:flex items-center justify-center border-none">
          <div className="flex bg-white items-center gap-6 py-2 overflow-x-auto scrollbar-hide">
            <NavCategoryLink href="/categories/mobile" text="Mobiles" />
            <NavCategoryLink href="/categories/airpods" text="Airpods" />
            <NavCategoryLink href="/categories/powerbanks" text="Powerbanks" />
            <NavCategoryLink
              href="/categories/smartwatches"
              text="Smartwatches"
            />
            <NavCategoryLink href="/categories/speakers" text="Speakers" />
            <NavCategoryLink href="/categories/chargers" text="Chargers" />
            <NavCategoryLink href="/categories/mouse" text="Mouse" />
            <NavCategoryLink href="/categories/keyboards" text="Keyboards" />
            <NavCategoryLink
              href="/categories/accessories"
              text="Accessories"
            />
            <NavCategoryLink href="/categories/adapters" text="Adapters" />
            <NavCategoryLink href="/categories/routers" text="Routers" />
          </div>
        </div>

        {showMobileSearch && (
          <div className="block sm:hidden bg-white border-t border-gray-100 px-4 py-3 w-full absolute top-full z-40 shadow-sm">
            <div className="flex items-stretch rounded-lg overflow-hidden shadow-sm border border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <input
                className="w-full text-sm px-4 py-2.5 outline-none placeholder:text-gray-400"
                type="text"
                placeholder="Search products..."
                autoFocus
              />
              <button className="bg-primary hover:bg-primary/90 cursor-pointer px-4 flex items-center justify-center transition-colors">
                <SearchIcon className="text-white" size={18} />
              </button>
            </div>
          </div>
        )}
      </nav>
      <div className="h-[65px] sm:h-[90px] md:h-[145px]" />

      {/* Sidebar Component (mobile only) */}
      <SideNavbar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
