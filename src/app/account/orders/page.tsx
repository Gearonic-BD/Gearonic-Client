"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Package, Calendar, CreditCard } from "lucide-react";
import { Order } from "@/types/types";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { toast } from "sonner";

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "text-[var(--color-warning)] bg-[var(--color-warning)]/10";
    case "processing":
      return "text-[var(--color-info)] bg-[var(--color-info)]/10";
    case "shipped":
      return "text-[var(--color-primary)] bg-[var(--color-primary)]/10";
    case "delivered":
      return "text-[var(--color-success)] bg-[var(--color-success)]/10";
    case "cancelled":
      return "text-[var(--color-danger)] bg-[var(--color-danger)]/10";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatPrice = (price: number) => {
  return `৳ ${price.toFixed(0)}`;
};

const OrdersPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrder = async () => {
      setOrdersLoading(true);
      try {
        const res = await axiosInstance.get(`/api/orders/all`);
        const data = res.data?.data;
        setOrders(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            router.replace("/login?redirect=/account/orders");
          } else if (err.response?.status === 403) {
            toast.error("Forbidden Access.");
            router.replace("/login?redirect=/account/orders");
          } else {
            console.error("Other error:", err.response?.data || err.message);
          }
        } else {
          console.error("Unexpected error:", err);
        }
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrder();
  }, []);

  if (ordersLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!orders) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <h1 className="text-xl font-semibold text-[color:var(--color-danger)] bg-white px-6 py-4 rounded-xl shadow-md border border-[color:var(--color-danger)]/30">
          No orders found
        </h1>
      </div>
    );
  }

  const filteredOrders =
    selectedFilter === "all"
      ? orders
      : orders.filter((order) => order.status === selectedFilter);

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your order history</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-1">
          <div className="flex flex-wrap gap-1">
            {[
              { key: "all", label: "All Orders", count: statusCounts.all },
              { key: "pending", label: "Pending", count: statusCounts.pending },
              {
                key: "processing",
                label: "Processing",
                count: statusCounts.processing,
              },
              { key: "shipped", label: "Shipped", count: statusCounts.shipped },
              {
                key: "delivered",
                label: "Delivered",
                count: statusCounts.delivered,
              },
              {
                key: "cancelled",
                label: "Cancelled",
                count: statusCounts.cancelled,
              },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedFilter === filter.key
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {filter.label}
                {filter.count > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      selectedFilter === filter.key
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-500">
                {selectedFilter === "all"
                  ? "You haven't placed any orders yet."
                  : `No ${selectedFilter} orders found.`}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-gray-400" />
                        <span className="font-medium text-gray-900">
                          Order #{order.id.slice(-8).toUpperCase()}
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(order.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <CreditCard className="w-4 h-4" />
                        {formatPrice(order.total)}
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.variantImage || item.productImage}
                            alt={item.productTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {item.productTitle}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-500">
                              {item.productBrand}
                            </span>
                            {item.variantColor && (
                              <>
                                <span className="text-gray-300">•</span>
                                <span className="text-sm text-gray-500">
                                  {item.variantColor}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="font-medium text-gray-900">
                            {formatPrice(item.price)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </div>
                          {item.originalPrice > item.price && (
                            <div className="text-xs text-gray-400 line-through">
                              {formatPrice(item.originalPrice)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {order.items.length} item
                        {order.items.length !== 1 ? "s" : ""} • Payment via{" "}
                        {order.payment?.method.toUpperCase()}
                      </span>
                      <span className="font-medium text-gray-900">
                        Total: {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
