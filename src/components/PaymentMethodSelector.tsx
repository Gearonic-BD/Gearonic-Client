import React from "react";

interface PaymentMethod {
  id: string;
  name: string;
  subtitle: string;
  enabled: boolean;
  color: string;
  image: string;
}

interface PaymentMethodSelectorProps {
  paymentMethods: PaymentMethod[];
  selectedMethod: string;
  onSelect: (methodId: string) => void;
  renderDetails?: (methodId: string) => React.ReactNode;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethods,
  selectedMethod,
  onSelect,
  renderDetails,
}) => {
  return (
    <div className="space-y-2 xs:space-y-0 xs:grid xs:grid-cols-3 xs:gap-4">
      {paymentMethods.map((method) => (
        <div key={method.id} className="space-y-2 h-full">
          <button
            onClick={() => onSelect(method.id)}
            className={`relative p-3 sm:p-4 gap-4 h-full xs:gap-0 rounded-sm cursor-pointer flex flex-row xs:flex-col items-center justify-start xs:justify-center border transition-all duration-200 text-center w-full
              ${
                selectedMethod === method.id
                  ? "border-primary bg-primary/10"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }
            `}
          >
            <div className="w-16 rounded-sm mx-auto mb-1 flex items-center justify-center">
              <img src={method.image} alt="" className="w-full rounded-sm" />
            </div>
            <div className="text-start xs:text-center flex-1">
              <div className="text-sb font-medium mb-1 text-gray-900">
                {method.name}
              </div>
              <div className="text-xs text-gray-600">{method.subtitle}</div>
            </div>
            {selectedMethod === method.id && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </button>
          {/* Show details below the selected method for xs screens only */}
          <div>
            {selectedMethod === method.id && renderDetails && (
              <div className="xs:hidden">{renderDetails(method.id)}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethodSelector;
