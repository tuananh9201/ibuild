interface SupplierContainerLoadingProps {
  items: number;
}

const SupplierContainerLoading = ({ items }: SupplierContainerLoadingProps) => {
  return (
    <div className="flex flex-col gap-6 mt-6">
      {Array(items)
        .fill(0)
        .map((value, idx) => (
          <div
            key={idx}
            className="animate-pulse flex flex-row gap-3 h-[190px]"
          >
            <div className="w-[170px] h-full bg-slate-400 rounded"></div>
            <div className="flex-base flex flex-col gap-6">
              <div className="w-4/5 h-[30px] bg-slate-400 rounded-md"></div>
              <div className="w-1/6 h-[30px] bg-slate-400 rounded-md"></div>
              <div className="w-1/6 h-[30px] bg-slate-400 rounded-md"></div>
              <div className="w-1/2 h-[30px] bg-slate-400 rounded-md"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SupplierContainerLoading;
