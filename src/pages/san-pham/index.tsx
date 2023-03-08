import { ReactElement } from "react";
import MainLayout from "@/components/main-layout";
import { NextPageWithLayout } from "../_app";
import Head from "next/head";
import { ICategory } from "src/lib/types";
import Image from "next/image";
import style from "@/styles/modules/productCategories/index.module.scss";
import { sologan1, sologan2, sologan3 } from "@/constants/images";
import ProductSearch from "@/components/products/ProductSearch";
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
          <ProductSearch />
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
