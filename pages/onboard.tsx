import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import OnBoardLayout from "@/components/onboard-layout";
import Image from "next/image";
import { logo } from "@/constants/images";
const EmptyPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Onboard</title>
      </Head>
      <div className="left"></div>
      <div className="right">
        <div className="right-bottom" />
      </div>
      <div className="container">
        <Image src={logo} alt="" />
        <h3 className="text-intro">Hãy nói cho tôi bạn là?</h3>
        <button className="ibuild-btn experts">Chuyên gia xây dựng</button>
        <button className="ibuild-btn users">Người dùng phổ thông</button>
      </div>
    </>
  );
};
EmptyPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <OnBoardLayout>{page}</OnBoardLayout>
    </>
  );
};
export default EmptyPage;
