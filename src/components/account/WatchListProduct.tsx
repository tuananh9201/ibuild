import ProductCardHorizontal from "@/components/products/ProductCardHorizontal";
import { getWatchListProduct } from "@/lib/api/user";
import { Product } from "@/lib/types";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { NoFoundResult } from "../common";
import SupplierContainerLoading from "../supplier/SupplierContainerLoading";
import { scrollToTop } from "@/lib/hooks";

const WatchListProduct = () => {
  const [paging, setPaging] = useState({
    current: 1,
    total: 0,
  });
  const [params, setParams] = useState({
    limit: 5,
    skip: 0,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // call api
  const fetchWatchList = async () => {
    setIsLoading(true);
    const res = await getWatchListProduct(params);
    setIsLoading(false);
    if (res) {
      setPaging((prev) => ({
        ...prev,
        total: res.paging.total,
      }));
      setProducts(res.data);
    }
  };

  const onChangePagination = (page: number) => {
    setPaging({ ...paging, current: page });
    setParams((prev) => ({
      ...prev,
      skip: (page - 1) * 5,
    }));
    scrollToTop();
  };

  useEffect(() => {
    fetchWatchList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (isLoading) return <SupplierContainerLoading items={5} />;
  return (
    <>
      <div className="flex flex-col gap-6 mb-6">
        {products &&
          products?.length > 0 &&
          products.map((product) => (
            <ProductCardHorizontal key={product.id} product={product} />
          ))}
      </div>
      {products?.length === 0 && (
        <NoFoundResult content="Danh sách yêu thích trống" />
      )}
      <div className="w-full text-center">
        <Pagination
          current={paging.current}
          pageSize={5}
          total={paging.total}
          hideOnSinglePage
          onChange={onChangePagination}
        />
      </div>
    </>
  );
};

export default WatchListProduct;
