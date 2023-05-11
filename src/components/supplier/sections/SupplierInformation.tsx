import Banner from "@/components/common/banner";
import ColumnChart from "./charts/ColumnChart";
import PieChart from "./charts/PieChart";

interface SupplierInformationProps {
  supplierId: string;
}

const SupplierInformation = ({ supplierId }: SupplierInformationProps) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 justify-between mb-10">
        <div className="w-[40%] lg:w-[30%]">
          <PieChart />
        </div>
        <div className="flex-base">
          <ColumnChart supplierId={supplierId} />
        </div>
      </div>
      <Banner />
    </>
  );
};

export default SupplierInformation;
