import React, { useEffect, useState } from "react";
import { Tree } from "antd";

import { UpDownIcon } from "@/images/icons/product_types/icon_wrapper";

import type { DataNode } from "antd/es/tree";
import { ICategory } from "@/lib/types";

interface TreeOption extends DataNode {
  id: string;
  parent_id?: string;
}
interface TreeViewProps {
  options: ICategory[];
  defaultValue?: string;
  setOutputValue?: Function;
}

const TreeView = ({ options, setOutputValue, defaultValue }: TreeViewProps) => {
  const [treeData, setTreeData] = useState<TreeOption[]>([]);

  useEffect(() => {
    if (!options) return;

    if (options[0] && Object.keys(options[0]).length < 4) {
      const newOptions = options.map((option) => ({
        id: option.id,
        title: option.name_vi,
        key: option.id,
      }));
      setTreeData([{
        id: "0",
        parent_id: "0",
        title: "Tất cả",
        key: "0",
        children: [],
      },...newOptions]);
      console.log(newOptions);
      return;
    }

    const rootItems: any[] = [];
    const lookup: any = {};

    const newOptions = options.map((option) => {
      return {
        id: option.id,
        parent_id: option.parent_id,
        title: option.name_vi,
        key: option.id,
        children: [],
      };
    });

    newOptions.forEach((item) => {
      item.children = [];
      lookup[item.id] = item;
    });

    newOptions.forEach((item) => {
      if (!item.parent_id) return;
      const parent = lookup[item.parent_id];
      if (parent) {
        parent.children.push(item);
      } else {
        rootItems.push(item);
      }
    });

    setTreeData([
      {
        id: "0",
        parent_id: "0",
        title: "Tất cả",
        key: "0",
        children: [],
      },
      ...rootItems,
    ]);
  }, [options]);

  const onCheck = (checkedValue: any) => {
    if (!setOutputValue) return;
    if (checkedValue.length > 1) {
      setOutputValue({
        id: "00",
        name_vi: "Nhiều danh mục",
      });
    } else if (checkedValue[0] === "0" || checkedValue.length === 0) {
      setOutputValue({
        id: "0",
        name_vi: "Tất cả",
      });
    } else {
      const option = options.find((item) => item.id === checkedValue[0]);
      setOutputValue({
        id: option?.id,
        name_vi: option?.name_vi || "",
      });
    }
  };

  return (
    <Tree
      checkable
      onCheck={onCheck}
      treeData={treeData}
      switcherIcon={<UpDownIcon className="transition" />}
    />
  );
};

export default TreeView;
