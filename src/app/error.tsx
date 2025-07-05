"use client";

type ErrorComponentProps = {
  error: Error & { digest?: string }; 
  reset: () => void; 
};

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from "lucide-react";

export default function Error({ error, reset }: ErrorComponentProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Error boundary caught an error:", error);
  }, [error]);

  const getErrorInfo = () => {
    if (error?.digest) {
      return {
        title: "Server Error",
        message: "Something went wrong on our end. Please try again later.",
        code: "500",
      };
    }

    if (error?.message?.includes("fetch")) {
      return {
        title: "Network Error",
        message:
          "Unable to connect to our servers. Please check your internet connection.",
        code: "NET",
      };
    }

    return {
      title: "Something went wrong",
      message: "An unexpected error occurred. Please try refreshing the page.",
      code: "ERR",
    };
  };

  const errorInfo = getErrorInfo();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto text-center px-4">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>

          {/* Error Code */}
          <div className="text-6xl font-bold text-gray-200 mb-2">
            {errorInfo.code}
          </div>

          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            {errorInfo.title}
          </h1>

          <p className="text-gray-600 text-lg mb-6">{errorInfo.message}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors w-full justify-center"
          >
            <RefreshCw size={20} />
            Try Again
          </button>

          <div className="flex gap-3">
            <Link
              href="/"
              className="flex-1 inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors justify-center"
            >
              <Home size={18} />
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex-1 inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors justify-center"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>

        {/* Additional Help */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            If this problem persists, please contact support
          </p>
        </div>
      </div>
    </div>
  );
}
