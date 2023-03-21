import {
  addressIcon,
  btnBookmarkIcon,
  btnPhoneIconBlack,
  btnPhoneIconPri,
  btnPhoneIconTranf, Supp2, toiletIcon
} from "@/constants/images";
import { ISupplier } from "src/lib/types";

import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

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
    <div className="flex flex-col items-start p-4 isolate bg-[#f8f8ff] rounded-[4px]">
      <div className="flex flex-col items-start p-0 gap-4 w-full">
        <div className="flex flex-col items-start p-0 gap-4 w-full">
          <div className="flex flex-col items-start p-0 ga-2">
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
                <Link href={`/dai-ly/${supplier.id}`}>
                  <Image
                    width={40}
                    height={40}
                    src={rootCategory?.logo || Supp2}
                    alt=""
                  />
                </Link>
              </div>
              <span className="font-medium text-base leading-[150%]">
                {supplier.name}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start p-0 gap-2">
            <h3 className="font-medium text-base leading-[150%] mb-2 uppercase min-h-[48px]">
              {rootCategory?.name}
            </h3>
            <div className="flex flex-row items-start p-0 gap-2">
              {childCategory.map((c) => {
                return (
                  <div
                    key={c.id}
                    className="flex flex-row items-start p-2 w-9 h-9 bg-[#ffffff] rounded-[36px]"
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
          <span className="font-medium text-xl leading-[150%] text-primary-color mb-4">
            {supplier.priceRange}
          </span>
          <div className="flex flex-col justify-between items-start p-0 gap-2 w-full">
            <div className="flex flex-row justify-between items-center p-0 gap-[10px] w-full mb-2 font-normal text-sm leading-[150%] last:mb-0">
              <span className="text">Hãng phổ biến</span>
              <div
                className="flex flex-row justify-between items-center gap-[10px]"
              >
                {supplier.brandsPopulate.map((brand) => (
                  <div
                    key={brand.id}
                    className="w-6 h-6 bg-[#ffffff] rounded-[36px]"
                  >
                    <Image height={24} width={24} src={brand.logo} alt="" />
                  </div>
                ))}
              </div>
            </div>
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
        </div>
        <div className="flex flex-row items-start p-0 gap-2 w-full">
          <button
            onClick={() => {
              handleClickProduct(supplier.id);
            }}
            className="flex-2 flex flex-row items-center justify-center px-5 py-[10px] w-full bg-primary-color rounded-[4px] border border-solid border-transparent text-[#fff] text-base text-center min-h-[44px]"
          >
            Xem chi tiết
          </button>

          <Tooltip
            title={
              <div className="flex flex-row items-center p-[10px] gap-1 isolate text-text-color">
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
              className="flex-base min-h-[44px] min-w-[44px] bg-[#fff] rounded-[4px] border border-solid border-primary-color w-full text-primary-color flex flex-row justify-center items-center p-0 gap-1 hover:bg-primary-color hover:text-[#fff] peer"
            >
              <Image className="peer-hover:text-[#fff] peer-hover:fill-white" src={phoneIcon} alt="" />
            </button>
          </Tooltip>
          <button
            className="flex-base min-h-[44px] min-w-[44px] bg-[#fff] rounded-[4px] border border-solid border-primary-color w-full text-primary-color flex flex-row justify-center items-center p-0 gap-1 hover:bg-primary-color hover:text-[#fff] peer"
          >
            <Image className="peer-hover:text-[#fff] peer-hover:fill-white" src={btnBookmarkIcon} alt="" />
          </button>
        </div>
      </div>
      {props.showMatched ? (
        <div className="absolute w-[43px] h-[44px] right-4 top-3 bg-[#bedcff] rounded-t-none rounded-b-[4px] text-center flex items-center justify-center">
          <span className="font-medium text-base">93%</span>
        </div>
      ) : null}
    </div>
  );
};

export default ProductCard;
