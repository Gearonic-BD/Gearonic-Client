import React from "react";
import Input from "@/components/Input";
import { Truck } from "lucide-react";

interface PaymentMethodDetailsProps {
  method: string;
  totalAmount: number;
  onConfirm: () => void;
  accountNumber?: string;
  trxId?: string;
  onInputChange?: (field: string, value: string) => void;
  paymentData: {
    bkash: string;
    nagad: string;
    bkashQr: string;
    nagadQr: string;
  };
}

const PaymentMethodDetails: React.FC<PaymentMethodDetailsProps> = ({
  paymentData,
  method,
  totalAmount,
  onConfirm,
  accountNumber,
  trxId,
  onInputChange,
}) => {
  if (method === "cod") {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-4">
        <div className="text-center py-8">
          <Truck className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Cash on Delivery
          </h3>
          <p className="text-gray-600 mb-6">
            Pay when your order is delivered to your doorstep
          </p>
          <button
            onClick={onConfirm}
            className="bg-primary hover:bg-primary/90 cursor-pointer text-white font-semibold py-3 px-8 rounded-sm transition-colors"
          >
            Confirm Order
          </button>
        </div>
      </div>
    );
  }

  if (method === "nagad" || method === "bkash") {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 xs:p-6 mt-4">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1 flex flex-col items-start gap-3">
              <p className="text-xsm xs:text-sb text-gray-600 leading-relaxed">
                Send Money করে আপনার বিকাশ নম্বর এবং TrxID (Trans ID) add করে
                Order Place করুন। দয়া করে কেউ বিকাশ নাম্বারে কল দিবেন না,
                সাহায্যের জন্য আমাদের সাপোর্ট নাম্বার এ কল দিনঃ{" "}
                <span className="text-primary font-bold">+8809638253299</span>
              </p>
              <div className="text-gray-700">
                <p>
                  Account Number:{" "}
                  <span className="text-gray-600 font-bold">
                    {paymentData[method]}
                  </span>
                </p>
                <p>
                  Account Type:{" "}
                  <span className="text-gray-600 font-bold">Personal</span>
                </p>
              </div>
              <p className="text-base xs:text-xl font-bold text-gray-900 mt-2">
                You need to send us{" "}
                <span className="text-[#f44336] font-extrabold">
                  ৳ {totalAmount.toLocaleString()}
                </span>
              </p>
            </div>
            <div className="w-full md:w-auto flex items-center justify-center">
              <img
                src={paymentData[`${method}Qr`]}
                alt="QR Code"
                className="w-48 h-48 object-contain rounded-md border border-gray-200"
              />
            </div>
          </div>
          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                type="text"
                name="accountNumber"
                placeholder="01XXXXXXXXX"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#ff9800] focus:border-[#ff9800]"
                label="Your Account Number"
                required
                value={accountNumber}
                onChange={(e) =>
                  onInputChange &&
                  onInputChange("accountNumber", e.target.value)
                }
              />
            </div>
            <div>
              <Input
                type="text"
                name="trxId"
                placeholder="TRxABC123XYZ789"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#ff9800] focus:border-[#ff9800]"
                label="Your TrxID (Transaction ID)"
                required
                value={trxId}
                onChange={(e) =>
                  onInputChange && onInputChange("trxId", e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={onConfirm}
              style={{
                backgroundColor: method === "bkash" ? "#D12053" : "#F26522",
              }}
              className="text-white cursor-pointer font-semibold py-3 px-10 rounded-sm transition-colors hover:opacity-90 text-lg xs:mt-4"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentMethodDetails;
