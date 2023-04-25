import { useState, useEffect } from "react";
import useSWR from "swr";

import FilterRelated from "./filter-related";
import FilterTree from "./filter-tree";
import { getAreas } from "@/lib/api/information";
import { RELATED_LIST, PREFIXES } from "@/constants/data";
import { ICategory } from "@/lib/types";
import { arrayChecked } from "@/lib/hooks";

interface FilterSingleProps {
  changeSort: (sort: string) => void;
  changeChecked: (values: any) => void;
}

const DEFAULT_AREA_VALUE = {
  id: "00",
  name_vi: "Chọn khu vực",
};

const multipleArea = {
  id: "0",
  name_vi: "Nhiều khu vực",
};

const FilterSingle = ({ changeSort, changeChecked }: FilterSingleProps) => {
  const { data: areaList } = useSWR<ICategory[]>("dddd", getAreas);
  const [areas, setAreas] = useState<ICategory[]>([]);
  const [area, setArea] = useState("");

  const handleSelect = (value: number) => {
    const option = RELATED_LIST.find((related) => related.id === value);
    if (option) {
      changeSort(option?.slug);
    }
  };
  const handleAreaSearch = (word: string) => {
    setArea(word);
  };
  const onChangeChecked = (values: any) => {
    const names = arrayChecked(areaList, values);
    changeChecked(names);
  };

  useEffect(() => {
    if (!area && areaList) {
      setAreas(areaList);
    } else if (area && areaList) {
      const newArea = areaList.filter((a: ICategory) =>
        a.name_vi.toLocaleLowerCase().includes(area.trim().toLocaleLowerCase())
      );
      setAreas(newArea || []);
    }
  }, [areaList, area]);

  return (
    <div className="flex flex-row justify-between">
      <div>
        <FilterRelated
          defaultValue={1}
          options={RELATED_LIST}
          onSelect={handleSelect}
        />
      </div>
      <div className="w-[20%]">
        <FilterTree
          searchEnabled={true}
          options={areas}
          defaultValue={DEFAULT_AREA_VALUE}
          keyword={area}
          setKeyword={handleAreaSearch}
          setSelectedValue={onChangeChecked}
          multipleValue={multipleArea}
        />
      </div>
    </div>
  );
};

export default FilterSingle;
