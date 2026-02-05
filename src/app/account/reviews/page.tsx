"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, MessageSquare, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { toast } from "sonner";
import { renderStars } from "@/utils/ratings";

interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  date: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  product: {
    id: string;
    title: string;
    slug: string;
    featuredImage: string;
    brand: string;
  };
}

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchReviews = async () => {
      setReviewsLoading(true);
      try {
        const res = await axiosInstance.get(`/api/reviews/user`);
        const data = res.data?.reviews;
        setReviews(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            router.replace("/login?redirect=/account/reviews");
          } else if (err.response?.status === 403) {
            toast.error("Forbidden Access.");
            router.replace("/login?redirect=/account/reviews");
          } else {
            console.error("Other error:", err.response?.data || err.message);
            toast.error("Failed to load reviews");
          }
        } else {
          console.error("Unexpected error:", err);
        }
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (reviewsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reviews</h1>
            <p className="text-gray-600">View and manage your product reviews</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-500 mb-4">
              You haven't reviewed any products yet.
            </p>
            <Link
              href="/account/orders"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary)]/90 transition-colors"
            >
              <Package className="w-4 h-4" />
              View Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reviews</h1>
          <p className="text-gray-600">
            You have reviewed {reviews.length} product{reviews.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Product Image */}
                <Link
                  href={`/product/${review.product.slug}`}
                  className="flex-shrink-0"
                >
                  <img
                    src={review.product.featuredImage}
                    alt={review.product.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </Link>

                {/* Review Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <div>
                      <Link
                        href={`/product/${review.product.slug}`}
                        className="text-lg font-semibold text-gray-900 hover:text-[var(--color-primary)] transition-colors"
                      >
                        {review.product.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        {review.product.brand}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 mt-2 sm:mt-0">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {renderStars(review.rating, 16)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {review.rating}/5
                    </span>
                  </div>

                  {/* Comment */}
                  {review.comment && (
                    <div className="mt-3">
                      <p className="text-gray-700 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={`/product/${review.product.slug}`}
                      className="text-sm text-[var(--color-primary)] hover:underline"
                    >
                      View Product →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
