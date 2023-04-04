import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";

import {
  HeartIcon,
  PhoneIcon,
} from "@/images/icons/product_types/icon_wrapper";
import { locationIcon, productLogo } from "@/images";
import { Product } from "src/lib/types";
import { RootState } from "src/store/store";
import { addProductFavorite } from "src/lib/api/user";

interface ProductCardProps {
  product: Product;
}

const placeholdImageSrc = "https://placehold.co/270x140";

const ProductCard = ({ product }: ProductCardProps) => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const router = useRouter();
  const isAddedFavorite = product.is_bookmark;

  const prodImageSrc =
    product.data?.product_image_s3 ||
    product.data?.product_image ||
    placeholdImageSrc;

  const [isPhoneHover, setIsPhoneHover] = useState(false);
  const [isHeartHover, setIsHeartHover] = useState(false);
  const [featureImageSrc, setFeatureImageSrc] = useState(prodImageSrc);

  const handleAddFavorite = async () => {
    if (!token) {
      router.push({
        pathname: "/dang-nhap",
      });
      return;
    }
    const res = await addProductFavorite(product.data.product_id);
  };

  const handleToSupplier = () => {
    router.push(`/nha-cung-cap/${product.data}`);
  };

  return (
    <div className="bg-[#f8f9ff] rounded p-4 h-full flex flex-col justify-between">
      <div>
        <div
          className={
            product?.supplier?.district || product?.supplier?.city ? "" : "h-4"
          }
        >
          {product?.supplier?.district || product?.supplier?.city ? (
            <div className="flex justify-start items-center gap-2 mb-[9px] cursor-pointer">
              <Image src={locationIcon} alt="location product" />
              <span className="font-roboto not-italic text-xs leading-[calc(18 / 12) text-text-color]">
                {product?.supplier?.district}{" "}
                {product?.supplier?.district ? "," : ""}{" "}
                {product?.supplier?.city}
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div
          className="flex flex-row mb-4 cursor-pointer"
          onClick={handleToSupplier}
        >
          <Image
            src={product.supplier?.feature_image || productLogo}
            alt="logo product"
            className="mr-1 w-6 h-6 object-contain rounded-full"
            width={24}
            height={24}
          />
          <h3 className="text-primary-color uppercase font-roboto not-italic font-medium text-base leading-[150%]">
            {product.supplier?.cname || product.supplier?.name}
          </h3>
        </div>
        <p className="text-secondary-color font-roboto not-italic text-sm leading-[150%] font-normal mb-1 line-clamp-2 min-h-[42px]">
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
          <span className="text-sm dark:text-white font-normal">
            {product.data?.brand_name || "NO BRAND"}
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
            className="w-full h-[140px] rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="flex flex-row justify-between h-[44px]">
        <button className="px-9 py-[10px] bg-primary-color text-white font-roboto not-italic font-medium text-base leading-[150%] rounded whitespace-nowrap">
          <Link href={`/san-pham/${router.query.slug}/${product.id}`}>
            Xem chi tiết
          </Link>
        </button>
        <Tooltip title={product.supplier?.phone || "01234567"} trigger="click">
          <button
            className={`px-3 rounded border border-solid border-[#999999] ${
              isPhoneHover ? "bg-primary-color" : ""
            } w-[44px]`}
            onMouseEnter={() => setIsPhoneHover(true)}
            onMouseLeave={() => setIsPhoneHover(false)}
          >
            <PhoneIcon
              className={`w-5 h-5 ${
                isPhoneHover ? "fill-white" : "fill-primary-color"
              }`}
            />
          </button>
        </Tooltip>
        <button
          className={`px-3 rounded border border-solid border-[#999999] ${
            isAddedFavorite || isHeartHover ? "bg-primary-color" : ""
          } w-[44px]`}
          onMouseEnter={() => setIsHeartHover(true)}
          onMouseLeave={() => setIsHeartHover(false)}
          onClick={handleAddFavorite}
        >
          <HeartIcon
            className={`w-5 h-5 ${
              isAddedFavorite || isHeartHover
                ? "fill-white"
                : "fill-primary-color"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
