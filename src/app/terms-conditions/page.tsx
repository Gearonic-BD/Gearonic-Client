import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com";
const pageUrl = `${siteUrl}/terms-conditions`;

export const metadata: Metadata = {
  title: "Terms & Conditions - Gadget City BD | Terms of Service",
  description:
    "Read Gadget City BD's Terms and Conditions. Learn about our policies for orders, payments, shipping, returns, user conduct, and more. Updated January 2025.",
  keywords: [
    "terms and conditions",
    "terms of service",
    "gadget city terms",
    "electronics shop terms",
    "online shopping terms bangladesh",
    "user agreement",
  ].join(", "),
  authors: [{ name: "Gadget City BD" }],
  creator: "Gadget City BD",
  publisher: "Gadget City BD",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Terms & Conditions - Gadget City BD",
    description:
      "Read Gadget City BD's Terms and Conditions. Learn about our policies for orders, payments, shipping, and returns.",
    url: pageUrl,
    siteName: "Gadget City BD",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Gadget City BD - Terms & Conditions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions - Gadget City BD",
    description:
      "Read Gadget City BD's Terms and Conditions and learn about our policies.",
    images: ["/logo.png"],
  },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#222222" }}>
            Terms and Conditions
          </h1>
          <p className="text-sm mb-8" style={{ color: "#666666" }}>
            Last updated: January 2025
          </p>

          <div className="prose max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                1. Introduction and Acceptance
              </h2>
              <p className="mb-4" style={{ color: "#666666" }}>
                Welcome to Gadget City BD. These Terms and Conditions
                (&quot;Terms&quot;) govern your use of our website, mobile
                application, and services. By accessing or using our platform,
                you agree to be bound by these Terms. If you do not agree with
                any part of these Terms, you may not use our services.
              </p>
              <p className="mb-4" style={{ color: "#666666" }}>
                Gadget City BD is a registered business in Bangladesh, operating
                under the laws of the People&apos;s Republic of Bangladesh. Our
                services are primarily intended for users within Bangladesh.
              </p>
            </section>

            {/* Definitions */}
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                2. Definitions
              </h2>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>
                  <strong>&quot;Platform&quot;</strong> refers to our website,
                  mobile app, and related services
                </li>
                <li>
                  <strong>&quot;User&quot;</strong> refers to any person who
                  accesses or uses our Platform
                </li>
                <li>
                  <strong>&quot;Customer&quot;</strong> refers to users who make
                  purchases through our Platform
                </li>
                <li>
                  <strong>&quot;Products&quot;</strong> refers to electronics
                  and goods sold on our Platform
                </li>
                <li>
                  <strong>&quot;Seller&quot;</strong> refers to Gadget City BD
                  and authorized third-party vendors
                </li>
              </ul>
            </section>

            {/* Eligibility */}
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                3. Eligibility and Account Registration
              </h2>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                3.1 Age Requirements
              </h3>
              <p className="mb-4" style={{ color: "#666666" }}>
                You must be at least 18 years old to create an account and make
                purchases. Users under 18 may use our Platform only with
                parental or guardian supervision and consent.
              </p>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                3.2 Account Information
              </h3>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Keep your login credentials secure and confidential</li>
                <li>
                  Notify us immediately of any unauthorized account access
                </li>
                <li>
                  Accept responsibility for all activities under your account
                </li>
              </ul>
            </section>

            {/* Products and Services */}
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                4. Products and Services
              </h2>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                4.1 Product Information
              </h3>
              <p className="mb-4" style={{ color: "#666666" }}>
                We strive to provide accurate product descriptions, images, and
                specifications. However, we do not warrant that product
                descriptions or other content is error-free, complete, or
                current.
              </p>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                4.2 Availability and Pricing
              </h3>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>
                  Product availability is subject to change without notice
                </li>
                <li>
                  Prices are displayed in Bangladeshi Taka (BDT) and include
                  applicable taxes
                </li>
                <li>We reserve the right to modify prices at any time</li>
                <li>Price changes do not affect confirmed orders</li>
                <li>
                  Special offers and discounts are subject to terms and
                  conditions
                </li>
              </ul>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                4.3 Product Categories
              </h3>
              <p className="mb-4" style={{ color: "#666666" }}>
                We specialize in electronics including but not limited to:
              </p>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>Mobile phones and accessories</li>
                <li>Computers, laptops, and peripherals</li>
                <li>Home appliances and electronics</li>
                <li>Gaming devices and accessories</li>
                <li>Audio and video equipment</li>
                <li>Smart home devices and IoT products</li>
              </ul>
            </section>

            {/* Orders and Payment */}
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                5. Orders and Payment
              </h2>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                5.1 Order Process
              </h3>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>
                  Orders are subject to acceptance and product availability
                </li>
                <li>
                  We reserve the right to refuse or cancel orders at our
                  discretion
                </li>
                <li>
                  Order confirmation does not guarantee product availability
                </li>
                <li>We may require additional verification for large orders</li>
              </ul>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                5.2 Payment Methods
              </h3>
              <p className="mb-4" style={{ color: "#666666" }}>
                We accept the following payment methods:
              </p>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>Mobile Financial Services (bKash, Nagad, Rocket)</li>
                <li>
                  Credit and Debit Cards (Visa, MasterCard, American Express)
                </li>
                <li>Bank transfers and online banking</li>
                <li>
                  Cash on Delivery (COD) - subject to location and order value
                </li>
                <li>Digital wallets and other approved payment methods</li>
              </ul>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                5.3 Payment Terms
              </h3>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>
                  Payment is due at the time of order placement (except COD)
                </li>
                <li>
                  All transactions are processed in Bangladeshi Taka (BDT)
                </li>
                <li>Payment processing fees may apply for certain methods</li>
                <li>
                  Refunds will be processed through the original payment method
                </li>
              </ul>
            </section>

            {/* Shipping and Delivery */}
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                6. Shipping and Delivery
              </h2>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                6.1 Delivery Areas
              </h3>
              <p className="mb-4" style={{ color: "#666666" }}>
                We deliver throughout Bangladesh. Delivery times and charges
                vary by location:
              </p>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>Dhaka Metro: 1-2 business days</li>
                <li>Major cities: 2-4 business days</li>
                <li>Other areas: 3-7 business days</li>
                <li>Remote locations: 5-10 business days</li>
              </ul>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                6.2 Shipping Charges
              </h3>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>
                  Shipping charges are calculated based on weight, size, and
                  destination
                </li>
                <li>
                  Free shipping may be available for orders above certain
                  amounts
                </li>
                <li>Express delivery options available at additional cost</li>
                <li>Shipping charges are displayed at checkout</li>
              </ul>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                6.3 Delivery Terms
              </h3>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>Delivery times are estimates and not guaranteed</li>
                <li>You must provide accurate delivery information</li>
                <li>Someone must be available to receive the delivery</li>
                <li>We may require ID verification for high-value items</li>
                <li>Failed delivery attempts may result in return to sender</li>
              </ul>
            </section>

            {/* Returns and Refunds */}
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                7. Returns, Exchanges, and Refunds
              </h2>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                7.1 Return Policy
              </h3>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>
                  Returns accepted within 7 days of delivery for most items
                </li>
                <li>Items must be in original condition with all packaging</li>
                <li>Some items (software, consumables) are non-returnable</li>
                <li>
                  Return shipping costs may apply unless item is defective
                </li>
                <li>
                  Refunds processed within 7-14 business days after return
                  approval
                </li>
              </ul>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                7.2 Warranty and Defects
              </h3>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>Manufacturer warranties apply as specified</li>
                <li>
                  We provide additional warranty support for eligible products
                </li>
                <li>
                  Defective items can be returned or exchanged immediately
                </li>
                <li>Warranty claims require proof of purchase</li>
              </ul>
            </section>

            {/* User Conduct */}
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                8. User Conduct and Prohibited Activities
              </h2>
              <p className="mb-4" style={{ color: "#666666" }}>
                You agree not to engage in any of the following prohibited
                activities:
              </p>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing on intellectual property rights</li>
                <li>Transmitting harmful or malicious code</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Interfering with other users&apos; experience</li>
                <li>Providing false or misleading information</li>
                <li>Using our Platform for fraudulent activities</li>
                <li>
                  Reselling products for commercial purposes without
                  authorization
                </li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                9. Intellectual Property Rights
              </h2>
              <p className="mb-4" style={{ color: "#666666" }}>
                All content on our Platform, including text, graphics, logos,
                images, and software, is owned by Gadget City BD or our
                licensors and is protected by copyright, trademark, and other
                intellectual property laws.
              </p>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>
                  You may not reproduce, distribute, or create derivative works
                </li>
                <li>
                  Limited license granted for personal, non-commercial use
                </li>
                <li>Product images and descriptions are for reference only</li>
                <li>Unauthorized use may result in legal action</li>
              </ul>
            </section>

            {/* Privacy and Data Protection */}
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                10. Privacy and Data Protection
              </h2>
              <p className="mb-4" style={{ color: "#666666" }}>
                Your privacy is important to us. Our collection, use, and
                protection of your personal information is governed by our
                Privacy Policy, which is incorporated into these Terms by
                reference. By using our Platform, you consent to our data
                practices as described in the Privacy Policy.
              </p>
            </section>

            {/* Disclaimers and Limitations */}
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                11. Disclaimers and Limitations of Liability
              </h2>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                11.1 Service Disclaimers
              </h3>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>
                  Services provided &quot;as is&quot; without warranties of any
                  kind
                </li>
                <li>We do not guarantee uninterrupted or error-free service</li>
                <li>Product information may contain inaccuracies</li>
                <li>Third-party content and links are not endorsed by us</li>
              </ul>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                11.2 Limitation of Liability
              </h3>
              <p className="mb-4" style={{ color: "#666666" }}>
                To the maximum extent permitted by law, Gadget City BD shall not
                be liable for any indirect, incidental, special, consequential,
                or punitive damages, including but not limited to loss of
                profits, data, or business opportunities.
              </p>
            </section>

            {/* Force Majeure */}
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                12. Force Majeure
              </h2>
              <p className="mb-4" style={{ color: "#666666" }}>
                We shall not be liable for any failure or delay in performance
                due to circumstances beyond our reasonable control, including
                but not limited to natural disasters, government actions, labor
                disputes, internet outages, or other force majeure events.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                13. Governing Law and Dispute Resolution
              </h2>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                13.1 Applicable Law
              </h3>
              <p className="mb-4" style={{ color: "#666666" }}>
                These Terms are governed by the laws of Bangladesh. Any disputes
                shall be subject to the exclusive jurisdiction of the courts in
                Dhaka, Bangladesh.
              </p>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "#ff9800" }}
              >
                13.2 Dispute Resolution
              </h3>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>We encourage resolution through direct communication</li>
                <li>
                  Mediation may be pursued before formal legal proceedings
                </li>
                <li>Consumer rights under Bangladesh law remain protected</li>
                <li>
                  Class action lawsuits are waived where legally permissible
                </li>
              </ul>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                14. Termination
              </h2>
              <p className="mb-4" style={{ color: "#666666" }}>
                We may terminate or suspend your account and access to our
                Platform at any time, with or without cause or notice, for
                conduct that we believe violates these Terms or is harmful to
                other users, us, or third parties, or for any other reason.
              </p>
              <ul
                className="list-disc pl-6 mb-4 space-y-2"
                style={{ color: "#666666" }}
              >
                <li>You may terminate your account at any time</li>
                <li>
                  Termination does not affect pending orders or obligations
                </li>
                <li>Certain provisions survive termination</li>
                <li>We may retain information as required by law</li>
              </ul>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                15. Changes to Terms
              </h2>
              <p className="mb-4" style={{ color: "#666666" }}>
                We reserve the right to modify these Terms at any time. We will
                notify users of significant changes through email or prominent
                website notices. Continued use of our Platform after changes
                constitutes acceptance of the modified Terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "#222222" }}
              >
                16. Contact Information
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2" style={{ color: "#666666" }}>
                  <strong>Gadget City BD</strong>
                </p>
                <p className="mb-2" style={{ color: "#666666" }}>
                  Registered Office: House #123, Road #456, Dhanmondi,
                  Dhaka-1205, Bangladesh
                </p>
                <p className="mb-2" style={{ color: "#666666" }}>
                  Trade License: TRAD/DSCC/123456/2024
                </p>
                <p className="mb-2" style={{ color: "#666666" }}>
                  Email: gadgetcitybangladesh@gmail.com
                </p>
                <p className="mb-2" style={{ color: "#666666" }}>
                  Customer Service: +880-19092-61003
                </p>
                <p className="mb-2" style={{ color: "#666666" }}>
                  Business Hours: Saturday to Thursday, 9:00 AM - 6:00 PM
                  (GMT+6)
                </p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="mb-8">
              <div
                className="bg-orange-50 border-l-4 p-6 rounded"
                style={{ borderColor: "#ff9800" }}
              >
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#ff9800" }}
                >
                  Acknowledgment
                </h3>
                <p style={{ color: "#666666" }}>
                  By using Gadget City BD, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms and
                  Conditions. If you do not agree with these Terms, please
                  discontinue use of our Platform immediately.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
