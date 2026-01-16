import HomeFeaturedCategories from "@/components/HomeFeaturedCategories";
import HomeFeaturedProducts from "@/components/HomeFeaturedProducts";
import HomeFlashSale from "@/components/HomeFlashSale";
import HomeAllCategories from "@/components/HomeAllCategories";
import HomeSwiper from "@/components/HomeSwiper";
import type { Metadata } from "next";

// Use revalidation for better performance while keeping data fresh
export const revalidate = 60; // Revalidate every 60 seconds

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com";

export const metadata: Metadata = {
  title:
    "Gadget City BD - Largest Electronics E-commerce Platform in Bangladesh",
  description:
    "Buy authentic electronics, smartphones, laptops, smartwatches, headphones, and tech accessories in Bangladesh. Best prices, fast delivery, genuine products with warranty. Shop now at Gadget City BD!",
  keywords: [
    "electronics bangladesh",
    "online electronics shop",
    "smartphones bangladesh",
    "laptops bangladesh",
    "gadgets bangladesh",
    "electronics store",
    "tech accessories",
    "buy electronics online",
    "gadget city bd",
    "electronics dhaka",
    "iphone bangladesh",
    "samsung bangladesh",
    "xiaomi bangladesh",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Gadget City BD - Largest Electronics E-commerce Platform in Bangladesh",
    description:
      "Buy authentic electronics, smartphones, laptops, smartwatches, headphones, and tech accessories in Bangladesh. Best prices, fast delivery, genuine products with warranty.",
    url: siteUrl,
    siteName: "Gadget City BD",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Gadget City BD - Electronics Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gadget City BD - Largest Electronics E-commerce Platform",
    description:
      "Buy authentic electronics, smartphones, laptops, and tech accessories in Bangladesh. Best prices, fast delivery, genuine products.",
    images: ["/logo.png"],
  },
};

const Home = () => {
  // Structured data for homepage
  const homepageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Gadget City BD - Electronics Store",
    description:
      "The largest e-commerce platform for electronics in Bangladesh. Buy authentic electronics, smartphones, laptops, and tech accessories online.",
    url: siteUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Smartphones",
          url: `${siteUrl}/categories/smartphones`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Laptops",
          url: `${siteUrl}/categories/laptops`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Smartwatches",
          url: `${siteUrl}/categories/smartwatches`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Headphones",
          url: `${siteUrl}/categories/headphones`,
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Accessories",
          url: `${siteUrl}/categories/accessories`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageSchema),
        }}
        defer
      />
      <HomeSwiper />
      <HomeFlashSale />
      <HomeFeaturedCategories />
      <HomeFeaturedProducts />
      <HomeAllCategories />
    </>
  );
};

export default Home;
