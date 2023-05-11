import { useEffect, useState } from "react";

import {
  FilterRelated,
  LitsProductLoading,
  NoFoundResult,
  ProductTypes,
} from "@/components/common";
import { SearchIcon } from "@/images/icons/product_types/icon_wrapper";
import { RELATED_LIST } from "@/constants/data";
import { Product, SearchProduct } from "@/lib/types";
import { searchProduct } from "@/lib/api/product";
import ProductCard from "@/components/products/ListProduct/ProductCard";
import { Pagination } from "antd";
import { scrollToTop } from "@/lib/hooks";

interface CategoryPageBySupplierProps {
  supplierId: string;
  resetTab: (id: string) => void;
}

const CategoryPageBySupplier = ({
  supplierId,
  resetTab,
}: CategoryPageBySupplierProps) => {
  const [currentActive, setCurrentActive] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState<SearchProduct>({
    keyword: "",
    category_id: [],
    limit: 9,
    skip: 0,
    sort_by: "SAN_PHAM_MOI",
    max_quantity: 10000,
    min_quantity: 0,
    max_price: 10000000000,
    min_price: 0,
    cities: [],
    districts: [],
    supplier_id: supplierId,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [paging, setPaging] = useState({
    current: 1,
    total: 0,
  });
  const [inputValue, setInputValue] = useState("");

  // api
  const getSearchResult = async () => {
    setIsLoading(true);
    const data = await searchProduct(params);
    setProducts(data.data);
    setPaging({
      ...paging,
      total: data.paging.total,
    });
    setIsLoading(false);
  };

  const handleClickCategory = (id: string) => {};

  const onChangePagination = (page: number) => {
    setPaging({ ...paging, current: page });
    scrollToTop();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setParams((prev) => ({
        ...prev,
        keyword: inputValue,
      }));
      resetTab("1");
    }
  };

  useEffect(() => {
    getSearchResult();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return (
    <>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <SearchIcon />
        </div>
        <input
          type="text"
          value={inputValue}
          placeholder="Tìm sản phẩm trong nhà cung cấp"
          className="w-full border border-solid border-[#dddddd] rounded py-4 px-12 placeholder:text-text-color placeholder:font-normal placeholder:text-base"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex flex-col gap-6 mt-8">
        <ProductTypes
          parentId="b15afc56-6e9e-11ec-af53-a3bfea3fbc56"
          currentActive={currentActive}
          itemsOnScreen={[4, 1, 2]}
          setCurrentActive={setCurrentActive}
          onClickItem={handleClickCategory}
        />
        <div className="w-[300px]">
          <FilterRelated
            defaultValue={1}
            options={RELATED_LIST}
            onSelect={() => {}}
          />
        </div>
        <div className="mt-16">
          {!isLoading && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
            />
          )}
          {!isLoading && products?.length === 0 && (
            <NoFoundResult content="Không có sản phẩm nào" />
          )}
        </div>
      </div>
      <div className="w-full text-center mt-8">
        <Pagination
          onChange={onChangePagination}
          current={paging.current}
          pageSize={12}
          total={paging.total}
          hideOnSinglePage
        />
      </div>
    </>
  );
};

export default CategoryPageBySupplier;
