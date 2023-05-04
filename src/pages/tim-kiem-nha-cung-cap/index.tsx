import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Pagination } from "antd";
import { useRouter } from "next/router";

import FilterSingle from "@/components/filters/filter-single";
import MainLayout from "@/components/main-layout";
import ProductSearch from "@/components/products/ProductSearch";
import SupplierContainer from "@/components/supplier/SupplierContainer";
import SupplierContainerLoading from "@/components/supplier/SupplierContainerLoading";
import NoFoundProduct from "@/components/products/NoFoundProduct";
import { OPTIONS_SELECT } from "@/constants/data";
import { fetchListSupplierBySearch } from "@/lib/api/supplier";
import { ISupplierInfo } from "@/lib/types";
import { NextPageWithLayout } from "../_app";
import { FormatNumber, scrollToTop } from "@/lib/hooks";

const SearchSupplier: NextPageWithLayout = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("2");
  const [paging, setPaging] = useState({
    current: 1,
    total: 0,
  });
  const [data, setData] = useState<ISupplierInfo[]>([]);
  const [payload, setPayload] = useState({
    skip: 0,
    limit: 8,
    name: router.query?.search as string,
    sort_by: "PRODUCTS",
    cities: [],
    districts: [],
  });
  const [isLoading, setIsLoading] = useState(false);

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
    scrollToTop();
    setPaging({ ...paging, current: page });
    setPayload({
      ...payload,
      skip: page === 1 ? 0 : (page - 1) * 8,
    });
  };
  const loadData = async () => {
    setIsLoading(true);
    const res = await fetchListSupplierBySearch(payload);
    setIsLoading(false);
    if (res) {
      setData(res.data);
      setPaging({
        ...paging,
        total: res.paging.total,
      });
    }
  };
  const changeSort = (sort: string) => {
    setPaging({
      ...paging,
      current: 1,
      total: 0,
    });
    setPayload({
      ...payload,
      skip: 0,
      sort_by: sort,
    });
  };
  const changeChecked = (values: any) => {
    const listCity = values?.filter((item: any) => item.type === 1);
    const listDistrict = values?.filter((item: any) => item.type === 2);
    setPaging({
      ...paging,
      current: 1,
      total: 0,
    });
    setPayload({
      ...payload,
      skip: 0,
      cities: listCity ? listCity.map((city: any) => city.value) : [],
      districts: listDistrict
        ? listDistrict.map((district: any) => district.value)
        : [],
    });
  };

  useEffect(() => {
    if (router.query?.search) {
      setKeyword(router.query?.search as string);
      setPayload({
        ...payload,
        skip: 0,
        name: router.query?.search as string,
      });
      setPaging({
        ...paging,
        current: 1,
        total: 0,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query?.search]);

  useEffect(() => {
    if (!payload.name) return;
    loadData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <>
      <Head>
        <title>Tìm kiếm nhà cung cấp</title>
      </Head>
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
          <h1 className="text-secondary-color font-medium text-[32px] leading-[125%] mb-2 line-clamp-1">
            {keyword}
          </h1>
          <p className="font-normal text-base leading-[150%] text-[#a09c9c] line-clamp-2">
            Tìm thấy {paging.total ? FormatNumber(paging.total) : 0} kết quả “
            {keyword}”
          </p>
        </div>
        <FilterSingle changeSort={changeSort} changeChecked={changeChecked} />
        {isLoading && <SupplierContainerLoading items={8} />}
        {!isLoading && data && data.length > 0 && (
          <SupplierContainer data={data} />
        )}
        {!isLoading && data.length === 0 && (
          <NoFoundProduct
            title={keyword}
            content="Không tìm thấy nhà cung cấp"
          />
        )}
        <div className="w-full text-center mt-6">
          <Pagination
            onChange={onChangePagination}
            current={paging.current}
            pageSize={8}
            total={paging.total}
            hideOnSinglePage
          />
        </div>
      </section>
    </>
  );
};

SearchSupplier.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default SearchSupplier;
