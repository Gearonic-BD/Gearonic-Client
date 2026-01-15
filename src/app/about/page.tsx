import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com";
const pageUrl = `${siteUrl}/about`;

export const metadata: Metadata = {
  title:
    "About Us - Gadget City BD | Your Trusted Electronics Store in Bangladesh",
  description:
    "Learn about Gadget City BD, your trusted destination for premium electronics and gadgets in Bangladesh. Quality products, competitive prices, and exceptional customer service since day one.",
  keywords: [
    "about gadget city bd",
    "electronics store bangladesh",
    "online electronics shop",
    "gadget city about",
    "electronics retailer bangladesh",
    "technology store dhaka",
  ].join(", "),
  authors: [{ name: "Gadget City BD" }],
  creator: "Gadget City BD",
  publisher: "Gadget City BD",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "About Us - Gadget City BD | Your Trusted Electronics Store",
    description:
      "Learn about Gadget City BD, your trusted destination for premium electronics and gadgets in Bangladesh.",
    url: pageUrl,
    siteName: "Gadget City BD",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Gadget City BD - About Us",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Gadget City BD",
    description:
      "Learn about Gadget City BD, your trusted destination for premium electronics and gadgets in Bangladesh.",
    images: ["/logo.png"],
  },
};

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#222222" }}>
            About Us
          </h1>
          <p className="text-sm mb-8" style={{ color: "#666666" }}>
            Learn more about Gadget City BD
          </p>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                Who We Are
              </h2>
              <p className="mb-4" style={{ color: "#666666" }}>
                Gadget City BD is your trusted destination for premium
                electronics and gadgets in Bangladesh. Founded with a vision to
                make cutting-edge technology accessible to everyone, we have
                grown to become one of the leading e-commerce platforms for
                electronics in the country.
              </p>
              <p className="mb-4" style={{ color: "#666666" }}>
                We specialize in a wide range of electronic products including
                smartphones, tablets, laptops, smartwatches, headphones,
                speakers, chargers, and many more tech accessories. Our
                commitment to quality, competitive prices, and exceptional
                customer service has earned us the trust of thousands of
                customers across Bangladesh.
              </p>
            </section>

            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                Our Mission
              </h2>
              <p className="mb-4" style={{ color: "#666666" }}>
                Our mission is to provide high-quality electronics and gadgets
                at competitive prices while delivering exceptional customer
                service. We strive to make technology accessible to everyone,
                whether you are a tech enthusiast, a student, a professional, or
                a business owner.
              </p>
              <p className="mb-4" style={{ color: "#666666" }}>
                We believe that technology should enhance lives, and we are
                committed to helping our customers find the perfect products
                that meet their needs and exceed their expectations.
              </p>
            </section>

            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                Our Values
              </h2>
              <div className="space-y-4">
                <div>
                  <h3
                    className="text-xl font-medium mb-3"
                    style={{ color: "#ff9800" }}
                  >
                    Quality First
                  </h3>
                  <p className="mb-4" style={{ color: "#666666" }}>
                    We source our products from authorized distributors and
                    reputable suppliers to ensure authenticity and quality.
                    Every product undergoes rigorous quality checks before it
                    reaches our customers.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-xl font-medium mb-3"
                    style={{ color: "#ff9800" }}
                  >
                    Customer Satisfaction
                  </h3>
                  <p className="mb-4" style={{ color: "#666666" }}>
                    Your satisfaction is our top priority. We go above and
                    beyond to ensure that every interaction with Gadget City BD
                    is positive, from browsing our website to receiving your
                    order and beyond.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-xl font-medium mb-3"
                    style={{ color: "#ff9800" }}
                  >
                    Transparency
                  </h3>
                  <p className="mb-4" style={{ color: "#666666" }}>
                    We believe in transparent pricing and honest communication.
                    No hidden fees, no surprises - just straightforward pricing
                    and clear policies.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-xl font-medium mb-3"
                    style={{ color: "#ff9800" }}
                  >
                    Innovation
                  </h3>
                  <p className="mb-4" style={{ color: "#666666" }}>
                    We stay ahead of the curve by continuously updating our
                    product catalog with the latest technology and innovations.
                    We keep our finger on the pulse of the tech industry to
                    bring you the best products available.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                What We Offer
              </h2>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>
                  Wide selection of authentic electronics and gadgets from
                  leading brands
                </li>
                <li>
                  Competitive prices with regular discounts and special offers
                </li>
                <li>Fast and reliable delivery throughout Bangladesh</li>
                <li>Secure payment options including cash on delivery</li>
                <li>Comprehensive warranty and after-sales support</li>
                <li>Expert customer service team ready to assist you</li>
                <li>Easy returns and exchanges within specified timeframes</li>
                <li>Genuine products with manufacturer warranty</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                Our Commitment
              </h2>
              <p className="mb-4" style={{ color: "#666666" }}>
                At Gadget City BD, we are committed to building lasting
                relationships with our customers. We understand that purchasing
                electronics is a significant investment, and we take that
                responsibility seriously.
              </p>
              <p className="mb-4" style={{ color: "#666666" }}>
                We promise to:
              </p>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>Provide only genuine and authentic products</li>
                <li>Offer competitive and transparent pricing</li>
                <li>Ensure fast and secure delivery</li>
                <li>Provide excellent customer support</li>
                <li>Honor all warranties and return policies</li>
                <li>
                  Continuously improve our services based on customer feedback
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <div
                className="bg-orange-50 border-l-4 p-6 rounded"
                style={{ borderColor: "#ff9800" }}
              >
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#ff9800" }}
                >
                  Contact Us
                </h3>
                <p className="mb-2" style={{ color: "#666666" }}>
                  Have questions or want to learn more about us? We would love
                  to hear from you!
                </p>
                <p className="mb-2" style={{ color: "#666666" }}>
                  Email: gadgetcitybangladesh@gmail.com
                </p>
                <p className="mb-2" style={{ color: "#666666" }}>
                  Phone: +880 1928-316192
                </p>
                <p className="mb-2" style={{ color: "#666666" }}>
                  Address: Shop 128, 68-69 Concept Tower, Greenroad, Dhaka-1205,
                  Bangladesh
                </p>
                <p style={{ color: "#666666" }}>
                  Business Hours: Saturday to Thursday, 9:00 AM - 6:00 PM
                  (GMT+6)
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Gadget City BD",
            url: process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com",
            logo: `${
              process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com"
            }/logo.png`,
            description:
              "Your trusted destination for premium electronics and gadgets in Bangladesh. Quality products, competitive prices, and exceptional service.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Shop 128, 68-69 Concept Tower",
              addressLocality: "Greenroad",
              addressRegion: "Dhaka",
              postalCode: "1205",
              addressCountry: "BD",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+880-1928-316192",
              contactType: "customer service",
              email: "gadgetcitybangladesh@gmail.com",
              areaServed: "BD",
              availableLanguage: ["en", "bn"],
            },
            sameAs: [
              "https://www.facebook.com/gadgetcitybangladesh/",
              "https://www.linkedin.com/company/gadgetcitybd",
              "https://www.instagram.com/gadgetcitybd",
            ],
          }),
        }}
      />
    </div>
  );
}
