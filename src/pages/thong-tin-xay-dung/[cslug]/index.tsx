import Breadcrums from "@/components/common/breadcrums";
import MainLayout from "@/components/main-layout";
import NewCardNormal from "@/components/news/news-card-normal";
import newss from "@/data/news1.json";
import { Col, Pagination, Row } from "antd";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { ReactElement, useState } from "react";
import {
  fetchNewCategoryBySlug,
  getNewByCategoryId,
  getNewCategoryBySlug,
} from "src/lib/api/news";
import useSWR from "swr";
import { NextPageWithLayout } from "../../_app";
import { ICategory, INewCategory, INews } from "@/lib/types";
import NewCardLoading from "@/components/news/NewCardLoading";
import { ArrowRightIcon } from "@/images/icons/product_types/icon_wrapper";
import Link from "next/link";
import { scrollToTop } from "@/lib/hooks";
interface IParams extends ParsedUrlQuery {
  cslug: string;
}

interface NewCategoriesProps {
  cate: INewCategory;
}

const NewCategories: NextPageWithLayout<NewCategoriesProps> = ({ cate }) => {
  // state
  const [params, setParams] = useState({
    skip: 0,
    limit: 12,
    categoryId: cate.id,
    exclude_feature: 0,
    exclude_id: "",
  });
  const [paging, setPaging] = useState({
    current: 1,
    total: 0,
  });
  const [news, setNews] = useState<INews[]>([]);

  // api
  const { data, isLoading } = useSWR(params, getNewByCategoryId, {
    onSuccess: (data) => {
      if (data) {
        setNews(data.data);
        setPaging((prev) => ({
          ...prev,
          total: data.paging.total,
        }));
      }
    },
  });

  //function
  const handleChangPage = (page: number) => {
    setPaging((prev) => ({
      ...prev,
      current: page,
    }));
    setParams((prev) => ({
      ...prev,
      skip: (page - 1) * 12,
    }));
    scrollToTop();
  };

  return (
    <>
      <Head>
        <title>{cate?.name}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="flex flex-col px-[120px] pt-10 pb-[60px]">
        <div className="flex flex-row gap-4 items-center text-[#646464]">
          <Link href={`/thong-tin-xay-dung?categoryName=${cate.slug}`}>
            <span className="text-base font-normal">Thông tin xây dựng</span>
          </Link>
          <ArrowRightIcon />
          <span className="text-base font-normal text-secondary-color">
            {cate.name}
          </span>
        </div>
        <h2 className="mt-8">{cate.name}</h2>
        <div className="mt-2">
          <Row gutter={[32, 32]}>
            {!isLoading &&
              news?.length > 0 &&
              news.map((n) => (
                <Col key={n.id} lg={6} md={24}>
                  <NewCardNormal news={n} />
                </Col>
              ))}
            {isLoading &&
              Array(8)
                .fill(0)
                .map((n, idx) => (
                  <Col key={idx} lg={6} md={24}>
                    <NewCardLoading />
                  </Col>
                ))}
          </Row>
        </div>
      </div>
      <div className="flex justify-center items-center mx-0 my-8">
        <Pagination
          total={paging.total}
          current={paging.current}
          pageSize={12}
          hideOnSinglePage
          onChange={handleChangPage}
        />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  NewCategoriesProps
> = async (context: GetServerSidePropsContext) => {
  const { cslug } = context.params as IParams;
  const cate = await getNewCategoryBySlug(cslug);

  if (!cate) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      cate,
    },
  };
};

NewCategories.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};
export default NewCategories;
