import React, { useState } from "react";
import { useRouter } from "next/router";
import { Pagination } from "antd";

import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/main-layout";
import SupplierContainer from "@/components/supplier/SupplierContainer";
import Breadcrums from "@/components/common/breadcrums";
import FilterSingle from "@/components/filters/filter-single";

const ListProductCategory: NextPageWithLayout = () => {
  const router = useRouter();

  const [paging, setPaging] = useState({
    current: 1,
    total: 200,
  });

  const breadcrumbs = [
    {
      title: "Tìm kiếm",
      slug: "tim-kiem-nhom-san-pham",
    },
    {
      title: "Nhóm sản phẩm",
      slug: "tim-kiem-nhom-san-pham",
    },
    {
      title: "Nhóm sản phẩm",
      slug: router.query.slug as string,
    },
  ];

  const onChangePagination = (page: number) => {
    setPaging({ ...paging, current: page });
  };

  return (
    <section>
      <Breadcrums breadcrumbs={breadcrumbs} />
      <h1 className="text-text-color font-medium text-2xl my-8">
        Vật liệu nhựa xây dựng
      </h1>
      <FilterSingle />
      <SupplierContainer data={[]} />
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

ListProductCategory.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default ListProductCategory;
