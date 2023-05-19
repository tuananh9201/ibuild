import { useEffect, useState } from "react";

import { getWatchListSupplier } from "@/lib/api/supplier";
import { scrollToTop } from "@/lib/hooks";
import { ISupplierInfo } from "@/lib/types";
import { Pagination } from "antd";
import { NoFoundResult } from "../common";
import SupplierContainer from "../supplier/SupplierContainer";
import SupplierContainerLoading from "../supplier/SupplierContainerLoading";

const WatchListSupplier = () => {
  const [paging, setPaging] = useState({
    current: 1,
    total: 0,
  });
  const [params, setParams] = useState({
    limit: 5,
    skip: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<ISupplierInfo[]>([]);

  const fetWatchList = async () => {
    setIsLoading(true);
    const res = await getWatchListSupplier(params);
    setIsLoading(false);
    if (res) {
      setPaging((prev) => ({
        ...prev,
        total: res.paging.total,
      }));
      setSuppliers(res.data);
    }
  };

  // function
  const onChangePagination = (page: number) => {
    setPaging((prev) => ({
      ...prev,
      current: page,
    }));
    setParams((prev) => ({
      ...prev,
      skip: (page - 1) * 5,
    }));
    scrollToTop();
  };

  useEffect(() => {
    fetWatchList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (isLoading) return <SupplierContainerLoading items={5} />;

  return (
    <div>
      <div className="w-full mt-4">
        {suppliers && suppliers?.length > 0 && (
          <SupplierContainer
            data={suppliers}
            categoryId={""}
            disabledClickName
          />
        )}
        {suppliers?.length === 0 && (
          <NoFoundResult content="Danh sách yêu thích trống" />
        )}
        <Pagination
          onChange={onChangePagination}
          current={paging.current}
          pageSize={12}
          total={paging.total}
          hideOnSinglePage
        />
      </div>
    </div>
  );
};

export default WatchListSupplier;
