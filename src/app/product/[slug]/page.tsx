import Breadcrumb from "@/components/Breadcrumb";
import ProductDescription from "@/components/ProductDescription";
import ProductDetailsCard from "@/components/ProductDetailsCard";
import ProductQuestions from "@/components/ProductQuestions";
import ProductReviews from "@/components/ProductReviews";
import ProductSpecifications from "@/components/ProductSpecifications";
import RelatedProducts from "@/components/RelatedProducts";
import { Product } from "@/types/types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com";
  const productUrl = `${siteUrl}/product/${slug}`;
  const currentPrice = product.discountPrice || product.originalPrice;
  const price = currentPrice.toString();
  const currency = "BDT";
  const availability = product.totalStock > 0 ? "in_stock" : "out_of_stock";

  // Clean description - remove HTML tags for meta description
  const cleanDescription = product.description
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 160);

  const metaDescription =
    cleanDescription ||
    `${product.title} - Buy ${product.brand} ${
      product.category
    } in Bangladesh at best price. ${
      product.rating ? `Rated ${product.rating} stars. ` : ""
    }Fast delivery & warranty.`;

  // Generate keywords
  const keywords = [
    product.title,
    product.brand,
    product.category,
    `${product.brand} ${product.title}`,
    `${product.title} price in Bangladesh`,
    `buy ${product.title} online`,
    `${product.title} Bangladesh`,
    ...(product.features || []).slice(0, 5),
  ].join(", ");

  return {
    title: `${product.title} - Buy Online in Bangladesh | Gadget City BD`,
    description: metaDescription,
    keywords: keywords,
    authors: [{ name: "Gadget City BD" }],
    creator: "Gadget City BD",
    publisher: "Gadget City BD",
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.title} - Buy Online in Bangladesh`,
      description: metaDescription,
      url: productUrl,
      siteName: "Gadget City BD",
      images: [
        {
          url: product.featuredImage,
          width: 1200,
          height: 630,
          alt: product.title,
        },
        ...product.images.slice(0, 3).map((img) => ({
          url: img,
          width: 1200,
          height: 630,
          alt: product.title,
        })),
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} - Buy Online in Bangladesh`,
      description: metaDescription,
      images: [product.featuredImage],
      creator: "@gadgetcitybd",
      site: "@gadgetcitybd",
    },
    other: {
      "product:price:amount": price,
      "product:price:currency": currency,
      "product:availability": availability,
      "product:brand": product.brand,
      "product:category": product.category,
      "product:condition": "new",
      "product:retailer": "Gadget City BD",
      "product:retailer_item_id": product.id,
    },
  };
}

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com";
  const productUrl = `${siteUrl}/product/${slug}`;
  const currentPrice = product.discountPrice || product.originalPrice;
  const availability =
    product.totalStock > 0
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock";

  // Generate structured data (JSON-LD) for product
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: [product.featuredImage, ...product.images],
    description: product.description.replace(/<[^>]*>/g, "").substring(0, 500),
    sku: product.id,
    mpn: product.id,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "BDT",
      price: currentPrice.toString(),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      availability: availability,
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Gadget City BD",
        url: siteUrl,
      },
    },
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating.toString(),
        reviewCount: product.reviews?.length?.toString() || "0",
        bestRating: "5",
        worstRating: "1",
      },
    }),
    ...(product.reviews &&
      product.reviews.length > 0 && {
        review: product.reviews.slice(0, 5).map((review) => ({
          "@type": "Review",
          author: {
            "@type": "Person",
            name: review.user.name || "Anonymous",
          },
          datePublished: review.createdAt,
          reviewBody: review.comment || "",
          reviewRating: {
            "@type": "Rating",
            ratingValue: review.rating.toString(),
            bestRating: "5",
            worstRating: "1",
          },
        })),
      }),
  };

  const breadcrumbItems = [
    { label: "Products", href: "/" },
    {
      label: product.category,
      href: `/categories/${product.category.toLowerCase()}`,
    },
    {
      label: product.brand,
      href: `/brands/${product.brand.toLowerCase()}`,
    },
    { label: product.title },
  ];

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `${siteUrl}${item.href}` }),
    })),
  };

  return (
    <>
      {/* Structured Data for Product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Structured Data for Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6">
        <Breadcrumb items={breadcrumbItems} />
      </section>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <ProductDetailsCard product={product} />
      </section>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <ProductSpecifications specifications={product.specifications} />
      </section>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <ProductDescription html={product.description} />
      </section>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <ProductQuestions
          questions={product.questions}
          productId={product.id}
        />
      </section>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <ProductReviews
          reviews={product.reviews}
          averageRating={product.rating}
          totalReviews={product?.reviews?.length}
        />
      </section>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <RelatedProducts id={product.id} />
      </section>
    </>
  );
};

export default ProductPage;
