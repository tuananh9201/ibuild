import {
  LeftRightIcon,
  AllProductIcon,
  AllProductActiveIcon,
} from "@/images/icons/product_types/icon_wrapper";
import { getCategoriesIcon } from "@/lib/utils";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Carousel, { ArrowProps } from "react-multi-carousel";
import { fetchChildCategories } from "src/lib/api/category";
import { ICategory } from "src/lib/types";
import useSWR from "swr";

interface ProductTypesProps {
  parentId: string;
  onClickItem: (id: string) => void;
}

interface ButtonIconProps extends ArrowProps {
  children: React.ReactNode;
}

type RenderImageProps = {
  url: string;
  currentActive: boolean;
};

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

const RenderImage = ({ url, currentActive }: RenderImageProps) => {
  const [img, setImg] = useState("");
  useEffect(() => {
    setImg(url);
  }, [url]);

  const handleErrorImage = () => {
    setImg(
      currentActive
        ? getCategoriesIcon("all", true)
        : getCategoriesIcon("all", false)
    );
  };

  return (
    <>
      {img.length > 0 && (
        <Image
          src={img}
          alt=""
          className="h-6 w-6"
          width={24}
          height={24}
          onError={handleErrorImage}
        />
      )}
    </>
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
                <RenderImage
                  url={currentActive === menu.id ? menu.iconActive : menu.icon}
                  currentActive={currentActive === menu.id}
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
