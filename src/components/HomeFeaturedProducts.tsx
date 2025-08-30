import SectionHeader from "./SectionHeader";
import FeaturedProductCard from "./FeaturedProductCard";
import { Product } from "@/types/types";
const HomeFeaturedProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/top`
  );
  const products: Product[] = await res.json();
  if (!products || products.length === 0) return null;
  return (
    <section className="max-w-[1280px] mx-auto container mb-16 px-3 sm:px-6">
      <SectionHeader text="Featured Products For YOU" />
      <div className="grid 2xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2.5 md:gap-4">
        {products.map((product) => (
          <FeaturedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default HomeFeaturedProducts;
