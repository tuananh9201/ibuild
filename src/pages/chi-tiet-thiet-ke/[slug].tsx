import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";
import { ReactElement } from "react";

import { NextPageWithLayout } from "../_app";
import { getDetailDesignBySlug } from "@/lib/api/design";
import { BrandCums } from "@/components/designs";
import MainLayout from "@/components/main-layout";

const DesignDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;

  // api
  const { data } = useSWR(slug, getDetailDesignBySlug);

  return (
    <>
      <Head>
        <title>Chi tiet</title>
      </Head>
      <section>
        {data && <BrandCums design={data} title={data.title} />}
        <h1 className="text-center mt-10 mb-8 text-text-color font-semibold text-[28px]">
          {data?.title || ""}
        </h1>
        <div
          dangerouslySetInnerHTML={{ __html: data?.content || "" }}
          className="design-detail"
        ></div>
      </section>
    </>
  );
};

DesignDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default DesignDetail;
