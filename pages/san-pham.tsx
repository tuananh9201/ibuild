import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import { NextPageWithLayout } from "./_app";
import { Row, Col } from "antd";
import Head from "next/head";
import ProductFilter from "@/components/filters/product-filter";
import ProductCard from "@/components/products/product-card";
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
          <div className="products">
            <div className="result-desc">
              <div className="result-text">
                Kết quả tìm kiếm cho từ khoá 'Thiết bị vệ sinh'
              </div>
              <div className="result-sort">Mới nhất</div>
            </div>
            <div className="products-result">
              <Row>
                <Col sm={24} md={12} lg={8}>
                  <ProductCard />
                </Col>
              </Row>
            </div>
          </div>
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
