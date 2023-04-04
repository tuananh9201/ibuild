import { useState, useRef, useEffect } from "react";

import { TreeView, TreeViewWrapper, SearchInput } from "@/components/common";
import { UpDownIcon } from "@/images/icons/product_types/icon_wrapper";
// import {} from "@/lib"

interface FilterTreeProps {
  options: any[];
}

const FilterTree = ({ options }: FilterTreeProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [outputValue, setOutputValue] = useState("Chọn danh mục sản phẩm");

  const selectElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      if (!selectElement.current?.contains(e.target)) {
        setIsOpenMenu(false);
      }
    });

    () => window.removeEventListener("click", () => {});
  }, []);

  const setSelectedValue = (value: any[]) => {
    console.log(value);
    if (value.length > 1) {
      setOutputValue("Nhiều danh mục");
    } else {
      setOutputValue(value[0] as string);
    }
  };

  return (
    <div className="w-full relative" ref={selectElement}>
      <div
        className={`w-full h-[46px] rounded border border-solid flex flex-row items-center justify-between px-4 ${
          isOpenMenu ? "border-[#ff4d14] rounded-b-none" : "border-[#e6e6e6]"
        }`}
        onClick={() => setIsOpenMenu((prev) => !prev)}
      >
        <span className="font-roboto font-normal text-base leading-[calc(24 / 16)] text-text-color">
          {outputValue}
        </span>
        <UpDownIcon
          className={`cursor-pointer transition ${
            isOpenMenu ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`${
          isOpenMenu ? "block" : "hidden"
        } absolute z-10 bg-white border border-solid border-primary-color border-t-0 w-full rounded-b px-4 pt-[22px] pb-[14px]`}
      >
        <TreeView setSelectedValue={setSelectedValue} options={options} />
      </div>
    </div>
  );
};

export default FilterTree;
