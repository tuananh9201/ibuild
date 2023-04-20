import { useState, useEffect } from "react";
import useSWR from "swr";

import FilterRelated from "./filter-related";
import FilterTree from "./filter-tree";
import { getAreas } from "@/lib/api/information";
import { RELATED_LIST } from "@/constants/data";
import { ICategory } from "@/lib/types";

const DEFAULT_AREA_VALUE = {
  id: "00",
  name_vi: "Nhiều khu vực",
};

const FilterSingle = () => {
  const { data: areaList } = useSWR("dddd", getAreas);

  const [areas, setAreas] = useState<ICategory[]>([]);
  const [area, setArea] = useState("");

  const handleSelect = () => {};
  const handleAreaSearch = (word: string) => {
    setArea(word);
  };

  useEffect(() => {
    if (!area && areaList) {
      setAreas(areaList);
    } else if (area && areaList) {
      const newArea = areaList.filter((a: ICategory) =>
        a.name_vi.includes(area.trim())
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
        />
      </div>
    </div>
  );
};

export default FilterSingle;
