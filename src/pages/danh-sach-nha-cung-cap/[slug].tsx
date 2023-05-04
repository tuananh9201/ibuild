import { Pagination } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import FilterSingle from "@/components/filters/filter-single";
import MainLayout from "@/components/main-layout";
import NoFoundProduct from "@/components/products/NoFoundProduct";
import SupplierContainer from "@/components/supplier/SupplierContainer";
import SupplierContainerLoading from "@/components/supplier/SupplierContainerLoading";
import {
  fetchInfoSupplierBySlug,
  fetchListSupplierByCategoryId,
} from "@/lib/api/supplier";
import { ICategory, ISupplierInfo } from "@/lib/types";
import { NextPageWithLayout } from "../_app";
import { scrollToTop } from "@/lib/hooks";

const ListProductCategory: NextPageWithLayout = () => {
  const router = useRouter();
  const { query } = router;

  const [paging, setPaging] = useState({
    current: 1,
    total: 0,
  });
  const [params, setParams] = useState({
    category_id: "",
    skip: 0,
    limit: 8,
    sort_by: "PRODUCTS",
    cities: [],
  });
  const [data, setData] = useState<ISupplierInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data: categoryInfo } = useSWR<ICategory>(
    query?.slug,
    fetchInfoSupplierBySlug
  );

  const onChangePagination = (page: number) => {
    scrollToTop();
    setPaging({ ...paging, current: page });
    setParams({
      ...params,
      skip: page === 1 ? 0 : (page - 1) * 8,
    });
  };
  const loadData = async () => {
    setIsLoading(true);
    const res = await fetchListSupplierByCategoryId(params);
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
    setParams({
      ...params,
      skip: 0,
      sort_by: sort,
    });
  };
  const changeChecked = (values: any) => {
    setPaging({
      ...paging,
      current: 1,
      total: 0,
    });
    setParams({
      ...params,
      skip: 0,
      cities: values,
    });
  };

  useEffect(() => {
    if (categoryInfo?.id) {
      setParams({
        ...params,
        category_id: categoryInfo.id,
      });
    }
  }, [categoryInfo]);

  useEffect(() => {
    if (params.category_id) {
      loadData();
    }
  }, [params]);

  return (
    <section>
      <h1 className="text-text-color font-medium text-2xl my-8">
        {categoryInfo?.name_vi || ""}
      </h1>
      <FilterSingle changeSort={changeSort} changeChecked={changeChecked} />
      {isLoading && <SupplierContainerLoading items={8} />}
      {!isLoading && data && data.length > 0 && (
        <SupplierContainer data={data} />
      )}
      {!isLoading && data.length === 0 && (
        <NoFoundProduct
          title={categoryInfo?.name_vi || ""}
          content="Không tìm thấy nhà cung cấp"
        />
      )}
      <div className="w-full text-center mt-4">
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

ListProductCategory.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default ListProductCategory;
