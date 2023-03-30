import { FilterLocation } from "@/components/common/index";
import { Input } from "@/components/common/index";
import FilterTree from "./filter-tree";
import SelectTree from "./select-tree";

interface FilterCategoriesProps {}

const PRODUCT_CATEGORIES = [
  {
    id: 1,
    value: "Camera",
  },
];

const FilterCategories = () => {
  return (
    <div className="mt-4 flex gap-4">
      <div className="w-[25%]">
        <span className="inline-block font-roboto font-medium text-base leading-[calc(24 / 16)] mb-2">
          Danh mục sản phẩm
        </span>
        <FilterTree />
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
