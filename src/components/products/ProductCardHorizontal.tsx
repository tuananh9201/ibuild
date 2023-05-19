import Link from "next/link";
import { useEffect, useState } from "react";

import {
  HeartBgWhiteIcon,
  HeartIcon,
} from "@/images/icons/product_types/icon_wrapper";
import { Product } from "@/lib/types";

import { IBuildLogo } from "@/images";
import defaultProductImage from "@/images/default_product_image.png";
import { addProductFavorite } from "@/lib/api/user";
import { FormatNumber } from "@/lib/hooks";
import { RenderImageError } from "../common";

interface ProductCardHorizontalProps {
  product: Product;
}

type ButtonFollowProps = {
  supplierId: string;
  follow: boolean;
};

const ButtonFollow = ({ supplierId, follow }: ButtonFollowProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollow, setIsFollow] = useState(follow);

  const handleFollow = async () => {
    setIsFollow((prev) => !prev);
    setIsLoading(true);
    await addProductFavorite(supplierId);
    setIsLoading(false);
  };

  return (
    <button
      className={`absolute top-4 right-4 flex flex-row gap-3 items-center ${
        isLoading ? "pointer-events-none opacity-50" : ""
      }`}
      onClick={handleFollow}
    >
      {isFollow ? (
        <HeartBgWhiteIcon className="fill-primary-color" />
      ) : (
        <HeartIcon className="fill-primary-color" />
      )}
      <span className="text-primary-color font-normal text-sm leading-[150%]">
        {isFollow ? "Đang theo dõi" : "Theo dõi"}
      </span>
    </button>
  );
};

const ProductCardHorizontal = ({ product }: ProductCardHorizontalProps) => {
  const [productImage, setProductImage] = useState(defaultProductImage.src);

  useEffect(() => {
    if (product?.images[0]?.url) {
      setProductImage(product.images[0].url);
    }
  }, [product]);

  return (
    <div className="w-full bg-[#f8f9ff] rounded-lg p-4 relative">
      <div className="flex gap-4">
        <RenderImageError
          defaultImage={defaultProductImage.src}
          image={productImage}
          width={170}
          height={150}
          title={product.product_name}
          className="object-cover w-[170px] h-[150px] overflow-hidden"
        />
        <div className="flex-base">
          <div className="flex flex-row items-center gap-1 mb-2">
            <RenderImageError
              defaultImage={IBuildLogo.src}
              image={productImage}
              width={24}
              height={24}
              title={product?.product_name}
              className="object-cover w-6 h-6 overflow-hidden rounded-full"
            />
            <h1 className="font-medium text-xl leading-[150%] text-text-secondary-color line-clamp-1 cursor-pointer uppercase">
              {product?.product_name || ""}
            </h1>
          </div>
          <h2 className="text-secondary-color text-base font-normal mb-1 line-clamp-2">
            {product?.description || ""}
          </h2>
          <div className="px-3 py-[3px] bg-[#0000001a] inline-block rounded mb-3">
            <span className="text-xs font-robot not-italic font-normal leading-[150%] line-clamp-1">
              Mã: {product?.model_number || ""}
            </span>
          </div>
          <div className="mb-[13.5px]">
            <span className="font-roboto not-italic font-semibold text-lg leading-[150%] text-secondary-color">
              {`${
                product.reference_price && product.reference_price > 0
                  ? `${FormatNumber(product.reference_price)} VNĐ${
                      product?.unit ? `/${product?.unit}` : ""
                    }`
                  : "Liên hệ"
              }`}
            </span>
          </div>
          <Link
            href={`/chi-tiet-san-pham/${product.id}`}
            className="mt-4 text-primary-color text-base leading-[150%] font-medium"
          >
            <span>Xem chi tiết</span>
          </Link>
        </div>
      </div>
      <ButtonFollow
        supplierId={product.id}
        follow={product.is_bookmark || false}
      />
    </div>
  );
};

export default ProductCardHorizontal;
