import React from "react";
import { Input } from "antd";

type Props = {};

const FilterPrice = (props: Props) => {
  return (
    <div className="filter-item">
      <span className="filter-title">Khoảng giá</span>
      <div className="input-group-range">
        <Input placeholder="đ  Từ" /> - <Input placeholder="đ  Đến" />
      </div>
      <button className="ibuild-btn-outline">Áp dụng</button>
    </div>
  );
};
export default FilterPrice;
