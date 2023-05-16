import useSWR from "swr";

import { FilterRelated } from "../common";
import { RELATED_LIST } from "@/constants/data";
import { getCities } from "@/lib/api/information";

const AddressInfo = () => {
  const { data: cities } = useSWR("address", getCities);
  console.log(cities);

  return (
    <div className="w-full flex flex-row gap-3 pl-[120px]">
      <div className="w-1/2">
        <FilterRelated
          defaultValue={0}
          options={RELATED_LIST}
          placeHolder="Tỉnh/Thành phố"
          onSelect={() => {}}
        />
      </div>
      <div className="flex-base">
        <FilterRelated
          defaultValue={0}
          options={RELATED_LIST}
          placeHolder="Quận/Huyện"
          onSelect={() => {}}
        />
      </div>
    </div>
  );
};

export default AddressInfo;
