import { bookImage, designImage, productImage } from "@/constants/images";
import MainLayout from "../components/main-layout";
import { NextPageWithLayout } from "./_app";

import { Col, Row } from "antd";
import Image from "next/image";
import { ReactElement } from "react";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <div className="flex flex-col justify-start px-4 pt-[60px] pb-0">
        <section>
          <h1 className="text-4xl font-semibold text-center leading-[calc(45/36)]">
            Trao quyền cho thế giới để xây dựng
          </h1>
          <div className="pt-[10px] max-w-[836px] mx-auto my-0">
            <p className="text-sm font-normal text-center leading-[calc(21/14)]">
              Nisl debitis tincidunt expedita architecto, ligula, sapiente
              interdum? Soluta montes nec? Elit rhoncus earum dui dolor
              consequatur veniam doloremque incididunt, aspernatur sapiente
              fames nonummy porro.
            </p>
          </div>
        </section>
        <section className="mt-10 mb-[10px]">
          <Row>
            <Col lg={8} md={24}>
              <div className="relative">
                <Image src={productImage} alt="product" />
                <div className="absolute w-full top-[40%] lg:top-[418px] left-0 text-[#fff]">
                  <h2 className="text-2xl font-semibold leading-[calc(30/24)] text-center">
                    Sản phẩm
                  </h2>
                  <div className="max-w-[247px] px-[10px] pt-6 pb-0 mx-auto my-0">
                    <p className="text-[14px] font-normal leading-[calc(21/14)] text-center">
                      Nisl debitis tincidunt expedita architecto, ligula,
                      sapiente interdum? Soluta montes nec? Elit rhoncus earum
                      dui dolor consequatur veniam doloremque incididunt,
                      aspernatur sapiente fames nonummy porro.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={8} md={24}>
              <div className="relative">
                <Image src={bookImage} alt="book" />
                <div className="absolute w-full top-[40%] lg:top-[418px] left-0 text-[#fff]">
                  <h2 className="text-2xl font-semibold leading-[calc(30/24)] text-center">
                    Mẫu thiết kế
                  </h2>
                  <div className="max-w-[247px] px-[10px] pt-6 pb-0 mx-auto my-0">
                    <p className="text-[14px] font-normal leading-[calc(21/14)] text-center">
                      Nisl debitis tincidunt expedita architecto, ligula,
                      sapiente interdum? Soluta montes nec? Elit rhoncus earum
                      dui dolor consequatur veniam doloremque incididunt,
                      aspernatur sapiente fames nonummy porro.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={8} md={24}>
              <div className="relative">
                <Image src={designImage} alt="design" />
                <div className="absolute w-full top-[40%] lg:top-[418px] left-0 text-[#fff]">
                  <h2 className="text-2xl font-semibold leading-[calc(30/24)] text-center">
                    Văn bản pháp lý
                  </h2>
                  <div className="max-w-[247px] px-[10px] pt-6 pb-0 mx-auto my-0">
                    <p className="text-[14px] font-normal leading-[calc(21/14)] text-center">
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
