import { Product } from "@/types/product";

const ProductSpecifications = ({
  specifications,
}: {
  specifications: Product["specifications"];
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm py-6 px-3 md:px-6 sm:mx-6 md:mx-0">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 md:mb-6">
        Specification
      </h2>

      <div className="space-y-4">
        {Object.entries(specifications).map(([category, items]) => (
          <div
            key={category}
            className="border border-gray-200 rounded-sm overflow-hidden"
          >
            {/* Category Header */}
            <div className="bg-blue-50 px-4 py-2 md:py-3 border-b border-gray-200">
              <h3 className="text-base md:text-lg font-semibold text-info">
                {category}
              </h3>
            </div>

            {/* Specification Rows */}
            <div className="divide-y divide-gray-200">
              {Object.entries(items).map(([key, value], index) => (
                <div
                  key={key}
                  className={`grid grid-cols-1 md:grid-cols-3 gap-1.5 md:gap-4 px-4 py-2 md:py-3 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <div className="font-medium md:font-semibold text-gray-700 capitalize text-sm md:text-sb">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div className="md:col-span-2 text-gray-900 font-normal md:font-medium text-sm md:text-sb">
                    {value.split("\n").map((line, lineIndex) => (
                      <div
                        key={lineIndex}
                        className={lineIndex > 0 ? "mt-1" : ""}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecifications;
