"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/utils/facebookPixel";
import type { Product } from "@/types/types";

interface MetaPixelViewContentProps {
  product: Product;
}

/** Fires Meta Pixel ViewContent when product page is viewed. Renders nothing. */
export default function MetaPixelViewContent({ product }: MetaPixelViewContentProps) {
  useEffect(() => {
    const value = product.discountPrice ?? product.originalPrice;
    trackViewContent({
      content_ids: [product.id],
      content_name: product.title,
      content_type: "product",
      value,
      currency: "BDT",
    });
  }, [product.id, product.title, product.discountPrice, product.originalPrice]);

  return null;
}
