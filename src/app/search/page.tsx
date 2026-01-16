import FeaturedProductCard from "@/components/FeaturedProductCard";
import { Product } from "@/types/types";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q || "";
  const pageUrl = `${siteUrl}/search${
    query ? `?q=${encodeURIComponent(query)}` : ""
  }`;

  if (query) {
    return {
      title: `Search Results for "${query}" - Gadget City BD`,
      description: `Find ${query} products at Gadget City BD. Browse our wide selection of electronics, smartphones, laptops, and tech accessories.`,
      alternates: {
        canonical: pageUrl,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  return {
    title: "Search Products - Gadget City BD",
    description:
      "Search for electronics, smartphones, laptops, and tech accessories at Gadget City BD. Find the best deals on genuine products.",
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: false, // Don't index empty search page
      follow: true,
    },
  };
}

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
