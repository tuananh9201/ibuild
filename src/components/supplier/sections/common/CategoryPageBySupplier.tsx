import { SearchIcon } from "@/images/icons/product_types/icon_wrapper";

const CategoryPageBySupplier = () => {
  return (
    <>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Tìm sản phẩm trong nhà cung cấp"
          className="w-full border border-solid border-[#dddddd] rounded py-4 px-12 placeholder:text-text-color placeholder:font-normal placeholder:text-base"
        />
      </div>
    </>
  );
};

export default CategoryPageBySupplier;
