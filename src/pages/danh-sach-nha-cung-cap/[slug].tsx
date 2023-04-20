import React from "react";
import { useRouter } from "next/router";

import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/main-layout";
import SupplierContainer from "@/components/supplier/SupplierContainer";
import Breadcrums from "@/components/common/breadcrums";

const ListProductCategory: NextPageWithLayout = () => {
  const router = useRouter();
  console.log(router);

  // const loadProductCategory =

  const breadcrumbs = [
    {
      title: "Tìm kiếm nhóm sản phẩm",
      slug: "tim-kiem-nhom-san-pham",
    },
    {
      title: "Nhóm sản phẩm",
      slug: router.query.slug as string,
    },
  ];

  return (
    <section>
      <Breadcrums breadcrumbs={breadcrumbs} />

      <SupplierContainer />
    </section>
  );
};

ListProductCategory.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default ListProductCategory;
