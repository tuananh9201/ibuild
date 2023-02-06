import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import { NextPageWithLayout } from "./_app";
import { cardProd, docsRule, ibuildInfo, searchIcon } from "@/constants/images";
import { Row, Col } from "antd";
import Image from "next/image";
const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <div className="main-content">
        <section className="search-content">
          <div className="title">Trao quyền cho thế giới để xây dựng</div>
          <div className="search-input-container">
            <div className="search-icon">
              <Image src={searchIcon} alt="" />
            </div>
            <div className="input-search">
              <input
                type="text"
                className="form-control"
                id="search-input"
                placeholder="Bạn đang muốn tìm gì?"
              />
            </div>
            <div className="button-search">
              <button className="ibuild-btn btn-search">Tìm kiếm</button>
            </div>
          </div>
        </section>
        <section className="cards">
          <Row gutter={{ lg: 32 }}>
            <Col md={24} lg={8}>
              <div className="my-card card-product">
                <Image className="img-feat" src={cardProd} alt="" />
                <h3>Sản phẩm</h3>
                <span className="card-desc">
                  Nisl debitis tincidunt expedita architecto, ligula, sapiente
                  interdum? Soluta montes nec? Elit rhoncus earum dui dolor
                  consequatur veniam doloremque incididunt, aspernatur sapiente
                  fames nonummy porro.
                </span>
              </div>
            </Col>
            <Col md={24} lg={8}>
              <div className="my-card">
                <Image className="img-feat" src={docsRule} alt="" />
                <h3>Văn bản pháp lý</h3>
                <span className="card-desc">
                  Nisl debitis tincidunt expedita architecto, ligula, sapiente
                  interdum? Soluta montes nec? Elit rhoncus earum dui dolor
                  consequatur veniam doloremque incididunt, aspernatur sapiente
                  fames nonummy porro.
                </span>
              </div>
            </Col>
            <Col md={24} lg={8}>
              <div className="my-card">
                <Image className="img-feat" src={ibuildInfo} alt="" />
                <h3>Thông tin xây dựng</h3>
                <span className="card-desc">
                  Nisl debitis tincidunt expedita architecto, ligula, sapiente
                  interdum? Soluta montes nec? Elit rhoncus earum dui dolor
                  consequatur veniam doloremque incididunt, aspernatur sapiente
                  fames nonummy porro.
                </span>
              </div>
            </Col>
          </Row>
        </section>
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
