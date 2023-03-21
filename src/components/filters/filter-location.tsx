import React from "react";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
type Props = {};

const FilterLocation = (props: Props) => {
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const options = [
    { label: "Hà Nội", value: "HaNoi" },
    { label: "TP.Hồ Chí Minh", value: "HCM" },
    { label: "Hải Phòng", value: "HP" },
    { label: "Đà Nẵng", value: "DN" },
  ];
  return (
    <>
      <span className="not-italic font-medium text-xl leading-[150%] text-text-color mb-4">Khu vực</span>
      <div className="flex flex-col">
        {options.map((o) => (
          <Checkbox className="item" key={o.value} onChange={onChange}>
            {o.label}
          </Checkbox>
        ))}
      </div>
    </>
  );
};
export default FilterLocation;
