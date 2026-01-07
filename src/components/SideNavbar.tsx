"use client";

import { X } from "lucide-react";
import Link from "next/link";
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

  const SideCategoryLink = ({ href, text }: { href: string; text: string }) => {
    return (
      <Link
        href={href}
        className="block px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
        onClick={onClose}
      >
        {text}
      </Link>
    );
  };

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
        className={`fixed top-0 left-0 z-70 h-full w-72 bg-white/95 backdrop-blur-sm shadow-lg border-r border-gray-100 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <img src="/logo.svg" className="w-28" alt="Gadget City BD" />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Categories
          </h3>
          <div className="flex flex-col gap-1">
            <SideCategoryLink href="/categories/mobile" text="Mobiles" />
            <SideCategoryLink href="/categories/airpods" text="Airpods" />
            <SideCategoryLink href="/categories/powerbanks" text="Powerbanks" />
            <SideCategoryLink
              href="/categories/smartwatches"
              text="Smartwatches"
            />
            <SideCategoryLink href="/categories/speakers" text="Speakers" />
            <SideCategoryLink href="/categories/chargers" text="Chargers" />
            <SideCategoryLink href="/categories/mouse" text="Mouse" />
            <SideCategoryLink href="/categories/keyboards" text="Keyboards" />
            <SideCategoryLink
              href="/categories/accessories"
              text="Accessories"
            />
            <SideCategoryLink href="/categories/adapters" text="Adapters" />
            <SideCategoryLink href="/categories/routers" text="Routers" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
