import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/main-layout";

const SearchProductGroup: NextPageWithLayout = () => {
  return (
    <div>
      <h1>tim kiem nhom san pham</h1>
    </div>
  );
};

SearchProductGroup.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default SearchProductGroup;
