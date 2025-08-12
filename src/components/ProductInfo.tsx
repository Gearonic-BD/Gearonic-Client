import Link from "next/link";
import { renderStars } from "@/utils/ratings";

interface ProductInfoProps {
  title: string;
  brand: string;
  category: string;
  rating?: number;
  sold: number;
  originalPrice: number;
  currentPrice: number;
  discountPercentage: number;
  features: string[];
}

const ProductInfo = ({
  title,
  brand,
  category,
  rating,
  sold,
  originalPrice,
  currentPrice,
  discountPercentage,
  features,
}: ProductInfoProps) => {
  return (
    <div className="space-y-2 sm:space-y-4">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-1.5 sm:mb-2">
          {title}
        </h1>
        <div className="flex items-center gap-2 mb-1.5 sm:mb-3">
          <span className="text-sm text-gray-600">Brand:</span>
          <Link
            className="text-info hover:underline font-medium"
            href={`/products/${category}/${brand}`}
          >
            {brand}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {rating ? (
            <div className="flex items-center">{renderStars(rating, 16)}</div>
          ) : (
            <div className="flex items-center">{renderStars(0, 16)}</div>
          )}
          {sold > 10 && (
            <span className="text-sm text-gray-500">({sold} sold)</span>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl sm:text-3xl font-bold text-danger">
            ৳{currentPrice.toLocaleString()}
          </span>
          {discountPercentage > 0 && (
            <span className="bg-danger text-white px-2 py-1 rounded text-sm font-medium">
              {discountPercentage}% OFF
            </span>
          )}
        </div>
        {discountPercentage > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-500 line-through">
              ৳{originalPrice.toLocaleString()}
            </span>
            <span className="text-sm text-success font-medium">
              You save ৳{(originalPrice - currentPrice).toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {/* Key Features */}
      <div className="space-y-1">
        <h3 className="text-lg text-gray-900">Key Features</h3>
        <ul className="space-y-1 ml-4">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center text-gray-700 text-sm font-medium"
            >
              <div className="w-2 h-2 bg-black rounded-full mr-2 flex-shrink-0"></div>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;
