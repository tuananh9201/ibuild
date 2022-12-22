import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import { NextPageWithLayout } from "./_app";
import { Row, Col, Select, Pagination } from "antd";
import Head from "next/head";
import ProductFilter from "@/components/filters/product-filter";
import ProductCard from "@/components/products/product-card";
import suppliers from "../data/suppliers.json";

const HomePage: NextPageWithLayout = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
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
              <div className="result-sort">
                <Select
                  defaultValue="latest"
                  style={{
                    width: 205,
                    height: 46,
                    fontSize: 16,
                    fontWeight: 400,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: "latest",
                      label: "Mới nhất",
                    },
                    {
                      value: "older",
                      label: "Cũ nhất",
                    },
                  ]}
                />
              </div>
            </div>
            <div className="products-result">
              <Row>
                {suppliers.map((supplier) => {
                  return (
                    <Col
                      key={supplier.id}
                      style={{ padding: 12 }}
                      sm={24}
                      md={12}
                      lg={8}
                    >
                      <ProductCard supplier={supplier} />
                    </Col>
                  );
                })}
              </Row>
            </div>
            <div className="pagination">
              <Pagination defaultCurrent={1} total={50} />
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
