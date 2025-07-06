const SectionHeader = ({ text }: { text: string }) => {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
      {text}
    </h2>
  );
};

export default SectionHeader;
