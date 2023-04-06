import { useMemo } from "react";
import useSWR from "swr";

import { FilterLocation, Input } from "@/components/common";
import { fetchChildCategories } from "@/lib/api/category";
import { getAreas } from "@/lib/api/information";
import { ICategory } from "@/lib/types";
import { AreasModal } from "@/lib/models";
import FilterTree from "./filter-tree";

import type { DataNode } from "antd/es/tree";

interface FilterCategoriesProps {
  productId: string;
}

interface TreeOptionView extends ICategory {
  children?: TreeOptionView[];
}

interface SelectTreeOptionView extends DataNode {
  id: string;
  parent_id?: string;
}

const FilterCategories = ({ productId }: FilterCategoriesProps) => {
  const { data: categories } = useSWR<ICategory[]>(
    productId,
    fetchChildCategories
  );

  const res = useSWR<AreasModal[]>("", getAreas);

  const options = useMemo(() => {
    if (!categories) return [];

    return categories.map((option) => {
      return {
        id: option.id,
        parent_id: option.parent_id,
        title: option.name_vi,
        key: option.id,
        children: [],
      };
    });
  }, [categories]);

  const renderTreeOptions = (arr: SelectTreeOptionView[]) => {
    const rootItems: any = [];
    const lookup: any = {};

    arr.forEach((item) => {
      item.children = [];
      lookup[item.id] = item;
    });

    arr.forEach((item) => {
      if (!item.parent_id) return;
      const parent = lookup[item.parent_id];
      if (parent) {
        parent.children.push(item);
      } else {
        rootItems.push(item);
      }
    });

    return rootItems;
  };

  const newArry = renderTreeOptions(options);
  newArry.unshift({
    id: "0",
    parent_id: "0",
    title: "Tất cả",
    key: "0",
    children: [],
  });

  return (
    <div className="mt-4 flex gap-4">
      <div className="w-[25%]">
        <span className="inline-block font-roboto font-medium text-base leading-[calc(24 / 16)] mb-2">
          Danh mục sản phẩm
        </span>
        <FilterTree options={newArry} />
      </div>
      <div className="w-[10%]">
        <span className="inline-block font-roboto font-medium text-base leading-[calc(24 / 16)] mb-2">
          Số lượng
        </span>
        <div className="flex flex-row gap-2 items-center">
          <Input placeHolder="Từ" />
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
