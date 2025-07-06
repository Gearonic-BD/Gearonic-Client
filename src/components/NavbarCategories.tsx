import Link from "next/link";

const NavCategoryLink = ({ href, text }: { href: string; text: string }) => {
  return (
    <div className="group">
      <Link
        href={href}
        className="relative font-medium text-sm lg:text-[15px] px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200 whitespace-nowrap rounded-lg "
      >
        {text}
        <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-primary transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0" />
      </Link>
    </div>
  );
};

export default NavCategoryLink;
