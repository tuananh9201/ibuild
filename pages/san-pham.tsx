import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import { NextPageWithLayout } from "./_app";
import Image from "next/image";
import Head from "next/head";
import ProductFilter from "@/components/filters/product-filter";
const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Sản phẩm</title>
      </Head>
      <div className="product-main">
        <div className="product-container">
          <div className="filter">
            <ProductFilter />
          </div>
          <div className="products"></div>
        </div>
      </div>
    </>
  );
};
HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};
export default HomePage;
