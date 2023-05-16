// import ProductAdsCard from "./ProductAdsCard";
import { ISupplierInfo } from "@/lib/types";
import SupplierCard from "./SupplierCard";

interface SupplierContainerProps {
  data: ISupplierInfo[];
  categoryId?: string;
}

const SupplierContainer = ({ data, categoryId }: SupplierContainerProps) => {
  return (
    <div>
      <div className="flex flex-col gap-6 mt-6">
        {data &&
          data.length > 0 &&
          data.map((value, idx) => (
            <SupplierCard key={idx} supplier={value} categoryId={categoryId} />
          ))}
      </div>
    </div>
  );
};

export default SupplierContainer;
