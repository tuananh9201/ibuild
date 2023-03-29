import { useState, useRef, useEffect } from "react";
import { Checkbox } from "antd";
import Image from "next/image";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

import { arrowDown } from "@/images/index";
import { SearchInput } from "@/components/common/index";
import { UpDownIcon } from "@/images/icons/product_types/icon_wrapper";

interface TreeOption {
  id: number;
  value: string;
  childrenList?: TreeOption[];
  checked: boolean;
}

interface MakeTreeProps extends TreeOption {
  isParent?: boolean;
  handleGetNewOptions: ({
    id,
    status,
  }: {
    id: number;
    status: boolean;
  }) => void;
}

interface FilterTreeProps {
  childrenList: TreeOption;
}

const LIST: TreeOption[] = [
  {
    id: 1,
    value: "Nhà máy",
    childrenList: [
      {
        id: 5,
        value: "Sản xuất đồ gia dụng",
        childrenList: [
          {
            id: 6,
            value: "Đồ trẻ em",
            childrenList: [
              {
                id: 7,
                value: "Trẻ em sơ sinh",
                checked: false,
              },
            ],
            checked: false,
          },
        ],
        checked: false,
      },
    ],
    checked: false,
  },
  {
    id: 2,
    value: "Máy bay",
    checked: false,
  },
  {
    id: 3,
    value: "Ô tô",
    childrenList: [
      {
        id: 8,
        value: "Labo",
        checked: false,
      },
      {
        id: 9,
        value: "Mec",
        checked: false,
      },
      {
        id: 10,
        value: "Kia",
        checked: false,
      },
    ],
    checked: false,
  },
  {
    id: 4,
    value: "Xe máy",
    checked: false,
  },
];

const MakeTreeOption = ({
  id,
  value,
  childrenList = [],
  checked,
  isParent,
  handleGetNewOptions,
}: MakeTreeProps) => {
  const [isOpenMenuLevel, setIsOpenMenuLevel] = useState(false);
  const [listOption, setListOption] = useState(childrenList);
  const [isChecked, setIsChecked] = useState(checked);

  const handleSetStatusOption = (options: TreeOption[], status: boolean) => {
    options.forEach((option) => {
      option.checked = status;
      if (option.childrenList) {
        handleSetStatusOption(option.childrenList, status);
      }
    });
  };

  const handleChangeCheckbox = (e: CheckboxChangeEvent) => {
    handleGetNewOptions({ id: e.target.value, status: e.target.checked });
    console.log();
    setIsChecked(e.target.checked);
  };

  return (
    <li className={`${isParent ? "" : "pl-8"}`}>
      <div className="flex flex-row justify-between items-center">
        <div>
          <Checkbox
            onChange={handleChangeCheckbox}
            value={id}
            name={id.toString()}
            defaultChecked={isChecked}
            checked={isChecked}
          />
          <span className="pl-3">{value}</span>
        </div>
        {listOption.length > 0 && (
          <div onClick={() => setIsOpenMenuLevel((prev) => !prev)}>
            <UpDownIcon
              className={`cursor-pointer transition ${
                isOpenMenuLevel ? "rotate-180" : ""
              }`}
            />
          </div>
        )}
      </div>
      {listOption && isOpenMenuLevel && (
        <ul className="pt-7 transition-all">
          {listOption.map((item) => (
            <MakeTreeOption
              id={item.id}
              value={item.value}
              childrenList={item.childrenList}
              handleGetNewOptions={handleGetNewOptions}
              key={item.id}
              checked={item.checked}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const FilterTree = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [valueSelected, setValueSelected] = useState("Chọn danh mục sản phẩm");
  const [isOpenMenuFirstLevel, setIsOpenMenuFirstLevel] = useState(false);
  const [listCheckBox, setListCheckBox] = useState(LIST);

  const selectElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      if (!selectElement.current?.contains(e.target)) {
        setIsOpenMenu(false);
      }
    });

    () => window.removeEventListener("click", () => {});
  }, []);

  const handleSetStatusOption = (options: TreeOption[], status: boolean) => {
    options.forEach((option) => {
      option.checked = status;
      if (option.childrenList) {
        handleSetStatusOption(option.childrenList, status);
      }
    });
  };

  function handleGetNewOptions({
    id,
    status,
  }: {
    id: number;
    status: boolean;
  }) {
    console.log(id, status);
    const oldList = [...LIST];
    const oldOptionIndex = oldList.findIndex((item) => item.id === id);
    if (oldOptionIndex > -1) {
      oldList[oldOptionIndex].checked = status;
      if (oldList[oldOptionIndex].childrenList) {
        handleSetStatusOption(
          oldList[oldOptionIndex].childrenList || [],
          status
        );
      }
    }
    setListCheckBox(oldList);
  }

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

          <ul className="mt-[35px] font-roboto not-italic font-normal text-base leading-[150%] text-text-color flex flex-col gap-7">
            {listCheckBox.map((l) => (
              <MakeTreeOption
                id={l.id}
                value={l.value}
                childrenList={l.childrenList}
                checked={l.checked}
                isParent
                handleGetNewOptions={handleGetNewOptions}
                key={l.id}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterTree;
