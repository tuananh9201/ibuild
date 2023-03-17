import React from "react";

type Props = {
  category: {
    id: number;
    image: any;
    name: string;
  };
};

const CategoryCard = (props: Props) => {
  return <div className="h-[500px]">CategoryCard</div>;
};

export default CategoryCard;
