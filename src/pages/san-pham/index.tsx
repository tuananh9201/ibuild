import MainLayout from "@/components/main-layout";
import CategoryCard from "@/components/products/CategoryCard";
import ProductSearch from "@/components/products/ProductSearch";
import { cate1, sologan1, sologan2, sologan3 } from "@/constants/images";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";
import { ICategory } from "src/lib/types";
import { NextPageWithLayout } from "../_app";
type Props = {
  categories: ICategory[];
};
const categories = [
  {
    id: 1,
    name: "An ninh & an toàn",
    image: cate1,
  },
  {
    id: 2,
    name: "Cơ - Điện - Lạnh",
    image: cate1,
  },
  {
    id: 3,
    name: "Thiết bị công nghệ",
    image: cate1,
  },
  {
    id: 4,
    name: "Đồ nội & ngoại thất",
    image: cate1,
  },
  {
    id: 5,
    name: "Máy - Công cụ xây dựng",
    image: cate1,
  },
  {
    id: 6,
    name: "Vật liệu xây dựng",
    image: cate1,
  },
];
const SanPham: NextPageWithLayout<Props> = (props: Props) => {
  return (
    <>
      <Head>
        <title>Nhóm sản phẩm | IBUILD</title>
        <meta name="description" content="Nhóm sản phẩm" />
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
      >
        <div className="my-20 p-4 lg:p-0">
          <div className="flex flex-col items-center p-0 gap-6 max-w-max min-w-full">
            <div className="flex flex-row justify-center items-center gap-4 h-54 max-w-max min-w-full">
              <Image
                priority
                src={sologan1}
                alt="ibuild - nhóm sản phẩm"
                className="w-28"
              />
              <div className="text-3xl uppercase text-center">
                Chúng tôi mang đến
              </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-4 h-54 max-w-max min-w-full">
              <div className="text-3xl uppercase text-center">Sự tiện ích</div>
              <Image
                priority
                src={sologan2}
                alt="ibuild - nhóm sản phẩm"
                className="w-40"
              />
              <div className="text-3xl uppercase text-center">Tốt nhất</div>
            </div>
            <div className="flex flex-row justify-center items-end gap-4 h-54 max-w-max min-w-full -mt-4">
              <div className="text-3xl uppercase text-center">
                CHo những mái ấm
              </div>
              <Image
                priority
                src={sologan3}
                alt="ibuild - nhóm sản phẩm"
                className="w-28"
              />
            </div>
          </div>
        </div>
        <div className="p-4 lg:p-0 flex justify-center">
          <ProductSearch />
        </div>
        <div className="px-8 grid grid-cols-1 md:grid-cols-3  gap-8">
          {categories.map((cate) => (
            <CategoryCard category={cate} key={cate.id} />
          ))}
        </div>
      </motion.div>
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
