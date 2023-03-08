import { ReactElement } from "react";
import MainLayout from "@/components/main-layout";
import { NextPageWithLayout } from "../_app";
import Head from "next/head";
import { ICategory } from "src/lib/types";
import Image from "next/image";
import style from "@/styles/modules/productCategories/index.module.scss";
import { sologan1, sologan2, sologan3 } from "@/constants/images";
type Props = {
  categories: ICategory[];
};
const SanPham: NextPageWithLayout<Props> = (props: Props) => {
  return (
    <>
      <Head>
        <title>Nhóm sản phẩm | IBUILD</title>
        <meta name="description" content="Nhóm sản phẩm" />
      </Head>
      <div className="my-20">
        <div className="flex flex-col items-center p-0 gap-6 max-w-max min-w-full">
          <div className="flex flex-row justify-center items-center gap-4 h-54 max-w-max min-w-full">
            <Image
              priority
              src={sologan1}
              alt="ibuild - nhóm sản phẩm"
              className="w-28"
            />
            <div className="text-3xl uppercase text-center leading-normal">
              Chúng tôi mang đến
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 h-54 max-w-max min-w-full">
            <div className="text-3xl uppercase text-center leading-normal">
              Sự tiện ích
            </div>
            <Image
              priority
              src={sologan2}
              alt="ibuild - nhóm sản phẩm"
              className="w-40"
            />
            <div className="text-3xl uppercase text-center  leading-normal">
              Tốt nhất
            </div>
          </div>
          <div className="flex flex-row justify-center items-end gap-4 h-54 max-w-max min-w-full -mt-4">
            <div className="text-3xl uppercase text-center leading-normal">
              CHo những mái ấm
            </div>
            <Image
              priority
              src={sologan3}
              alt="ibuild - nhóm sản phẩm"
              className="w-28"
            />
          </div>
          <div className="mt-10 flex flex-row justify-start items-center p-2 gap-2 lg:max-w-3/4 bg-white border-solid border border-[#dddddd] rounded-lg h-16">
            <div className="icon-search w-5 h-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <input
              className="input-search w-96 placeholder:text-black text-base font-normal"
              placeholder="Bạn đang muốn tìm sản phẩm nào?"
            />
            <button className="btn-search flex justify-center items-center rounded-lg bg-primary-color w-36 h-12 text-white font-medium">
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

SanPham.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};
export default SanPham;
