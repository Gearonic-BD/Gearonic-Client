import Link from "next/link";

interface FooterLink {
  href: string;
  text: string;
}

interface FooterLinkListProps {
  title: string;
  links: FooterLink[];
}

const FooterLinkList = ({ title, links }: FooterLinkListProps) => {
  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkList;
