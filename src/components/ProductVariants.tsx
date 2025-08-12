import { Variant } from "@/types/types";

interface ProductVariantsProps {
  variants: Variant[];
  selectedVariant: Variant | null;
  onVariantChange: (variant: Variant) => void;
}

const ProductVariants = ({
  variants,
  selectedVariant,
  onVariantChange,
}: ProductVariantsProps) => {
  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className="space-x-3 flex items-center">
      <h3 className="text-lg text-gray-900">
        {selectedVariant?.color ? "Color" : "Variant"}
      </h3>
      <div className="flex gap-3">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onVariantChange(variant)}
            className={`px-4 py-2 rounded-lg border-2 transition-colors capitalize ${
              selectedVariant?.id === variant.id
                ? "border-info bg-info/10 text-black"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {variant.color || variant.size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductVariants;
