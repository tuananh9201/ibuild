import { useState } from "react";
import { Tabs } from "antd";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <Tabs
        activeKey={currentTab}
        centered
        items={TABS_NAME}
        onChange={handleOnchangeTab}
      />
      {currentTab === "1" && <WatchListProduct />}
      {currentTab === "2" && <WatchListSupplier />}
    </motion.div>
  );
};

export default WatchList;
