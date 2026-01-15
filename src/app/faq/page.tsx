"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "How do I place an order?",
      answer:
        "Placing an order is easy! Simply browse our products, add items to your cart, proceed to checkout, enter your shipping and payment details, and confirm your order. You'll receive an order confirmation email once your order is placed successfully.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including Mobile Financial Services (bKash, Nagad, Rocket), Credit and Debit Cards (Visa, MasterCard, American Express), Bank transfers, Cash on Delivery (COD - subject to location and order value), and Digital wallets.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery times vary by location: Dhaka Metro (1-2 business days), Major cities (2-4 business days), Other areas (3-7 business days), and Remote locations (5-10 business days). Delivery times are estimates and not guaranteed.",
    },
    {
      question: "Is cash on delivery available?",
      answer:
        "Yes, we offer Cash on Delivery (COD) service for most areas in Bangladesh, subject to location and order value. COD availability and terms will be shown during checkout.",
    },
    {
      question: "What is your return policy?",
      answer:
        "You can return most items within 7 days of delivery for a full refund or exchange, provided the items are in original, unopened packaging with all seals intact. Items must include all original accessories and documentation. Some items like software, consumables, and personalized products are non-returnable.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order is shipped, you'll receive a tracking number via email and SMS. You can use this tracking number on our website or the courier service's website to track your order's delivery status in real-time.",
    },
    {
      question: "Are the products genuine and authentic?",
      answer:
        "Yes, absolutely! We source all our products from authorized distributors and reputable suppliers to ensure authenticity and quality. Every product is genuine and comes with manufacturer warranty where applicable.",
    },
    {
      question: "Do you offer warranty on products?",
      answer:
        "Yes, most products come with manufacturer warranty. The warranty period and terms vary by product and manufacturer. Warranty details are mentioned on each product page. We also provide additional warranty support for eligible products.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "You can cancel your order before it is processed for shipping. Once an order has been shipped, it cannot be cancelled, but you can return it according to our returns policy. To cancel an order, please contact our customer service team immediately with your order number.",
    },
    {
      question: "What if I receive a damaged or wrong item?",
      answer:
        "If you receive a damaged item or wrong item due to our error, please contact us immediately within 24 hours of delivery. We will arrange for a free return pickup and send you the correct item or provide a full refund. Please take photos of the damaged item for our records.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Currently, we only ship within Bangladesh. We are working on expanding our services to include international shipping in the future. Please check our shipping policy for updates.",
    },
    {
      question: "How can I contact customer service?",
      answer:
        "You can reach our customer service team via Email: gadgetcitybangladesh@gmail.com, Phone: +880 1928-316192, or through the contact form on our website. Our business hours are Saturday to Thursday, 9:00 AM - 6:00 PM (GMT+6).",
    },
    {
      question: "Do you have physical stores?",
      answer:
        "Yes, we have a physical store located at Shop 128, 68-69 Concept Tower, Greenroad, Dhaka-1205, Bangladesh. You can visit our store or shop online with fast delivery. Check our Store Locator page for more details.",
    },
    {
      question: "Are there any additional charges or hidden fees?",
      answer:
        "No, we believe in transparent pricing. The price displayed on our website is the final price you pay (excluding delivery charges if applicable). Delivery charges are clearly shown at checkout. There are no hidden fees or additional charges.",
    },
    {
      question: "How do I update my account information?",
      answer:
        "You can update your account information by logging into your account and going to the Profile section. You can update your name, email, phone number, address, and other personal information at any time.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#222222" }}>
            Frequently Asked Questions
          </h1>
          <p className="text-sm mb-8" style={{ color: "#666666" }}>
            Find answers to common questions about shopping with us
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  style={{ color: "#222222" }}
                >
                  <span className="font-semibold pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    style={{ color: "#ff9800" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p style={{ color: "#666666" }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div
              className="bg-orange-50 border-l-4 p-6 rounded"
              style={{ borderColor: "#ff9800" }}
            >
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#ff9800" }}
              >
                Still Have Questions?
              </h3>
              <p className="mb-2" style={{ color: "#666666" }}>
                Can&apos;t find the answer you&apos;re looking for? Our customer
                service team is here to help!
              </p>
              <p className="mb-2" style={{ color: "#666666" }}>
                Email: gadgetcitybangladesh@gmail.com
              </p>
              <p className="mb-2" style={{ color: "#666666" }}>
                Phone: +880 1928-316192
              </p>
              <p style={{ color: "#666666" }}>
                Business Hours: Saturday to Thursday, 9:00 AM - 6:00 PM (GMT+6)
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
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How do I place an order?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Placing an order is easy! Simply browse our products, add items to your cart, proceed to checkout, enter your shipping and payment details, and confirm your order. You'll receive an order confirmation email once your order is placed successfully.",
                },
              },
              {
                "@type": "Question",
                name: "What payment methods do you accept?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We accept various payment methods including Mobile Financial Services (bKash, Nagad, Rocket), Credit and Debit Cards (Visa, MasterCard, American Express), Bank transfers, Cash on Delivery (COD - subject to location and order value), and Digital wallets.",
                },
              },
              {
                "@type": "Question",
                name: "What is your return policy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can return most items within 7 days of delivery for a full refund or exchange, provided the items are in original, unopened packaging with all seals intact. Items must include all original accessories and documentation. Some items like software, consumables, and personalized products are non-returnable.",
                },
              },
              {
                "@type": "Question",
                name: "Are the products genuine and authentic?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, absolutely! We source all our products from authorized distributors and reputable suppliers to ensure authenticity and quality. Every product is genuine and comes with manufacturer warranty where applicable.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
