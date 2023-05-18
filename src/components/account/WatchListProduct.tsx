import ProductCardHorizontal from "@/components/products/ProductCardHorizontal";
import { Pagination } from "antd";
import { useState } from "react";

const WatchListProduct = () => {
  const [paging, setPaging] = useState({
    current: 1,
    total: 120,
  });

  const onChangePagination = (page: number) => {
    setPaging({ ...paging, current: page });
  };
  return (
    <>
      <div className="flex flex-col gap-6 mb-6">
        {Array(8)
          .fill(0)
          .map((item, idx) => (
            <ProductCardHorizontal key={idx} />
          ))}
      </div>
      <div className="w-full text-center">
        <Pagination
          current={paging.current}
          pageSize={12}
          total={paging.total}
          hideOnSinglePage
          onChange={onChangePagination}
        />
      </div>
    </>
  );
};

export default WatchListProduct;
