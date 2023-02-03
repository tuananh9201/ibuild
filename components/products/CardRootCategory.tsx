import React from "react";
import style from "@/styles/modules/productCategories/card.module.scss";
import Image from "next/image";
import { bgRootCategory } from "@/constants/images";
import { ICategory } from "lib/types";
import useSWR from "swr";
import { fetchChildsCategories } from "lib/api/category";
import { Skeleton } from "antd";
import Link from "next/link";

type Props = {
  category: ICategory;
};

export default function CardRootCategory({ category }: Props) {
  const {
    data: childs,
    error,
    isLoading,
  } = useSWR<ICategory[], []>(category.id || "1", fetchChildsCategories, {
    fallbackData: [],
  });
  if (error) {
    return <div>error</div>;
  }
  return (
    <div className={style.CardRoot}>
      <div className={style.CardRoot_Main}>
        <div className={style.CardRoot_Main_Name}>{category.name}</div>
        <div className={style.CardRoot_Main_Childs}>
          {isLoading ? <Skeleton loading={true} active /> : null}
          {childs?.map((cate, idx) => {
            if (idx > 3) return null;
            if (idx === 3) {
              return (
                <div className={style.CardRoot_Main_Childs_Item}>
                  <div className={style.CardRoot_Main_Childs_Item_Icon}></div>
                  <Link
                    href={`/${category.slug}`}
                    className={style.CardRoot_Main_Childs_Item_Text}
                  >
                    Xem tất cả
                  </Link>
                </div>
              );
            }
            return (
              <div key={cate.id} className={style.CardRoot_Main_Childs_Item}>
                <div className={style.CardRoot_Main_Childs_Item_Icon}></div>
                <Link
                  href={`/${cate.slug}`}
                  className={style.CardRoot_Main_Childs_Item_Text}
                >
                  {cate.name}
                </Link>
              </div>
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
