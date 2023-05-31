import { useState, useEffect } from "react";
import Link from "next/link";

import { IDesign, IDesignCategory } from "@/lib/types";
import { getDesignCategoryById } from "@/lib/api/design";
import { ArrowRightIcon } from "@/images/icons/product_types/icon_wrapper";

interface BrandCumsProps {
  design: IDesign;
  title: string;
}

const BrandCums = ({ design, title }: BrandCumsProps) => {
  // state
  const [data, setData] = useState<IDesignCategory | null>();

  const getDesignCategory = async () => {
    const res = await getDesignCategoryById(design?.category?.parent_id);
    if (res) {
      setData(res);
    }
  };

  useEffect(() => {
    getDesignCategory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [design]);

  return (
    <div className="flex flex-row gap-4 mt-16">
      <p className="text-[#666666] text-base font-normal">{data?.name || ""}</p>
      <ArrowRightIcon />
      <Link href={`/mau-thiet-ke?category=${design?.category?.id}`}>
        <p className="text-text-color text-base font-normal">
          {design?.category?.name || ""}
        </p>
      </Link>
      <ArrowRightIcon />
      <p className="text-[#666666] text-base font-normal">{title}</p>
    </div>
  );
};

export default BrandCums;
