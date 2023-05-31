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
  setTitle: Function;
}

const MenuDropdown = ({
  openKeys,
  selectedKeys,
  setOpenKeys,
  setSelectedKeys,
  setTitle,
}: MenuDropdownProps) => {
  const router = useRouter();
  const { query } = router;
  const { category } = query;

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
    const option = designCategories?.find((de) => de?.id === key);
    if (option) {
      setTitle(option.name);
    }
    if (key === "all") {
      setTitle("Tất cả thiết kế");
    }
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

  useEffect(() => {
    if (!designCategories) return;
    setSelectedKeys([category as string]);

    const option = designCategories.find((de) => de.id === category);
    console.log(option);
    console.log(rootSubmenuKeys);
    if (option) {
      setOpenKeys([option.parent_id]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, designCategories]);

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
