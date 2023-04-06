import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { Pagination } from "antd";

import Breadcrums from "@/components/common/breadcrums";
import MainLayout from "@/components/main-layout";
import ListProduct from "@/components/products/ListProduct";
import { ProductTypes } from "@/components/common";
import { FilterCategories, FilterRelated } from "@/components/common";
import { filterIcon, filterIconWhite } from "@/images/index";
import { ParsedUrlQuery } from "querystring";
import { fetchCategorySlug } from "src/lib/api/category";
import { searchProduct } from "src/lib/api/product";
import { ICategory, Product } from "src/lib/types";
import { NextPageWithLayout } from "../../_app";
import { LitsProductLoading } from "@/components/common";

type Props = {
  category: ICategory;
};

const RELATED_LIST = [
  {
    id: 1,
    value: "Liên quan nhất",
    slug: "LIEN_QUAN_NHAT",
  },
  {
    id: 2,
    value: "Sản phẩm mới",
    slug: "SAN_PHAM_MOI",
  },
  {
    id: 3,
    value: "Lượt xem nhiều nhất",
    slug: "LUOT_XEM_NHIEU_NHAT",
  },
  {
    id: 4,
    value: "Lượt thích nhiều nhất",
    slug: "LUOT_THICH_NHIEU_NHAT",
  },
];

const ListCategoriesBySlug: NextPageWithLayout<Props> = (props: Props) => {
  const [isActiveFilterIcon, setIsActiveFilterIcon] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortSelected, setSortSelected] = useState("LIEN_QUAN_NHAT");
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>(
    props.category?.id ? [props.category.id] : []
  );
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [paging, setPaging] = useState({
    current: 1,
    total: 0,
  });
  const { query } = useRouter();
  const { slug } = query;

  const {
    data: category,
    error,
    isLoading,
  } = useSWR<ICategory | undefined>(slug, fetchCategorySlug);

  const breadcrumbs = [
    {
      title: "Sản phẩm",
      slug: "san-pham",
    },
    {
      slug: category?.slug || "",
      title: category?.name_vi || "",
    },
  ];

  const title = breadcrumbs.filter((bread) => bread.slug === slug)[0]?.title;

  const handleShowFilter = () => {
    setIsActiveFilterIcon((prev) => !prev);
  };
  const onClickFilterCategory = async (id: string) => {
    let categoryId: string | undefined = id;
    if (categoryId === "all") {
      setCategoriesSelected(category ? [category.id] : []);
    } else {
      setCategoriesSelected([categoryId]);
    }
  };

  const loadProduct = async () => {
    setIsLoadingData(true);
    const data = await searchProduct({
      // keyword: keywordSearch,
      limit: 12,
      skip: paging.current !== 1 ? paging.current * 12 : 0,
      sort_by: sortSelected,
      max_price: 0,
      min_price: 0,
      max_quantity: 0,
      min_quantity: 0,
      category_id: categoriesSelected,
    });
    setProducts(data.data);
    setPaging({
      ...paging,
      total: data.paging.total,
    });
    setIsLoadingData(false);
  };
  useEffect(() => {
    loadProduct();
  }, [paging.current, categoriesSelected, sortSelected]);

  const handleSelectRelated = async (value: number) => {
    const valueSelected = RELATED_LIST.find((item) => item.id === value)?.slug;
    if (valueSelected) {
      setSortSelected(valueSelected);
      setPaging({ ...paging, current: 1, total: 0 });
    }
  };

  return (
    <>
      <Head>
        <title>{category?.name_vi}</title>
      </Head>
      <div className="flex flex-col items-start px-4 lg:px-20 pt-8 pb-[60px]">
        <Breadcrums breadcrumbs={breadcrumbs} />
        <div className="mt-8">
          <h1 className="font-roboto not-italic font-medium text-2xl leading-[calc(36 / 24)] text-text-color">
            {title}
          </h1>
        </div>
        <ProductTypes
          onClickItem={onClickFilterCategory}
          parentId={category?.id || ""}
        />
        <div className="w-full flex flex-col sm:flex-row justify-between mt-8">
          <FilterRelated
            defaultValue={1}
            options={RELATED_LIST}
            onSelect={handleSelectRelated}
          />
          <div
            className={`flex flex-row items-center px-4 py-3 rounded border border-[#e6e6e6] cursor-pointer group active:bg-[#eb7a01] transition ${
              isActiveFilterIcon ? "bg-[#eb7a01]" : ""
            }`}
            onClick={handleShowFilter}
          >
            <Image
              src={isActiveFilterIcon ? filterIconWhite : filterIcon}
              alt="filter icon"
              className="w-3 h-3"
            />
            <span
              className={`font-roboto not-italic font-medium text-base leading-[150%] text-[#333333] ml-3 group-active:text-white ${
                isActiveFilterIcon ? "text-white" : ""
              }`}
            >
              Bộ lọc
            </span>
          </div>
        </div>
        {isActiveFilterIcon && (
          <FilterCategories productId={category?.id || ""} />
        )}
        <div className="mt-4 mb-4 w-full">
          {isLoading || isLoadingData ? (
            <LitsProductLoading />
          ) : (
            <ListProduct products={products} />
          )}
        </div>
        <div className="w-full text-center">
          <Pagination
            onChange={(page) => setPaging({ ...paging, current: page })}
            current={paging.current}
            pageSize={12}
            total={paging.total}
          />
        </div>
      </div>
    </>
  );
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}
// export const getStaticPaths: GetStaticPaths = async () => {
//   const rootsCategories = await fetchRootCategories();
//   const paths = rootsCategories.map((cate: ICategory) => ({
//     params: { slug: cate.slug },
//   }));

//   return {
//     paths: paths, //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };

// export async function getStaticProps(context: GetStaticPropsContext) {
//   // `getStaticProps` is executed on the server side.
//   const { slug } = context.params as IParams;

//   const category = await fetchCategorySlug(slug);
//   return {
//     props: {
//       category: category || [],
//     },
//   };
// }

ListCategoriesBySlug.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};
export default ListCategoriesBySlug;
