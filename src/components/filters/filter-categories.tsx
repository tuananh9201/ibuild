import { useEffect } from "react";
import useSWR from "swr";

import { FilterLocation, Input } from "@/components/common";
import { ICategory } from "@/lib/types";
import { fetchChildCategories } from "@/lib/api/category";
import FilterTree from "./filter-tree";

import type { DataNode } from "antd/es/tree";

interface FilterCategoriesProps {
  productId: string;
}

const PRODUCT_CATEGORIES = [
  {
    id: 1,
    value: "Camera",
  },
];

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
  console.log(categories);
  if (!categories) return null;
  // const productTopFirstLevel = categories.filter((item) => item.level === 0);

  const options: SelectTreeOptionView[] = categories.map((option) => {
    return {
      id: option.id,
      parent_id: option.parent_id,
      title: option.name_vi,
      key: option.id,
      children: [],
    };
  });
  const renderTreeOptions = (arr: SelectTreeOptionView[]) => {
    // arr.forEach((item) => {
    //   const childs = categories.filter((cate) => cate.parent_id === item.key);
    //   console.log(childs);
    // });
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

  return (
    <div className="mt-4 flex gap-4">
      <div className="w-[25%]">
        <span className="inline-block font-roboto font-medium text-base leading-[calc(24 / 16)] mb-2">
          Danh mục sản phẩm
        </span>
        <FilterTree options={newArry} />
      </div>
      <div className="w-[25%]">
        <span className="inline-block font-roboto font-medium text-base leading-[calc(24 / 16)] mb-2">
          Số lượng
        </span>
        <div className="flex flex-row gap-2 items-center">
          <Input placeHolder="Từ" />
          <div className="bg-[#333333] w-4 h-[1px]"></div>
          <Input placeHolder="Đến" />
        </div>
      </div>
      <div className="w-[25%]">
        <span className="inline-block font-roboto font-medium text-base leading-[calc(24 / 16)] mb-2">
          Khoảng giá
        </span>
        <div className="flex flex-row gap-2 items-center">
          <Input placeHolder="đ  Từ" />
          <div className="bg-[#333333] w-4 h-[1px]"></div>
          <Input placeHolder="đ  Đến" />
        </div>
      </div>
      <div className="w-[25%]">
        <span className="inline-block font-roboto font-medium text-base leading-[calc(24 / 16)] mb-2">
          Khu vực
        </span>
        <FilterLocation />
      </div>
      {/* <div className="w-[15%]">
        <button>Áp dụng</button>
        <button>Xóa lọc</button>
      </div> */}
    </div>
  );
};

export default FilterCategories;
