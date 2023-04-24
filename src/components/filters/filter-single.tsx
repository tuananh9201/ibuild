import { useState, useEffect } from "react";
import useSWR from "swr";

import FilterRelated from "./filter-related";
import FilterTree from "./filter-tree";
import { getAreas } from "@/lib/api/information";
import { RELATED_LIST } from "@/constants/data";
import { ICategory } from "@/lib/types";

interface FilterSingleProps {
  changeSort: (sort: string) => void;
  changeChecked: (values: any) => void;
}

const DEFAULT_AREA_VALUE = {
  id: "00",
  name_vi: "Chọn khu vực",
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
    if (!areaList) return;
    if (values.length === 0 || values[0] === "0" || values.includes("0")) {
      changeChecked(["0"]);
      return;
    }
    const parentArea: ICategory[] = [];
    const stringId: string[] = [];
    const ids: string[] = [];
    values.forEach((value: string) => {
      const option = areaList.find(
        (area) => area.id === value && area.parent_id === "0"
      );
      if (option) {
        parentArea.push(option);
        stringId.push(option.id);
      }
    });
    parentArea.forEach((parent) => {
      ids.push(parent.id);
      const child = areaList.filter((area) => area.parent_id === parent.id);
      if (child) {
        child.forEach((c) => {
          stringId.push(c.id);
        });
      }
    });
    values.forEach((value: string) => {
      if (!stringId.includes(value)) {
        ids.push(value);
      }
    });
    const names = ids.map((id) => {
      const city = areaList.find((area) => area.id === id);
      if (!city) return;
      if (city.name_vi.startsWith("Thành")) {
        // thành phố
        return city.name_vi.slice(10);
      }
      if (city.name_vi.startsWith("Tỉnh")) {
        // Tỉnh
        return city.name_vi.slice(0, 5);
      }
      if (city.name_vi.startsWith("Huyện")) {
        // Huyện
        return city.name_vi.slice(0, 6);
      }
      if (city.name_vi.startsWith("Thị xã")) {
        // Thị xã
        return city.name_vi.slice(0, 7);
      }
    });
    changeChecked(names);
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
          setSelectedValue={onChangeChecked}
        />
      </div>
    </div>
  );
};

export default FilterSingle;
