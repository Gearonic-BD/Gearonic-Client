import { SearchIcon, ShoppingCart, User2, Zap } from "lucide-react";
import Link from "next/link";
import NavCategoryLink from "./NavbarCategories";

const Navbar = () => {
  return (
    <nav className="w-full h-fit shadow-md fixed top-0 left-0 z-50 bg-white">
      <div className="container max-w-[1280px] py-2 mx-auto flex items-center justify-between px-4 gap-4 lg:gap-12">
        <div className="">
          <Link href={"/"} className="">
            <img className="w-30 lg:w-36" src="/logo.svg" alt="Gearonic BD" />
          </Link>
        </div>
        <div className="flex-1 hidden sm:block">
          <div className="flex items-stretch">
            <input
              className="w-full text-sm focus:border-primary rounded-l-xs border border-r-0 border-text-light px-2 py-2 outline-none"
              type="text"
              name=""
              id=""
            />
            <button className="bg-primary cursor-pointer rounded-r-xs border w-10 flex items-center justify-center border-primary">
              <SearchIcon className="text-white" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="block sm:hidden cursor-pointer">
            <SearchIcon />
          </div>
          <div>
            <Link
              href={"/cart"}
              className="flex items-center gap-1 hover:text-primary transition-all"
            >
              <Zap />
              <span className="hidden md:block">Offers</span>
            </Link>
          </div>
          <div className="relative">
            <Link
              href={"/cart"}
              className="flex items-center gap-1 hover:text-primary transition-all"
            >
              <ShoppingCart />
              <span className="hidden md:block">Cart</span>
              <span className="absolute -top-3 left-4 text-sm bg-primary px-1.5 text-white rounded-full">
                2
              </span>
            </Link>
          </div>
          <div>
            <Link
              href={"/cart"}
              className="flex relative items-center gap-1 hover:text-primary transition-all"
            >
              <User2 />
              <span className="hidden md:block">Account</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container pb-1.5 max-w-[1280px] text-[15px] justify-between mx-auto px-4 flex items-center">
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
    </nav>
  );
};

export default Navbar;
