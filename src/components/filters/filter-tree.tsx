import { useState, useRef } from "react";
import Image from "next/image";

import { arrowDown } from "@/images/index";

const FilterTree = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [valueSelected, setValueSelected] = useState("Chọn danh mục sản phẩm");

  const selectElement = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-w-[205px]">
      <div
        className={`w-full py-[11px] pl-4 pr-3 border border-solid rounded-t flex flex-row items-center justify-between cursor-pointer ${
          isOpenMenu
            ? "border-[#ff4d14] border-b-0"
            : "rounded-b border-[#e6e6e6]"
        }`}
        onClick={() => {
          setIsOpenMenu((prev) => !prev);
        }}
        ref={selectElement}
      >
        <span className="font-roboto font-normal text-base leading-[calc(24 / 16)] text-text-color pr-12">
          {valueSelected}
        </span>
        <span>
          <Image
            src={arrowDown}
            alt="icon"
            className={`transition ${isOpenMenu ? "rotate-180" : ""}`}
          />
        </span>
      </div>
    </div>
  );
};

export default FilterTree;
