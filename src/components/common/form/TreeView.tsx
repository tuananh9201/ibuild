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
  setOutputValue?: Function;
}

const TreeView = ({ options, setOutputValue }: TreeViewProps) => {
  const [treeData, setTreeData] = useState<TreeOption[]>([]);

  useEffect(() => {
    if (!options) return;

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
    if (setOutputValue) {
      setOutputValue(checkedValue);
    }
  };

  return (
    <Tree
      checkable
      onCheck={onCheck}
      treeData={treeData}
      switcherIcon={<UpDownIcon className="transition" />}
      height={350}
    />
  );
};

export default TreeView;
