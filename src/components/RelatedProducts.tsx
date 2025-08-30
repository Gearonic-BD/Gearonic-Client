import React from "react";
import SectionHeader from "./SectionHeader";
import FeaturedProductCard from "./FeaturedProductCard";
import { Product } from "@/types/types";


const RelatedProducts = async ({ id }: { id: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${id}/related`
  );
  const data = await res.json();
  const products: Product[] = data?.data || [];

  if (!products || products.length === 0) {
    return null;
  }
  return (
    <div>
      <SectionHeader text="Related Products for you" />
      <div className="grid 2xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2.5 md:gap-4">
        {products.map((product) => (
          <FeaturedProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
