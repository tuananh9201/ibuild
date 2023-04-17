import { ReactElement, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";

import MainLayout from "@/components/main-layout";
import ProductSearch from "@/components/products/ProductSearch";
import CategoryCard, {
  CategoryCardLoading,
} from "@/components/products/CategoryCard";
import { sologan1, sologan2, sologan3 } from "@/constants/images";
import { fetchRootCategories } from "src/lib/api/category";
import { ICategory } from "src/lib/types";
import { NextPageWithLayout } from "../_app";

type Props = {
  categories: ICategory[];
};
const SanPham: NextPageWithLayout<Props> = ({ categories }: Props) => {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("0");

  const { data, error, isLoading } = useSWR("", fetchRootCategories, {
    fallbackData: categories,
  });

  const handleToRedirectToSearchPage = () => {
    if (keyword.length < 2) return;
    router.push({
      pathname: "/tim-kiem",
      query: { search: keyword, searchType: searchType },
    });
  };

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
        <section className="my-6 lg:my-20 p-4 lg:p-0">
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
        </section>
        <section className="p-4 lg:p-0 flex justify-center relative h-[100px]">
          <ProductSearch
            initialValue={keyword}
            selectValue={searchType}
            setInputValueToParent={setKeyword}
            onSelectValue={setSearchType}
            redirectToSearchPage={handleToRedirectToSearchPage}
          />
        </section>
        <section className="mt-6 lg:mt-20 px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading
            ? Array(5).map((idx) => <CategoryCardLoading key={idx} />)
            : data?.map((cate: ICategory) => (
                <CategoryCard category={cate} key={cate.id} />
              ))}
        </section>
      </motion.div>
    </>
  );
};
export async function getStaticProps() {
  // `getStaticProps` is executed on the server side.
  const categories = await fetchRootCategories();
  return {
    props: {
      categories,
    },
  };
}

SanPham.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};
export default SanPham;
