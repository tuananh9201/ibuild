// import ProductAdsCard from "./ProductAdsCard";
import { ISupplierInfo } from "@/lib/types";
import SupplierCard from "./SupplierCard";

interface SupplierContainerProps {
  data: ISupplierInfo[];
  categoryId?: string;
  disabledClickName?: boolean;
}

const SupplierContainer = ({
  data,
  categoryId,
  disabledClickName,
}: SupplierContainerProps) => {
  return (
    <div>
      <div className="flex flex-col gap-6 mt-6">
        {data &&
          data.length > 0 &&
          data.map((value, idx) => (
            <SupplierCard
              key={idx}
              supplier={value}
              categoryId={categoryId}
              disabledClickName={disabledClickName}
            />
          ))}
      </div>
    </div>
  );
};

export default SupplierContainer;
