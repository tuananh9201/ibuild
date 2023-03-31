import { Fragment } from "react";

import ProductCard from "./ProductCard";
import { Product } from "src/lib/types";
interface CardProductProps {
  products: Product[];
}
const ListProduct = ({ products }: CardProductProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ListProduct;
