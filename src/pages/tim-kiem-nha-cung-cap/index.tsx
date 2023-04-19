import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/main-layout";

const SearchSupplier: NextPageWithLayout = () => {
  return (
    <div>
      <h1>tim kiem nha cung cap</h1>
    </div>
  );
};

SearchSupplier.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default SearchSupplier;
