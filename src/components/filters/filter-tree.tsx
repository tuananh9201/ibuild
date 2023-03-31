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

  return (
    <div id="selectTreeElement" className="relative">
      <TreeSelect
        treeData={treeData}
        value={value}
        onChange={onChange}
        treeCheckable={false}
        multiple={false}
        showCheckedStrategy={SHOW_PARENT}
        placeholder="Chọn danh mục sản phẩm"
        style={{
          width: "100%",
          height: 46,
        }}
        popupClassName=""
        showArrow
        suffixIcon={
          <UpDownIcon
            className={`fill-[#343434] transition ${
              isExpand ? "rotate-180" : ""
            }`}
          />
        }
        getPopupContainer={() =>
          document.getElementById("selectTreeElement") as HTMLElement
        }
        dropdownRender={(item) => (
          <div className="text-red-500">
            <SearchInput />
            <span>{item}</span>
          </div>
        )}
        onDropdownVisibleChange={handleExpand}
      />
    </div>
  );
}
