import { AlertCircle, CheckCircle2, Loader2, X } from "lucide-react";
import React from "react";

interface CartVoucherInputProps {
  voucherCode: string;
  setVoucherCode: (code: string) => void;
  error: string;
  setError: (msg: string) => void;
  onApply: () => void;
  /** When true, show loading spinner and disable Apply button */
  isLoading?: boolean;
  /** When set, show "{code} Applied" green UI with remove option instead of input */
  appliedCode?: string | null;
  onRemove?: () => void;
  className?: string;
}

const CartVoucherInput: React.FC<CartVoucherInputProps> = ({
  voucherCode,
  setVoucherCode,
  error,
  setError,
  onApply,
  isLoading = false,
  appliedCode,
  onRemove,
  className,
}) => {
  if (appliedCode && appliedCode.trim()) {
    return (
      <div className={className}>
        <div className="flex items-center justify-between gap-2 rounded-md border border-green-300 bg-green-50 px-3 py-2.5">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" aria-hidden />
            <span className="font-medium text-sm text-green-800">
              {appliedCode} Applied
            </span>
          </div>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="flex items-center gap-1 rounded px-2 py-1 text-sm font-medium text-red-600 cursor-pointer hover:bg-green-100 transition-colors"
              aria-label="Remove coupon"
            >
              <X className="h-4 w-4" />
              Remove
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
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
          type="button"
          onClick={onApply}
          disabled={isLoading}
          className="px-2 xs:px-6 py-2 text-sm bg-info text-white cursor-pointer rounded-r-sm hover:bg-info/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 min-w-[80px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden />
              <span className="hidden xs:inline">Applying...</span>
            </>
          ) : (
            "Apply"
          )}
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
};

export default CartVoucherInput;
