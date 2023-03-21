import {
  addressIcon,
  btnBookmarkIcon,
  btnPhoneIconBlack,
  btnPhoneIconPri,
  btnPhoneIconTranf,
  retailFeature, Supp2
} from "@/constants/images";
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
          <span className="">
            {supplier.priceRange}
          </span>
          <div className="flex flex-col justify-between items-start p-0 gap-2 w-full">
            <div className="flex flex-row justify-between items-center p-0 gap-[10px] w-full mb-2 font-normal text-sm leading-[150%] last:mb-0">
              <span className="text">SL sản phẩm</span>
              <div
                className="flex flex-row justify-between items-center gap-[10px]"
              >
                {supplier.productQuantity.min} - {supplier.productQuantity.max}
              </div>
            </div>
            <div className="flex flex-row justify-between items-center p-0 gap-[10px] w-full mb-2 font-normal text-sm leading-[150%] last:mb-0">
              <span className="text">Khoảng cách</span>
              <div
                className="flex flex-row justify-between items-center gap-[10px]"
              >
                {supplier.space}
              </div>
            </div>
          </div>
          <div className="rounded-[4px]">
            <Image src={retailFeature} alt={props.retail.name} />
          </div>
        </div>
        <div className="flex flex-row items-start p-0 gap-2 w-full">
          <button
            onClick={() => {
              handleClickProduct(supplier.id);
            }}
            className="flex-2 flex flex-row justify-center items-center px-5 py-[10px] w-full bg-primary-color rounded-t border-t-transparent border-solid text-white text-base text-center min-h-[44px]"
          >
            Xem chi tiết
          </button>

          <Tooltip
            title={
              <div className="flex flex-row items-center p-[10px] gap-1 isolate text-primary-color">
                <Image src={btnPhoneIconBlack} alt="" />
                <span className="ml-2">{supplier.phoneNumber}</span>
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
              className="flex-base min-h-[44px] min-w-[44px] bg-white rounded-t border border-solid border-primary-color w-full text-primary-color flex flex-row justify-center items-center p-0 gap-1 hover:bg-primary-color text-white group"
            >
              <Image className="group-hover:text-white group-hover:fill-white" src={phoneIcon} alt="" />
            </button>
          </Tooltip>
          <button
            className="flex-base min-h-[44px] min-w-[44px] bg-white rounded-t border border-solid border-primary-color w-full text-primary-color flex flex-row justify-center items-center p-0 gap-1 hover:bg-primary-color text-white group"
          >
            <Image className="group-hover:text-white group-hover:fill-white" src={btnBookmarkIcon} alt="" />
          </button>
        </div>
      </div>
      {props.showMatched ? (
        <div className="absolute w-[43px] h-[43px] right-4 top-3 bg-[#bedcff] rounded-t-none rounded-b-[4px] text-center flex items-center justify-center">
          <span className="font-medium text-base">
            {props.retail.matched}%
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default RetailCard;
