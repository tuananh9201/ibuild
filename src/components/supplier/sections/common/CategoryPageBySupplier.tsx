import { useState } from "react";

import {
  FilterRelated,
  NoFoundResult,
  ProductTypes,
} from "@/components/common";
import { SearchIcon } from "@/images/icons/product_types/icon_wrapper";
import { RELATED_LIST } from "@/constants/data";

const CategoryPageBySupplier = () => {
  const [currentActive, setCurrentActive] = useState("all");

  const handleClickCategory = (id: string) => {
    console.log(id);
  };
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
      <div className="flex flex-col gap-6 mt-8">
        <ProductTypes
          parentId="b15afc56-6e9e-11ec-af53-a3bfea3fbc56"
          currentActive={currentActive}
          itemsOnScreen={[4, 1, 2]}
          setCurrentActive={setCurrentActive}
          onClickItem={handleClickCategory}
        />
        <div className="w-[300px]">
          <FilterRelated
            defaultValue={1}
            options={RELATED_LIST}
            onSelect={() => {}}
          />
        </div>
        <div className="mt-16">
          <NoFoundResult content="Không có sản phẩm nào" />
        </div>
      </div>
    </>
  );
};

export default CategoryPageBySupplier;
