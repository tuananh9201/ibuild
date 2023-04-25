import { Pagination } from "antd";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

import { FilterProduct, LitsProductLoading } from "@/components/common";
import MainLayout from "@/components/main-layout";
import ListProduct from "@/components/products/ListProduct";
import ProductSearch from "@/components/products/ProductSearch";
import { OPTIONS_SELECT } from "@/constants/data";
import noSearchResult from "@/images/no_search_result.png";
import { searchProduct } from "@/lib/api/product";
import { Product, SearchProduct } from "@/lib/types";
import { NextPageWithLayout } from "../_app";
import { FormatNumber } from "@/lib/hooks";

const SearchPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [paging, setPaging] = useState({
    current: 1,
    total: 0,
  });
  const [searchType, setSearchType] = useState("0");
  const [keywordSearch, setKeywordSearch] = useState(
    router.query.search as string
  );
  const [payload, setPayload] = useState<SearchProduct>({
    keyword: (router.query.search as string) || "",
    limit: 12,
    skip: paging.current !== 1 ? paging.current * 12 : 0,
    sort_by: "LIEN_QUAN_NHAT",
    max_price: 9999999999,
    min_price: 0,
    max_quantity: 9999999,
    min_quantity: 0,
    cities: [],
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const getSearchResult = async () => {
    setIsLoadingData(true);
    const data = await searchProduct(payload);
    setProducts(data.data);
    setPaging({
      ...paging,
      total: data.paging.total,
    });
    setIsLoadingData(false);
  };

  const handleResetFilter = () => {
    setRefresh((prev) => prev + 1);
    setPayload({
      ...payload,
      cities: [],
      max_quantity: 10000,
      min_quantity: 0,
      max_price: 10000000000,
      min_price: 0,
      limit: 12,
      skip: 0,
      category_id: [],
    });
  };

  useEffect(() => {
    setKeywordSearch(router.query.search as string);
    setPaging({ ...paging, current: 1, total: 0 });
    setPayload({
      ...payload,
      skip: 0,
      sort_by: "LIEN_QUAN_NHAT",
      keyword: router.query.search as string,
    });
  }, [router.query]);

  useEffect(() => {
    setPayload({
      ...payload,
      skip: paging.current !== 1 ? paging.current * 12 : 0,
    });
  }, [paging.current]);

  const onChangeSort = (sortSlug: string) => {
    if (sortSlug) {
      setPaging({ ...paging, current: 1, total: 0 });
      setPayload({
        ...payload,
        skip: 0,
        sort_by: sortSlug,
      });
    }
  };

  const handleToRedirectToSearchPage = () => {
    if (searchType === "0") {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: keywordSearch },
      });
      return;
    }
    const optionSelect = OPTIONS_SELECT.find(
      (option) => option.value === searchType
    );
    router.push({
      pathname: optionSelect?.path,
      query: {
        search: keywordSearch,
        search_type: searchType,
      },
    });
  };

  useEffect(() => {
    getSearchResult();
  }, [payload]);

  const onHandleApplyFilter = (params: SearchProduct) => {
    setPaging({ ...paging, current: 1, total: 0 });
    setPayload({
      ...payload,
      ...params,
    });
  };

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
        <section className="max-w-[700px] mx-auto flex justify-center h-[100px]">
          <ProductSearch
            initialValue={keywordSearch}
            selectValue={searchType}
            setInputValueToParent={setKeywordSearch}
            onSelectValue={setSearchType}
            redirectToSearchPage={handleToRedirectToSearchPage}
          />
        </section>
        <section className="my-6 text-center font-roboto not-italic">
          <h1 className="text-secondary-color font-medium text-[32px] leading-[125%]">
            {keywordSearch || router.query.search}
          </h1>
          <p className="font-normal text-base leading-[150%] text-[#a09c9c]">
            Tìm thấy {paging.total ? FormatNumber(paging.total) : 0} kết quả “
            {keywordSearch || router.query.search}”
          </p>
        </section>
        <FilterProduct
          categoryId={"0"}
          refresh={refresh}
          onChangeSort={onChangeSort}
          resetFilter={handleResetFilter}
          onHandleApplyFilter={onHandleApplyFilter}
        />
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
              onChange={(page: number) =>
                setPaging({ ...paging, current: page })
              }
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
