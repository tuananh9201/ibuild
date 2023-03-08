import {
  Supp2,
  addressIcon,
  btnBookmarkIcon,
  btnPhoneIconBlack,
  btnPhoneIconPri,
  btnPhoneIconTranf,
  toiletIcon,
} from "@/constants/images";
import Image from "next/image";
import { Tooltip } from "antd";
import { useState } from "react";
import { ISupplier } from "src/lib/types";
import { useRouter } from "next/router";
import Link from "next/link";
import style from "@/styles/modules/product-card.module.scss";
interface ICard {
  supplier: ISupplier;
  showMatched?: boolean;
}
const ProductCard = (props: ICard) => {
  const { supplier } = props;
  const router = useRouter();
  const [phoneIcon, setPhoneIcon] = useState(btnPhoneIconPri);
  const rootCategory = supplier.categories.find((c) => c.parentId === "0");
  const childCategory = supplier.categories.filter((c) => c.parentId !== "0");
  const handleClickProduct = (slug: string) => {
    router.push(`/san-pham/${slug}`);
  };
  return (
    <div className={style.productCard}>
      <div className={style.productCard_Container}>
        <div className={style.productCard_Container_Body}>
          <div className={style.productCard_Container_Body_Top}>
            <div className={style.productCard_Container_Body_Top_Location}>
              <div
                className={style.productCard_Container_Body_Top_Location_Icon}
              >
                <Image src={addressIcon} alt="" />
              </div>
              <span className={style.productCard_Container_Body_Top_Location}>
                {supplier.address}
              </span>
            </div>
            <div className={style.productCard_Container_Body_Top_Info}>
              <div className={style.productCard_Container_Body_Top_Info_Image}>
                <Link href={`/dai-ly/${supplier.id}`}>
                  <Image
                    width={40}
                    height={40}
                    src={rootCategory?.logo || Supp2}
                    alt=""
                  />
                </Link>
              </div>
              <span className={style.productCard_Container_Body_Top_Info_Title}>
                {supplier.name}
              </span>
            </div>
          </div>
          <div className={style.productCard_Container_Body_Body}>
            <h3 className={style.productCard_Container_Body_Body_Title}>
              {rootCategory?.name}
            </h3>
            <div className={style.productCard_Container_Body_Body_Icons}>
              {childCategory.map((c) => {
                return (
                  <div
                    key={c.id}
                    className={style.productCard_Container_Body_Body_Icons_Item}
                  >
                    <Image
                      height={36}
                      width={36}
                      src={c.logo || toiletIcon}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <span className={style.productCard_Container_PriceRange}>
            {supplier.priceRange}
          </span>
          <div className={style.productCard_Container_Body_Bottom}>
            <div className={style.productCard_Container_Body_Bottom_Populate}>
              <span className="text">Hãng phổ biến</span>
              <div
                className={
                  style.productCard_Container_Body_Bottom_Populate_Extras
                }
              >
                {supplier.brandsPopulate.map((brand) => (
                  <div
                    key={brand.id}
                    className={
                      style.productCard_Container_Body_Bottom_Populate_Extras_Item
                    }
                  >
                    <Image height={24} width={24} src={brand.logo} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <div className={style.productCard_Container_Body_Bottom_Populate}>
              <span className="text">SL sản phẩm</span>
              <div
                className={
                  style.productCard_Container_Body_Bottom_Populate_Extras
                }
              >
                {supplier.productQuantity.min} - {supplier.productQuantity.max}
              </div>
            </div>
            <div className={style.productCard_Container_Body_Bottom_Populate}>
              <span className="text">Khoảng cách</span>
              <div
                className={
                  style.productCard_Container_Body_Bottom_Populate_Extras
                }
              >
                {supplier.space}
              </div>
            </div>
          </div>
        </div>
        <div className={style.productCard_Container_Body_Actions}>
          <button
            onClick={() => {
              handleClickProduct(supplier.id);
            }}
            className={style.productCard_Container_Body_Actions_BtnView}
          >
            Xem chi tiết
          </button>

          <Tooltip
            title={
              <div className="tooltip-container">
                <Image src={btnPhoneIconBlack} alt="" />
                <span>{supplier.phoneNumber}</span>
              </div>
            }
            color="white"
          >
            <button
              onMouseEnter={() => {
                setPhoneIcon(btnPhoneIconTranf);
              }}
              onMouseLeave={() => {
                setPhoneIcon(btnPhoneIconPri);
              }}
              className={style.productCard_Container_Body_Actions_BtnOutline}
            >
              <Image src={phoneIcon} alt="" />
            </button>
          </Tooltip>
          <button
            className={style.productCard_Container_Body_Actions_BtnOutline}
          >
            <Image src={btnBookmarkIcon} alt="" />
          </button>
        </div>
      </div>
      {props.showMatched ? (
        <div className={style.productCard_MatchedLabel}>
          <span className={style.productCard_MatchedLabel_Number}>93%</span>
        </div>
      ) : null}
    </div>
  );
};

export default ProductCard;
