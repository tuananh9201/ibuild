import { AllProductIcon } from "@/images/icons/product_types/icon_wrapper";
import { ICategory } from "src/lib/types";
import { fetchChildCategories } from "src/lib/api/category";
import { LeftRightIcon } from "@/images/icons/product_types/icon_wrapper";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import Carousel from "react-multi-carousel";
import { getCategoriesIcon } from "@/lib/utils";

interface ProductTypesProps {
  parentId: string;
  onClickItem: (id: string) => void;
}

const ButtonLeftIcon = () => {
  return (
    <button className="absolute -left-5 rotate-180">
      <LeftRightIcon className="fill-primary-color" />
    </button>
  );
};

const ButtonRightIcon = () => {
  return (
    <button className="absolute -right-5">
      <LeftRightIcon className="fill-primary-color" />
    </button>
  );
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
    icon: getCategoriesIcon("all", false),
    iconActive: getCategoriesIcon("all", true),
  };
  if (!childrend) return null;
  const childsTopLevel = childrend?.filter((cate) => cate.level === 0);
  const childs = childsTopLevel?.map((c, idx) => {
    return {
      id: c.id,
      name: c.name_vi,
      icon: getCategoriesIcon(c?.icon || "", false),
      iconActive: getCategoriesIcon(c?.icon || "", true),
    };
  });
  const menus = [firstItem].concat(childs);

  if (!menus) return null;

  const handleCurrentActive = (id: string) => {
    setCurrentActive(id);
  };
  const onClick = (id: string) => {
    handleCurrentActive(id);
    onClickItem(id);
  };

  return (
    <div className="w-full mt-4 relative">
      <Carousel
        additionalTransfrom={0}
        arrows
        centerMode={false}
        containerClass="container-with-dots"
        draggable
        focusOnSelect={false}
        itemClass=""
        minimumTouchDrag={80}
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 5,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        slidesToSlide={2}
        swipeable
        rtl={false}
        customLeftArrow={<ButtonLeftIcon />}
        customRightArrow={<ButtonRightIcon />}
      >
        {menus.map((menu) => {
          return (
            <div
              key={menu.id}
              className={`flex flex-row h-[64px] rounded border border-solid border-[#e6e6e6] items-center px-4 cursor-pointer ${
                currentActive === menu.id ? "bg-primary-color text-white" : ""
              }`}
              onClick={() => onClick(menu.id)}
            >
              <div className="h-6 w-6 min-w-[24px] min-h-[24px]">
                <Image
                  className="h-6 w-6"
                  width={24}
                  height={24}
                  alt=""
                  src={currentActive === menu.id ? menu.iconActive : menu.icon}
                />
              </div>
              <span className="font-roboto not-italic font-medium text-base leading-[150%] text-inherit ml-2">
                {menu.name}
              </span>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ProductTypes;
