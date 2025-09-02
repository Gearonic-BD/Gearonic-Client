"use client";

import { SuspenseLoading } from "@/utils/suspenseLoaders";

export default function Loading() {
  return <SuspenseLoading variant="page" message="Loading..." />;
}
