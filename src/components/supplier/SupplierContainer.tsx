// import ProductAdsCard from "./ProductAdsCard";
import SupplierCard from "./SupplierCard";

const SupplierContainer = () => {
  return (
    <div>
      {/* <ProductAdsCard /> */}
      <div className="flex flex-col gap-6 mt-6">
        {Array(8)
          .fill(0)
          .map((value, idx) => (
            <SupplierCard key={idx} />
          ))}
      </div>
    </div>
  );
};

export default SupplierContainer;
