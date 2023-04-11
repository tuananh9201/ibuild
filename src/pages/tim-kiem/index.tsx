import { ReactElement, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Pagination } from "antd";
import Head from "next/head";
import Image from "next/image";

import { NextPageWithLayout } from "../_app";
import {
  FilterCategories,
  FilterRelated,
  LitsProductLoading,
} from "@/components/common";
import { FilterIcon } from "@/images/icons/product_types/icon_wrapper";
import { searchProduct } from "@/lib/api/product";
import { Product } from "@/lib/types";
import MainLayout from "@/components/main-layout";
import ProductSearch from "@/components/products/ProductSearch";
import ListProduct from "@/components/products/ListProduct";
import noSearchResult from "@/images/no_search_result.png";

const RELATED_LIST = [
  {
    id: 1,
    value: "Liên quan nhất",
    slug: "LIEN_QUAN_NHAT",
  },
  {
    id: 2,
    value: "Sản phẩm mới",
    slug: "SAN_PHAM_MOI",
  },
  {
    id: 3,
    value: "Lượt xem nhiều nhất",
    slug: "LUOT_XEM_NHIEU_NHAT",
  },
  {
    id: 4,
    value: "Lượt thích nhiều nhất",
    slug: "LUOT_THICH_NHIEU_NHAT",
  },
];

const SearchPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [isActiveFilterIcon, setIsActiveFilterIcon] = useState(false);
  const [paging, setPaging] = useState({
    current: 1,
    total: 0,
  });

  const [keywordSearch, setKeywordSearch] = useState(
    router.query.search as string
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const handleSelectRelated = async (value: number) => {};

  const handleShowFilter = () => {
    setIsActiveFilterIcon((prev) => !prev);
  };

  const getSearchResult = async () => {
    setIsLoadingData(true);
    const data = await searchProduct({
      keyword: keywordSearch || (router.query.search as string) || "all",
      limit: 12,
      skip: paging.current !== 1 ? paging.current * 12 : 0,
      sort_by: "LIEN_QUAN_NHAT",
      max_price: 0,
      min_price: 0,
      max_quantity: 0,
      min_quantity: 0,
    });
    setProducts(data.data);
    setPaging({
      ...paging,
      total: data.paging.total,
    });
    setIsLoadingData(false);
  };

  useEffect(() => {
    setPaging({ ...paging, current: 1, total: 0 });
    getSearchResult();
  }, [router.query]);

  useEffect(() => {
    getSearchResult();
  }, [paging.current]);

  return (
    <>
      <Head>
        <title>Tìm kiếm</title>
      </Head>
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <section className="max-w-[700px] mx-auto flex justify-center">
          <ProductSearch
            initialValue={keywordSearch}
            setInputValueToParent={setKeywordSearch}
          />
        </section>
        <section className="my-6 text-center font-roboto not-italic">
          <h1 className="text-secondary-color font-medium text-[32px] leading-[125%]">
            {keywordSearch || router.query.search}
          </h1>
          <p className="font-normal text-base leading-[150%] text-[#a09c9c]">
            Tìm thấy {paging.total || 0} kết quả “
            {keywordSearch || router.query.search}”
          </p>
        </section>
        <section className="flex flex-row justify-between">
          <FilterRelated
            defaultValue={1}
            options={RELATED_LIST}
            onSelect={handleSelectRelated}
          />
          <div
            className={`flex flex-row items-center px-4 py-3 rounded border border-[#e6e6e6] text-[#333333] cursor-pointer group transition ${
              isActiveFilterIcon ? "bg-primary-color text-white" : ""
            }`}
            onClick={handleShowFilter}
          >
            <FilterIcon className="" />
            <span className="font-roboto not-italic font-medium text-base leading-[150%] text-inherit ml-3">
              Bộ lọc
            </span>
          </div>
        </section>
        <section>{isActiveFilterIcon && <FilterCategories />}</section>
        <section className="mt-4">
          {isLoadingData ? (
            <LitsProductLoading items={12} />
          ) : (
            <ListProduct products={products} />
          )}
        </section>
        {products.length === 0 && (
          <section className="mt-16">
            <div className="w-full text-center">
              <Image
                src={noSearchResult}
                alt="no find search result"
                className="mx-auto mb-4"
              />
              <h2 className="font-roboto not-italic font-medium text-xl leading-[150%] text-[rgba(0, 0, 0, 0.9)] mb-2">
                Không tìm thấy sản phẩm
              </h2>
              <p className="font-roboto not-italic font-normal text-base leading-[150%] text-[f7f7f7]">
                “{keywordSearch}” không trùng khớp với bất kì sản phẩm hiện có,
                xin vui lòng kiểm tra lại.
              </p>
            </div>
            <div>
              <h3 className="font-roboto not-italic text-text-color text-2xl font-medium leading-[150%]">
                Sản phẩm được quan tâm
              </h3>
              <p>nhung san pham lien quan</p>
            </div>
          </section>
        )}
        <section className="mt-4">
          <div className="w-full text-center">
            <Pagination
              onChange={(page) => setPaging({ ...paging, current: page })}
              current={paging.current}
              pageSize={12}
              total={paging.total}
              hideOnSinglePage
            />
          </div>
        </section>
      </motion.div>
    </>
  );
};

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default SearchPage;
