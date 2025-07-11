import { Category } from "@/types/types";
import Link from "next/link";



const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <Link href={category.href} className="group block my-2">
      <div className="bg-white rounded-2xl p-6 transition-all duration-300 active:scale-98 hover:bg-gray-100 active:shadow-md  hover:shadow-md">
        {/* Image Container */}
        <div className="flex justify-center items-center h-32 mb-2">
          <img
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            className="max-w-full max-h-full object-contain transition-transform duration-300 group-active:scale-105 group-hover:scale-105"
            crossOrigin="anonymous"
          />
        </div>

        {/* Category Name */}
        <h3 className="text-sm md:text-base font-medium text-gray-900 group-active:scale-105 text-center group-hover:text-gray-700 transition-colors">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
