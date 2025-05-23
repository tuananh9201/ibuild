import Link from "next/link";
import { IDesign } from "@/lib/types";
import RenderMultipleImage from "../RenderMultipleImage";

interface DesignCardProps {
  design: IDesign;
}

const DesignCard = ({ design }: DesignCardProps) => {
  return (
    <div className="bg-[#F8F9FF] p-4 rounded w-full max-w-[320px] flex flex-col justify-between">
      <div>
        <RenderMultipleImage images={design?.images || []} />
        <h1 className="text-secondary-color font-medium text-xl line-clamp-2 mt-4">
          {design.title}
        </h1>
        <p className="text-[#666666] font-normal text-base line-clamp-3 mt-[10px]">
          {design?.intro || ""}
        </p>
      </div>
      <Link href={`/chi-tiet-thiet-ke/${design.slug}`}>
        <button className="text-white bg-primary-color rounded font-medium text-base mt-4 h-11 w-full">
          Xem chi tiết
        </button>
      </Link>
    </div>
  );
};

export default DesignCard;
