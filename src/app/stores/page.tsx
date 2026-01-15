import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com";
const pageUrl = `${siteUrl}/stores`;

export const metadata: Metadata = {
  title: "Store Locator - Gadget City BD | Find Our Physical Stores",
  description:
    "Find Gadget City BD physical stores in Dhaka, Bangladesh. Visit our showroom at Greenroad, Dhaka-1205. Shop online or visit us in-store for the best electronics and gadgets.",
  keywords: [
    "gadget city store location",
    "electronics store dhaka",
    "physical store bangladesh",
    "gadget city showroom",
    "store locator bangladesh",
    "electronics shop dhaka",
  ].join(", "),
  authors: [{ name: "Gadget City BD" }],
  creator: "Gadget City BD",
  publisher: "Gadget City BD",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Store Locator - Gadget City BD | Find Our Stores",
    description:
      "Find Gadget City BD physical stores in Dhaka, Bangladesh. Visit our showroom or shop online.",
    url: pageUrl,
    siteName: "Gadget City BD",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Gadget City BD - Store Locator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Store Locator - Gadget City BD",
    description: "Find Gadget City BD physical stores in Dhaka, Bangladesh.",
    images: ["/logo.png"],
  },
};

export default function StoreLocator() {
  const stores = [
    {
      id: 1,
      name: "Gadget City BD - Main Branch",
      address: "Shop 128, 68-69 Concept Tower, Greenroad, Dhaka-1205",
      phone: "+880 1928-316192",
      hours: "Saturday - Thursday: 9:00 AM - 6:00 PM",
      mapUrl: "https://maps.google.com",
    },
  ];

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#222222" }}>
            Store Locator
          </h1>
          <p className="text-sm mb-8" style={{ color: "#666666" }}>
            Visit our physical stores or shop online with fast delivery
          </p>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-6"
                style={{ color: "#222222" }}
              >
                Our Stores
              </h2>

              <div className="space-y-6">
                {stores.map((store) => (
                  <div
                    key={store.id}
                    className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
                  >
                    <h3
                      className="text-xl font-semibold mb-4"
                      style={{ color: "#222222" }}
                    >
                      {store.name}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 mr-3 mt-0.5"
                          style={{ color: "#ff9800" }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <div>
                          <p
                            className="text-sm font-medium mb-1"
                            style={{ color: "#222222" }}
                          >
                            Address
                          </p>
                          <p style={{ color: "#666666" }}>{store.address}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 mr-3 mt-0.5"
                          style={{ color: "#ff9800" }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <div>
                          <p
                            className="text-sm font-medium mb-1"
                            style={{ color: "#222222" }}
                          >
                            Phone
                          </p>
                          <a
                            href={`tel:${store.phone}`}
                            className="hover:underline"
                            style={{ color: "#666666" }}
                          >
                            {store.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 mr-3 mt-0.5"
                          style={{ color: "#ff9800" }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <p
                            className="text-sm font-medium mb-1"
                            style={{ color: "#222222" }}
                          >
                            Business Hours
                          </p>
                          <p style={{ color: "#666666" }}>{store.hours}</p>
                        </div>
                      </div>

                      <div className="pt-3">
                        <a
                          href={store.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium hover:underline"
                          style={{ color: "#ff9800" }}
                        >
                          View on Google Maps →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                Online Shopping
              </h2>
              <p className="mb-4" style={{ color: "#666666" }}>
                Can&apos;t visit our physical store? No problem! Shop online
                with us and enjoy:
              </p>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>Fast and reliable delivery throughout Bangladesh</li>
                <li>Secure payment options including cash on delivery</li>
                <li>Easy returns and exchanges</li>
                <li>24/7 online shopping convenience</li>
                <li>Access to our entire product catalog</li>
                <li>Special online-only deals and discounts</li>
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
                  Need Help Finding Us?
                </h3>
                <p className="mb-2" style={{ color: "#666666" }}>
                  If you need directions or have any questions about our store
                  locations, feel free to contact us:
                </p>
                <p className="mb-2" style={{ color: "#666666" }}>
                  Phone: +880 1928-316192
                </p>
                <p style={{ color: "#666666" }}>
                  Email: gadgetcitybangladesh@gmail.com
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
            "@type": "Store",
            name: "Gadget City BD - Main Branch",
            description:
              "Gadget City BD physical store located in Dhaka, Bangladesh",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Shop 128, 68-69 Concept Tower",
              addressLocality: "Greenroad",
              addressRegion: "Dhaka",
              postalCode: "1205",
              addressCountry: "BD",
            },
            telephone: "+880-1928-316192",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Saturday",
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                ],
                opens: "09:00",
                closes: "18:00",
              },
            ],
            geo: {
              "@type": "GeoCoordinates",
              latitude: "23.7505",
              longitude: "90.3857",
            },
          }),
        }}
      />
    </div>
  );
}
