import { useState } from "react";
import Image, { ImageLoaderProps } from "next/image";

import {
  locationIcon,
  productLogo,
  companyLogo,
  exampleProduct,
  heartIcon,
  heartWhiteIcon,
  phoneIcon,
  phoneWhiteIcon,
} from "@/images/index";
import { Product } from "src/lib/types";
import axios from "axios";
interface ProductCardProps {
  product: Product;
}
const placeholdImageSrc = "https://placehold.co/270x140";

const ProductCard = ({ product }: ProductCardProps) => {
  const [isPhoneHover, setIsPhoneHover] = useState(false);
  const [isHeartHover, setIsHeartHover] = useState(false);
  const prodImageSrc =
    product.data?.product_image_s3 ||
    product.data?.product_image ||
    placeholdImageSrc;
  const [featureImageSrc, setFeatureImageSrc] = useState(prodImageSrc);
  return (
    <div className="bg-[#f8f9ff] rounded p-4">
      <div className="flex justify-start items-center gap-2 mb-[9px] cursor-pointer">
        <Image src={locationIcon} alt="location product" />
        <span className="font-roboto not-italic text-xs leading-[calc(18 / 12) text-text-color]">
          Bắc Từ Liêm, Hà Nội
        </span>
      </div>
      <div className="flex flex-row mb-4">
        <Image src={productLogo} alt="logo product" className="mr-1" />
        <h3 className="text-primary-color uppercase font-roboto not-italic font-medium text-base leading-[150%]">
          Trung Tâm Vlxl Đồng Tâm
        </h3>
      </div>
      <p className="text-secondary-color font-roboto not-italic text-sm leading-[150%] font-normal mb-1 line-clamp-2">
        {product.data.product_name}
      </p>
      <div className="px-3 py-[3px] bg-[#0000001a] inline-block rounded mb-3">
        <span className="text-xs font-robot not-italic font-normal leading-[150%]">
          Mã: {product.data.model_num}
        </span>
      </div>
      <div className="mb-[13.5px]">
        <span className="font-roboto not-italic font-semibold text-lg leading-[150%] text-secondary-color">
          {product.data?.original_price || "Liên hệ"}
        </span>
      </div>
      <div className="flex flex-row justify-between items-center mb-3">
        <span className="font-roboto not-italic text-sm leading-[150%] text-text-color font-normal">
          Hãng
        </span>
        {/* <Image src={companyLogo} alt="company logo" /> */}
        <span className="text-sm dark:text-white font-normal">
          {product.data?.brand_name}
        </span>
      </div>
      <div className="flex flex-row justify-between items-center mb-3">
        <span className="font-roboto not-italic text-sm leading-[150%] text-text-color font-normal">
          Số lượng sản phẩm
        </span>
        <span className="font-roboto not-italic text-sm leading-[150%] text-text-color font-normal">
          300 - 1000
        </span>
      </div>
      <div className="mb-3">
        <Image
          src={featureImageSrc}
          width={270}
          height={140}
          onError={() => setFeatureImageSrc(placeholdImageSrc)}
          placeholder="blur"
          blurDataURL="https://placehold.co/270x140"
          alt={product.data.product_name}
          className="w-full h-[140px] rounded-lg"
        />
      </div>
      <div className="flex flex-row justify-between h-[44px]">
        <button className="px-9 py-[10px] bg-primary-color text-white font-roboto not-italic font-medium text-base leading-[150%] rounded whitespace-nowrap">
          Xem chi tiết
        </button>
        <button
          className={`px-3 rounded border border-solid border-[#999999] ${
            isPhoneHover ? "bg-primary-color" : ""
          } w-[44px]`}
          onMouseEnter={() => setIsPhoneHover(true)}
          onMouseLeave={() => setIsPhoneHover(false)}
        >
          <Image
            src={isPhoneHover ? phoneWhiteIcon : phoneIcon}
            alt="phone number"
            className="w-5 h-5"
          />
        </button>
        <button
          className={`px-3 rounded border border-solid border-[#999999] ${
            isHeartHover ? "bg-primary-color" : ""
          } w-[44px]`}
          onMouseEnter={() => setIsHeartHover(true)}
          onMouseLeave={() => setIsHeartHover(false)}
        >
          <Image
            src={isHeartHover ? heartWhiteIcon : heartIcon}
            alt="heart"
            className="w-5 h-5"
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
