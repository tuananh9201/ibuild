import React from "react";
import FilterLocation from "./filter-location";
import FilterPrice from "./filter-price";
import FilterQuantity from "./filter-quantity";

type Props = {};

const ProductFilter = (props: Props) => {
  return (
    <div>
      <h3 className="not-italic font-medium text-xl leading-[150%] text-text-color mb-4">Bộ lọc</h3>
      <FilterLocation />
      <FilterPrice />
      <FilterQuantity />
    </div>
  );
};
export default ProductFilter;
