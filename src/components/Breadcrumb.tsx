import Link from "next/link";
import { Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-600 py-2 overflow-hidden">
      {/* Home icon */}
      <Link
        href="/"
        className="flex items-center hover:text-primary transition-colors duration-200 flex-shrink-0"
      >
        <Home size={16} className="mr-1" />
      </Link>

      {/* Breadcrumb items */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1 min-w-0">
          <span className="text-gray-400">/</span>
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-primary text-[13px] md:text-sm transition-colors duration-200 capitalize  max-w-[120px] sm:max-w-[150px] md:max-w-none"
              title={item.label}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className="text-gray-900 font-medium text-[13px] md:text-sm  capitalize truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-none"
              title={item.label}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
