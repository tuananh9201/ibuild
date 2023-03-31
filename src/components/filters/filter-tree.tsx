import { useState } from "react";
import { TreeSelect, Checkbox } from "antd";

import { UpDownIcon } from "@/images/icons/product_types/icon_wrapper";
import { SearchInput } from "../common";

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: "Node1",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0",
        key: "0-0-0",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
    key: "0-1",
    children: [
      {
        title: "Child Node3",
        value: "0-1-0",
        key: "0-1-0",
      },
      {
        title: "Child Node4",
        value: "0-1-1",
        key: "0-1-1",
      },
      {
        title: "Child Node5",
        value: "0-1-2",
        key: "0-1-2",
        children: [
          {
            title: "Child Node6",
            value: "0-2-0",
            key: "0-2-0",
          },
        ],
      },
    ],
  },
];

export default function FilterTree() {
  const [value, setValue] = useState(["0-0-0"]);
  const [isExpand, setIsExpand] = useState(false);

  const onChange = (newValue: string[]) => {
    console.log("onChange ", value);
    setValue(newValue);
  };

  const handleExpand = () => {
    setIsExpand((prev) => !prev);
  };

  const handleSearch = () => {
    console.log("ssss");
  };

  return (
    <div id="selectTreeElement" className="relative">
      <TreeSelect
        treeData={treeData}
        value={value}
        onChange={onChange}
        treeCheckable={true}
        showCheckedStrategy={SHOW_PARENT}
        placeholder="Chọn danh mục sản phẩm"
        showArrow
        showSearch
        filterTreeNode={true}
        dropdownStyle={{
          top: "100%",
          transition: "all",
        }}
        style={{
          width: "100%",
          minHeight: "46px",
        }}
        suffixIcon={
          <UpDownIcon
            className={`fill-[#343434] transition ${
              isExpand ? "rotate-180" : ""
            }`}
          />
        }
        switcherIcon={<UpDownIcon className="fill-[#343434] transition" />}
        getPopupContainer={() =>
          document.getElementById("selectTreeElement") as HTMLElement
        }
        dropdownRender={(tree) => (
          <div className="flex flex-col gap-[22px]">
            <SearchInput />
            {tree}
          </div>
        )}
        onDropdownVisibleChange={handleExpand}
        onSearch={handleSearch}
      />
    </div>
  );
}
