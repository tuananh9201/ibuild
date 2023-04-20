import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import useSWR from "swr";

import MainLayout from "@/components/main-layout";
import { NextPageWithLayout } from "../_app";
import ListProductGroup from "@/components/products/ListProductGroup";
import { fetchProductCategoryBySearch } from "@/lib/api/category";
import { ICategory } from "@/lib/types";
import ProductSearch from "@/components/products/ProductSearch";

const SearchProductGroup: NextPageWithLayout = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("0");

  const { data } = useSWR<ICategory[]>(
    router.query?.search as string,
    fetchProductCategoryBySearch
  );

  const handleRedirectToPage = () => {};

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
      <ListProductGroup data={data || []} />
    </section>
  );
};

SearchProductGroup.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default SearchProductGroup;
