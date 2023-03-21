import { bookImage, designImage, productImage } from "@/constants/images";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>
          IBUILD | Báo giá xây dựng, danh bạ xây dựng, văn bản xây dựng, tin tức
          xây dựng
        </title>
      </Head>
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="flex flex-col justify-start py-4 lg:py-0 px-8 lg:pt-14 lg:pr-0 lg:pb-0 lg:pl-0"
      >
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
        <section className="mt-[10px] mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0 ">
            <div className="w-full h-full relative">
              <Link href="/san-pham">
                <Image
                  priority
                  placeholder="blur"
                  className="card-image w-full h-full"
                  src={productImage}
                  alt="product"
                />
                <motion.div
                  initial={{ y: 200, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 2,
                  }}
                  className="absolute w-full bottom-24 lg:top-[418px] left-0 text-white"
                >
                  <h2 className="text-2xl font-semibold text-center">
                    Sản phẩm
                  </h2>
                  <div className="max-w-[240px] pt-6 pr-2 pb-0 pl-2 my-0 mx-auto">
                    <p className="text-sm font-normal text-center">
                      Nisl debitis tincidunt expedita architecto, ligula,
                      sapiente interdum? Soluta montes nec? Elit rhoncus earum
                      dui dolor consequatur veniam doloremque incididunt,
                      aspernatur sapiente fames nonummy porro.
                    </p>
                  </div>
                </motion.div>
              </Link>
            </div>

            <div className="w-full h-full relative">
              <Link href="/mau-thiet-ke">
                <Image
                  priority
                  placeholder="blur"
                  className="card-image w-full h-full"
                  src={bookImage}
                  alt="book"
                />
                <motion.div
                  initial={{ y: 200, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 2,
                  }}
                  className="absolute w-full bottom-24 lg:top-[418px] left-0 text-white"
                >
                  <h2 className="text-2xl font-semibold text-center">
                    Mẫu thiết kế
                  </h2>
                  <div className="max-w-[240px] pt-6 pr-2 pb-0 pl-2 my-0 mx-auto">
                    <p className="text-sm font-normal text-center">
                      Nisl debitis tincidunt expedita architecto, ligula,
                      sapiente interdum? Soluta montes nec? Elit rhoncus earum
                      dui dolor consequatur veniam doloremque incididunt,
                      aspernatur sapiente fames nonummy porro.
                    </p>
                  </div>
                </motion.div>
              </Link>
            </div>
            <div className="w-full h-full relative">
              <Link href="van-ban-phap-ly">
                <Image
                  priority
                  placeholder="blur"
                  className="card-image w-full h-full"
                  src={designImage}
                  alt="design"
                />
                <motion.div
                  initial={{ y: 200, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 2,
                  }}
                  className="absolute w-full bottom-24 lg:top-[418px] left-0 text-white"
                >
                  <h2 className="text-2xl font-semibold text-center">
                    Văn bản pháp lý
                  </h2>
                  <div className="max-w-[240px] pt-6 pr-2 pb-0 pl-2 my-0 mx-auto">
                    <p className="text-sm font-normal text-center">
                      Nisl debitis tincidunt expedita architecto, ligula,
                      sapiente interdum? Soluta montes nec? Elit rhoncus earum
                      dui dolor consequatur veniam doloremque incididunt,
                      aspernatur sapiente fames nonummy porro.
                    </p>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </section>
      </motion.div>
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
