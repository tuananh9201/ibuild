import { useState, useEffect } from "react";
import useSWR from "swr";

import FilterRelated from "./filter-related";
import FilterTree from "./filter-tree";
import { getAreas } from "@/lib/api/information";
import { RELATED_LIST } from "@/constants/data";
import { ICategory } from "@/lib/types";

interface FilterSingleProps {
  changeSort: (sort: string) => void;
}

const DEFAULT_AREA_VALUE = {
  id: "00",
  name_vi: "Chọn khu vực",
};

const FilterSingle = ({ changeSort }: FilterSingleProps) => {
  const { data: areaList } = useSWR("dddd", getAreas);
  const [areas, setAreas] = useState<ICategory[]>([]);
  const [area, setArea] = useState("");
  const [selectedArea, setSelectedArea] = useState([]);

  const handleSelect = (value: number) => {
    const option = RELATED_LIST.find((related) => related.id === value);
    if (option) {
      changeSort(option?.slug);
    }
  };
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
          setSelectedValue={setSelectedArea}
        />
      </div>
    </div>
  );
};

export default FilterSingle;
