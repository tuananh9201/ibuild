import React from "react";

type Props = {
  category: {
    id: number;
    image: any;
    name: string;
  };
};

const CategoryCard = (props: Props) => {
  return <div className="h-[500px]">CategoryCard {props.category.id}</div>;
};

export default CategoryCard;
