const DesignCardLoading = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array(9)
        .fill(0)
        .map((item, idx) => (
          <div
            key={`loading-${idx}`}
            className="p-4 bg-[#f8f9ff] animate-pulse rounded-lg w-[320px] max-w-[320px] h-[400px]"
          >
            <div className="w-full h-[150px] bg-slate-500 rounded-lg"></div>
            <div className="w-4/5 h-6 bg-slate-500 mt-4"></div>
            <div className="w-4/5 h-12 bg-slate-500 mt-4"></div>
            <div className="w-full h-11 rounded-lg bg-slate-500 mt-4"></div>
          </div>
        ))}
    </div>
  );
};

export default DesignCardLoading;
