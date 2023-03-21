import { Input } from "antd";
import React from "react";

type Props = {};

const FilterQuantity = (props: Props) => {
  return (
    <div>
      <span className="not-italic font-medium text-xl leading-[150%] text-text-color mb-4">Số lượng</span>
      <div className="flex justify-between gap-2 items-center mx-0 my-4">
        <Input placeholder="đ  Từ" /> - <Input placeholder="đ  Đến" />
      </div>
      <button className="ibuild-btn-outline">Áp dụng</button>
    </div>
  );
};

export default FilterQuantity;
