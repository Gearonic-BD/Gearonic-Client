import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com";
const pageUrl = `${siteUrl}/faq`;

export const metadata: Metadata = {
  title: "FAQ - Gadget City BD | Frequently Asked Questions",
  description:
    "Find answers to common questions about shopping at Gadget City BD. Get information about orders, payments, delivery, returns, products, warranty, and more.",
  keywords: [
    "faq gadget city",
    "frequently asked questions",
    "help center bangladesh",
    "electronics faq",
    "shopping questions",
    "customer service faq",
  ].join(", "),
  authors: [{ name: "Gadget City BD" }],
  creator: "Gadget City BD",
  publisher: "Gadget City BD",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "FAQ - Gadget City BD | Frequently Asked Questions",
    description:
      "Find answers to common questions about shopping at Gadget City BD. Get information about orders, payments, delivery, and more.",
    url: pageUrl,
    siteName: "Gadget City BD",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Gadget City BD - FAQ",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - Gadget City BD",
    description:
      "Find answers to common questions about shopping at Gadget City BD.",
    images: ["/logo.png"],
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
