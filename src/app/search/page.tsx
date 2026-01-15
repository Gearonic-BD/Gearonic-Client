import FeaturedProductCard from "@/components/FeaturedProductCard";
import { Product } from "@/types/types";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";

  // Call your backend API (Node.js)
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_SERVER_URL
    }/api/products/search?q=${encodeURIComponent(query)}`,
    { cache: "no-store" }
  );

  const data = query ? await res.json() : [];
  const products = data.data as Product[];
  console.log(data);

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-4 py-4">
        Search results for <span className="text-primary">{query}</span>
      </h1>

      {!products || products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
