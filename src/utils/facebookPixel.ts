/**
 * Meta (Facebook) Pixel helpers for catalog & conversion tracking.
 * Safe to call from client; no-op when fbq is not loaded.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const PIXEL_ID = "882106527750301";
const CURRENCY = "BDT";

function safeFbq(...args: unknown[]) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq(...args);
}

/** Fire when a product page is viewed (for catalog/dynamic ads). */
export function trackViewContent(payload: {
  content_ids: string[];
  content_name: string;
  content_type?: "product";
  value?: number;
  currency?: string;
}) {
  safeFbq("track", "ViewContent", {
    content_ids: payload.content_ids,
    content_name: payload.content_name,
    content_type: payload.content_type ?? "product",
    value: payload.value,
    currency: payload.currency ?? CURRENCY,
  });
}

/** Fire when an item is added to cart. */
export function trackAddToCart(payload: {
  content_ids: string[];
  content_name: string;
  value: number;
  currency?: string;
  num_items?: number;
}) {
  safeFbq("track", "AddToCart", {
    content_ids: payload.content_ids,
    content_name: payload.content_name,
    value: payload.value,
    currency: payload.currency ?? CURRENCY,
    num_items: payload.num_items,
  });
}

/** Fire when checkout is started (e.g. user lands on checkout page). */
export function trackInitiateCheckout(payload: {
  content_ids?: string[];
  value: number;
  currency?: string;
  num_items?: number;
}) {
  safeFbq("track", "InitiateCheckout", {
    content_ids: payload.content_ids,
    value: payload.value,
    currency: payload.currency ?? CURRENCY,
    num_items: payload.num_items,
  });
}

/** Fire when a purchase is completed. */
export function trackPurchase(payload: {
  content_ids?: string[];
  value: number;
  currency?: string;
  order_id?: string;
  num_items?: number;
}) {
  safeFbq("track", "Purchase", {
    content_ids: payload.content_ids,
    value: payload.value,
    currency: payload.currency ?? CURRENCY,
    order_id: payload.order_id,
    num_items: payload.num_items,
  });
}
