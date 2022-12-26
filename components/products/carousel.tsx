import { imgFeat, thumb1, thumb2, thumb3, thumb4 } from "@/constants/images";
import style from "@/styles/modules/carousel.module.scss";
import Image from "next/image";

const Carousel = () => {
  return (
    <div className={style.carousel}>
      <div className={style.thumbnail}>
        <Image className={style.thumbItem} src={thumb1} alt="" />
        <Image className={style.thumbItem} src={thumb2} alt="" />
        <Image className={style.thumbItem} src={thumb3} alt="" />
        <Image className={style.thumbItem} src={thumb4} alt="" />
      </div>
      <div className={style.imgFeature}>
        <Image src={imgFeat} alt="" />
      </div>
    </div>
  );
};

export default Carousel;
