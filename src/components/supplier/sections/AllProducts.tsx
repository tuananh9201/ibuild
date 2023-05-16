import { Tabs } from "antd";
import { useEffect, useState } from "react";

import CategoryPageBySupplier from "./common/CategoryPageBySupplier";
import { rootsCategoryBySupplierId } from "@/lib/api/supplier";
import { ITab } from "@/lib/types";

interface AllProductsProps {
  supplierId: string;
  categoryId?: string;
}

const AllProducts = ({ supplierId, categoryId }: AllProductsProps) => {
  const [currentTab, setCurrentTab] = useState("0");
  const [tabs, setTabs] = useState<ITab[]>([]);

  // variable
  const categoryTitle = tabs.find((tab) => tab.key === currentTab);

  // api
  const fetchRootCategoryBySupplierId = async () => {
    const res = await rootsCategoryBySupplierId(supplierId);
    if (res) {
      const newRes = res.map((r) => ({
        key: r.id,
        label: r.name_vi,
      }));
      if (categoryId) {
        const activeTab = newRes.find((n) => n.key === categoryId);
        activeTab && setCurrentTab(activeTab.key);
      }
      setTabs(() => [
        {
          key: "0",
          label: "Tất cả sản phẩm",
        },
        ...newRes,
      ]);
    }
  };

  // function
  const handleOnchangeTab = (key: string) => {
    setCurrentTab(key);
  };

  useEffect(() => {
    fetchRootCategoryBySupplierId();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplierId]);

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
            items={tabs}
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
            rootCategoryId={currentTab}
            categoryId={categoryId}
            resetTab={setCurrentTab}
          />
        </div>
      </div>
    </>
  );
};

export default AllProducts;
