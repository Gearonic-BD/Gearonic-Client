import { AlertCircle } from "lucide-react";
import React from "react";

interface CartVoucherInputProps {
  voucherCode: string;
  setVoucherCode: (code: string) => void;
  error: string;
  setError: (msg: string) => void;
  onApply: () => void;
  className?: string;
}

const CartVoucherInput: React.FC<CartVoucherInputProps> = ({
  voucherCode,
  setVoucherCode,
  error,
  setError,
  onApply,
  className,
}) => (
  <div className={className}>
    <div className="flex">
      <div className="flex-1">
        <input
          type="text"
          value={voucherCode}
          onChange={(e) => {
            setVoucherCode(e.target.value.toUpperCase());
            setError("");
          }}
          placeholder="Enter voucher code"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-sm focus:outline-none focus:ring-2 focus:ring-info focus:border-transparent"
        />
      </div>
      <button
        onClick={onApply}
        className="px-2 xs:px-6 py-2 text-sm bg-info text-white cursor-pointer rounded-r-sm hover:bg-info/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
      >
        Apply
      </button>
    </div>
    {error && (
      <div className="flex items-center mt-2 gap-2 text-red-600 text-sm bg-red-50 p-2 rounded-md">
        <AlertCircle size={14} />
        <span>{error}</span>
      </div>
    )}
  </div>
);

export default CartVoucherInput;
