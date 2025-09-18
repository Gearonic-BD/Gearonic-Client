"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PaymentMethodSelector from "@/components/PaymentMethodSelector";
import PaymentMethodDetails from "@/components/PaymentMethodDetails";
import PaymentOrderSummary from "@/components/PaymentOrderSummary";
import PaymentMobileSummary from "@/components/PaymentMobileSummary";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

interface OrderData {
  id: string;
  status: string;
  total: number;
  totalQuantity: number;
  paymentStatus: string;
  paymentMethod: string | null;
  shipping: {
    zone: string;
  };
}
export interface PaymentData {
  bkash: string;
  nagad: string;
  bkashQr: string;
  nagadQr: string;
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
const paymentMethodWithoutCod = paymentMethods.map((method) =>
  method.id === "cod" ? { ...method, enabled: false } : method
);

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [paymentInformation, setPaymentInformation] = useState<PaymentData>({
    bkash: "",
    nagad: "",
    bkashQr: "",
    nagadQr: "",
  });
  const [isOrderLoading, setIsOrderLoading] = useState(true);
  const [isPaymentLoading, setIsPaymentLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      router.push("/");
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(`/api/orders/${orderId}`);
        const data: OrderData = res.data;

        console.log(res.data);

        // 🚨 Redirect immediately if already paid
        if (data.paymentStatus === "success" || data.paymentMethod) {
          router.push("/");
          return;
        }

        setOrderData(data);
      } catch (err) {
        console.error(err);
        router.push("/");
      } finally {
        setIsOrderLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const res = await axiosInstance.get("/api/orders/payment-methods");
        if (!res.data || !res.data.bkash || !res.data.nagad) {
          throw new Error("Payment methods not available");
        }

        setPaymentInformation({
          bkash: res.data?.bkash,
          nagad: res.data?.nagad,
          bkashQr: res.data?.bkashQr,
          nagadQr: res.data?.nagadQr,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsPaymentLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);
  const isLoading = isOrderLoading || isPaymentLoading;

  const handlePayment = async () => {
    // Validate payment details
    if (selectedMethod === "bkash" || selectedMethod === "nagad") {
      const phoneRegex = /^(?:\+88)?01[3-9]\d{8}$/;
      if (!accountNumber || !phoneRegex.test(accountNumber)) {
        toast.error("Please provide a valid Bangladeshi mobile number.");
        return;
      }

      if (!trxId) {
        toast.error("Please provide a valid Transaction ID.");
        return;
      }
    }

    if (selectedMethod === "cod") {
      setAccountNumber("");
      setTrxId("");
    }

    // Frontend total amount validation (optional)
    if (!orderData?.total || orderData.total <= 0) {
      toast.error("Invalid order amount.");
      return;
    }

    try {
      const { data } = await axiosInstance.post("/api/orders/payment", {
        orderId,
        totalAmount: orderData.total,
        method: selectedMethod,
        accountNumber,
        trxId,
      });

      toast.success(data.message || "Payment processed successfully!");
      router.push(
        `/account/orders/${orderId}?firstOrder=${
          data.isFirstOrder ? "true" : "false"
        }`
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleMethodSelection = (methodId: string, enabled: boolean) => {
    if (enabled) {
      setSelectedMethod(methodId);
    }
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
  if (!paymentInformation.bkash || !paymentInformation.nagad) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Payment methods not available.</p>
        </div>
      </div>
    );
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
            {orderData.total > 3000 && (
              <div className=" py-2 px-2 my-1 text-danger rounded-lg w-fit text-sm bg-danger/10">
                Cash on Delivery is not available for orders above ৳3000
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 ml:grid-cols-3 gap-4 lg:gap-8">
            {/* Payment Methods and Form */}
            <div className="ml:col-span-2 space-y-4">
              <PaymentMethodSelector
                paymentMethods={
                  orderData.total < 3000
                    ? paymentMethods
                    : paymentMethodWithoutCod
                }
                selectedMethod={selectedMethod}
                onSelect={handleMethodSelection}
                renderDetails={(methodId) => (
                  <PaymentMethodDetails
                    paymentData={paymentInformation}
                    method={methodId}
                    totalAmount={orderData?.total}
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
                  paymentData={paymentInformation}
                  method={selectedMethod}
                  totalAmount={orderData?.total}
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
                totalItems={orderData?.totalQuantity}
                shipping={orderData.shipping.zone === "inside" ? 60 : 120}
                totalAmount={orderData?.total}
              />
            </div>
          </div>
        </div>
      </div>
      <PaymentMobileSummary
        totalItems={orderData?.totalQuantity}
        shipping={orderData.shipping.zone === "inside" ? 60 : 120}
        totalAmount={orderData?.total}
      />
    </>
  );
}
