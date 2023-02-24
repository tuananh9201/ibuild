import { NextPageWithLayout } from "./_app";
import { productImage, designImage, bookImage } from "@/constants/images";
import MainLayout from "../components/main-layout";

import { Col, Row } from "antd";
import Image from "next/image";
import { ReactElement } from "react";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <div className="main-content">
        <section className="slogan-page">
          <h1 className="title">Trao quyền cho thế giới để xây dựng</h1>
          <div>
            <p>
              Nisl debitis tincidunt expedita architecto, ligula, sapiente
              interdum? Soluta montes nec? Elit rhoncus earum dui dolor
              consequatur veniam doloremque incididunt, aspernatur sapiente
              fames nonummy porro.
            </p>
          </div>
        </section>
        <section className="cards">
          <Row>
            <Col span={8}>
              <div className="card">
                <Image
                  className="card-image"
                  src={productImage}
                  alt="product"
                />
                <div className="card-introduce">
                  <h2>Sản phẩm</h2>
                  <div className="description">
                    <p>
                      Nisl debitis tincidunt expedita architecto, ligula,
                      sapiente interdum? Soluta montes nec? Elit rhoncus earum
                      dui dolor consequatur veniam doloremque incididunt,
                      aspernatur sapiente fames nonummy porro.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="card">
                <Image className="card-image" src={designImage} alt="design" />
                <div className="card-introduce">
                  <h2>Mẫu thiết kế</h2>
                  <div className="description">
                    <p>
                      Nisl debitis tincidunt expedita architecto, ligula,
                      sapiente interdum? Soluta montes nec? Elit rhoncus earum
                      dui dolor consequatur veniam doloremque incididunt,
                      aspernatur sapiente fames nonummy porro.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="card">
                <Image className="card-image" src={bookImage} alt="book" />
                <div className="card-introduce">
                  <h2>Văn bản pháp lý</h2>
                  <div className="description">
                    <p>
                      Nisl debitis tincidunt expedita architecto, ligula,
                      sapiente interdum? Soluta montes nec? Elit rhoncus earum
                      dui dolor consequatur veniam doloremque incididunt,
                      aspernatur sapiente fames nonummy porro.
                    </p>
                  </div>
                </div>
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
