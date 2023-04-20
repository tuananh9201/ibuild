interface ProductCategoryLoadingProps {
  items: number;
}

const ProductCategoryLoading = ({ items }: ProductCategoryLoadingProps) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {Array(items)
        .fill(0)
        .map((value, idx) => (
          <div
            className="min-w-[302px] bg-[#f8f9ff] rounded-lg border border-solid border-[#e6e6e6] p-4 flex flex-col gap-2 cursor-pointer animate-pulse"
            key={idx}
          >
            <div className="w-8 h-8 rounded-full bg-slate-500"></div>
            <div className="w-full h-6 bg-slate-500"></div>
          </div>
        ))}
    </div>
  );
};

export default ProductCategoryLoading;
