import React from "react";
import style from "@/styles/modules/productCategories/card.module.scss";
import Image from "next/image";
import { bgRootCategory } from "@/constants/images";
import { ICategory } from "lib/types";
import Link from "next/link";

type Props = {
  category: ICategory;
  isLast?: boolean;
  children?: ICategory[];
  parent?: ICategory;
};

const CategoryChildItem = ({ parent, category, isLast }: Props) => {
  return (
    <div className={style.CardRoot_Main_Childs_Item}>
      <div className={style.CardRoot_Main_Childs_Item_Icon}></div>
      <Link
        href={
          isLast ? `/san-pham/${parent?.slug}` : `/san-pham/${category.slug}`
        }
        className={style.CardRoot_Main_Childs_Item_Text}
      >
        {isLast ? "Xem tất cả" : category.name}
      </Link>
    </div>
  );
};

export default function CardRootCategory({ category, children }: Props) {
  return (
    <div className={style.CardRoot}>
      <div className={style.CardRoot_Main}>
        <div className={style.CardRoot_Main_Name}>{category.name}</div>
        <div className={style.CardRoot_Main_Childs}>
          {children?.map((cate, idx) => {
            if (idx > 3) return null;
            return (
              <CategoryChildItem
                parent={category}
                key={idx}
                isLast={idx === 3}
                category={cate}
              />
            );
          })}
        </div>
      </div>
      <div className={style.CardRoot_Image}>
        <Image alt="" src={bgRootCategory} />
      </div>
    </div>
  );
}
