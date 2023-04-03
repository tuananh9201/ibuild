import { ReactElement } from "react";
import { useRouter } from "next/router";

import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/main-layout";

const NhaCungCap: NextPageWithLayout = () => {
  const { query } = useRouter();
  console.log(query);

  return (
    <div>
      <h1>Nha Cung Cap</h1>
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
