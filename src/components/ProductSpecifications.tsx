import { Product } from "@/types/types";

const ProductSpecifications = ({
  specifications,
}: {
  specifications: Product["specifications"];
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm py-6 px-3 md:px-6 sm:mx-6 md:mx-0">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 md:mb-6">
        Specifications
      </h2>

      <div className="space-y-4">
        {specifications.map((section) => (
          <div
            key={section.name}
            className="border border-gray-200 rounded-sm overflow-hidden"
          >
            {/* Category Header */}
            <div className="bg-blue-50 px-4 py-2 md:py-3 border-b border-gray-200">
              <h3 className="text-base md:text-lg font-semibold text-info">
                {section.name}
              </h3>
            </div>

            {/* Specification Rows */}
            <div className="divide-y divide-gray-200">
              {section.specs.map((spec, index) => (
                <div
                  key={spec.key}
                  className={`grid grid-cols-1 md:grid-cols-3 gap-1.5 md:gap-4 px-4 py-2 md:py-3 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <div className="font-medium md:font-semibold text-gray-700 capitalize text-sm md:text-sb">
                    {spec.key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div className="md:col-span-2 text-gray-900 font-normal md:font-medium text-sm md:text-sb">
                    {spec.value.split("\n").map((line, lineIndex) => (
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
