import { SearchIcon } from "@/images/icons/product_types/icon_wrapper";

const CategoryPageBySupplier = () => {
  return (
    <>
      <div>
        <SearchIcon />
        <input
          type="text"
          placeholder="Tìm sản phẩm trong nhà cung cấp"
          className="w-full border border-solid border-[#dddddd] rounded"
        />
      </div>
    </>
  );
};

export default CategoryPageBySupplier;
