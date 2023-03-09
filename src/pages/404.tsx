import MainLayout from "@/components/main-layout";
import { Result, Button } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement } from "react";
function Custom404() {
  const router = useRouter();
  const goHome = () => {
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>404 Page not found !</title>
      </Head>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button onClick={goHome} type="primary">
            Back Home
          </Button>
        }
      />
    </>
  );
}
Custom404.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};
export default Custom404;
