import { Pagination } from "antd";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import useSWR from "swr";

import {
  FilterProduct,
  LitsProductLoading,
  ProductTypes,
} from "@/components/common";
import Breadcrums from "@/components/common/breadcrums";
import MainLayout from "@/components/main-layout";
import ListProduct from "@/components/products/ListProduct";
import ProductSearch from "@/components/products/ProductSearch";
import noFoundProduct from "@/images/no_search_result.png";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { fetchCategorySlug, fetchRootCategories } from "src/lib/api/category";
import { searchProduct } from "src/lib/api/product";
import { ICategory, Product, SearchProduct } from "src/lib/types";
import { NextPageWithLayout } from "../../_app";
import { OPTIONS_SELECT } from "@/constants/data";
import { scrollToTop } from "@/lib/hooks";

type Props = {
  category: ICategory;
};

const ListCategoriesBySlug: NextPageWithLayout<Props> = (props: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [keyword, setKeyword] = useState("");
  const [payload, setPayload] = useState<SearchProduct>({
    category_id: [props.category.id],
    cities: [],
    districts: [],
    min_price: 0,
    max_price: 9999999999,
    min_quantity: 0,
    max_quantity: 9999999,
    limit: 12,
    skip: 0,
    sort_by: "LIEN_QUAN_NHAT",
    quantity_ranges: [],
  });
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [paging, setPaging] = useState({
    current: 1,
    total: 0,
  });
  const [searchType, setSearchType] = useState("0");
  const [currentActive, setCurrentActive] = useState("all");
  const [refresh, setRefresh] = useState(0);

  const router = useRouter();
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

  const handleResetFilter = () => {
    setRefresh((prev) => prev + 1);
    setPayload({
      ...payload,
      category_id: [props.category.id],
      cities: [],
      districts: [],
      max_quantity: 10000,
      min_quantity: 0,
      max_price: 10000000000,
      min_price: 0,
      limit: 12,
      skip: 0,
      quantity_ranges: [],
    });
  };
  const handleResetWhenHiddenFilter = () => {
    setPayload({
      ...payload,
      category_id: [props.category.id],
      cities: [],
      districts: [],
      max_quantity: 10000,
      min_quantity: 0,
      max_price: 10000000000,
      min_price: 0,
      limit: 12,
      skip: 0,
      quantity_ranges: [],
    });
  };

  const onClickFilterCategory = async (id: string) => {
    let categoryId: string | undefined = id;
    if (categoryId === "all") {
      categoryId = category?.id;
    }
    setRefresh((prev) => prev + 1);
    setPaging({ ...paging, current: 1 });
    setPayload({
      ...payload,
      cities: [],
      districts: [],
      max_quantity: 10000,
      min_quantity: 0,
      max_price: 10000000000,
      min_price: 0,
      limit: 12,
      skip: 0,
      category_id: categoryId ? [categoryId] : [],
      quantity_ranges: [],
    });
  };
  const onChangePagination = (page: number) => {
    scrollToTop();
    setPaging({ ...paging, current: page });
    setPayload({ ...payload, skip: (page - 1) * 12 });
  };
  const loadProduct = async () => {
    setIsLoadingData(true);
    const data = await searchProduct(payload);
    setProducts(data.data);
    setPaging({
      ...paging,
      total: data.paging.total,
    });
    setIsLoadingData(false);
  };

  useEffect(() => {
    loadProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  const handleToRedirectToSearchPage = () => {
    const optionSelect = OPTIONS_SELECT.find(
      (option) => option.value === searchType
    );
    router.push({
      pathname: optionSelect?.path,
      query: {
        search: keyword,
      },
    });
  };

  const onChangeSort = (sortSlug: string) => {
    if (sortSlug) {
      setPaging({ ...paging, current: 1, total: 0 });
      setPayload({
        ...payload,
        skip: 0,
        sort_by: sortSlug,
      });
    }
  };

  const onHandleApplyFilter = (params: SearchProduct) => {
    setCurrentActive("all");
    setPaging({ ...paging, current: 1, total: 0 });
    setPayload({
      ...payload,
      ...params,
    });
  };

  return (
    <>
      <Head>
        <title>{category?.name_vi}</title>
      </Head>
      <div className="flex flex-col items-start px-4 lg:px-20 pt-8 pb-[80px]">
        <div className="w-full flex justify-center relative h-[100px]">
          <ProductSearch
            initialValue={keyword}
            selectValue={searchType}
            setInputValueToParent={setKeyword}
            redirectToSearchPage={handleToRedirectToSearchPage}
            onSelectValue={setSearchType}
          />
        </div>
        <Breadcrums breadcrumbs={breadcrumbs} />
        <div className="mt-8">
          <h1 className="font-roboto not-italic font-medium text-2xl leading-[calc(36 / 24)] text-text-color">
            {title}
          </h1>
        </div>
        <ProductTypes
          parentId={category?.id || ""}
          currentActive={currentActive}
          itemsOnScreen={[5, 1, 2]}
          setCurrentActive={setCurrentActive}
          onClickItem={onClickFilterCategory}
        />
        <FilterProduct
          categoryId={category?.id}
          isShowMostRelevant={true}
          refresh={refresh}
          isLoading={isLoadingData}
          onChangeSort={onChangeSort}
          onHandleApplyFilter={onHandleApplyFilter}
          resetFilter={handleResetFilter}
          handleResetWhenHiddenFilter={handleResetWhenHiddenFilter}
        />
        <div className="mt-4 mb-4 w-full">
          {isLoading || isLoadingData ? (
            <LitsProductLoading items={12} />
          ) : (
            <ListProduct products={products} />
          )}
        </div>
        {!isLoading && !isLoadingData && products.length === 0 && (
          <div className="w-full">
            <Image
              src={noFoundProduct}
              alt="no found product"
              className="mx-auto"
            />
            <p className="mt-4 text-center">Không tìm thấy sản phẩm</p>
          </div>
        )}
        <div className="w-full text-center">
          <Pagination
            current={paging.current}
            pageSize={12}
            total={paging.total}
            hideOnSinglePage
            onChange={onChangePagination}
          />
        </div>
      </div>
    </>
  );
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}
export const getStaticPaths: GetStaticPaths = async () => {
  const rootsCategories = await fetchRootCategories();
  const paths = rootsCategories.map((cate: ICategory) => ({
    params: { slug: cate.slug },
  }));
  return {
    paths: paths, //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export async function getStaticProps(context: GetStaticPropsContext) {
  // `getStaticProps` is executed on the server side.
  const { slug } = context.params as IParams;

  const category = await fetchCategorySlug(slug);
  return {
    props: {
      category: category || [],
    },
  };
}

ListCategoriesBySlug.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};
export default ListCategoriesBySlug;
