import React from "react";

import ProductGroupCard from "./ProductGroupCard";
import { ICategory } from "@/lib/types";

interface ListProductGroupProps {
  data: ICategory[];
}

const ListProductGroup = ({ data }: ListProductGroupProps) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {data &&
        data.length &&
        data.map((v, idx) => (
          <ProductGroupCard
            key={idx}
            id={v.slug}
            title={v.name_vi}
            icon={v.icon}
          />
        ))}
    </div>
  );
};

export default ListProductGroup;
