"use client";

import { X } from "lucide-react";
import NavCategoryLink from "./NavbarCategories";
import { useEffect } from "react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const SideNavbar = ({ open, onClose }: SidebarProps) => {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-60 bg-black/20 bg-opacity-50 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-70 h-full w-64 bg-white p-4 shadow-md transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <img src="/logo.svg" className="w-24" alt="" />
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="flex flex-col gap-2">
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
      </div>
    </>
  );
};

export default SideNavbar;
