"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cart";
import useCartTotalItems from "@/hooks/useCartTotalItems";
import PaymentMethodSelector from "@/components/PaymentMethodSelector";
import PaymentMethodDetails from "@/components/PaymentMethodDetails";
import PaymentOrderSummary from "@/components/PaymentOrderSummary";
import PaymentMobileSummary from "@/components/PaymentMobileSummary";
import useCartTotalPrice from "@/hooks/useCartTotalPrice";

interface OrderData {
  id: string;
  status: string;
  total: number;
}

const paymentMethods = [
  {
    id: "cod",
    name: "Cash on Delivery",
    subtitle: "Pay after receiving your order",
    enabled: true,
    color: "bg-primary",
    image:
      "https://ik.imagekit.io/otbgrtfsy/logos/cod2.png?updatedAt=1752682855723",
  },
  {
    id: "bkash",
    name: "bKash",
    subtitle: "Pay with bKash",
    enabled: true,
    color: "#D12053",
    image:
      "https://ik.imagekit.io/otbgrtfsy/logos/bkash.png?updatedAt=1752682855923",
  },
  {
    id: "nagad",
    name: "Nagad",
    subtitle: "Pay with Nagad",
    enabled: true,
    color: "#F26522",
    image:
      "https://ik.imagekit.io/otbgrtfsy/logos/nagad.png?updatedAt=1752682856158",
  },
];

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const totalItems = useCartTotalItems();
  const shipping = useCartStore((state) => state.cart.shipping);
  const totalAmount = useCartTotalPrice()

  useEffect(() => {
    if (!orderId) {
      router.push("/");
      return;
    }
    const validateOrder = async () => {
      try {
        setOrderData({
          id: orderId,
          status: "pending",
          total: totalAmount,
        });
        setIsLoading(false);
      } catch {
        router.push("/");
      }
    };
    validateOrder();
  }, [orderId, router, totalAmount]);

  const handlePayment = () => {
    // Handle payment logic here
    if (selectedMethod === "bkash" || selectedMethod === "nagad") {
      // Validate input fields
      if (!accountNumber || !trxId) {
        alert("Please provide your account number and TrxID.");
        return;
      }
    }
    // Payment processing logic here
    console.log(
      "Processing payment with method:",
      selectedMethod,
      "for order:",
      orderId,
      accountNumber,
      trxId
    );
  };

  const handleMethodSelection = (methodId: string) => {
    setSelectedMethod(methodId);
    if (window.innerWidth < 475) {
      window.scrollTo(0, 0);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "accountNumber") setAccountNumber(value);
    if (field === "trxId") setTrxId(value);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Validating order...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-4 lg:px-8">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Select Payment Method
            </h1>
            <p className="text-sm text-gray-600 mt-1">Order ID: {orderId}</p>
          </div>
          <div className="grid grid-cols-1 ml:grid-cols-3 gap-4 lg:gap-8">
            {/* Payment Methods and Form */}
            <div className="ml:col-span-2 space-y-4">
              <PaymentMethodSelector
                paymentMethods={paymentMethods}
                selectedMethod={selectedMethod}
                onSelect={handleMethodSelection}
                renderDetails={(methodId) => (
                  <PaymentMethodDetails
                    method={methodId}
                    totalAmount={totalAmount}
                    onConfirm={handlePayment}
                    accountNumber={accountNumber}
                    trxId={trxId}
                    onInputChange={handleInputChange}
                  />
                )}
              />
              {/* Payment Method Details for larger screens */}
              <div className="hidden xs:block">
                <PaymentMethodDetails
                  method={selectedMethod}
                  totalAmount={totalAmount}
                  onConfirm={handlePayment}
                  accountNumber={accountNumber}
                  trxId={trxId}
                  onInputChange={handleInputChange}
                />
              </div>
            </div>
            {/* Order Summary */}
            <div className="ml:block hidden">
              <PaymentOrderSummary
                totalItems={totalItems}
                shipping={shipping}
                totalAmount={totalAmount}
              />
            </div>
          </div>
        </div>
      </div>
      <PaymentMobileSummary
        totalItems={totalItems}
        shipping={shipping}
        totalAmount={totalAmount}
        onPay={handlePayment}
      />
    </>
  );
}
