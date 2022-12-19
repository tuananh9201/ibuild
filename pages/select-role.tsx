import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import { NextPageWithLayout } from "./_app";
import { cardProd, docsRule, ibuildInfo, searchIcon } from "@/constants/images";
import Image from "next/image";
const EmptyPage: NextPageWithLayout = () => {
  return (
    <>
      <div className="main-content">
        <h1>Empty</h1>
      </div>
    </>
  );
};
EmptyPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};
export default EmptyPage;
