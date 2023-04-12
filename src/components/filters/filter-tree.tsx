import { useState, useRef, useEffect } from "react";
import useSWR from "swr";

import { TreeView, SearchInput } from "@/components/common";
import { UpDownIcon } from "@/images/icons/product_types/icon_wrapper";
import { ICategory } from "@/lib/types";
import { fetchChildCategories } from "@/lib/api/category";
import { getAreas } from "@/lib/api/information";

interface FilterTreeProps {
  options: ICategory[];
  keyword?: string;
  searchEnabled?: boolean;
  defaultValue?: ICategory;
  setKeyword?: Function;
}

const FilterTree = ({
  options,
  keyword,
  defaultValue,
  searchEnabled,
  setKeyword,
}: FilterTreeProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [outputValue, setOutputValue] = useState(defaultValue);

  // const { data: categories } = useSWR<ICategory[]>(
  //   categoryId,
  //   fetchChildCategories
  // );

  const selectElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      if (!selectElement.current?.contains(e.target)) {
        setIsOpenMenu(false);
      }
    });

    () => window.removeEventListener("click", () => {});
  }, []);

  const handleKeyword = () => {};

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
        {searchEnabled && (
          <SearchInput
            value={keyword || ""}
            setValue={setKeyword || handleKeyword}
          />
        )}
        <TreeView options={options} setOutputValue={setOutputValue} />
      </div>
    </div>
  );
};

export default FilterTree;
