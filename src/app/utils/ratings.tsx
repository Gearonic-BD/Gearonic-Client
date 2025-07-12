import { Star } from "lucide-react";

export const renderStars = (rating: number, size: number = 12) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        size={size}
        className="fill-yellow-400 text-yellow-400"
      />
    );
  }

  // Add half star if needed
  if (hasHalfStar) {
    stars.push(
      <div key="half-star" className="relative">
        <Star size={size} className="text-gray-300" />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: "50%" }}
        >
          <Star size={size} className="fill-yellow-400 text-yellow-400" />
        </div>
      </div>
    );
  }

  // Add empty stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} size={size} className="text-gray-300" />);
  }

  return stars;
};
