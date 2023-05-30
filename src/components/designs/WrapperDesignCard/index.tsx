import { DesignCard } from "@/components/designs";
import { IDesign } from "@/lib/types";

interface WrapperDesignCardProps {
  designs: IDesign[];
  isLoading: boolean;
}

const WrapperDesignCard = ({ designs, isLoading }: WrapperDesignCardProps) => {
  return (
    <div className="flex-base">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {designs.map((item, idx) => (
          <DesignCard key={idx} design={item} />
        ))}
      </div>
    </div>
  );
};

export default WrapperDesignCard;
