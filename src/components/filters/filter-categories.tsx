import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

import { FilterLocation, Input } from "@/components/common";
import { fetchChildCategories } from "@/lib/api/category";
import { getAreas } from "@/lib/api/information";
import { ICategory } from "@/lib/types";
import { AreasModal } from "@/lib/models";
import FilterTree from "./filter-tree";

import type { DataNode } from "antd/es/tree";
import { fetchChildsCategories } from "@/lib/api/category";

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
    parent_id: "5",
  },
  {
    id: "2",
    name_vi: "100-999",
    parent_id: "5",
  },
  {
    id: "3",
    name_vi: "1000-9999",
    parent_id: "5",
  },
];

const DEFAULT_VALUE = {
  id: "00",
  name_vi: "Chọn danh mục sản phẩm",
};
const DEFAULT_QUANTITY_VALUE = {
  id: "00",
  name_vi: "Chọn số lượng",
};

const DEFAULT_AREA_VALUE = {
  id: "00",
  name_vi: "Chọn khu vực",
};

const FilterCategories = ({ categoryId }: FilterCategoriesProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [areas, setAreas] = useState<ICategory[]>([]);
  const [keywordSearch, setKeywordSearch] = useState({
    category: "",
    area: "",
  });

  useEffect(() => {
    if (!categoryId) return;
    const getChildCategories = async () => {
      const res = await fetchChildCategories(categoryId);
      setCategories(res);
    };

    getChildCategories();
  }, [categoryId]);

  useEffect(() => {
    const getListArea = async () => {
      const res = await getAreas();
      setAreas(res);
    };

    getListArea();
  }, []);

  useEffect(() => {
    if (!keywordSearch.category) {
      setCategories(categories);
    } else {
      const newCategories = categories.filter((category) =>
        category.name_vi.includes(keywordSearch.category)
      );
      setCategories(newCategories);
    }
  }, [keywordSearch]);

  return (
    <div className="mt-4 flex gap-4">
      <div className="w-[20%]">
        <span className="inline-block font-roboto font-medium text-base leading-[calc(24 / 16)] mb-2">
          Danh mục sản phẩm
        </span>
        <FilterTree
          options={categories}
          defaultValue={DEFAULT_VALUE}
          searchEnabled={true}
        />
      </div>
      <div className="w-[15%]">
        <span className="inline-block font-roboto font-medium text-base leading-[calc(24 / 16)] mb-2">
          Số lượng
        </span>
        <div className="flex flex-row gap-2 items-center">
          <FilterTree
            options={QUANTITIES}
            defaultValue={DEFAULT_QUANTITY_VALUE}
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
        <FilterTree options={areas} defaultValue={DEFAULT_AREA_VALUE} />
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
