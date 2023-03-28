import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import { arrowDown } from "@/images/index";
import Input from "@/components/common/form/Input";

interface TreeOption {
  id: number;
  value: string;
  childrenList?: TreeOption[];
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
    childrenList: [],
  },
  {
    id: 3,
    value: "O to",
    childrenList: [],
  },
  {
    id: 4,
    value: "Xe may",
    childrenList: [],
  },
];

const MakeTreeOption = ({ id, value, childrenList }: TreeOption) => {
  return (
    <>
      <li>{value}</li>
      {childrenList &&
        childrenList.map((child) => {
          return (
            <li key={child.id}>
              <MakeTreeOption
                id={child.id}
                value={child.value}
                childrenList={child.childrenList}
              />
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
          <Input placeHolder="Bạn muốn tìm khu vực nào?" />

          <div className="mt-[35px]">
            {LIST.map((l) => (
              <div key={l.id}>
                <MakeTreeOption
                  id={l.id}
                  value={l.value}
                  childrenList={l.childrenList}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterTree;
