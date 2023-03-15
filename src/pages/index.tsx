import { NextPageWithLayout } from "./_app";
import { productImage, designImage, bookImage } from "@/constants/images";
import MainLayout from "../components/main-layout";
import Image from "next/image";
import { ReactElement } from "react";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <div className="flex flex-col justify-start py-4 lg:py-0 px-8 lg:pt-14 lg:pr-0 lg:pb-0 lg:pl-0">
        <section className="slogan-page mb-10">
          <h1 className="text-3xl font-semibold text-center">
            Trao quyền cho thế giới để xây dựng
          </h1>
          <div className="w-full text-center lg:px-56 mt-2 font-normal font-roboto text-sm text-[#333333] opacity-90">
            <p>
              Nisl debitis tincidunt expedita architecto, ligula, sapiente
              interdum? Soluta montes nec? Elit rhoncus earum dui dolor
              consequatur veniam doloremque incididunt, aspernatur sapiente
              fames nonummy porro.
            </p>
          </div>
        </section>
        <section className="cards">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0 ">
            <div className="w-full h-full relative">
              <Image
                priority
                placeholder="blur"
                className="card-image"
                src={productImage}
                alt="product"
              />
              <div className="absolute w-full top-[40%] lg:top-[418px] left-0 text-white">
                <h2 className="text-2xl font-semibold text-center">Sản phẩm</h2>
                <div className="max-w-[240px] pt-6 pr-2 pb-0 pl-2 my-0 mx-auto">
                  <p className="text-sm font-normal text-center">
                    Nisl debitis tincidunt expedita architecto, ligula, sapiente
                    interdum? Soluta montes nec? Elit rhoncus earum dui dolor
                    consequatur veniam doloremque incididunt, aspernatur
                    sapiente fames nonummy porro.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full h-full relative">
              <Image
                priority
                placeholder="blur"
                className="card-image"
                src={bookImage}
                alt="book"
              />
              <div className="absolute w-full top-[40%] lg:top-[418px] left-0 text-white">
                <h2 className="text-2xl font-semibold text-center">
                  Mẫu thiết kế
                </h2>
                <div className="max-w-[240px] pt-6 pr-2 pb-0 pl-2 my-0 mx-auto">
                  <p className="text-sm font-normal text-center">
                    Nisl debitis tincidunt expedita architecto, ligula, sapiente
                    interdum? Soluta montes nec? Elit rhoncus earum dui dolor
                    consequatur veniam doloremque incididunt, aspernatur
                    sapiente fames nonummy porro.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full h-full relative">
              <Image
                priority
                placeholder="blur"
                className="card-image"
                src={designImage}
                alt="design"
              />
              <div className="absolute w-full top-[40%] lg:top-[418px] left-0 text-white">
                <h2 className="text-2xl font-semibold text-center">
                  Văn bản pháp lý
                </h2>
                <div className="max-w-[240px] pt-6 pr-2 pb-0 pl-2 my-0 mx-auto">
                  <p className="text-sm font-normal text-center">
                    Nisl debitis tincidunt expedita architecto, ligula, sapiente
                    interdum? Soluta montes nec? Elit rhoncus earum dui dolor
                    consequatur veniam doloremque incididunt, aspernatur
                    sapiente fames nonummy porro.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
