import { useState, useEffect, memo } from "react";
import { Menu } from "antd";
import { useRouter } from "next/router";
import useSWR from "swr";

import type { MenuProps } from "antd";
import { getListDesignCategories } from "@/lib/api/design";

type MenuItem = Required<MenuProps>["items"][number];

interface MenuDropdownProps {
  openKeys: string[];
  selectedKeys: string[];
  setOpenKeys: Function;
  setSelectedKeys: Function;
}

const MenuDropdown = ({
  openKeys,
  selectedKeys,
  setOpenKeys,
  setSelectedKeys,
}: MenuDropdownProps) => {
  const router = useRouter();

  const { data: designCategories } = useSWR(
    "designCategories",
    getListDesignCategories
  );

  // state
  const [items, setItems] = useState<MenuItem[]>([]);
  const [rootSubmenuKeys, setRootSubmenuKeys] = useState<string[]>([]);

  // function
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onSelect: MenuProps["onSelect"] = ({ key }) => {
    setSelectedKeys([key]);
  };

  // effect
  useEffect(() => {
    if (designCategories) {
      const parentCategories = designCategories.filter(
        (category) => category.parent_id === "0"
      );
      const ids = parentCategories.map((p) => p.id);
      const menuItems: MenuItem[] = parentCategories.map((parent) => ({
        key: parent.id,
        label: parent.name,
        children: designCategories
          .filter((d) => d.parent_id === parent.id)
          .map((i) => ({
            key: i.id,
            label: i.name,
          })),
      }));

      menuItems.unshift({
        key: "all",
        label: "Tất cả thiết kế",
      });

      setItems(menuItems);
      setRootSubmenuKeys(["all", ...ids]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designCategories]);

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      style={{ width: 256 }}
      items={items}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
    />
  );
};

export default memo(MenuDropdown);
