import Image from "next/image";
import React from "react";

import { searchIcon } from "@/constants/images";

interface SearchInputProps {
  placeHolder?: string;
  value?: string;
  setValue?: Function;
}

export default function SearchInput({
  placeHolder,
  value,
  setValue,
}: SearchInputProps) {
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) {
      setValue(e.target.value);
    }
  };

  return (
    <div className="border border-solid border-[#666666] rounded-lg flex flex-row items-center p-0 gap-4 isolate w-full h-12 bg-white py-4 pl-4">
      <div className="flex gap-[10px] min-w-full items-center">
        <Image className="w-4 h-4" src={searchIcon} alt="" />
        <input
          placeholder={placeHolder ? placeHolder : "Nhập..."}
          type="text"
          value={value}
          onChange={changeValue}
          className="w-full border-none placeholder:not-italic placeholder:font-normal placeholder:text-base placeholder:leading-[150%] placeholder:text-[#7f7f7f] font-roboto font-normal text-base leading-[calc(24 / 16)] text-text-color"
        />
      </div>
    </div>
  );
}
