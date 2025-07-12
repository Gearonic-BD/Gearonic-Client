import Link from "next/link";
import { Product } from "@/types/types";
import { renderStars } from "@/app/utils/ratings";

const FeaturedProductCard = ({ product }: { product: Product }) => {
  const discountPercentage = product.discountPrice
    ? Math.round(
        ((product.originalPrice - product.discountPrice) /
          product.originalPrice) *
          100
      )
    : 0;


  return (
    <div className="rounded-lg bg-white active:scale-98 shadow-sm overflow-hidden group transition-all duration-300 active:shadow-lg active:-translate-y-1 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
      <Link href={"/product/iphone"} className="flex flex-col h-full">
        {/* Image Container */}
        <div className="p-4 relative flex-shrink-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content Container */}
        <div className="px-4 pb-4 flex flex-col flex-grow justify-between space-y-3">
          <div className="space-y-3">
            <h3
              className="text-sm group-active:text-danger group-hover:text-danger transition-all font-semibold text-gray-800 line-clamp-2"
              title={product.title}
            >
              {product.title}
            </h3>

            {/* Rating and Sold Section - Always show sold info on the right */}
            <div className="flex items-center justify-between">
              {product.rating > 0 ? (
                <div className="flex items-center gap-.5">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs font-semibold text-gray-500 ml-1">
                    {product.rating}
                  </span>
                </div>
              ) : (
                <div></div>
              )}
              <div className="text-xs text-gray-500 font-medium">
                {product.sold} sold
              </div>
            </div>
          </div>

          {/* Price Section - Conditional based on discount */}
          <div className="flex items-center  mt-auto gap-1">
            <div className="flex items-baseline space-x-2">
              {product.discountPrice ? (
                <>
                  <p className="text-xl font-bold text-danger">
                    ৳{product.discountPrice}
                  </p>
                  <p className="text-xs text-gray-400 line-through">
                    ৳{product.originalPrice}
                  </p>
                </>
              ) : (
                <p className="text-xl font-bold text-gray-800">
                  ৳{product.originalPrice}
                </p>
              )}
            </div>
            {/* Discount Badge - Only show if discount price exists */}
            {product.discountPrice && (
              <span className="text-sm text-danger">
                -{discountPercentage}%
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedProductCard;
