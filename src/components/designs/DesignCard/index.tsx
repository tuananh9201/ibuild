import Image from "next/image";

import { IDesign } from "@/lib/types";
import RenderMultipleImage from "../RenderMultipleImage";

interface DesignCardProps {
  design: IDesign;
}

const DesignCard = ({ design }: DesignCardProps) => {
  return (
    <div className="bg-[#F8F9FF] p-4 rounded w-full max-w-[320px]">
      <RenderMultipleImage images={design.images} />
      <h1 className="text-secondary-color font-medium text-xl line-clamp-2 mt-4">
        {design.title}
      </h1>
      <p className="text-[#666666] font-normal text-base line-clamp-3 mt-[10px]">
        Theo yêu cầu của gia đình anh Công, ngôi nhà diện tích 6x9m được thiết
        kế 2 tầng cho gia đình 4 thành viên...
      </p>
      <button className="text-white bg-primary-color rounded font-medium text-base mt-4 h-11 w-full">
        Xem chi tiết
      </button>
    </div>
  );
};

export default DesignCard;
