import { useMemo, useState } from "react";
import useSWR from "swr";

import { FilterLocation, Input } from "@/components/common";
import { fetchChildCategories } from "@/lib/api/category";
import { getAreas } from "@/lib/api/information";
import { ICategory } from "@/lib/types";
import { AreasModal } from "@/lib/models";
import FilterTree from "./filter-tree";

import type { DataNode } from "antd/es/tree";

interface FilterCategoriesProps {
  categoryId?: string;
}

interface TreeOptionView extends ICategory {
  children?: TreeOptionView[];
}

interface SelectTreeOptionView extends DataNode {
  id: string;
  parent_id?: string;
}

const QUANTITIES = [
  {
    id: "1",
    name_vi: "0-99",
    key: "1",
  },
  {
    id: "2",
    name_vi: "100-999",
    key: "2",
  },
  {
    id: "3",
    name_vi: "1000-9999",
    key: "3",
  },
];

const FilterCategories = ({ categoryId }: FilterCategoriesProps) => {
  const defaultValue = {
    id: "00",
    name_vi: "Chọn danh mục sản phẩm",
  };
  const defaultQuantityValue = {
    id: "00",
    name_vi: "Chọn số lượng",
  };

  return (
    <div className="mt-4 flex gap-4">
      <div className="w-[20%]">
        <span className="inline-block font-roboto font-medium text-base leading-[calc(24 / 16)] mb-2">
          Danh mục sản phẩm
        </span>
        <FilterTree
          categoryId={categoryId}
          defaultValue={defaultValue}
          searchEnabled={true}
        />
      </div>
      <div className="w-[15%]">
        <span className="inline-block font-roboto font-medium text-base leading-[calc(24 / 16)] mb-2">
          Số lượng
        </span>
        <div className="flex flex-row gap-2 items-center">
          <FilterTree
            defaultValue={defaultQuantityValue}
            defaultOptions={QUANTITIES}
          />
        </div>
      </div>
      <div className="w-[20%]">
        <span className="inline-block font-roboto font-medium text-base leading-[calc(24 / 16)] mb-2">
          Khoảng giá
        </span>
        <div className="flex flex-row gap-2 items-center">
          <Input placeHolder="đ  Từ" />
          <div className="bg-[#333333] w-4 h-[1px]"></div>
          <Input placeHolder="đ  Đến" />
        </div>
      </div>
      <div className="w-[20%]">
        <span className="inline-block font-roboto font-medium text-base leading-[calc(24 / 16)] mb-2">
          Khu vực
        </span>
        <FilterLocation />
      </div>
      <div className="w-[25%] flex-base flex flex-row gap-3 justify-end items-end">
        <button className="h-[46px] rounded border border-solid px-5 border-primary-color bg-primary-color text-white">
          Áp dụng
        </button>
        <button className="h-[46px] rounded border border-solid px-5 border-[#999999]">
          Xóa lọc
        </button>
      </div>
    </div>
  );
};

export default FilterCategories;
