import { useState } from "react";

import FilterRelated from "./filter-related";
import { FilterIcon } from "@/images/icons/product_types/icon_wrapper";
import FilterCategories from "./filter-categories";

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
    value: "Lượt xem nhiều nhất",
    slug: "LUOT_XEM_NHIEU_NHAT",
  },
  {
    id: 4,
    value: "Lượt thích nhiều nhất",
    slug: "LUOT_THICH_NHIEU_NHAT",
  },
];

interface FilterProductProps {
  productId?: string;
}

const FilterProduct = ({ productId }: FilterProductProps) => {
  const [isActiveFilterIcon, setIsActiveFilterIcon] = useState(false);

  const handleSelectRelated = () => {};

  const handleShowFilter = () => {};

  return (
    <div className="w-full">
      <div className="w-full flex flex-col sm:flex-row justify-between mt-8">
        <FilterRelated
          defaultValue={1}
          options={RELATED_LIST}
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
      {isActiveFilterIcon && <FilterCategories productId={productId || ""} />}
    </div>
  );
};

export default FilterProduct;
