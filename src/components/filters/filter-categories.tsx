import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

import { FilterLocation, Input } from "@/components/common";
import { fetchChildCategories } from "@/lib/api/category";
import { getAreas } from "@/lib/api/information";
import { ICategory, SearchProduct } from "@/lib/types";
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
const multipleCategory = {
  id: "0",
  name_vi: "Nhiều sản phẩm",
};
const multipleQuantity = {
  id: "0",
  name_vi: "Nhiều số lượng",
};
const multipleArea = {
  id: "0",
  name_vi: "Nhiều khu vực",
};

const FilterCategories = ({ categoryId }: FilterCategoriesProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [areas, setAreas] = useState<ICategory[]>([]);
  const [keywordSearch, setKeywordSearch] = useState({
    category: "",
    area: "",
  });
  const [payload, setPayload] = useState<SearchProduct>({
    category_id: [],
    cities: [],
    min_price: 0,
    max_price: 9999999999,
    min_quantity: 0,
    max_quantity: 9999999,
    limit: 12,
    skip: 0,
    sort_by: "LIEN_QUAN_NHAT",
  });

  const { data: categoryList } = useSWR(categoryId, fetchChildCategories);
  const { data: areaList } = useSWR("dddd", getAreas);

  useEffect(() => {
    if (!keywordSearch.area && areaList) {
      setAreas(areaList);
    } else if (keywordSearch.area && areaList) {
      const newArea = areaList.filter((area: ICategory) =>
        area.name_vi.includes(keywordSearch.area.trim())
      );
      setAreas(newArea || []);
    }
    if (!keywordSearch.category && categoryList) {
      setCategories(categoryList);
    } else if (keywordSearch.category && categoryList) {
      const newCategories = categoryList.filter((category) =>
        category.name_vi.includes(keywordSearch.category.trim())
      );
      setCategories(newCategories || []);
    }
  }, [keywordSearch, categoryList, areaList]);

  const handleCategorySearch = (word: string) => {
    setKeywordSearch({
      ...keywordSearch,
      category: word,
    });
  };
  const handleAreaSearch = (word: string) => {
    setKeywordSearch({
      ...keywordSearch,
      area: word,
    });
  };
  const handleApply = () => {};

  return (
    <div className="mt-4 flex gap-4">
      <div className="w-[20%]">
        <span className="inline-block font-roboto font-medium text-base leading-[calc(24 / 16)] mb-2">
          Danh mục sản phẩm
        </span>
        <FilterTree
          searchEnabled={true}
          options={categories}
          defaultValue={DEFAULT_VALUE}
          multipleValue={multipleCategory}
          keyword={keywordSearch.category}
          setKeyword={handleCategorySearch}
        />
      </div>
      <div className="w-[15%]">
        <span className="inline-block font-roboto font-medium text-base leading-[calc(24 / 16)] mb-2">
          Số lượng
        </span>
        <div className="flex flex-row gap-2 items-center">
          <FilterTree
            options={QUANTITIES}
            multipleValue={multipleQuantity}
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
        <FilterTree
          searchEnabled={true}
          options={areas}
          defaultValue={DEFAULT_AREA_VALUE}
          multipleValue={multipleArea}
          keyword={keywordSearch.area}
          setKeyword={handleAreaSearch}
        />
      </div>
      <div className="w-[25%] flex-base flex flex-row gap-3 justify-end items-end">
        <button
          className="h-[46px] rounded border border-solid px-5 border-primary-color bg-primary-color text-white"
          onClick={handleApply}
        >
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
