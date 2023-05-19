import { useState } from "react";
import { Tabs } from "antd";
import { WatchListProduct } from "@/components/account";
import WatchListSupplier from "./WatchListSupplier";

const TABS_NAME = [
  {
    key: "1",
    label: "Sản phẩm",
  },
  {
    key: "2",
    label: "Nhà cung cấp",
  },
];

const WatchList = () => {
  const [currentTab, setCurrentTab] = useState("1");

  const handleOnchangeTab = (key: string) => {
    setCurrentTab(key);
  };

  return (
    <div>
      <Tabs
        activeKey={currentTab}
        centered
        items={TABS_NAME}
        onChange={handleOnchangeTab}
      />
      {currentTab === "1" && <WatchListProduct />}
      {currentTab === "2" && <WatchListSupplier />}
    </div>
  );
};

export default WatchList;
