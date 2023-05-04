import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";

import defaultProductImage from "@/images/default_product_image.png";
import {
  HeartIcon,
  PhoneIcon,
} from "@/images/icons/product_types/icon_wrapper";
import { locationIcon, productLogo } from "@/images";
import { IAddresses, Product } from "src/lib/types";
import { RootState } from "src/store/store";
import { addProductFavorite } from "src/lib/api/user";
import { Button } from "@/components/common";
import { FormatNumber, getAddress, getRangeQuantity } from "@/lib/hooks";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const router = useRouter();
  const isAddedFavorite = product.is_bookmark;

  const [isLoading, setIsLoading] = useState(false);
  const [logoImage, setLogoImage] = useState(productLogo.src);

  const prodImageSrc =
    product.data?.product_image ||
    product.data?.product_image_s3 ||
    defaultProductImage;

  const [featureImageSrc, setFeatureImageSrc] = useState(prodImageSrc);

  const handleAddFavorite = async () => {
    if (!token) {
      router.push({
        pathname: "/dang-nhap",
      });
      return;
    }
    setIsLoading(true);
    await addProductFavorite(product.data.product_id);
    setIsLoading(false);
  };

  const handleToSupplier = () => {
    router.push(`/nha-cung-cap/${product.data}`);
  };

  const handleShowTitle = () => {
    if (!token) {
      router.push({
        pathname: "/dang-nhap",
        query: {
          redirect: router.asPath,
        },
      });
      return;
    }

    return <p>{product.supplier?.phone || ""}</p>;
  };

  useEffect(() => {
    if (product.supplier?.feature_image) {
      setLogoImage(product.supplier?.feature_image);
    }
  }, [product]);

  return (
    <div className="bg-[#f8f9ff] rounded p-4 h-full flex flex-col justify-between">
      <div>
        <div
          className={
            product?.addresses && product?.addresses?.length > 0 ? "" : "h-4"
          }
        >
          <div className="flex justify-start items-center gap-2 mb-[9px] cursor-pointer">
            <Image src={locationIcon} alt="location product" />
            <span className="font-roboto not-italic text-xs leading-[calc(18 / 12) text-text-color] line-clamp-2">
              {getAddress(product?.addresses, false)}
            </span>
          </div>
        </div>
        <div
          className="flex flex-row mb-4 cursor-pointer"
          onClick={handleToSupplier}
        >
          {logoImage && (
            <Image
              src={logoImage}
              alt="logo product"
              className="mr-1 w-6 h-6 object-contain rounded-full"
              width={24}
              height={24}
              onError={() => setLogoImage(productLogo.src)}
            />
          )}
          <h3 className="text-primary-color uppercase font-roboto not-italic font-medium text-base leading-[150%] line-clamp-1">
            {product.supplier?.cname || product.supplier?.name}
          </h3>
        </div>
        <p className="text-secondary-color font-roboto not-italic text-sm leading-[150%] font-normal mb-1 line-clamp-2 min-h-[42px]">
          {product.data.product_name}
        </p>
        <div className="px-3 py-[3px] bg-[#0000001a] inline-block rounded mb-3">
          <span className="text-xs font-robot not-italic font-normal leading-[150%] line-clamp-1">
            Mã: {product.data.model_num}
          </span>
        </div>
        <div className="mb-[13.5px]">
          <span className="font-roboto not-italic font-semibold text-lg leading-[150%] text-secondary-color">
            {`${
              product.data?.reference_price && product.data.reference_price > 0
                ? `${FormatNumber(product?.data?.reference_price)} VNĐ${
                    product?.data?.unit ? `/${product?.data?.unit}` : ""
                  }`
                : "Liên hệ"
            }`}
          </span>
        </div>
        <div className="flex flex-row justify-between items-center mb-3">
          <span className="font-roboto not-italic text-sm leading-[150%] text-text-color font-normal">
            Hãng
          </span>
          <span className="text-sm dark:text-white font-normal">
            {product.data?.brand_name || ""}
          </span>
        </div>
        <div className="flex flex-row justify-between items-center mb-3">
          <span className="font-roboto not-italic text-sm leading-[150%] text-text-color font-normal">
            Số lượng sản phẩm
          </span>
          <span className="font-roboto not-italic text-sm leading-[150%] text-text-color font-normal">
            {getRangeQuantity(product.data.quantity)}
          </span>
        </div>
        <div className="mb-3">
          <Image
            src={featureImageSrc}
            width={270}
            height={140}
            onError={() => setFeatureImageSrc(defaultProductImage)}
            placeholder="blur"
            blurDataURL="https://placehold.co/270x140"
            alt={product.data.product_name}
            className="w-full h-[140px] rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="flex flex-row justify-between h-[44px]">
        <Link href={`/chi-tiet-san-pham/${product.id}`}>
          <button className="px-9 py-[10px] bg-primary-color text-white font-roboto not-italic font-medium text-base leading-[150%] rounded whitespace-nowrap">
            Xem chi tiết
          </button>
        </Link>
        <Tooltip title={() => handleShowTitle()} trigger="click">
          <div>
            <Button icon={PhoneIcon} overClass="w-[44px] py-0 h-full" />
          </div>
        </Tooltip>
        <Button
          icon={HeartIcon}
          overClass="w-[44px] py-0 h-full"
          isBookMark={isAddedFavorite}
          isLoading={isLoading}
          onClick={handleAddFavorite}
        />
      </div>
    </div>
  );
};

export default ProductCard;
