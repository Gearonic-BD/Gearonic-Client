import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com";
const pageUrl = `${siteUrl}/returns`;

export const metadata: Metadata = {
  title: "Returns Policy - Gadget City BD | Easy Returns & Refunds",
  description:
    "Learn about Gadget City BD's returns policy. Return products within 7 days of delivery for full refund or exchange. Easy returns process, genuine products guaranteed.",
  keywords: [
    "returns policy bangladesh",
    "return electronics",
    "refund policy gadget city",
    "exchange policy",
    "return items bangladesh",
    "electronics return policy",
  ].join(", "),
  authors: [{ name: "Gadget City BD" }],
  creator: "Gadget City BD",
  publisher: "Gadget City BD",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Returns Policy - Gadget City BD | Easy Returns & Refunds",
    description:
      "Learn about Gadget City BD's returns policy. Return products within 7 days for full refund or exchange.",
    url: pageUrl,
    siteName: "Gadget City BD",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Gadget City BD - Returns Policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Returns Policy - Gadget City BD",
    description:
      "Learn about Gadget City BD's returns policy. Easy returns within 7 days.",
    images: ["/logo.png"],
  },
};

export default function ReturnsPolicy() {
  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#222222" }}>
            Returns Policy
          </h1>
          <p className="text-sm mb-8" style={{ color: "#666666" }}>
            Last updated: January 2025
          </p>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                1. Return Eligibility
              </h2>
              <p className="mb-4" style={{ color: "#666666" }}>
                At Gadget City BD, we want you to be completely satisfied with
                your purchase. You may return most items within 7 days of
                delivery for a full refund or exchange, subject to the
                conditions outlined below.
              </p>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                Items Eligible for Return
              </h3>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>
                  Items in original, unopened packaging with all seals intact
                </li>
                <li>Items that are defective or damaged upon delivery</li>
                <li>Items that differ from the description on our website</li>
                <li>Wrong items delivered due to our error</li>
                <li>
                  Items with all original accessories and documentation included
                </li>
              </ul>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                Items NOT Eligible for Return
              </h3>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>
                  Software, digital downloads, or activated digital products
                </li>
                <li>Consumable items such as batteries (unless defective)</li>
                <li>
                  Items that have been used, damaged, or modified by the
                  customer
                </li>
                <li>Items without original packaging or missing accessories</li>
                <li>Personalized or customized products</li>
                <li>Items returned after the 7-day return period</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                2. Return Process
              </h2>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                Step 1: Contact Us
              </h3>
              <p className="mb-4" style={{ color: "#666666" }}>
                To initiate a return, please contact our customer service team
                within 7 days of receiving your order. You can reach us via:
              </p>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>Email: gadgetcitybangladesh@gmail.com</li>
                <li>Phone: +880 1928-316192</li>
                <li>Through your account order page</li>
              </ul>
              <p className="mb-4" style={{ color: "#666666" }}>
                Please provide your order number and reason for return when
                contacting us.
              </p>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                Step 2: Return Authorization
              </h3>
              <p className="mb-4" style={{ color: "#666666" }}>
                Once we review your return request, we will issue a Return
                Authorization (RA) number and provide you with detailed return
                instructions. Please do not return items without an RA number,
                as this may delay the processing of your return.
              </p>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                Step 3: Package the Item
              </h3>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>Pack the item securely in its original packaging</li>
                <li>
                  Include all original accessories, documentation, and free
                  gifts
                </li>
                <li>
                  Write the RA number clearly on the outside of the package
                </li>
                <li>Include a copy of your order confirmation or invoice</li>
              </ul>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                Step 4: Return Shipping
              </h3>
              <p className="mb-4" style={{ color: "#666666" }}>
                For defective items or items delivered due to our error, we will
                arrange for free return pickup. For other returns, return
                shipping costs may apply and will be deducted from your refund,
                unless you choose to pay for return shipping upfront.
              </p>
            </section>

            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                3. Refunds
              </h2>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                Refund Processing Time
              </h3>
              <p className="mb-4" style={{ color: "#666666" }}>
                Once we receive and inspect your returned item, we will process
                your refund within 7-14 business days. You will receive a
                confirmation email once the refund has been processed.
              </p>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                Refund Method
              </h3>
              <p className="mb-4" style={{ color: "#666666" }}>
                Refunds will be issued to the original payment method used for
                the purchase. Please note:
              </p>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>
                  Credit/Debit card refunds may take 5-10 business days to
                  appear on your statement
                </li>
                <li>
                  Mobile payment (bKash, Nagad, Rocket) refunds are typically
                  processed within 2-3 business days
                </li>
                <li>
                  Cash on Delivery (COD) refunds will be processed via bank
                  transfer or mobile payment
                </li>
              </ul>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                Partial Refunds
              </h3>
              <p className="mb-4" style={{ color: "#666666" }}>
                In certain circumstances, we may issue partial refunds:
              </p>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>If items are returned in used or damaged condition</li>
                <li>If original packaging or accessories are missing</li>
                <li>Return shipping costs (for non-defective returns)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                4. Exchanges
              </h2>
              <p className="mb-4" style={{ color: "#666666" }}>
                We are happy to exchange items for a different size, color, or
                model, subject to availability. Exchanges follow the same
                process as returns. If the new item is of higher value, you will
                need to pay the difference. If it is of lower value, we will
                refund the difference.
              </p>
            </section>

            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                5. Warranty Claims
              </h2>
              <p className="mb-4" style={{ color: "#666666" }}>
                If your item is covered by manufacturer warranty and becomes
                defective after the return period, please contact us with your
                order details and a description of the issue. We will assist you
                in processing your warranty claim with the manufacturer.
              </p>
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
                  Questions About Returns?
                </h3>
                <p className="mb-2" style={{ color: "#666666" }}>
                  If you have any questions about our returns policy or need
                  assistance with a return, please contact us:
                </p>
                <p className="mb-2" style={{ color: "#666666" }}>
                  Email: gadgetcitybangladesh@gmail.com
                </p>
                <p className="mb-2" style={{ color: "#666666" }}>
                  Phone: +880 1928-316192
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
            "@type": "WebPage",
            name: "Returns Policy - Gadget City BD",
            description:
              "Comprehensive returns policy for Gadget City BD. Learn about return eligibility, process, refunds, and exchanges.",
            url: `${
              process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com"
            }/returns`,
            mainEntity: {
              "@type": "MerchantReturnPolicy",
              applicableCountry: "BD",
              returnPolicyCategory:
                "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 7,
              returnMethod: "https://schema.org/ReturnByMail",
              returnFees: "https://schema.org/FreeReturn",
            },
          }),
        }}
      />
    </div>
  );
}
