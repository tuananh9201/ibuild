import { breadcrumIcon } from "@/constants/images";
import style from "@/styles/modules/build-info.module.scss";
import Image from "next/image";
interface Props {
  breadcrumbs: string[];
}
const Breadcrums = ({ breadcrumbs }: Props) => {
  return (
    <div className={style.Breadcrums}>
      {breadcrumbs.map((breadcrumb, idx) => {
        return (
          <div key={idx} className={style.Breadcrums_Text}>
            <span>{breadcrumb}</span>
            {idx === breadcrumbs.length - 1 ? null : (
              <div className={style.Breadcrums_Text_Icon}>
                <Image src={breadcrumIcon} alt="" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrums;
