import { Pagination } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import FilterSingle from "@/components/filters/filter-single";
import MainLayout from "@/components/main-layout";
import ProductSearch from "@/components/products/ProductSearch";
import SupplierContainer from "@/components/supplier/SupplierContainer";
import { OPTIONS_SELECT } from "@/constants/data";
import { fetchListSupplierBySearch } from "@/lib/api/supplier";
import { ISupplierInfo } from "@/lib/types";
import { NextPageWithLayout } from "../_app";

const SearchSupplier: NextPageWithLayout = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState(router.query?.search as string);
  const [searchType, setSearchType] = useState("2");
  const [paging, setPaging] = useState({
    current: 1,
    total: 200,
  });
  const [data, setData] = useState<ISupplierInfo[]>([]);
  const [payload, setPayload] = useState({
    skip: 0,
    limit: 8,
    name: router.query?.search as string,
  });

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
  const onChangePagination = (page: number) => {
    setPaging({ ...paging, current: page });
  };
  const loadData = async () => {
    console.log(payload);
    const res = await fetchListSupplierBySearch(payload);
    if (res) {
      setData(res.data);
    }
    console.log(res);
  };

  // useEffect(() => {
  //   if (router.query?.search_type) {
  //     setSearchType(router.query.search_type as string);
  //   }
  //   if (router.query?.search) {
  //     setKeyword(router.query?.search as string);
  //     setPayload({
  //       ...payload,
  //       name: router.query?.search as string,
  //     });
  //   }
  // }, [router.query]);

  useEffect(() => {
    loadData();
  }, [payload]);

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
          {keyword}
        </h1>
        <p className="font-normal text-base leading-[150%] text-[#a09c9c]">
          Tìm thấy {0} kết quả “{keyword}”
        </p>
      </div>
      <FilterSingle />
      <SupplierContainer data={data} />
      <div className="w-full text-center">
        <Pagination
          onChange={onChangePagination}
          current={paging.current}
          pageSize={12}
          total={paging.total}
          hideOnSinglePage
        />
      </div>
    </section>
  );
};

SearchSupplier.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default SearchSupplier;
