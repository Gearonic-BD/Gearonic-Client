import Link from "next/link";
import { Product } from "@/types/types";
import CategorySwiperContainer from "@/components/CategorySwiperContainer";

const CategoryProductSwiper = async ({
  title,
  categoryName,
}: {
  title: string;
  categoryName: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/categories/${categoryName}`,
    { cache: "no-store" } // ensures fresh data
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: { message: string; data: Product[] } = await res.json();
  if (!products || products.data.length === 0) {
    return null; // Don't render the section if no products
  }
  return (
    <section className="w-full max-w-[1280px] px-4 sm:px-6 mx-auto my-12">
      <div className="relative">
        <div className="flex items-center justify-between w-full mb-2">
          <div className="flex items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/categories/${categoryName}`}
              className="inline-block uppercase active:scale-95 text-primary border hover:-translate-y-1 transition-all font-semibold px-4 py-2 rounded-md text-sm sm:text-base hover:bg-primary-dark"
            >
              View All
            </Link>
          </div>
        </div>
        <CategorySwiperContainer products={products.data} />
      </div>
    </section>
  );
};

export default CategoryProductSwiper;
