import { Pagination, Tabs } from "antd";
import { useState, useEffect } from "react";
import CategoryPageBySupplier from "./common/CategoryPageBySupplier";
import { Product, SearchProduct } from "@/lib/types";
import { searchProduct } from "@/lib/api/product";

const TABS_NAME = [
  {
    key: "1",
    label: "Tất cả sản phẩm",
  },
  {
    key: "2",
    label: "An ninh & an toàn",
  },
  {
    key: "3",
    label: "Cơ - Điện - Lạnh",
  },
  {
    key: "4",
    label: "Thiết bị công nghệ",
  },
  {
    key: "5",
    label: "Đồ nội & ngoại thất",
  },
  {
    key: "6",
    label: "Mấy - Công cụ xây dựng",
  },
  {
    key: "8",
    label: "Vật liệu xây dựng",
  },
];

interface AllProductsProps {
  supplierId: string;
}

const AllProducts = ({ supplierId }: AllProductsProps) => {
  const [currentTab, setCurrentTab] = useState("1");

  // variable
  const categoryTitle = TABS_NAME.find((tab) => tab.key === currentTab);

  // function
  const handleOnchangeTab = (key: string) => {
    setCurrentTab(key);
  };

  return (
    <>
      <div className="mt-11 flex gap-3">
        <div className="custom-position-tab w-1/4">
          <h2 className="text-text-color font-normal text-xl mb-6">
            Danh mục sản phẩm
          </h2>
          <Tabs
            activeKey={currentTab}
            centered
            items={TABS_NAME}
            onChange={handleOnchangeTab}
            tabPosition="right"
          />
        </div>
        <div className="w-3/4">
          <h2 className="text-text-color font-normal text-xl mb-6">
            {categoryTitle?.label || ""}
          </h2>
          <CategoryPageBySupplier
            supplierId={supplierId}
            resetTab={setCurrentTab}
          />
        </div>
      </div>
    </>
  );
};

export default AllProducts;
