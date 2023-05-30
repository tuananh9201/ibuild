import { DesignCard } from "@/components/designs";

const WrapperDesignCard = () => {
  return (
    <div className="flex-base">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(9)
          .fill(0)
          .map((item, idx) => (
            <DesignCard key={idx} />
          ))}
      </div>
    </div>
  );
};

export default WrapperDesignCard;
