import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { arrowDown } from "@/images/index";

interface ItemFilter {
  id: number;
  value: string;
}

interface FilterRelatedProps {
  placeHolder?: string;
  defaultValue?: number;
  options?: ItemFilter[];
  onSelect: (value: number) => void;
  reset?: boolean;
}

const FilterRelated = ({
  placeHolder,
  defaultValue,
  options,
  onSelect,
  reset,
}: FilterRelatedProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [valueSelected, setValueSelected] = useState(() => {
    return options && defaultValue
      ? options.find((option) => option.id === defaultValue)?.value
      : placeHolder
      ? placeHolder
      : "Lựa chọn";
  });

  const selectElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      if (!selectElement.current?.contains(e.target)) {
        setIsOpenMenu(false);
      }
    });

    () => window.removeEventListener("click", () => {});
  }, []);

  const handleSelectValue = (id: number) => {
    setIsOpenMenu(false);
    const value = options?.find((option) => option.id === id)?.value;
    setValueSelected(value);
    onSelect(id);
  };
  useEffect(() => {
    if (reset) {
      handleSelectValue(1);
    }
  }, [reset]);

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
      {isOpenMenu && (
        <div className="absolute transition z-10 w-full bg-white border border-solid border-primary-color rounded-b-lg">
          <ul className="font-roboto font-normal text-base leading-[calc(24 / 16)] text-text-color cursor-pointer">
            {options &&
              options.map((option) => (
                <li
                  key={option.id}
                  className="py-[14px] pl-4 hover:bg-[#e6e6e6]"
                  onClick={() => handleSelectValue(option.id)}
                >
                  {option.value}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterRelated;
