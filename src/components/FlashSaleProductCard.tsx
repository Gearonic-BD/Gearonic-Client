import Link from "next/link";

type Product = {
  image: string;
  title: string;
  originalPrice: number;
  discountPrice: number;
  sold: number;
  totalStock: number;
};

const FlashSaleProductCard = ({ product }: { product: Product }) => {
  const discountPercentage = Math.round(
    ((product.originalPrice - product.discountPrice) / product.originalPrice) *
      100
  );
  const soldPercentage = (product.sold / product.totalStock) * 100;
  return (
    <div className="rounded-lg bg-white shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={"/product/iphone"} className="block ">
        {/* Image Container */}
        <div className="p-4 relative">
          {" "}
          {/* Make this relative */}
          <img
            src={product.image}
            alt={product.title}
            className="w-full  object-contain transition-transform duration-300 group-hover:scale-105"
          />
          {/* Discount Badge */}
          <span className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-1.5 py-1 rounded">
            -{discountPercentage}%
          </span>
        </div>

        {/* Content Container */}
        <div className="px-4 pb-4 flex flex-col space-y-3">
          <h3
            className="text-sm font-semibold text-gray-800 line-clamp-2"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Price & Discount Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-2">
              <p className="text-xl font-bold text-danger">
                ৳{product.discountPrice}
              </p>
              <p className="text-xs text-gray-400 line-through">
                ৳{product.originalPrice}
              </p>
            </div>
          </div>

          {/* --- REVISED: Progress bar BESIDE sold text --- */}
          <div className="flex items-center gap-2">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-danger h-1 rounded-full"
                style={{ width: `${soldPercentage}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-gray-500 font-medium flex-shrink-0">
              {product.sold}/{product.totalStock} Sold
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FlashSaleProductCard;
