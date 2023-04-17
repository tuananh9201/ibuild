import { FilterProduct } from "@/components/common";
import Breadcrums from "@/components/common/breadcrums";
import MainLayout from "@/components/main-layout";
import SupplierContainer from "@/components/supplier/SupplierContainer";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import { ReactElement } from "react";

const ListSupplierByCategory: NextPageWithLayout = () => {
  const breadcrumbs = [
    {
      title: "Tìm kiếm",
      slug: "tim-kiem",
    },
    {
      title: "Nhóm sản phẩm",
      slug: "nhom-san-pham",
    },
  ];
  return (
    <>
      <Head>
        <title>Nhom san pham</title>
      </Head>

      <div>
        <Breadcrums breadcrumbs={breadcrumbs} />
        <h1 className="font-medium text-2xl leading-[150%] text-text-color my-8">
          Vật liệu nhựa xây dựng
        </h1>
        <div className="mb-6">
          <FilterProduct categoryId="" onChangeSort={() => {}} />
        </div>
        <SupplierContainer />
      </div>
    </>
  );
};

ListSupplierByCategory.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default ListSupplierByCategory;
