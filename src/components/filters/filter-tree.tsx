import { useEffect, useRef, useState } from "react";

import { SearchInput, TreeView } from "@/components/common";
import { UpDownIcon } from "@/images/icons/product_types/icon_wrapper";
import { ICategory } from "@/lib/types";

interface FilterTreeProps {
  options: ICategory[];
  keyword?: string;
  searchEnabled?: boolean;
  defaultValue: ICategory;
  multipleValue: ICategory;
  refresh?: number;
  setKeyword?: (word: string) => void;
  setSelectedValue?: Function;
}

const FilterTree = ({
  options,
  keyword,
  defaultValue,
  multipleValue,
  searchEnabled,
  refresh,
  setKeyword,
  setSelectedValue,
}: FilterTreeProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [outputValue, setOutputValue] = useState(defaultValue);

  const selectElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      if (!selectElement.current?.contains(e.target)) {
        setIsOpenMenu(false);
      }
    });

    () => window.removeEventListener("click", () => {});
  }, []);

  const handleCheckedValue = (value: any) => {
    setSelectedValue && setSelectedValue(value);

    if (value[0] === "0") {
      setOutputValue({
        ...outputValue,
        id: "0",
        name_vi: "Tất cả",
      });
      return;
    }
    if (value.length === 1) {
      const newOption = options.find((option) => option.id === value[0]);
      if (newOption) {
        setOutputValue({
          ...outputValue,
          ...newOption,
        });
      }
    } else if (value.length === 0) {
      setOutputValue({
        ...outputValue,
        ...defaultValue,
      });
    } else {
      setOutputValue({
        ...outputValue,
        ...multipleValue,
      });
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
          {outputValue?.name_vi}
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
        } absolute z-10 bg-white border border-solid border-primary-color border-t-0 w-full rounded-b px-4 pt-[22px] pb-[14px] flex flex-col gap-5`}
      >
        {searchEnabled && <SearchInput value={keyword} setValue={setKeyword} />}
        <TreeView
          options={options}
          refresh={refresh}
          setOutputValue={handleCheckedValue}
        />
      </div>
    </div>
  );
};

export default FilterTree;
