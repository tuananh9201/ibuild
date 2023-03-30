import React from "react";
import { fetchChildCategories } from "src/lib/api/category";
import { ICategory } from "src/lib/types";
import useSWR from "swr";

type Props = {
  parentId: string;
};

const CategoryBarItem = () => {
  return (
    <div className="min-w-[200px] h-16 flex items-center gap-2">
      <div className="icon"></div>
      <div className="text">Hệ thống camera giám sát</div>
    </div>
  );
};

const SubCategoryBar = (props: Props) => {
  const {
    data: childrend,
    error,
    isLoading,
  } = useSWR<ICategory[]>(props.parentId || "", fetchChildCategories);
  console.log(childrend);

  return <div className="flex gap-4">SubCategoryBar</div>;
};

export default SubCategoryBar;
