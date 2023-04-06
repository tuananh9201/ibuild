import { ReactElement } from "react";
import { useRouter } from "next/router";

import { NextPageWithLayout } from "../_app";
import { MultiCarousel } from "@/components/common";
import MainLayout from "@/components/main-layout";

const NhaCungCap: NextPageWithLayout = () => {
  const { query } = useRouter();

  return (
    <div>
      <MultiCarousel />
    </div>
  );
};

NhaCungCap.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default NhaCungCap;
