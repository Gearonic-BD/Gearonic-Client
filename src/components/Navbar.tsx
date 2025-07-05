"use client";

import { SearchIcon, ShoppingCart, User2, Zap, Menu } from "lucide-react";
import Link from "next/link";
import SideNavbar from "./SideNavbar";
import { useState } from "react";
import NavCategoryLink from "./NavbarCategories";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <>
      <nav className="w-full h-fit ml:shadow-md fixed top-0 left-0 z-50 bg-white">
        <div className="container ml:shadow-none shadow-md max-w-[1280px] py-2 mx-auto flex items-center justify-between px-4 gap-4 lg:gap-12">
          <div className="flex items-center gap-2">
            {/* Sidebar Toggle (visible on small screens) */}
            <button
              className="block ml:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu />
            </button>

            {/* Logo */}
            <Link href={"/"} className="">
              <img className="w-30 lg:w-36" src="/logo.svg" alt="Gearonic BD" />
            </Link>
          </div>

          {/* Search (hidden on mobile) */}
          <div className="flex-1 hidden sm:block">
            <div className="flex items-stretch">
              <input
                className="w-full text-sm focus:border-primary rounded-l-xs border border-r-0 border-text-light px-2 py-2 outline-none"
                type="text"
              />
              <button className="bg-primary cursor-pointer rounded-r-xs border w-10 flex items-center justify-center border-primary">
                <SearchIcon className="text-white" />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <button
              className="block sm:hidden cursor-pointer"
              onClick={() => setShowMobileSearch((prev) => !prev)}
            >
              <SearchIcon />
            </button>

            <Link
              href={"/cart"}
              className="xs:flex hidden items-center gap-1 hover:text-primary transition-all"
            >
              <Zap />
              <span className="hidden md:block">Offers</span>
            </Link>
            <div className="relative">
              <Link
                href={"/cart"}
                className="xs:flex hidden items-center gap-1 hover:text-primary transition-all"
              >
                <ShoppingCart />
                <span className="hidden md:block">Cart</span>
                <span className="absolute -top-3 left-4 text-sm bg-primary px-1.5 text-white rounded-full">
                  2
                </span>
              </Link>
            </div>
            <Link
              href={"/cart"}
              className=" relative xs:flex hidden items-center gap-1 hover:text-primary transition-all"
            >
              <User2 />
              <span className="hidden md:block">Account</span>
            </Link>
          </div>
        </div>

        {/* Desktop category bar (visible on medium+) */}
        <div className="container pb-1.5 gap-2 bg-white w-fit ml:w-full ml:gap-0 max-w-[1280px] justify-between mx-auto px-4 hidden ml:flex flex-row items-center">
          <NavCategoryLink href="/categories/mobile" text="Mobiles" />
          <NavCategoryLink href="/categories/mobile" text="Airpods" />
          <NavCategoryLink href="/categories/mobile" text="Powerbanks" />
          <NavCategoryLink href="/categories/mobile" text="Smartwatches" />
          <NavCategoryLink href="/categories/mobile" text="Speakers" />
          <NavCategoryLink href="/categories/mobile" text="Chargers" />
          <NavCategoryLink href="/categories/mobile" text="Mouse" />
          <NavCategoryLink href="/categories/mobile" text="Keyboards" />
          <NavCategoryLink href="/categories/mobile" text="Accessories" />
          <NavCategoryLink href="/categories/mobile" text="Adapters" />
          <NavCategoryLink href="/categories/mobile" text="Routers" />
        </div>
        {showMobileSearch && (
          <div className="block sm:hidden bg-white shadow-md px-4 py-2 w-full absolute top-[100%] z-40">
            <div className="flex items-stretch">
              <input
                className="w-full text-sm focus:border-primary border rounded-l-xs border-r-0 border-text-light px-2 py-2 outline-none"
                type="text"
                placeholder="Search products..."
              />
              <button className="bg-primary cursor-pointer rounded-r-xs border border-primary w-10 flex items-center justify-center ">
                <SearchIcon className="text-white" />
              </button>
            </div>
          </div>
        )}
      </nav>
      <div className="h-[144px] hidden ml:block" />
      <div className="h-[96px] ml:hidden" />

      {/* Sidebar Component (mobile only) */}
      <SideNavbar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
