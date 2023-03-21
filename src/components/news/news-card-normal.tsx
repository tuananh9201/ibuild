import { news2 } from "@/constants/images";
import style from "@/styles/modules/build-info.module.scss";
import Image from "next/image";
import Link from "next/link";
import { INews } from "src/lib/types";
interface NewsProps {
  news: INews;
  hideDescription?: boolean;
}
const NewCardNormal = (props: NewsProps) => {
  return (
    <div className="flex flex-col items-start px-0 gap-6">
      <div className="rounded-[4px] min-h-[187px] w-full hover:cursor-pointer">
        <Link
          href={{
            pathname: `/thong-tin-xay-dung`,
            query: {
              cslug: props.news.category.slug,
              slug: props.news.slug,
            },
          }}
        >
          <Image className="w-full min-h-[187px]" src={news2} alt="" />
        </Link>
      </div>
      <div>
        <div className="text-[14px] font-normal not-italic">
          {props.news.date}
        </div>
        <div>
          <Link
            href={`/thong-tin-xay-dung/${props.news.category.slug}/${props.news.slug}`}
            className="font-medium text-xl leading-[150%] text-ellipsis text-ellipsis-clip-title"
          >
            {props.news.title}
          </Link>
        </div>
        {props?.hideDescription ? null : (
          <div className="mt-4 not-italic font-normal text-base leading-[150%] overflow-hidden text-ellipsis text-ellipsis-clip-desc">
            {props.news.des}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCardNormal;
