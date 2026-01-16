import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com";
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/offers`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/stores`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/terms-conditions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/returns`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Try to fetch products for dynamic sitemap
  let productPages: MetadataRoute.Sitemap = [];

  try {
    // Attempt to fetch products - adjust endpoint if needed
    const response = await fetch(`${baseUrl}/api/products/top`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (response.ok) {
      const products = await response.json();

      // If products is an array, map them to sitemap entries
      if (Array.isArray(products)) {
        productPages = products.map((product: any) => ({
          url: `${siteUrl}/product/${product.slug || product.id}`,
          lastModified: product.updatedAt
            ? new Date(product.updatedAt)
            : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        }));
      }
    }
  } catch (error) {
    // Silently fail - sitemap will still work with static pages
    console.error("Error fetching products for sitemap:", error);
  }

  // Common categories and brands (you can expand this list)
  const categoryPages: MetadataRoute.Sitemap = [
    "smartphones",
    "laptops",
    "tablets",
    "smartwatches",
    "headphones",
    "earbuds",
    "speakers",
    "chargers",
    "accessories",
  ].map((category) => ({
    url: `${siteUrl}/categories/${category}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const brandPages: MetadataRoute.Sitemap = [
    "apple",
    "samsung",
    "xiaomi",
    "oppo",
    "vivo",
    "realme",
    "oneplus",
    "huawei",
    "sony",
    "lg",
  ].map((brand) => ({
    url: `${siteUrl}/brands/${brand}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...brandPages, ...productPages];
}
