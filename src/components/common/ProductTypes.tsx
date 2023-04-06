import { AllProductIcon } from "@/images/icons/product_types/icon_wrapper";
import { ICategory } from "src/lib/types";
import { fetchChildCategories } from "src/lib/api/category";
import { LeftRightIcon } from "@/images/icons/product_types/icon_wrapper";

import { useState } from "react";
import useSWR from "swr";
import Carousel from "react-multi-carousel";

interface ProductTypesProps {
  parentId: string;
  onClickItem: (name: string) => void;
}

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

  if (!menus) return null;

  const handleCurrentActive = (id: string) => {
    setCurrentActive(id);
  };
  const onClick = (id: string, name: string) => {
    handleCurrentActive(id);
    onClickItem(name);
  };

  return (
    <div className="w-full mt-4 relative">
      <Carousel
        additionalTransfrom={0}
        arrows
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
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
        rewind={false}
        rewindWithAnimation={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={2}
        swipeable
        customLeftArrow={
          <button className="absolute -left-5 rotate-180">
            <LeftRightIcon className="fill-primary-color" />
          </button>
        }
        customRightArrow={
          <button className="absolute -right-5">
            <LeftRightIcon className="fill-primary-color" />
          </button>
        }
      >
        {menus.map((menu) => {
          const Component = menu.icon;

          return (
            <div
              key={menu.id}
              className={`flex flex-row h-[64px] rounded border border-solid border-[#e6e6e6] items-center px-4 cursor-pointer ${
                currentActive === menu.id ? "bg-primary-color text-white" : ""
              }`}
              onClick={() => onClick(menu.id, menu.name)}
            >
              <div>
                <Component
                  className={`w-6 h-6 ${
                    currentActive === menu.id
                      ? "fill-white"
                      : "fill-secondary-color"
                  }`}
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
