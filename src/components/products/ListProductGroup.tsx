import React from "react";

import ProductGroupCard from "./ProductGroupCard";

const ListProductGroup = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {Array(13)
        .fill(0)
        .map((value, idx) => (
          <ProductGroupCard key={idx} />
        ))}
    </div>
  );
};

export default ListProductGroup;
