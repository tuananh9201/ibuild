import React from "react";
import FilterLocation from "./filter-location";
import FilterPrice from "./filter-price";
import FilterQuantity from "./filter-quantity";

type Props = {};

const ProductFilter = (props: Props) => {
  return (
    <div className="filter-container">
      <h3 className="filter-title">Bộ lọc</h3>
      <FilterLocation />
      <FilterPrice />
      <FilterQuantity />
    </div>
  );
};
export default ProductFilter;
