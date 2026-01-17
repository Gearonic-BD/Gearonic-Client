/**
 * Optimizes ImageKit image URLs by adding transformation parameters
 * @param url - The image URL (from database)
 * @param width - Optional width for the image (default: 800)
 * @returns Optimized URL with ImageKit transformation parameters, or original URL if not an ImageKit URL
 */
export function optimizeImageKitUrl(
  url: string | null | undefined,
  width: number = 800
): string {
  if (!url) {
    return "/placeholder.svg";
  }

  // Check if it's an ImageKit URL
  if (!url.includes("ik.imagekit.io")) {
    return url;
  }

  // Remove existing query parameters if any
  const [baseUrl, existingQuery] = url.split("?");

  // Build transformation parameters
  const transformation = `tr=w-${width},f-auto,q-auto`;

  // Combine base URL with transformation
  // If there were existing query parameters, append with &, otherwise use ?
  if (existingQuery) {
    return `${baseUrl}?${transformation}&${existingQuery}`;
  }

  return `${baseUrl}?${transformation}`;
}
