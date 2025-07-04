'use client'

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto text-center px-4">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 select-none">404</h1>
          <div className="relative -mt-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              Page Not Found
            </h2>
            <p className="text-gray-600 text-lg">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Home size={20} />
            Go Home
          </Link>

          <div className="text-sm text-gray-500">or</div>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}
