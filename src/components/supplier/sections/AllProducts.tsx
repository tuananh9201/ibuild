import { useState } from "react";
import { Tabs } from "antd";
import CategoryPageBySupplier from "./common/CategoryPageBySupplier";

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

const AllProducts = () => {
  const [currentTab, setCurrentTab] = useState("1");

  // function
  const handleOnchangeTab = (key: string) => {
    setCurrentTab(key);
  };
  return (
    <div className="mt-11 flex gap-3">
      <div className="custom-position-tab">
        <h2 className="text-text-color font-normal text-xl mb-6">
          Danh mục sản phẩm
        </h2>
        <Tabs
          defaultActiveKey={currentTab}
          centered
          items={TABS_NAME}
          onChange={handleOnchangeTab}
          tabPosition="right"
        />
      </div>
      <div className="flex-base">
        <h2 className="text-text-color font-normal text-xl mb-6">
          Tất cả sản phẩm
        </h2>
        <CategoryPageBySupplier />
      </div>
    </div>
  );
};

export default AllProducts;
