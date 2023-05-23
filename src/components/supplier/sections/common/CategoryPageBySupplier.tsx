import { useEffect, useState } from "react";

import {
  FilterRelated,
  LitsProductLoading,
  NoFoundResult,
  ProductTypes,
} from "@/components/common";
import { SearchIcon } from "@/images/icons/product_types/icon_wrapper";
import { Product, SearchProduct } from "@/lib/types";
import { searchProduct } from "@/lib/api/product";
import ProductCard from "@/components/products/ListProduct/ProductCard";
import { Pagination } from "antd";
import { scrollToTop } from "@/lib/hooks";
import CategoryCarousel from "./CategoryCarousel";

interface CategoryPageBySupplierProps {
  supplierId: string;
  rootCategoryId: string;
  categoryId?: string;
  resetTab: (id: string) => void;
}

const RELATED_LIST = [
  {
    id: 1,
    value: "Sản phẩm mới",
    slug: "SAN_PHAM_MOI",
  },
  {
    id: 2,
    value: "Giá tăng dần",
    slug: "GIA_TANG_DAN",
  },
  {
    id: 3,
    value: "Giá giảm dần",
    slug: "GIA_GIAM_DAN",
  },
  {
    id: 4,
    value: "Theo dõi nhiều nhất",
    slug: "THEO_DOI_NHIEU_NHAT",
  },
];

const CategoryPageBySupplier = ({
  supplierId,
  rootCategoryId,
  categoryId,
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

  const onChangePagination = (page: number) => {
    setPaging({ ...paging, current: page });
    setParams((prev) => ({
      ...prev,
      skip: (page - 1) * 9,
    }));
    scrollToTop(700);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPaging((prev) => ({
        ...prev,
        current: 1,
      }));
      setParams((prev) => ({
        ...prev,
        skip: 0,
        keyword: inputValue,
      }));
      resetTab("0");
    }
  };

  const handleChangeSort = (id: number) => {
    const sort = RELATED_LIST.find((r) => r.id === id);
    if (sort) {
      setPaging((prev) => ({
        ...prev,
        current: 1,
      }));
      setParams((prev) => ({
        ...prev,
        skip: 0,
        sort_by: sort.slug,
      }));
    }
  };

  useEffect(() => {
    setPaging((prev) => ({
      ...prev,
      current: 1,
    }));
    setParams((prev) => ({
      ...prev,
      skip: 0,
      category_id: rootCategoryId !== "0" ? [rootCategoryId] : [],
      keyword: inputValue,
    }));
    setCurrentActive("all");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootCategoryId]);

  useEffect(() => {
    setPaging((prev) => ({
      ...prev,
      current: 1,
    }));
    setParams((prev) => ({
      ...prev,
      skip: 0,
      category_id: currentActive === "all" ? [rootCategoryId] : [currentActive],
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentActive]);

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
        <CategoryCarousel
          supplierId={supplierId}
          rootCategoryId={rootCategoryId}
          currentActive={currentActive}
          categoryId={categoryId}
          setCurrentActive={setCurrentActive}
        />
        <div className="w-[300px]">
          <FilterRelated
            defaultValue={1}
            options={RELATED_LIST}
            onSelect={handleChangeSort}
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
          pageSize={9}
          total={paging.total}
          hideOnSinglePage
        />
      </div>
    </>
  );
};

export default CategoryPageBySupplier;
