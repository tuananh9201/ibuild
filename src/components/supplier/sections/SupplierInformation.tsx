import useSWR from "swr";

import { LitsProductLoading, NoFoundResult } from "@/components/common";
import Banner from "@/components/common/banner";
import ProductCard from "@/components/products/ListProduct/ProductCard";
import { searchProduct } from "@/lib/api/product";
import ColumnChart from "./charts/ColumnChart";
import PieChart from "./charts/PieChart";
import { ISupplierInfo } from "@/lib/types";

interface SupplierInformationProps {
  supplierId: string;
  supplier: ISupplierInfo;
}

const SupplierInformation = ({
  supplierId,
  supplier,
}: SupplierInformationProps) => {
  const params = {
    keyword: "",
    category_id: [],
    limit: 8,
    skip: 0,
    sort_by: "THEO_DOI_NHIEU_NHAT",
    max_quantity: 10000,
    min_quantity: 0,
    max_price: 10000000000,
    min_price: 0,
    cities: [],
    districts: [],
    supplier_id: supplierId,
  };

  const { data, isLoading } = useSWR(params, searchProduct);

  if (!data) return null;

  const products = data?.data;

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 justify-between mb-10">
        <div className="w-[40%] lg:w-[30%]">
          <PieChart supplierId={supplierId} />
        </div>
        <div className="flex-base">
          <ColumnChart supplierId={supplierId} />
        </div>
      </div>
      {supplier?.promotion_banners &&
        supplier?.promotion_banners?.length > 0 && (
          <Banner images={supplier?.promotion_banners} />
        )}
      <div className="mt-16">
        <h2 className="text-text-color font-medium text-xl mb-6">
          Sản phẩm được theo dõi nhiều nhất
        </h2>
        {!isLoading && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products &&
              products?.length > 0 &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        )}
        {isLoading && (
          <LitsProductLoading
            items={9}
            className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
          />
        )}
        {!isLoading && products?.length === 0 && (
          <NoFoundResult content="Không có sản phẩm nào" />
        )}
      </div>
    </>
  );
};

export default SupplierInformation;
