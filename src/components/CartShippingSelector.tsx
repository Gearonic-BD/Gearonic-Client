import React from "react";

interface CartShippingSelectorProps {
  shipping: number;
  changeShipping: (val: number) => void;
  variant?: "desktop" | "mobile";
}

const CartShippingSelector: React.FC<CartShippingSelectorProps> = ({
  shipping,
  changeShipping,
  variant = "desktop",
}) => {
  if (variant === "mobile") {
    return (
      <div className="mb-3">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Choose Shipping Location
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex items-center justify-between cursor-pointer bg-gray-50 p-2 rounded-md border transition-all hover:bg-gray-100">
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="radio"
                  name="shipping"
                  value="60"
                  checked={shipping === 60}
                  onChange={() => changeShipping(60)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all ${
                    shipping === 60
                      ? "border-info bg-info"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {shipping === 60 && (
                    <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-800">Inside Dhaka</span>
            </div>
            <span className="text-sm font-medium">৳60</span>
          </label>
          <label className="flex items-center justify-between cursor-pointer bg-gray-50 p-2 rounded-md border transition-all hover:bg-gray-100">
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="radio"
                  name="shipping"
                  value="120"
                  checked={shipping === 120}
                  onChange={() => changeShipping(120)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all ${
                    shipping === 120
                      ? "border-info bg-info"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {shipping === 120 && (
                    <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-800">Outside Dhaka</span>
            </div>
            <span className="text-sm font-medium">৳120</span>
          </label>
        </div>
      </div>
    );
  }
  // desktop
  return (
    <div className="space-y-1 mt-4">
      <h3 className="text-sm text-gray-600">Choose Shipping Location</h3>
      <div className="grid gap-1">
        <label className="flex items-center justify-between cursor-pointer transition-all">
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="radio"
                name="shipping"
                value="60"
                checked={shipping === 60}
                onChange={() => changeShipping(60)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  shipping === 60
                    ? "border-info bg-info"
                    : "border-gray-300 bg-white"
                }`}
              >
                {shipping === 60 && (
                  <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-800">Inside Dhaka</span>
            </div>
          </div>
          <span className="text-sm font-medium">৳60</span>
        </label>
        <label className="flex items-center justify-between transition-all">
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="radio"
                name="shipping"
                value="120"
                checked={shipping === 120}
                onChange={() => changeShipping(120)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  shipping === 120
                    ? "border-info bg-info"
                    : "border-gray-300 bg-white"
                }`}
              >
                {shipping === 120 && (
                  <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-800">Outside Dhaka</span>
            </div>
          </div>
          <span className="text-sm font-medium">৳120</span>
        </label>
      </div>
    </div>
  );
};

export default CartShippingSelector;
