import { AllProductIcon } from "@/images/icons/product_types/icon_wrapper";
import { ICategory } from "src/lib/types";
import { fetchChildCategories } from "src/lib/api/category";

import { useState } from "react";
import Flickity from "react-flickity-component";
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
    <div className="w-full">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
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
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={2}
        swipeable
      >
        {menus.map((menu) => {
          const Component = menu.icon;

          return (
            <div key={menu.id}>
              <Component className="" />
              <span>{menu.name}</span>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ProductTypes;
