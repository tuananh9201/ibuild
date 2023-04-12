import { useRouter } from "next/router";
import { ReactElement } from "react";

import MainLayout from "@/components/main-layout";
import { NextPageWithLayout } from "../_app";

const NhaCungCap: NextPageWithLayout = () => {
  const { query } = useRouter();

  return (
    <div>
      <h1>Nha cung cap</h1>
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
