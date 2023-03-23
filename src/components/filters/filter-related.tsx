import { useState } from "react";
import Image from "next/image";

import { Select } from "antd";
import { arrowDown } from "@/images/index";

interface FilterRelatedProps {}

const FilterRelated = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <Select
      defaultValue="Liên quan nhất"
      options={[
        {
          value: 1,
          label: "Liên quan nhất",
        },
        {
          value: 2,
          label: "Sản phẩm mới",
        },
        {
          value: 3,
          label: "Lượt xem nhiều nhất",
        },
        {
          value: 4,
          label: "Lượt thích nhiều nhất",
        },
      ]}
      suffixIcon={
        <Image
          src={arrowDown}
          alt="icon"
          className={`transition ${isOpenMenu ? "rotate-180" : ""}`}
        />
      }
      size="large"
      listItemHeight={52}
      onFocus={() => setIsOpenMenu(true)}
      onBlur={() => setIsOpenMenu(false)}
      popupClassName="border-solid border-"
      className="w-[205px] h-[46px] flex items-center"
    />
  );
};

export default FilterRelated;
