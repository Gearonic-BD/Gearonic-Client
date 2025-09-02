import FeaturedProductCard from "@/components/FeaturedProductCard";
import { Product } from "@/types/types";

const Brand = async ({ params }: { params: { brandName: string } }) => {
  const { brandName } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/brand/${brandName}`,
    { cache: "no-store" } // ensures fresh data
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: { message: string; data: Product[] } = await res.json();

  if (!products || products.data.length === 0) {
    return (
      <section className="min-h-screen flex items-start justify-center">
        <h1 className="text-3xl md:text-5xl font-semibold mt-24 text-center">
          No products found in <br /> this category
        </h1>
      </section>
    );
  }

  return (
    <section className="max-w-[1280px] mx-auto py-20">
      <h1 className="text-3xl font-medium">
        {" "}
        Result for <span className="text-primary">{brandName}</span>
      </h1>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6">
        {products.data.map((product) => (
          <FeaturedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Brand;
