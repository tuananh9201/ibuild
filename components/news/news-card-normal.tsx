import { news2 } from "@/constants/images";
import style from "@/styles/modules/build-info.module.scss";
import Image from "next/image";
import { INews } from "types";
interface NewsProps {
  news: INews;
}
const NewCardNormal = (props: NewsProps) => {
  return (
    <div className={style.Build_Card_Normal}>
      <div className={style.Build_Card_Normal_Image}>
        <Image style={{ width: "100%" }} src={news2} alt="" />
      </div>
      <div className={style.Build_Card_Normal_Desc}>
        <div className={style.Build_Card_Normal_Desc_Date}>
          {props.news.date}
        </div>
        <div className={style.Build_Card_Normal_Desc_Title}>
          {props.news.title}
        </div>
        <div className={style.Build_Card_Normal_Desc_Desc}>
          {props.news.des}
        </div>
      </div>
    </div>
  );
};

export default NewCardNormal;
