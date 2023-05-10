import Banner from "@/components/common/banner";
import ColumnChart from "./charts/ColumnChart";
import PieChart from "./charts/PieChart";

const SupplierInformation = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 justify-between mb-10">
        <div className="flex-base lg:w-[30%]">
          <PieChart />
        </div>
        <div className="flex-base">
          <ColumnChart />
        </div>
      </div>
      <Banner />
    </>
  );
};

export default SupplierInformation;
