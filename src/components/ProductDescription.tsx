type Props = {
  html: string;
};

const ProductDescription = ({ html }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
        Description
      </h2>

      <div
        className="prose prose-sm max-w-none
      prose-headings:text-gray-900 prose-headings:font-semibold
      prose-h2:text-lg prose-h2:mt-4 prose-h2:mb-3 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
      prose-h3:text-base prose-h3:mt-3 prose-h3:mb-2
      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-3
      prose-strong:text-gray-900 prose-strong:font-semibold
      prose-ul:my-3 prose-ul:space-y-2
      prose-li:text-gray-700 prose-li:leading-relaxed  
    "
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default ProductDescription;
