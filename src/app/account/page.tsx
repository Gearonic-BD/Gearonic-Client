"use client";

import Link from "next/link";
import { ShoppingBag, MapPin, Heart, User } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import Loading from "../loading";

const AccountPage = () => {
  const { user, loading, checkAuth } = useAuth();
  useEffect(() => {
    checkAuth();
  }, []);

  const navigationItems = [
    {
      title: "Your Orders",
      icon: ShoppingBag,
      href: "/account/orders",
      description: "Track your orders",
    },

    {
      title: "Edit Profile",
      icon: User,
      href: "/account/profile",
      description: "Update your profile",
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
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                    <IconComponent className="w-6 h-6 text-[var(--color-info)]" />
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
