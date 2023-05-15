interface ProjectCardLoadingProps {
  items: number;
  className?: string;
}

const ProjectCardLoading = ({ items, className }: ProjectCardLoadingProps) => {
  return (
    <div className={`${className || ""}`}>
      {Array(items)
        .fill(0)
        .map((item, idx) => (
          <div
            key={`loading-${idx}`}
            className="p-4 bg-[#f8f9ff] animate-pulse rounded-lg"
          >
            <div className="w-[270px] h-[150px] bg-slate-500 rounded-lg"></div>
            <div className="w-4/5 h-3 bg-slate-500"></div>
            <div className="w-4/5 h-6 bg-slate-500"></div>
          </div>
        ))}
    </div>
  );
};

export default ProjectCardLoading;
