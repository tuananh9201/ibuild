import { FilterRelated, FilterLocation } from "@/components/common/index";
import { Input } from "@/components/common/index";

interface FilterCategoriesProps {}

const FilterCategories = () => {
  return (
    <div className="mt-4">
      <div>
        <span>Danh mục sản phẩm</span>
        <FilterRelated />
      </div>
      <div>
        <span>Số lượng</span>
        <Input placeHolder="Từ" />
        <Input placeHolder="Đến" />
      </div>
      <div>
        <span>Khoảng giá</span>
        <Input placeHolder="đ  Từ" />
        <Input placeHolder="đ  Đến" />
      </div>
      <div>
        <FilterLocation />
      </div>
      <div>
        <button>Áp dụng</button>
        <button>Xóa lọc</button>
      </div>
    </div>
  );
};

export default FilterCategories;
