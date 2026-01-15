import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com";
const pageUrl = `${siteUrl}/blog`;

export const metadata: Metadata = {
  title: "Blog & News - Gadget City BD | Latest Technology News & Reviews",
  description:
    "Stay updated with the latest technology news, product reviews, buying guides, and tech tips from Gadget City BD. Expert insights on smartphones, electronics, and gadgets.",
  keywords: [
    "technology blog bangladesh",
    "electronics news",
    "gadget reviews",
    "tech tips bangladesh",
    "smartphone reviews",
    "technology updates",
    "gadget city blog",
  ].join(", "),
  authors: [{ name: "Gadget City BD" }],
  creator: "Gadget City BD",
  publisher: "Gadget City BD",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Blog & News - Gadget City BD | Latest Technology News",
    description:
      "Stay updated with the latest technology news, product reviews, and buying guides from Gadget City BD.",
    url: pageUrl,
    siteName: "Gadget City BD",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Gadget City BD - Blog & News",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & News - Gadget City BD",
    description:
      "Stay updated with the latest technology news, product reviews, and buying guides.",
    images: ["/logo.png"],
  },
};

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Smartphones to Watch in 2025",
      excerpt:
        "Discover the latest smartphone releases and upcoming models that are set to revolutionize the mobile industry.",
      date: "January 15, 2025",
      category: "Smartphones",
    },
    {
      id: 2,
      title: "How to Choose the Perfect Smartwatch for Your Lifestyle",
      excerpt:
        "A comprehensive guide to help you select the ideal smartwatch based on your needs, budget, and daily activities.",
      date: "January 10, 2025",
      category: "Smartwatches",
    },
    {
      id: 3,
      title: "Wireless Earbuds vs. Wired Headphones: Which is Better?",
      excerpt:
        "Compare the pros and cons of wireless earbuds and wired headphones to make an informed decision for your audio needs.",
      date: "January 5, 2025",
      category: "Audio",
    },
    {
      id: 4,
      title: "Essential Charging Accessories for Your Devices",
      excerpt:
        "Learn about the must-have charging accessories that can keep all your devices powered up and ready to use.",
      date: "December 28, 2024",
      category: "Accessories",
    },
    {
      id: 5,
      title: "Protecting Your Electronics: Tips and Best Practices",
      excerpt:
        "Simple yet effective ways to protect your electronic devices from damage and extend their lifespan.",
      date: "December 20, 2024",
      category: "Tips & Tricks",
    },
    {
      id: 6,
      title: "Understanding Fast Charging Technology",
      excerpt:
        "Everything you need to know about fast charging technology and how to safely use it with your devices.",
      date: "December 15, 2024",
      category: "Technology",
    },
  ];

  return (
    <div className="min-h-screen">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#222222" }}>
            Blog & News
          </h1>
          <p className="text-sm mb-8" style={{ color: "#666666" }}>
            Stay updated with the latest technology news, reviews, and tips
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
              >
                <div className="mb-3">
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "#ff9800",
                      color: "#ffffff",
                    }}
                  >
                    {post.category}
                  </span>
                </div>
                <h2
                  className="text-xl font-semibold mb-2 hover:underline"
                  style={{ color: "#222222" }}
                >
                  {post.title}
                </h2>
                <p className="text-sm mb-4" style={{ color: "#666666" }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs" style={{ color: "#666666" }}>
                    {post.date}
                  </p>
                  <button
                    className="text-sm font-medium hover:underline"
                    style={{ color: "#ff9800" }}
                  >
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div
              className="bg-orange-50 border-l-4 p-6 rounded inline-block"
              style={{ borderColor: "#ff9800" }}
            >
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#ff9800" }}
              >
                Coming Soon
              </h3>
              <p style={{ color: "#666666" }}>
                We are working on adding more content to our blog. Check back
                soon for new articles, reviews, and technology updates!
              </p>
            </div>
          </div>
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Gadget City BD Blog",
            description:
              "Latest technology news, product reviews, and buying guides from Gadget City BD",
            url: `${
              process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com"
            }/blog`,
            publisher: {
              "@type": "Organization",
              name: "Gadget City BD",
              logo: {
                "@type": "ImageObject",
                url: `${
                  process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com"
                }/logo.png`,
              },
            },
          }),
        }}
      />
    </div>
  );
}
