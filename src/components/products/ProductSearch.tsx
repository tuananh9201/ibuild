import { historyIcon } from "@/constants/images";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
type Props = {};

const histories = [
  "Cửa cuốn",
  "Cửa thủy tinh",
  "Vòi hoa sen",
  "Hút mùi nhà bếp",
  "Máy lạnh",
];
type HistoryItem = {
  item: string;
};
const SearchHistoryItem = (props: HistoryItem) => {
  return (
    <div className="flex flex-row items-center gap-4 w-full bg-white p-4  hover:border-b  hover:cursor-pointer">
      <div className="icon w-5 h-5">
        <Image src={historyIcon} alt="" />
      </div>
      <div className="font-normal text-base text-black-900 ">{props.item}</div>
    </div>
  );
};
const ProductSearch = (props: Props) => {
  const [isActivateSearch, setIsActivateSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsActivateSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);
  const onFocusInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsActivateSearch(true);
  };
  const className =
    "flex flex-row justify-start items-center p-2 gap-2 lg:max-w-3/4 bg-white rounded-lg h-16 ";
  const classNameActivate = `${className} border-solid border border-[#dddddd]`;
  return (
    <div
      className={
        isActivateSearch
          ? "mt-10 flex flex-col items-start gap-2 shadow-[0_0.5px_15px_1px_rgba(0,0,0,0.1)] rounded-lg h-fit z-10"
          : "mt-10 flex flex-col gap-2"
      }
    >
      <div className={isActivateSearch ? className : classNameActivate}>
        <div className="icon-search w-5 h-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          className="input-search w-96 placeholder:text-black text-base font-normal"
          placeholder="Bạn đang muốn tìm sản phẩm nào?"
          onFocus={onFocusInput}
        />
        <button className="transition duration-150 ease-in-out flex justify-center items-center rounded-lg bg-primary-color w-36 h-12 text-white font-medium hover:duration-150">
          Tìm kiếm
        </button>
      </div>
      {isActivateSearch ? (
        <div className="px-4 min-w-full bg-white flex flex-col">
          <div className="line h-px w-full border-solid border border-gray-100"></div>
          {histories.map((h, idx) => (
            <SearchHistoryItem item={h} key={idx} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ProductSearch;
