import FeaturedProductCard from "@/components/FeaturedProductCard";
import { Product } from "@/types/types";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}): Promise<Metadata> {
  const { categoryName } = await params;
  const formattedCategoryName =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  const pageUrl = `${siteUrl}/categories/${categoryName}`;

  return {
    title: `${formattedCategoryName} - Buy Online in Bangladesh | Gadget City BD`,
    description: `Shop ${formattedCategoryName.toLowerCase()} online in Bangladesh. Best prices, genuine products, fast delivery. Browse our wide selection of ${formattedCategoryName.toLowerCase()} at Gadget City BD.`,
    keywords: [
      `${categoryName} bangladesh`,
      `buy ${categoryName} online`,
      `${categoryName} price bangladesh`,
      `${categoryName} dhaka`,
      `online ${categoryName} shop`,
      `gadget city ${categoryName}`,
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${formattedCategoryName} - Buy Online in Bangladesh | Gadget City BD`,
      description: `Shop ${formattedCategoryName.toLowerCase()} online in Bangladesh. Best prices, genuine products, fast delivery.`,
      url: pageUrl,
      siteName: "Gadget City BD",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: `${formattedCategoryName} - Gadget City BD`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${formattedCategoryName} - Buy Online in Bangladesh`,
      description: `Shop ${formattedCategoryName.toLowerCase()} online in Bangladesh. Best prices, genuine products, fast delivery.`,
      images: ["/logo.png"],
    },
  };
}

const Category = async ({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) => {
  const { categoryName } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/categories/${categoryName}`,
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

  const formattedCategoryName =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  // Structured data for category page
  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${formattedCategoryName} - Gadget City BD`,
    description: `Shop ${formattedCategoryName.toLowerCase()} online in Bangladesh`,
    url: `${siteUrl}/categories/${categoryName}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.data.length,
      itemListElement: products.data
        .slice(0, 10)
        .map((product: Product, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: product.title,
            url: `${siteUrl}/product/${product.slug}`,
            image: product.featuredImage,
            brand: {
              "@type": "Brand",
              name: product.brand,
            },
            offers: {
              "@type": "Offer",
              price: (
                product.discountPrice || product.originalPrice
              ).toString(),
              priceCurrency: "BDT",
              availability:
                product.totalStock > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
            },
          },
        })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categorySchema),
        }}
      />
      <section className="max-w-[1280px] mx-auto py-20">
        <h1 className="text-3xl font-medium">
          {" "}
          Products for{" "}
          <span className="text-primary">{formattedCategoryName}</span>
        </h1>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6">
          {products.data.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Category;
