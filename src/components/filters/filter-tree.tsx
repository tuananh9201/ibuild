import { useState, useRef, useEffect } from "react";
import { Checkbox } from "antd";
import Image from "next/image";

import { arrowDown } from "@/images/index";
import { SearchInput } from "@/components/common/index";
import { UpDownIcon } from "@/images/icons/product_types/icon_wrapper";

interface TreeOption {
  id: number;
  value: string;
  childrenList?: TreeOption[];
}

interface FilterTreeProps {
  childrenList: TreeOption[];
}

const LIST: TreeOption[] = [
  {
    id: 1,
    value: "Nha may",
    childrenList: [
      {
        id: 5,
        value: "Test may",
        childrenList: [
          {
            id: 6,
            value: "Di bo",
            childrenList: [
              {
                id: 7,
                value: "Bay",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    value: "May bay",
  },
  {
    id: 3,
    value: "O to",
  },
  {
    id: 4,
    value: "Xe may",
  },
];

const MakeTreeOption = ({ childrenList }: FilterTreeProps) => {
  return (
    <>
      {childrenList.map((item) => {
        return (
          <li key={item.id}>
            <span>{item.value}</span>
            {item.childrenList && (
              <ul className="px-3">
                <MakeTreeOption childrenList={item.childrenList} />
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
};

const FilterTree = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [valueSelected, setValueSelected] = useState("Chọn danh mục sản phẩm");

  const selectElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      if (!selectElement.current?.contains(e.target)) {
        setIsOpenMenu(false);
      }
    });

    () => window.removeEventListener("click", () => {});
  }, []);

  return (
    <div className="relative min-w-[205px]" ref={selectElement}>
      <div
        className={`w-full py-[11px] pl-4 pr-3 border border-solid rounded-t flex flex-row items-center justify-between cursor-pointer ${
          isOpenMenu
            ? "border-[#ff4d14] border-b-0"
            : "rounded-b border-[#e6e6e6]"
        }`}
        onClick={() => {
          setIsOpenMenu((prev) => !prev);
        }}
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
        <div className="absolute transition z-10 w-full bg-white border border-solid border-primary-color rounded-b-lg px-4 py-6">
          <SearchInput placeHolder="Bạn muốn tìm sản phẩm nào?" />

          <ul className="mt-[35px] font-roboto not-italic font-normal text-base leading-[150%] text-text-color flex flex-col gap-2">
            {LIST.map((l) => (
              <li key={l.id}>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center">
                    <Checkbox />
                    <span className="pl-3">{l.value}</span>
                  </div>
                  {l.childrenList && <UpDownIcon className="" />}
                </div>
                {l.childrenList && (
                  <ul className="pl-3">
                    <MakeTreeOption childrenList={l.childrenList} />
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterTree;
