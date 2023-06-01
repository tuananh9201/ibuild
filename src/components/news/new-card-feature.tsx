import Image from "next/image";
import moment from "moment";

import { news2 } from "@/constants/images";
import { INews } from "@/lib/types";
import { RenderImageError } from "../common";
import IBuildImage from "@/images/IBuildLogo.png";

interface NewCardFeatureProps {
  newFeature: INews;
}

const NewCardFeature = ({ newFeature }: NewCardFeatureProps) => {
  return (
    <div className="flex flex-row items-center p-0 gap-6">
      <div className="flex-1 rounded-[4px] hover:cursor-pointer">
        <RenderImageError
          defaultImage={IBuildImage.src}
          image={newFeature?.feature_image || ""}
          width={205}
          height={166}
          title={newFeature?.title || ""}
          className="h-[166px] w-full max-w-[205px] rounded object-cover overflow-hidden"
        />
      </div>
      <div className="flex-1 lg:flex-2 flex flex-col items-start p-0">
        <div className="font-normal text-sm leading-[150%] text-[#717171]">
          {newFeature?.created_at &&
            moment(newFeature.created_at).format("DD/MM/YYYY")}
        </div>
        <div className="font-medium text-xl leading-[150%] hover:cursor-pointer line-clamp-2">
          {newFeature?.title || ""}
        </div>
      </div>
    </div>
  );
};

export default NewCardFeature;
