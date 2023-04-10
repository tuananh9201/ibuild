import { useState, useRef, useEffect } from "react";
import useSWR from "swr";

import { TreeView, SearchInput } from "@/components/common";
import { UpDownIcon } from "@/images/icons/product_types/icon_wrapper";
import { ICategory } from "@/lib/types";
import { fetchChildCategories } from "@/lib/api/category";

interface FilterTreeProps {
  categoryId?: string;
  defaultValue?: ICategory;
  searchEnabled?: boolean;
  defaultOptions?: ICategory[];
}

const FilterTree = ({
  categoryId,
  defaultValue,
  searchEnabled,
  defaultOptions,
}: FilterTreeProps) => {
  // console.log(defaultOptions);

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [outputValue, setOutputValue] = useState(defaultValue);
  const [keyword, setKeyword] = useState("");

  const { data: categories } = useSWR<ICategory[]>(
    categoryId,
    fetchChildCategories
  );

  const [options, setOptions] = useState<ICategory[]>(defaultOptions || []);

  useEffect(() => {
    if (categories) {
      setOptions(categories);
    }
  }, [categories, defaultOptions]);

  const selectElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      if (!selectElement.current?.contains(e.target)) {
        setIsOpenMenu(false);
      }
    });

    () => window.removeEventListener("click", () => {});
  }, []);

  useEffect(() => {
    if (!keyword) {
      setOptions(categories || defaultOptions || []);
      return;
    }
    const optionsByKeyword = categories?.filter((option) =>
      option.name_vi.toLowerCase().includes(keyword.toLocaleLowerCase())
    );
    setOptions(optionsByKeyword || []);
  }, [keyword]);

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
        <TreeView options={options} setOutputValue={setOutputValue} />
      </div>
    </div>
  );
};

export default FilterTree;
