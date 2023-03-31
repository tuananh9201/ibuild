import { AllProductIcon } from "@/images/icons/product_types/icon_wrapper";
import { useState } from "react";
import Flickity from "react-flickity-component";
import { fetchChildCategories } from "src/lib/api/category";
import { ICategory } from "src/lib/types";
import useSWR from "swr";
interface ProductTypesProps {
  parentId: string;
  onClickItem: (name: string) => void;
}

const flickityOptions = {
  freeScroll: true,
  freeScrollFriction: 0.05,
  contain: true,
  pageDots: false,
  prevNextButtons: true,
  initialIndex: 0,
  cellAlign: "left",
  groupCells: true,
  arrowShape:
    "M 32.3 48.3613 L 12.6413 28.7026 L 32.3 9.04397 C 34.276 7.06797 34.276 3.87597 32.3 1.89997 C 30.324 -0.0760312 27.132 -0.0760312 25.156 1.89997 L 1.89997 25.156 C -0.0760312 27.132 -0.0760312 30.324 1.89997 32.3 L 25.156 55.556 C 27.132 57.532 30.324 57.532 32.3 55.556 C 34.2253 53.58 34.276 50.3373 32.3 48.3613 Z",
};

const ProductTypes = ({ parentId, onClickItem }: ProductTypesProps) => {
  const [currentActive, setCurrentActive] = useState("all");
  const {
    data: childrend,
    error,
    isLoading,
  } = useSWR<ICategory[]>(parentId || "", fetchChildCategories);
  const firstItem = {
    id: "all",
    name: "Tất cả sản phẩm",
    icon: AllProductIcon,
  };
  if (!childrend) return null;
  const childsTopLevel = childrend?.filter((cate) => cate.level === 0);
  const childs = childsTopLevel?.map((c, idx) => {
    return {
      id: c.id,
      name: c.name_vi,
      icon: AllProductIcon,
    };
  });
  const menus = [firstItem].concat(childs);
  const handleCurrentActive = (id: string) => {
    setCurrentActive(id);
  };
  const onClick = (id: string, name: string) => {
    handleCurrentActive(id);
    onClickItem(name);
  };

  return (
    <div className="w-full">
      <Flickity
        className={"carousel mt-4"}
        elementType={"div"}
        options={flickityOptions}
        disableImagesLoaded={true}
        reloadOnUpdate={false}
        static
      >
        {menus.map((item) => {
          const ComponentIcon = item.icon;

          return (
            <div
              key={item.id}
              className={`flex cursor-pointer flex-row items-center justify-center h-16 w-[213px] rounded mr-4 last:mr-0 border border-solid border-[#e6e6e6] px-[18.4px] hover:bg-primary-color group transition ${
                currentActive === item.id ? "bg-primary-color" : ""
              }`}
              onClick={() => onClick(item.id, item.name)}
            >
              <div>
                <ComponentIcon
                  className={`group-hover:fill-white ${
                    currentActive === item.id ? "fill-white" : ""
                  }`}
                />
              </div>
              <h2
                className={`font-roboto line-clamp-2 text-base font-medium leading-[150%] not-italic pl-[11px] group-hover:text-white ${
                  currentActive === item.id ? "text-white" : ""
                }`}
              >
                {item.name}
              </h2>
            </div>
          );
        })}
      </Flickity>
    </div>
  );
};

export default ProductTypes;
