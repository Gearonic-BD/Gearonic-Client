import { Star, MessageSquare } from "lucide-react";
import { renderStars } from "@/utils/ratings";
import { Review } from "@/types/types";

interface ProductReviewsProps {
  reviews: Review[];
  averageRating?: number;
  totalReviews: number;
}

const ProductReviews = ({
  reviews,
  averageRating,
  totalReviews,
}: ProductReviewsProps) => {
  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews?.forEach((review) => {
      distribution[review.rating - 1]++;
    });
    return distribution.reverse(); // 5 stars first
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
          Customer Reviews
        </h2>
      </div>

      {/* Review Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="text-center">
          <div className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
            {averageRating ? averageRating.toFixed(1) : 0}
          </div>
          <div className="flex items-center justify-center mb-1 sm:mb-2">
            {renderStars(Math.round(averageRating ? averageRating : 0), 16)}
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            {totalReviews} reviews
          </p>
        </div>

        <div className="space-y-1 sm:space-y-2">
          {[5, 4, 3, 2, 1].map((stars, index) => (
            <div key={stars} className="flex items-center gap-1 sm:gap-2">
              <span className="text-xs sm:text-sm font-medium text-gray-700 w-4 sm:w-8">
                {stars}
              </span>
              <Star
                size={12}
                className="sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400"
              />
              <div className="flex-1 bg-gray-200 rounded-full h-1.5 sm:h-2">
                <div
                  className="bg-yellow-400 h-1.5 sm:h-2 rounded-full"
                  style={{
                    width: `${
                      totalReviews > 0
                        ? (ratingDistribution[index] / totalReviews) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
              <span className="text-xs sm:text-sm text-gray-600 w-4 sm:w-8">
                {ratingDistribution[index]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4 sm:space-y-6">
        {reviews && reviews.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-gray-500">
            <MessageSquare
              size={32}
              className="sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-300"
            />
            <p className="text-sm sm:text-base">
              No reviews yet. Be the first to review!
            </p>
          </div>
        ) : (
          reviews?.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-200 pb-2 sm:pb-3 last:border-b-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-1">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                    <span className="font-medium text-gray-900 text-sm sm:text-base">
                      {review.user ? review.user.name : "Unknown"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <div className="flex items-center">
                      {renderStars(review.rating, 14)}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
              {review.comment && (
                <div className="text-gray-700 mb-3 text-sm sm:text-base leading-relaxed">
                  {review.comment}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
