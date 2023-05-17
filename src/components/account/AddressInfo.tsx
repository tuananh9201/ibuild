import { useEffect, useState } from "react";
import useSWR from "swr";

import { getCities, getDistricts } from "@/lib/api/information";
import { FilterRelated } from "../common";

interface AddressInfoProps {
  cityId: string;
  districtId: string;
  onSelectCity: (id: string) => void;
  onSelectDistrict: (id: string) => void;
}

const AddressInfo = ({
  cityId,
  districtId,
  onSelectCity,
  onSelectDistrict,
}: AddressInfoProps) => {
  const { data: cities } = useSWR("address", getCities);
  const { data: districts } = useSWR(cityId, getDistricts);

  // function
  const handleSelectCity = (id: string) => {
    onSelectCity(id);
  };

  const handleSelectDistrict = (id: string) => {
    onSelectDistrict(id);
  };

  return (
    <div className="w-full flex flex-row gap-3 pl-[120px]">
      {cities && (
        <div className="w-1/2">
          <FilterRelated
            defaultValue={cityId}
            options={cities}
            placeHolder="Tỉnh/Thành phố"
            onClick={handleSelectCity}
            onSelect={() => {}}
          />
        </div>
      )}

      <div className="flex-base">
        <FilterRelated
          defaultValue={districtId}
          options={districts || []}
          placeHolder="Quận/Huyện"
          onClick={handleSelectDistrict}
          onSelect={() => {}}
        />
      </div>
    </div>
  );
};

export default AddressInfo;
