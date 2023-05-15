import Link from "next/link";
import useSWR from "swr";

import { getListProductBySupplier } from "@/lib/api/product";
import { Product } from "@/lib/types";
import ListProductLoading from "../common/ListProductLoading";
import ListProduct from "./ListProduct";

interface ProductSectionProps {
  title: string;
  supplierId?: string;
  productId?: string;
  slug?: string;
}

const ProductSection = ({
  title,
  supplierId,
  productId,
  slug,
}: ProductSectionProps) => {
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
        <Link href={`/nha-cung-cap/${slug}`}>
          <button className="text-primary-color font-roboto not-italic font-medium text-base leading-[150%]">
            Xem thêm
          </button>
        </Link>
      </div>
      {isLoading ? (
        <ListProductLoading
          items={4}
          className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        />
      ) : (
        <ListProduct products={data || []} />
      )}
    </div>
  );
};

export default ProductSection;
