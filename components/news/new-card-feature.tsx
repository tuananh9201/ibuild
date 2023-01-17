import { news2 } from "@/constants/images";
import style from "@/styles/modules/build-info.module.scss";
import Image from "next/image";
const NewCardFeature = () => {
  return (
    <div className={style.Build_Card_Feature}>
      <div className={style.Build_Card_Feature_Image}>
        <Image src={news2} alt="" />
      </div>
      <div className={style.Build_Card_Feature_Desc}>
        <div className={style.Build_Card_Feature_Desc_Date}>25/07/2022</div>
        <div className={style.Build_Card_Feature_Desc_Title}>
          Tăng cường bảo vệ nguồn nước dưới đất trong hoạt động khảo sát địa
          chất công trình, xử lý nền móng công trình xây dựng
        </div>
      </div>
    </div>
  );
};

export default NewCardFeature;
