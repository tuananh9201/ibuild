import { Skeleton } from "antd";

interface ListProductLoadingProps {
  items: number;
  className: string;
}

const ListProductLoading = ({ items, className }: ListProductLoadingProps) => {
  return (
    <div className={`w-full grid ${className} gap-8`}>
      {Array(items)
        .fill(0)
        .map((value, idx) => {
          return (
            <div
              key={idx}
              className="bg-[#f8f9ff] rounded p-4 max-w-sm w-full mx-auto h-[478px] animate-pulse flex flex-col gap-4"
            >
              <div className="flex flex-row gap-2 items-center">
                <div className="bg-slate-400 w-4 h-4 rounded-full"></div>
                <div className="flex-base w-full h-2 bg-slate-400 rounded-md"></div>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="bg-slate-400 w-6 h-6 rounded-full"></div>
                <div className="flex-base w-full h-2 bg-slate-400 rounded-md"></div>
              </div>
              <div className="w-full h-2 bg-slate-400 rounded-md"></div>
              <div className="w-8 h-2 bg-slate-400 rounded-md"></div>
              <div className="w-10 h-2 bg-slate-400 rounded-md"></div>
              <div className="flex flex-row justify-between items-center">
                <div className="w-9 h-2 bg-slate-400 rounded-md"></div>
                <div className="w-9 h-2 bg-slate-400 rounded-md"></div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="w-9 h-2 bg-slate-400 rounded-md"></div>
                <div className="w-9 h-2 bg-slate-400 rounded-md"></div>
              </div>
              <div className="w-full h-[140px] bg-slate-400"></div>
              <div className="w-full flex flex-row gap-2">
                <button className="w-[55%] h-[44px] bg-slate-400 rounded"></button>
                <button className="w-[22%] h-[44px] bg-slate-400 rounded"></button>
                <button className="w-[22%] h-[44px] bg-slate-400 rounded"></button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ListProductLoading;
