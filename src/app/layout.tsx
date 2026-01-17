import type { Metadata } from "next";
import { Roboto, Noto_Sans_Bengali } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import CartFetcher from "@/components/CartFetcher";
import { optimizeImageKitUrl } from "@/utils/optimizeImageKit";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  preload: true,
});

const notoSansBengali = Noto_Sans_Bengali({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["bengali"],
  display: "swap",
  variable: "--font-noto-sans-bengali",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetcitybd.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Gadget City BD - Largest Electronics E-commerce Platform in Bangladesh",
    template: "%s | Gadget City BD",
  },
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
  ],
  authors: [{ name: "Gadget City BD" }],
  creator: "Gadget City BD",
  publisher: "Gadget City BD",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Gadget City BD",
    title:
      "Gadget City BD - Largest Electronics E-commerce Platform in Bangladesh",
    description:
      "Buy authentic electronics, smartphones, laptops, smartwatches, headphones, and tech accessories in Bangladesh. Best prices, fast delivery, genuine products with warranty.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Gadget City BD - Electronics Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gadget City BD - Largest Electronics E-commerce Platform",
    description:
      "Buy authentic electronics, smartphones, laptops, and tech accessories in Bangladesh. Best prices, fast delivery, genuine products.",
    images: ["/logo.png"],
    creator: "@gadgetcitybd",
    site: "@gadgetcitybd",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/fav.svg",
    apple: "/fav.svg",
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

// Fetch first banner for LCP preload (only on homepage)
async function getFirstBanner() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/banners`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      return null;
    }

    const banners = await response.json();
    if (banners && banners.length > 0) {
      // Get the first banner (main slides are all except last 2)
      const mainSlides = banners.slice(0, -2);
      if (mainSlides.length > 0) {
        return mainSlides[0].imageUrl;
      }
    }
    return null;
  } catch (error) {
    // Silently fail - preload is an optimization, not critical
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch first banner for LCP preload
  const firstBannerUrl = await getFirstBanner();
  const lcpImageUrl = firstBannerUrl
    ? optimizeImageKitUrl(firstBannerUrl, 800)
    : null;
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gadget City BD",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Gadget City BD is the largest e-commerce platform for electronics in Bangladesh. We offer authentic electronics, smartphones, laptops, smartwatches, headphones, and tech accessories at competitive prices.",
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
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gadget City BD",
    url: siteUrl,
    description:
      "The largest e-commerce platform for electronics in Bangladesh. Buy authentic electronics, smartphones, laptops, and tech accessories online.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="en"
      className={`${roboto.variable} ${notoSansBengali.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.gadgetcitybd.com" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
        <link rel="dns-prefetch" href="https://vinetanextjs.vercel.app" />
        {lcpImageUrl && (
          <link
            rel="preload"
            as="image"
            href={lcpImageUrl}
            fetchPriority="high"
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Toaster />
        <CartFetcher />
        <Footer />
        <BottomNavbar />
      </body>
    </html>
  );
}
