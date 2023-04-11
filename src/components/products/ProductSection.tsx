import { useState } from "react";
import useSWR from "swr";

import { Product } from "@/lib/types";
import ListProduct from "./ListProduct";
import { getListProductBySupplier } from "@/lib/api/product";
import ListProductLoading from "../common/ListProductLoading";

interface ProductSectionProps {
  supplierId?: string;
  productId?: string;
}

const ProductSection = ({ supplierId, productId }: ProductSectionProps) => {
  const { data, isLoading } = useSWR<Product[]>(
    { supplierId, productId },
    getListProductBySupplier
  );

  return (
    <div className="max-w-[1280px] mx-auto my-0 mt-10">
      <div className="flex flex-row justify-between items-center mb-6">
        <h3 className="font-roboto not-italic font-medium text-xl leading-[150%] text-text-color">
          Cùng nhà cung cấp
        </h3>
        <button className="text-primary-color font-roboto not-italic font-medium text-base leading-[150%]">
          Xem thêm
        </button>
      </div>
      {isLoading ? (
        <ListProductLoading items={4} />
      ) : (
        <ListProduct products={data || []} />
      )}
    </div>
  );
};

export default ProductSection;
