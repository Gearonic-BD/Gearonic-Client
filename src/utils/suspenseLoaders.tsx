import React from "react";

// Main Suspense Loading Component
export const SuspenseLoading = ({
  message = "Loading...",
  variant = "default",
  className = "",
}) => {
  const variants: Record<string, { container: string; message: string }> = {
    default: {
      container: "flex items-center justify-center min-h-[200px] w-full",
      message: "Loading...",
    },
    page: {
      container:
        "flex items-center justify-center min-h-screen w-full bg-gray-50",
      message: "Loading page...",
    },
    card: {
      container:
        "flex items-center justify-center p-8 bg-white rounded-lg shadow-sm border",
      message: "Loading content...",
    },
    inline: {
      container: "flex items-center justify-center py-4 w-full",
      message: "Loading...",
    },
    minimal: {
      container: "flex items-center justify-center p-2",
      message: "",
    },
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <div className={`${currentVariant.container} ${className}`}>
      <div className="flex flex-col items-center space-y-3">
        {/* Main Spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div
            className="w-16 h-16 rounded-full border-3 border-gray-200 border-t-3 animate-spin"
            style={{
              borderTopColor: "#ff9800",
              borderWidth: "3px",
              animation: "spin 1s linear infinite",
            }}
          />

          {/* Inner pulse */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-pulse"
            style={{
              backgroundColor: "#ff9800",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </div>

        {/* Loading message */}
        {(message || currentVariant.message) && (
          <p className="text-sm font-medium text-gray-600 animate-pulse">
            {message || currentVariant.message}
          </p>
        )}

        {/* Bouncing dots */}
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full animate-bounce"
              style={{
                backgroundColor: "#ff9800",
                animationDelay: `${i * 0.1}s`,
                animationDuration: "0.6s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Product Loading Skeleton (for ecommerce)
export const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-lg h-48 w-full mb-4"></div>
    <div className="space-y-2">
      <div className="bg-gray-200 rounded h-4 w-3/4"></div>
      <div className="bg-gray-200 rounded h-4 w-1/2"></div>
      <div
        className="bg-orange-200 rounded h-6 w-20 mt-3"
        style={{ backgroundColor: "rgba(255, 152, 0, 0.2)" }}
      ></div>
    </div>
  </div>
);

// Cart Loading Skeleton
export const CartSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {[1, 2, 3].map((item) => (
      <div key={item} className="flex space-x-4 p-4 border rounded-lg">
        <div className="bg-gray-200 rounded h-16 w-16"></div>
        <div className="flex-1 space-y-2">
          <div className="bg-gray-200 rounded h-4 w-3/4"></div>
          <div className="bg-gray-200 rounded h-4 w-1/2"></div>
          <div
            className="bg-orange-200 rounded h-4 w-16"
            style={{ backgroundColor: "rgba(255, 152, 0, 0.2)" }}
          ></div>
        </div>
      </div>
    ))}
  </div>
);

// Demo Component showing different Suspense scenarios
const SuspenseDemo = () => {
  const [showProducts, setShowProducts] = React.useState(false);
  const [showCart, setShowCart] = React.useState(false);
  const [showPage, setShowPage] = React.useState(false);

  // Simulated async components
  const AsyncProducts = React.lazy(
    () =>
      new Promise<{ default: React.FC }>((resolve) =>
        setTimeout(
          () =>
            resolve({
              default: () => (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border rounded-lg p-4 shadow-sm">
                      <div className="bg-gray-100 rounded h-32 mb-3"></div>
                      <h3 className="font-semibold">Product {i}</h3>
                      <p className="text-gray-600">$29.99</p>
                      <button
                        className="mt-2 px-4 py-2 text-white rounded"
                        style={{ backgroundColor: "#ff9800" }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              ),
            }),
          2000
        )
      )
  );

  const AsyncCart = React.lazy(
    () =>
      new Promise<{ default: React.FC }>((resolve) =>
        setTimeout(
          () =>
            resolve({
              default: () => (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <span>Item {i}</span>
                        <span
                          className="font-semibold"
                          style={{ color: "#ff9800" }}
                        >
                          $29.99
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between font-bold">
                      <span>Total: $59.98</span>
                    </div>
                  </div>
                </div>
              ),
            }),
          1500
        )
      )
  );

  const AsyncPage = React.lazy(
    () =>
      new Promise<{ default: React.FC }>((resolve) =>
        setTimeout(
          () =>
            resolve({
              default: () => (
                <div className="bg-white rounded-lg shadow p-8">
                  <h1 className="text-2xl font-bold mb-4">
                    Welcome to Our Store
                  </h1>
                  <p className="text-gray-600">
                    This page loaded asynchronously with Suspense!
                  </p>
                </div>
              ),
            }),
          3000
        )
      )
  );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Suspense Loading Components
        </h1>
        <p className="text-gray-600 mb-8">
          React Suspense fallback components for your Next.js ecommerce app
        </p>
      </div>

      {/* Demo Controls */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Try Different Suspense Scenarios
        </h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setShowProducts(!showProducts)}
            className="px-6 py-2 text-white rounded-lg shadow hover:opacity-90"
            style={{ backgroundColor: "#ff9800" }}
          >
            {showProducts ? "Hide" : "Load"} Products
          </button>
          <button
            onClick={() => setShowCart(!showCart)}
            className="px-6 py-2 text-white rounded-lg shadow hover:opacity-90"
            style={{ backgroundColor: "#ffc107" }}
          >
            {showCart ? "Hide" : "Load"} Cart
          </button>
          <button
            onClick={() => setShowPage(!showPage)}
            className="px-6 py-2 text-white rounded-lg shadow hover:opacity-90"
            style={{ backgroundColor: "#f44336" }}
          >
            {showPage ? "Hide" : "Load"} Full Page
          </button>
        </div>
      </div>

      {/* Loading Variants Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Default Loading</h3>
          <SuspenseLoading />
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Card Loading</h3>
          <SuspenseLoading variant="card" message="Loading products..." />
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Inline Loading</h3>
          <SuspenseLoading variant="inline" />
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Minimal Loading</h3>
          <SuspenseLoading variant="minimal" />
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Product Skeleton</h3>
          <ProductSkeleton />
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Cart Skeleton</h3>
          <CartSkeleton />
        </div>
      </div>

      {/* Usage Examples */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>
        <div className="space-y-4 text-sm bg-gray-800 text-green-400 p-4 rounded font-mono overflow-x-auto">
          <div>{"// Basic Suspense boundary"}</div>
          <div>{"<Suspense fallback={<SuspenseLoading />}>"}</div>
          <div>{"  <AsyncComponent />"}</div>
          <div>{"</Suspense>"}</div>

          <div className="mt-4">{"// Page-level loading"}</div>
          <div>
            {
              '<Suspense fallback={<SuspenseLoading variant="page" message="Loading page..." />}>'
            }
          </div>
          <div>{"  <PageComponent />"}</div>
          <div>{"</Suspense>"}</div>

          <div className="mt-4">{"// Product grid with skeleton"}</div>
          <div>{"<Suspense fallback={<ProductSkeleton />}>"}</div>
          <div>{"  <ProductGrid />"}</div>
          <div>{"</Suspense>"}</div>
        </div>
      </div>

      {/* Live Suspense Demos */}
      {showProducts && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Products (Suspense Demo)
          </h2>
          <React.Suspense
            fallback={
              <SuspenseLoading variant="card" message="Loading products..." />
            }
          >
            <AsyncProducts />
          </React.Suspense>
        </div>
      )}

      {showCart && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Cart (Suspense Demo)</h2>
          <React.Suspense fallback={<CartSkeleton />}>
            <AsyncCart />
          </React.Suspense>
        </div>
      )}

      {showPage && (
        <React.Suspense
          fallback={
            <SuspenseLoading
              variant="page"
              message="Loading your shopping experience..."
            />
          }
        >
          <AsyncPage />
        </React.Suspense>
      )}

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
      `}</style>
    </div>
  );
};

export default SuspenseDemo;
