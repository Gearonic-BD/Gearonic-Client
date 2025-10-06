"use client";

import { Order } from "@/types/types";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const OrderPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [isOrderLoading, setIsOrderLoading] = useState(true);

  const orderId = params.orderId;
  const firstOrder = searchParams.get("firstOrder");

  useEffect(() => {
    if (!orderId) {
      return;
    }

    const fetchOrder = async () => {
      setIsOrderLoading(true);
      try {
        const res = await axiosInstance.get(`/api/orders/full/${orderId}`);
        const data = res.data;

        setOrderData(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            router.replace("/");
          } else if (err.response?.status === 403) {
            toast.error("Forbidden Access.");
            router.replace("/");
          } else {
            console.error("Other error:", err.response?.data || err.message);
          }
        } else {
          console.error("Unexpected error:", err);
        }
      } finally {
        setIsOrderLoading(false);
        console.log(orderData);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Order status steps
  const orderSteps = [
    { key: "pending", label: "Order Placed", icon: "📋" },
    { key: "processing", label: "Processing", icon: "⚙️" },
    { key: "shipped", label: "Shipped", icon: "🚚" },
    { key: "delivered", label: "Delivered", icon: "📦" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-[var(--color-warning)]";
      case "processing":
        return "text-[var(--color-info)]";
      case "shipped":
        return "text-[var(--color-primary)]";
      case "delivered":
        return "text-[var(--color-success)]";
      case "cancelled":
        return "text-[var(--color-danger)]";
      default:
        return "text-gray-500";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning";
      case "processing":
        return "bg-info";
      case "shipped":
        return "bg-primary";
      case "delivered":
        return "bg-success";
      case "cancelled":
        return "bg-danger";
      default:
        return "bg-gray-500";
    }
  };

  const getCurrentStepIndex = () => {
    if (orderData && orderData.status === "cancelled") return -1;
    return orderSteps.findIndex((step) => step.key === orderData?.status);
  };

  const getProgressPercentage = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex === -1) return 0;
    return ((currentIndex + 1) / orderSteps.length) * 100;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return `৳${amount.toFixed(2)}`;
  };

  if (isOrderLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  if (!orderData) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <h1 className="text-xl font-semibold text-[color:var(--color-danger)] bg-white px-6 py-4 rounded-xl shadow-md border border-[color:var(--color-danger)]/30">
          ❌ No order found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Thank You Message for First Order */}
        {firstOrder === "true" && (
          <div className="mb-6 sm:mb-8 bg-[var(--color-success)] text-white p-4 sm:p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="text-2xl sm:text-3xl mr-3 sm:mr-4">🎉</div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                  Thank You for Your Order!
                </h2>
                <p className="text-base sm:text-lg">
                  Your order has been successfully placed and is being
                  processed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Order Information */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Order #{orderId}
              </h2>
              <p className="text-sm text-gray-600">
                Placed on {formatDate(orderData.createdAt)}
              </p>
            </div>
            <div className="">
              <div
                className={`inline-flex gap-2 items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                  orderData.status
                )}`}
              >
                <span className="text-black">Status: </span>{" "}
                <span>
                  {orderData.status.charAt(0).toUpperCase() +
                    orderData.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {orderData.status !== "cancelled" && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <h2 className="text-lg font-semibold mb-6">Order Status</h2>

            {/* Progress Bar Container */}
            <div className="relative mb-8">
              {/* Background Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>

              {/* Active Progress Line */}
              <div
                className={`absolute top-6 left-0 h-1 rounded-full transition-all duration-500 ease-in-out ${getStatusBgColor(
                  orderData.status
                )}`}
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>

              {/* Status Steps */}
              <div className="relative flex justify-between">
                {orderSteps.map((step, index) => {
                  const currentStepIndex = getCurrentStepIndex();
                  const isCompleted = index <= currentStepIndex;
                  const isActive = index === currentStepIndex;

                  return (
                    <div key={step.key} className="flex flex-col items-center">
                      {/* Step Circle */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg mb-3 border-4 transition-all duration-300 ${
                          isCompleted
                            ? `${getStatusBgColor(
                                orderData.status
                              )} text-white border-transparent shadow-lg`
                            : "bg-white text-gray-400 border-gray-200"
                        } ${isActive ? "scale-110 shadow-xl" : ""}`}
                      >
                        {step.icon}
                      </div>

                      {/* Step Label */}
                      <p
                        className={`text-xs sm:text-sm text-center font-medium transition-colors duration-300 ${
                          isActive
                            ? `${getStatusColor(orderData.status)} font-bold`
                            : isCompleted
                            ? "text-gray-700"
                            : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </p>

                      {/* Active Step Indicator */}
                      {isActive && (
                        <div
                          className={`mt-2 w-2 h-2 rounded-full ${getStatusBgColor(
                            orderData.status
                          )} animate-pulse`}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status Description */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Your order is currently{" "}
                <span
                  className={`font-semibold ${getStatusColor(
                    orderData.status
                  )}`}
                >
                  {orderData.status}
                </span>
              </p>
            </div>
          </div>
        )}

        {orderData.status === "cancelled" && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-[var(--color-danger)]">
            <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">❌</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-[var(--color-danger)] mb-2">
                  Order Cancelled
                </h2>
                <p className="text-gray-600 mb-3">
                Unfortunately This order has been cancelled and will not be processed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">
              Order Items ({orderData.totalQuantity} items)
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {orderData?.items?.map((item) => (
              <div key={item.id} className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <img
                    src={item.variantImage || item.productImage}
                    alt={item.productTitle}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md flex-shrink-0 mx-auto sm:mx-0"
                  />
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {item.productTitle}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {item.productBrand}
                    </p>
                    {item.variantColor && (
                      <p className="text-sm text-gray-500 mb-2">
                        Color: {item.variantColor}
                      </p>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                      <span
                        className={`text-sm font-medium ${getStatusColor(
                          orderData.status
                        )}`}
                      >
                        {orderData.status.charAt(0).toUpperCase() +
                          orderData.status.slice(1)}
                      </span>
                      <button onClick={()=>{
                        console.log(orderData)
                      }} className="text-sm text-[var(--color-info)] hover:underline">
                        MORE DETAILS
                      </button>
                    </div>
                  </div>
                  <div className="text-center sm:text-right flex-shrink-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                      <div>
                        <p className="text-sm text-gray-600">
                          Qty:{" "}
                          <span className="font-medium">{item.quantity}</span>
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(item.price)}
                        </p>
                        {item.originalPrice > item.price && (
                          <p className="text-sm text-gray-500 line-through">
                            {formatCurrency(item.originalPrice)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping and Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-4 space-y-2 sm:space-y-0">
              <h2 className="text-lg font-semibold">Shipping Address</h2>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-gray-900">
                Name: {orderData.shipping?.name}
              </p>
              <p className="text-gray-600">
                Address: {orderData.shipping?.address}
              </p>
              <p className="text-gray-600">
                Phone: {orderData.shipping?.mobile}
              </p>
            </div>
          </div>

          {/* Total Summary */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">Total Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal({orderData.totalQuantity} items including ৳
                  {orderData.shipping.zone === "outside" ? 120 : 60} Shipping
                  charge)
                </span>
                <span className="font-medium">
                  {formatCurrency(orderData.total)}
                </span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold text-[var(--color-primary)]">
                    {formatCurrency(orderData.total)}
                  </span>
                </div>
                <div className="mt-2">
                  {orderData.payment?.method ? (
                    <>
                      <p className="text-sm text-gray-600">Paid by</p>
                      <p className="font-medium capitalize">
                        {orderData.payment.method === "cod"
                          ? "Cash On Delivery"
                          : orderData.payment.method}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600">Payment Status</p>
                      <p className="font-medium">
                        Payment Pending.{" "}
                        <a
                          href={`/payment?orderId=${orderData.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          Pay Now
                        </a>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
