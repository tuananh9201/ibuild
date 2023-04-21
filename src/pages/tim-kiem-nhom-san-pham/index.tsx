import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";

import MainLayout from "@/components/main-layout";
import ListProductGroup from "@/components/products/ListProductGroup";
import NoFoundProduct from "@/components/products/NoFoundProduct";
import ProductSearch from "@/components/products/ProductSearch";
import ProductCategoryLoading from "@/components/products/ProductCategoryLoading";
import { NextPageWithLayout } from "../_app";
import { fetchProductCategoryBySearch } from "@/lib/api/category";
import { ICategory } from "@/lib/types";
import { OPTIONS_SELECT } from "@/constants/data";
import LoadingIcon from "@/images/icons/LoadingIcon.png";

const SearchProductGroup: NextPageWithLayout = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("1");
  const [data, setData] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRedirectToPage = () => {
    if (searchType === "1") {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: keyword },
      });
      return;
    }
    const optionSelect = OPTIONS_SELECT.find(
      (option) => option.value === searchType
    );
    router.push({
      pathname: optionSelect?.path,
      query: {
        search: keyword,
        search_type: searchType,
      },
    });
  };
  const handleLoadMore = () => {};

  useEffect(() => {
    if (router.query?.search) {
      setKeyword(router.query?.search as string);
      const fetchProductCategory = async () => {
        setIsLoading(true);
        const res = await fetchProductCategoryBySearch(
          router.query?.search as string
        );
        setData(res);
        setIsLoading(false);
      };

      fetchProductCategory();
    }
  }, [router.query]);

  const showLoader = data && data.length > 8;

  return (
    <section className="mb-[64px]">
      <div className="p-4 lg:p-0 flex justify-center relative h-[100px]">
        <ProductSearch
          initialValue={keyword}
          selectValue={searchType}
          setInputValueToParent={setKeyword}
          onSelectValue={setSearchType}
          redirectToSearchPage={handleRedirectToPage}
        />
      </div>

      <div className="my-8 text-center font-roboto not-italic">
        <h1 className="text-secondary-color font-medium text-[32px] leading-[125%]">
          {keyword || router.query.search}
        </h1>
        <p className="font-normal text-base leading-[150%] text-[#a09c9c]">
          Tìm thấy {data ? new Intl.NumberFormat().format(data.length) : 0} kết
          quả “{keyword || router.query.search}”
        </p>
      </div>
      <InfiniteScroll
        dataLength={data.length}
        next={handleLoadMore}
        hasMore={true}
        loader
      >
        {!isLoading && <ListProductGroup data={data || []} />}
      </InfiniteScroll>
      {isLoading && (
        <Image
          src={LoadingIcon}
          alt="loading"
          className="animate-spin mx-auto mt-5"
        />
      )}
      {!isLoading && !data && <NoFoundProduct title={keyword} />}
    </section>
  );
};

SearchProductGroup.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default SearchProductGroup;
