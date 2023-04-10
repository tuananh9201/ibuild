import { useState } from "react";
import { Tree } from "antd";

import { UpDownIcon } from "@/images/icons/product_types/icon_wrapper";

import type { DataNode } from "antd/es/tree";
import { ICategory } from "@/lib/types";

interface TreeOption extends DataNode {
  id: string;
  parent_id?: string;
}
interface TreeViewProps {
  setSelectedValue: Function;
  options: TreeOption[];
  originData: ICategory[];
}

const TreeView = ({ options, setSelectedValue, originData }: TreeViewProps) => {
  // const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  // const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  // const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  // const onExpand = (expandedKeysValue: React.Key[]) => {
  //   setExpandedKeys(expandedKeysValue);
  //   setAutoExpandParent(false);
  // };

  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue);
    if (checkedKeysValue.length > 1) {
      setSelectedValue("Nhiều danh mục");
    } else if (checkedKeysValue.length === 0) {
      setSelectedValue("Chọn danh mục sản phẩm");
    } else if (checkedKeysValue[0] === "0") {
      setSelectedValue("Tất cả");
    } else {
      const value = originData.find((data) => data.id === checkedKeysValue[0]);
      setSelectedValue(value?.name_vi);
    }
  };

  // const onSelect = (selectedKeysValue: React.Key[], info: any) => {
  //   setSelectedKeys(selectedKeysValue);
  // };

  return (
    <Tree
      checkable
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      treeData={options}
      switcherIcon={<UpDownIcon className="transition" />}
    />
  );
};

export default TreeView;
