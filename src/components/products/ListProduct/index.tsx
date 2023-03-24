import { Fragment } from "react";

import ProductCard from "./ProductCard";

const ListProduct = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array(15)
        .fill(0)
        .map((value, idx) => (
          <div key={idx}>
            <ProductCard />
          </div>
        ))}
    </div>
  );
};

export default ListProduct;
