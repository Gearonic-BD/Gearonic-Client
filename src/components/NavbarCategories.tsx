import Link from "next/link";

const NavCategoryLink = ({ href, text }: { href: string; text: string }) => {
  return (
    <div className="group">
      <Link
        href={href}
        className="relative font-medium px-2 py-1 text-offblack hover:text-primary transition-colors duration-200"
      >
        {text}
        <span className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-primary scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
      </Link>
    </div>
  );
};

export default NavCategoryLink;
