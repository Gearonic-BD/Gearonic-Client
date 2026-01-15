"use client";

import Loading from "@/app/loading";
import useAuth from "@/hooks/useAuth";
import { User, Mail, Phone } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  // User data based on the provided structure
  const { user, loading, checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      if (!user) {
        const authResult = await checkAuth();
        if (!authResult.success) {
          router.push("/login?redirect=/account/profile");
          return;
        }
      }
    };
    verifyAuth();
  }, [user, checkAuth, router]);

  if (loading) {
    return <Loading />;
  }

  // Redirect if not authenticated (handled in useEffect, but show nothing while redirecting)
  if (!user) {
    return <Loading />;
  }

  const profileFields = [
    {
      label: "Full Name",
      value: user.name,
      icon: User,
      show: true,
    },
    {
      label: "Email Address",
      value: user.email,
      icon: Mail,
      show: true,
    },
    {
      label: "Phone Number",
      value: user.phone || "Not provided",
      icon: Phone,
      show: true,
      isEmpty: !user.phone,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Profile Information
            </h2>
            {/* <button className="px-4 py-2 bg-[var(--color-info)] text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
              Edit Profile
            </button> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileFields.map((field) => {
              const IconComponent = field.icon;
              return (
                <div
                  key={field.label}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {field.label}
                    </p>
                    <p
                      className={`text-sm break-all ${
                        field.isEmpty ? "text-gray-400 italic" : "text-gray-700"
                      }`}
                    >
                      {field.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/*TODO: Add Account Statistics bellow*/}
      </div>
    </div>
  );
};

export default ProfilePage;
