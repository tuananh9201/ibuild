import moment from "moment";

import IBuildImage from "@/images/IBuildLogo.png";
import { INews } from "src/lib/types";
import { RenderImageError } from "../common";

interface NewsProps {
  news: INews;
  hideDescription?: boolean;
}

const NewCardNormal = (props: NewsProps) => {
  return (
    <div className="flex flex-col items-start px-0 gap-6 max-w-[276px]">
      <div className="rounded-[4px] min-h-[187px] w-full">
        <RenderImageError
          defaultImage={IBuildImage.src}
          image={props.news.feature_image || ""}
          width={276}
          height={187}
          title={props.news.title}
          className="w-[276px] h-[187px] object-cover rounded overflow-hidden cursor-pointer"
        />
      </div>
      <div>
        <div className="text-[14px] font-normal not-italic">
          {props?.news?.created_at &&
            moment(props.news.created_at).format("DD/MM/YYYY")}
        </div>
        <div className="font-medium text-xl leading-[150%] line-clamp-2 cursor-pointer">
          {props.news?.title || ""}
        </div>

        {!props.hideDescription && (
          <div className="mt-4 not-italic font-normal text-base leading-[150%] overflow-hidden text-ellipsis text-ellipsis-clip-desc">
            {props.news?.intro || ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCardNormal;
