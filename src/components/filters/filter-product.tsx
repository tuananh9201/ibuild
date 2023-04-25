import { useState } from "react";

import { FilterIcon } from "@/images/icons/product_types/icon_wrapper";
import { SearchProduct } from "@/lib/types";
import FilterCategories from "./filter-categories";
import FilterRelated from "./filter-related";

const RELATED_LIST = [
  {
    id: 1,
    value: "Liên quan nhất",
    slug: "LIEN_QUAN_NHAT",
  },
  {
    id: 2,
    value: "Sản phẩm mới",
    slug: "SAN_PHAM_MOI",
  },
  {
    id: 3,
    value: "Giá tăng dần",
    slug: "GIA_TANG_DAN",
  },
  {
    id: 4,
    value: "Giá giảm dần",
    slug: "GIA_GIAM_DAN",
  },
  {
    id: 5,
    value: "Theo dõi nhiều nhất",
    slug: "THEO_DOI_NHIEU_NHAT",
  },
];

const RELATED_LIST_NOT_RELEVANT = [
  {
    id: 1,
    value: "Sản phẩm mới",
    slug: "SAN_PHAM_MOI",
  },
  {
    id: 2,
    value: "Giá tăng dần",
    slug: "GIA_TANG_DAN",
  },
  {
    id: 3,
    value: "Giá giảm dần",
    slug: "GIA_GIAM_DAN",
  },
  {
    id: 4,
    value: "Theo dõi nhiều nhất",
    slug: "THEO_DOI_NHIEU_NHAT",
  },
];

interface FilterProductProps {
  categoryId?: string;
  isShowMostRelevant?: boolean;
  refresh?: number;
  onChangeSort: (sortSlug: string) => void;
  onHandleApplyFilter?: (params: SearchProduct) => void;
  resetFilter: Function;
}

const FilterProduct = ({
  categoryId,
  isShowMostRelevant,
  refresh,
  onChangeSort,
  onHandleApplyFilter,
  resetFilter,
}: FilterProductProps) => {
  const [isActiveFilterIcon, setIsActiveFilterIcon] = useState(false);
  const [options, setOptions] = useState(() => {
    return isShowMostRelevant ? RELATED_LIST_NOT_RELEVANT : RELATED_LIST;
  });

  const handleSelectRelated = (id: number) => {
    const sortSelected = options.find((s) => s.id === id);
    sortSelected && onChangeSort(sortSelected.slug);
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col sm:flex-row justify-between mt-8">
        <FilterRelated
          defaultValue={1}
          options={options}
          onSelect={handleSelectRelated}
        />
        <div
          className={`flex flex-row items-center px-4 py-3 rounded border border-[#e6e6e6] cursor-pointer group transition ${
            isActiveFilterIcon ? "bg-[#eb7a01]" : ""
          }`}
          onClick={() => setIsActiveFilterIcon((prev) => !prev)}
        >
          <FilterIcon className={`${isActiveFilterIcon ? "fill-white" : ""}`} />
          <span
            className={`font-roboto not-italic font-medium text-base leading-[150%] text-[#333333] ml-3 ${
              isActiveFilterIcon ? "text-white" : ""
            }`}
          >
            Bộ lọc
          </span>
        </div>
      </div>
      {isActiveFilterIcon && (
        <FilterCategories
          categoryId={categoryId}
          refresh={refresh}
          onHandleApplyFilter={onHandleApplyFilter}
          resetFilter={resetFilter}
        />
      )}
    </div>
  );
};

export default FilterProduct;
