import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

import MainLayout from "@/components/main-layout";
import ListProductGroup from "@/components/products/ListProductGroup";
import NoFoundProduct from "@/components/products/NoFoundProduct";
import ProductSearch from "@/components/products/ProductSearch";
import { NextPageWithLayout } from "../_app";
import { fetchProductCategoryBySearch } from "@/lib/api/category";
import { ICategory } from "@/lib/types";
import { OPTIONS_SELECT } from "@/constants/data";

const SearchProductGroup: NextPageWithLayout = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState(
    (router.query?.search_type as string) || "0"
  );
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
  }, [router.query?.search]);

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
          Tìm thấy {data ? data.length : 0} kết quả “
          {keyword || router.query.search}”
        </p>
      </div>
      {data && data?.length > 0 ? (
        <ListProductGroup data={data || []} />
      ) : (
        <NoFoundProduct title={keyword} />
      )}
    </section>
  );
};

SearchProductGroup.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default SearchProductGroup;
