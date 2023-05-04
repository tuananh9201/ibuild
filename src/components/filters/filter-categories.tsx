import { useEffect, useState } from "react";
import useSWR from "swr";

import FilterTree from "./filter-tree";
import { Input } from "@/components/common";
import { fetchChildCategories } from "@/lib/api/category";
import { getAreas } from "@/lib/api/information";
import { ICategory, SearchProduct } from "@/lib/types";
import { QUANTITIES_OPTIONS } from "@/constants/data";
import { arrayChecked } from "@/lib/hooks";
import { LoadingIcon } from "@/images/icons/product_types/icon_wrapper";
import { message } from "antd";
import { ERRORS } from "@/constants/msg";

interface FilterCategoriesProps {
  categoryId?: string;
  refresh?: number;
  isLoading: boolean;
  onHandleApplyFilter?: (params: SearchProduct) => void;
  resetFilter: Function;
}

const QUANTITIES = [
  {
    id: "1",
    name_vi: "1-99",
    parent_id: "5",
  },
  {
    id: "2",
    name_vi: "100-999",
    parent_id: "5",
  },
  {
    id: "3",
    name_vi: "Trên 1000",
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

const FilterCategories = ({
  categoryId,
  refresh,
  isLoading,
  resetFilter,
  onHandleApplyFilter,
}: FilterCategoriesProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [areas, setAreas] = useState<ICategory[]>([]);
  const [keywordSearch, setKeywordSearch] = useState({
    category: "",
    area: "",
  });
  const [categoryChecked, setCategoryChecked] = useState();
  const [quantityChecked, setQuantityChecked] = useState();
  const [areaChecked, setAreaChecked] = useState();
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");

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
  const getMinMaxQuantity = (levels: string[] | undefined) => {
    if (!levels || levels.length === 0)
      return {
        min: 0,
        max: 10000,
      };
    if (levels.includes("0"))
      return {
        min: 0,
        max: 10000,
      };
    const quantities: number[] = [];
    levels.forEach((level) => {
      const option = QUANTITIES_OPTIONS.find((q) => q.id === level);
      if (option) {
        quantities.push(option.min_quantity, option.max_quantity);
      }
    });

    return {
      min: Math.min(...quantities),
      max: Math.max(...quantities),
    };
  };
  const handleApplyFilter = () => {
    if (!fromPrice && toPrice) {
      setFromPrice("0");
    }
    if (fromPrice && !toPrice) {
      setToPrice("999.999.999");
    }
    if (Number(toPrice) < Number(fromPrice)) {
      message.error(ERRORS.MSG014);
      return;
    }
    const listAreaChecked = arrayChecked(areaList, areaChecked);
    const price = getMinMaxQuantity(quantityChecked);
    const payload: SearchProduct = {
      category_id: categoryChecked || [categoryId || ""],
      limit: 12,
      skip: 0,
      max_quantity: price.max,
      min_quantity: price.min,
      max_price: !toPrice ? 10000000000 : Number(toPrice),
      min_price: !fromPrice ? 0 : Number(fromPrice),
      cities: listAreaChecked || [],
    };
    onHandleApplyFilter && onHandleApplyFilter(payload);
  };

  useEffect(() => {
    if (!refresh) return;
    setFromPrice("");
    setToPrice("");
  }, [refresh]);

  const handleResetFilter = () => {
    resetFilter();
  };

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
          refresh={refresh}
          setKeyword={handleCategorySearch}
          setSelectedValue={setCategoryChecked}
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
            refresh={refresh}
            setSelectedValue={setQuantityChecked}
          />
        </div>
      </div>
      <div className="w-[20%]">
        <span className="inline-block font-roboto font-medium text-base leading-[calc(24 / 16)] mb-2">
          Khoảng giá
        </span>
        <div className="flex flex-row gap-2 items-center">
          <Input
            placeHolder="đ  Từ"
            value={fromPrice}
            setValue={setFromPrice}
          />
          <div className="bg-[#333333] w-4 h-[1px]"></div>
          <Input placeHolder="đ  Đến" value={toPrice} setValue={setToPrice} />
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
          refresh={refresh}
          setKeyword={handleAreaSearch}
          setSelectedValue={setAreaChecked}
        />
      </div>
      <div className="w-[25%] flex-base flex flex-row gap-3 justify-end items-end">
        <button
          className={`h-[46px] rounded border border-solid w-[130px] border-primary-color bg-primary-color text-white flex flex-row items-center justify-center ${
            isLoading ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={handleApplyFilter}
        >
          <span className="mr-2">
            {isLoading && <LoadingIcon className="fill-white animate-spin" />}
          </span>
          <span>Áp dụng</span>
        </button>
        <button
          className="h-[46px] rounded border border-solid px-5 border-[#999999]"
          onClick={handleResetFilter}
        >
          Xóa lọc
        </button>
      </div>
    </div>
  );
};

export default FilterCategories;
