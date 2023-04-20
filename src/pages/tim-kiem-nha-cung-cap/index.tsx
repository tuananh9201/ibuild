import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/main-layout";
import ProductSearch from "@/components/products/ProductSearch";
import { OPTIONS_SELECT } from "@/constants/data";
import FilterSingle from "@/components/filters/filter-single";

const SearchSupplier: NextPageWithLayout = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState(
    (router.query?.search_type as string) || "0"
  );

  const handleRedirectToPage = () => {
    if (searchType === "2") {
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
  // const loadData =

  useEffect(() => {
    if (router.query?.search) {
    }
  }, [router.query?.search]);

  return (
    <section>
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
          Tìm thấy {0} kết quả “{keyword || router.query.search}”
        </p>
      </div>
      <FilterSingle />
    </section>
  );
};

SearchSupplier.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default SearchSupplier;
