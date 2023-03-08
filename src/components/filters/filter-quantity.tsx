import { Input } from "antd";
import React from "react";

type Props = {};

const FilterQuantity = (props: Props) => {
  return (
    <div className="filter-item">
      <span className="filter-title">Số lượng</span>
      <div className="input-group-range">
        <Input placeholder="đ  Từ" /> - <Input placeholder="đ  Đến" />
      </div>
      <button className="ibuild-btn-outline">Áp dụng</button>
    </div>
  );
};

export default FilterQuantity;
