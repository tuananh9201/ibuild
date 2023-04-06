import { useState, useRef } from "react";
import { Checkbox } from "antd";
import Image from "next/image";

import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { arrowDown } from "@/images/index";

type Props = {};

const FilterLocation = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [valueSelected, setValueSelected] = useState("Chọn khu vực");

  const selectElement = useRef<HTMLDivElement>(null);

  const onChange = (e: CheckboxChangeEvent) => {};
  const options = [
    { label: "Hà Nội", value: "HaNoi" },
    { label: "TP.Hồ Chí Minh", value: "HCM" },
    { label: "Hải Phòng", value: "HP" },
    { label: "Đà Nẵng", value: "DN" },
  ];
  return (
    <>
      <div className="relative w-full">
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
        {isOpenMenu && (
          <div className="flex flex-col absolute transition z-10 w-full bg-white border border-solid border-primary-color rounded-b-lg">
            {options.map((o) => (
              <Checkbox className="item" key={o.value} onChange={onChange}>
                {o.label}
              </Checkbox>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default FilterLocation;
