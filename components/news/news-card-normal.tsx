import { news2 } from "@/constants/images";
import style from "@/styles/modules/build-info.module.scss";
import Image from "next/image";
import { INews } from "lib/types";
import Link from "next/link";
interface NewsProps {
  news: INews;
  hideDescription?: boolean;
}
const NewCardNormal = (props: NewsProps) => {
  return (
    <div className={style.Build_Card_Normal}>
      <div className={style.Build_Card_Normal_Image}>
        <Link
          href={{
            pathname: `/thong-tin-xay-dung`,
            query: {
              cslug: props.news.category.slug,
              slug: props.news.slug,
            },
          }}
        >
          <Image
            style={{ width: "100%", minHeight: "187px" }}
            src={news2}
            alt=""
          />
        </Link>
      </div>
      <div className={style.Build_Card_Normal_Desc}>
        <div className={style.Build_Card_Normal_Desc_Date}>
          {props.news.date}
        </div>
        <div className={style.Build_Card_Normal_Desc_Title}>
          <Link
            href={`/thong-tin-xay-dung/${props.news.category.slug}/${props.news.slug}`}
          >
            {props.news.title}
          </Link>
        </div>
        {props?.hideDescription ? null : (
          <div className={style.Build_Card_Normal_Desc_Desc}>
            {props.news.des}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCardNormal;
