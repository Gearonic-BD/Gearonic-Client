import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com";
const pageUrl = `${siteUrl}/contact`;

export const metadata: Metadata = {
  title: "Contact Us - Gadget City BD | Get in Touch with Our Team",
  description:
    "Contact Gadget City BD for any inquiries about products, orders, or customer service. Reach us via phone, email, or visit our store in Dhaka, Bangladesh. We're here to help!",
  keywords: [
    "contact gadget city bd",
    "customer service bangladesh",
    "electronics store contact",
    "gadget city customer support",
    "contact electronics shop",
    "support gadget city",
  ].join(", "),
  authors: [{ name: "Gadget City BD" }],
  creator: "Gadget City BD",
  publisher: "Gadget City BD",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Contact Us - Gadget City BD | Get in Touch",
    description:
      "Contact Gadget City BD for any inquiries about products, orders, or customer service. We're here to help!",
    url: pageUrl,
    siteName: "Gadget City BD",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Gadget City BD - Contact Us",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Gadget City BD",
    description:
      "Contact Gadget City BD for any inquiries about products, orders, or customer service.",
    images: ["/logo.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
