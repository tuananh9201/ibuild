import { useState } from "react";
import { Tree } from "antd";

import { UpDownIcon } from "@/images/icons/product_types/icon_wrapper";

import type { DataNode } from "antd/es/tree";

interface TreeOption extends DataNode {
  id: string;
  parent_id?: string;
}
interface TreeViewProps {
  setSelectedValue: (value: any[]) => void;
  options: TreeOption[];
}

const TreeView = ({ options, setSelectedValue }: TreeViewProps) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue);
    setSelectedValue(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <Tree
      checkable
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={options}
      switcherIcon={<UpDownIcon className="transition" />}
    />
  );
};

export default TreeView;
