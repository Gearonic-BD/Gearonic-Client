"use client";

import Link from "next/link";
import { ShoppingBag, MapPin, Heart, User } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import Loading from "../loading";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";

const AccountPage = () => {
  const { user, loading, checkAuth } = useAuth();
  const router = useRouter();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!user) {
        const authResult = await checkAuth();
        if (!authResult.success) {
          router.push("/login?redirect=/account");
          return;
        }
      }
    };
    verifyAuth();
  }, [user, checkAuth, router]);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await axiosInstance.post("/auth/api/logout");
      clearCart();
      router.push("/login"); // redirect to login
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setLogoutLoading(false);
    }
  };

  const navigationItems = [
    {
      title: "Your Orders",
      icon: ShoppingBag,
      href: "/account/orders",
      description: "Track your orders",
    },

    {
      title: "Your Profile",
      icon: User,
      href: "/account/profile",
      description: "Your Information",
    },

    {
      title: "Address",
      icon: MapPin,
      href: "/account/address",
      description: "Manage Your address",
    },
    {
      title: "WishList",
      icon: Heart,
      href: "/account/wishlist",
      description: "Your saved items",
    },
  ];

  if (loading) {
    return <Loading />;
  }

  // Redirect if not authenticated (handled in useEffect, but show nothing while redirecting)
  if (!user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Hello,</p>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {user?.name}
                </h1>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="px-4 py-2 bg-danger text-white rounded-lg hover:bg-danger/90 cursor-pointer transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-200">
                    <IconComponent className="w-6 h-6 text-info" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
