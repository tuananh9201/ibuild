import {
  addressIcon,
  btnBookmarkIcon,
  btnPhoneIconBlack,
  btnPhoneIconPri,
  btnPhoneIconTranf,
  retailFeature, Supp2
} from "@/constants/images";
import style from "@/styles/modules/product-card.module.scss";
import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { IRetailProduct } from "src/lib/types";
interface ICard {
  retail: IRetailProduct;
  showMatched?: boolean;
}
const RetailCard = (props: ICard) => {
  const { supplier } = props.retail;
  const router = useRouter();
  const [phoneIcon, setPhoneIcon] = useState(btnPhoneIconPri);
  const handleClickProduct = (slug: string) => {
    router.push(`/san-pham/${slug}`);
  };
  return (
    <div className="flex flex-col items-start p-4 isolate bg-[#f8f9ff] rounded-t">
      <div className="flex flex-col items-start p-0 gap-4 w-full">
        <div className="flex flex-col items-start p-0 ga-4 w-full">
          <div className="flex flex-col items-start p-0 gap-2">
            <div className="flex flex-row items-center p-0 gap-[10px] font-normal">
              <div
                className="w-5 h-5"
              >
                <Image src={addressIcon} alt="" />
              </div>
              <span className="flex flex-row items-center p-0 gap-[10px] font-normal">
                {supplier.address}
              </span>
            </div>
            <div className="flex flex-row items-center p-0 gap-1">
              <div className="w-10 h-10">
                <Link href="/dai-ly">
                  <Image
                    width={40}
                    height={40}
                    src={props.retail.brand?.logo || Supp2}
                    alt=""
                  />
                </Link>
              </div>
              <span className="font-medium text-base leading-[150%]">
                {props.retail.brand.name}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start p-0 gap-2">
            <h3 className="font-medium text-base leading-[150%] mb-2 uppercase min-h-[48px]">
              {props.retail.name}
            </h3>
          </div>
          <span className={style.productCard_Container_PriceRange}>
            {supplier.priceRange}
          </span>
          <div className={style.productCard_Container_Body_Bottom}>
            {/* <div className={style.productCard_Container_Body_Bottom_Populate}>
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
            </div> */}
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
          <div className={style.productCard_Container_Body_ImageFeature}>
            <Image src={retailFeature} alt={props.retail.name} />
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
          <span className={style.productCard_MatchedLabel_Number}>
            {props.retail.matched}%
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default RetailCard;
