"use client"; // This is a Client Component

import { useEffect } from "react";
import Link from "next/link"; // Import Link for client-side navigation

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log the error to an error reporting service
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Container for the content, centered and styled */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 md:p-12 text-center max-w-lg w-full">
        {/* Error icon or prominent text */}
        <div className="text-6xl md:text-8xl text-red-500 dark:text-red-400 mb-4">
          &#9888; {/* Unicode warning sign */}
        </div>
        {/* Main error message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Something Went Wrong!
        </h1>
        {/* Explanatory text */}
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          We are sorry, but an unexpected error occurred. Please try again.
        </p>
        {/* Optional: Display error details for debugging (remove in production) */}
        {/* <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Error details: {error.message}
        </p> */}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:scale-105"
            onClick={
             
              () => reset()
            }
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
