import React from "react";
import Carousel, { ArrowProps } from "react-multi-carousel";
import useSWR from "swr";

import { RenderImageError } from "@/components/common";
import { LeftRightIcon } from "@/images/icons/product_types/icon_wrapper";
import { getCategoriesByRootCategory } from "@/lib/api/supplier";
import { getCategoriesIcon } from "@/lib/utils";

interface CategoryCarouselProps {
  supplierId: string;
  rootCategoryId: string;
  currentActive: string;
  categoryId?: string;
  setCurrentActive: (id: string) => void;
}

interface ButtonIconProps extends ArrowProps {
  children: React.ReactNode;
}

const ButtonLeftIcon = ({ children, onClick }: ButtonIconProps) => {
  return (
    <button className="absolute -left-5 rotate-180" onClick={onClick}>
      {children}
    </button>
  );
};

const ButtonRightIcon = ({ children, onClick }: ButtonIconProps) => {
  return (
    <button className="absolute -right-5" onClick={onClick}>
      {children}
    </button>
  );
};

const CategoryCarousel = ({
  supplierId,
  rootCategoryId,
  categoryId,
  currentActive,
  setCurrentActive,
}: CategoryCarouselProps) => {
  const { data: categories } = useSWR(
    { supplierId, rootCategoryId },
    getCategoriesByRootCategory
  );

  const firstItem = {
    id: "all",
    name: "Tất cả sản phẩm",
    icon: getCategoriesIcon("all", false),
    iconActive: getCategoriesIcon("all", true),
  };

  React.useEffect(() => {
    if (categories) {
      if (categoryId) {
        const tabActive = menus.find((mn) => mn.id === categoryId);
        tabActive && setCurrentActive(tabActive.id);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  if (!categories) return null;

  const newCategories = categories?.map((c, idx) => {
    return {
      id: c.id,
      name: c.name_vi,
      icon: getCategoriesIcon(c?.icon || "", false),
      iconActive: getCategoriesIcon(c?.icon || "", true),
    };
  });

  const menus = [firstItem].concat(newCategories);

  // function
  const onClick = (id: string) => {
    setCurrentActive(id);
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
            items: 4,
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
        customLeftArrow={
          <ButtonLeftIcon>
            <LeftRightIcon className="fill-primary-color" />
          </ButtonLeftIcon>
        }
        customRightArrow={
          <ButtonRightIcon>
            <LeftRightIcon className="fill-primary-color" />
          </ButtonRightIcon>
        }
      >
        {menus.map((menu, idx) => {
          return (
            <div
              key={menu.id}
              className={`pr-4 ${idx === menus.length - 1 ? "-mr-3" : ""}`}
            >
              <div
                className={`flex flex-row h-[64px] rounded border border-solid border-[#e6e6e6] items-center px-4 cursor-pointer ${
                  currentActive === menu.id ? "bg-primary-color text-white" : ""
                }`}
                onClick={() => onClick(menu.id)}
              >
                <div className="h-6 w-6 min-w-[24px] min-h-[24px]">
                  <RenderImageError
                    defaultImage={
                      currentActive === menu.id
                        ? getCategoriesIcon("all", true)
                        : getCategoriesIcon("all", false)
                    }
                    image={
                      currentActive === menu.id ? menu.iconActive : menu.icon
                    }
                    width={20}
                    height={20}
                    title={menu.name}
                  />
                </div>
                <span className="font-roboto not-italic font-medium text-base leading-[150%] text-inherit ml-2">
                  {menu.name}
                </span>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
