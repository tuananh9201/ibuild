import Image from "next/image";
import useSWR from "swr";
import { ReactElement, useState, useEffect, use } from "react";
import { useRouter } from "next/router";

import { NextPageWithLayout } from "src/pages/_app";
import { exampleProductDetail, companyLogo, productLogo } from "@/images/index";
import {
  LocationIcon,
  ShopCartIcon,
  UpDownIcon,
  PhoneIcon,
  HeartIcon,
} from "@/images/icons/product_types/icon_wrapper";
import {
  getListMostRelevantProduct,
  getProductDetail,
} from "@/lib/api/product";
import { Product, ProductImage } from "@/lib/types";
import { addProductFavorite } from "@/lib/api/user";
import { Button } from "@/components/common";
import MainLayout from "@/components/main-layout";
import TechnicalParametersProduct from "@/components/products/TechnicalParametersProduct";
import ListProduct from "@/components/products/ListProduct";
import ProductCarouselVertical from "@/components/products/ProductCarouselVertical";

const ProductDetail: NextPageWithLayout = () => {
  const { query } = useRouter();
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState<ProductImage>({
    image_id: "",
    url: "",
    web_image_code: "",
    s3_image_url: "",
  });
  const [relevantProducts, setRelevantProducts] = useState<Product[]>([]);

  const { data, isLoading } = useSWR<Product>(query.detail, getProductDetail);

  const [logo, setLogo] = useState(() => {
    return data?.supplier?.feature_image || companyLogo;
  });

  const newArr = data?.data.technical_details?.split("|");
  const arrayTitle = newArr?.splice(0, newArr.length / 2 + 1) || [];
  const arrayValue = newArr?.splice(newArr.length / 2 - 2) || [];

  useEffect(() => {
    if (data) {
      setCurrentImage({
        ...currentImage,
        ...data.images[0],
      });
    }
  }, [data]);

  useEffect(() => {
    const payload = {
      product_name: data?.data.product_name || "",
      product_id: query.detail as string,
      skip: 0,
      limit: 4,
    };

    const getMostRelevantProduct = async () => {
      const res = await getListMostRelevantProduct(payload);
      setRelevantProducts(res);
    };

    getMostRelevantProduct();
  }, [data, query.detail]);

  const addOrRemoveProductFavorite = async () => {
    if (!data?.data.product_id) return;
    setLoading(true);
    try {
      await addProductFavorite(data?.data.product_id);
    } catch (error) {
      console.warn(error);
    }
    setLoading(false);
  };

  const handleAddOrRemoveFavorite = () => {
    addOrRemoveProductFavorite();
  };

  return (
    <div className="w-full mt-[60px]">
      <div className="max-w-[1280px] mx-auto my-0 flex flex-row min-h-[615px]">
        <div className="mr-[26px] w-[84px]">
          {data && (
            <ProductCarouselVertical
              images={data.images}
              currentImage={currentImage}
              setCurrentImage={setCurrentImage}
            />
          )}
        </div>
        <div className="mr-8">
          <Image
            src={currentImage.url || currentImage.s3_image_url}
            alt="product"
            className="h-auto object-cover w-[478px]"
            width={478}
            height={615}
          />
        </div>
        <div className="flex-base flex flex-col justify-between">
          <div className="relative">
            {data?.data.model_num && (
              <div className="px-3 py-[3px] bg-[#0000001a] inline-block rounded mb-2">
                <span className="text-base font-robot not-italic font-normal leading-[150%] text-[#333333]">
                  Mã: {data?.data.model_num || ""}
                </span>
              </div>
            )}
            <div className="mb-2">
              <h1 className="font-roboto not-italic font-normal text-2xl text-[#333333] leading-[150%]">
                {data?.data.product_name}
              </h1>
            </div>
            <div className="flex flex-row gap-2 mb-4">
              <Image
                src={logo}
                alt="logo"
                width={32}
                height={32}
                className="rounded-full w-8 h-8 object-cover"
                onError={() => setLogo(productLogo)}
              />
              <h2 className="font-roboto not-italic font-medium text-base leading-[150%] text-[#333333] uppercase">
                {data?.supplier?.cname || data?.supplier?.name}
              </h2>
            </div>
            <div className="mb-2">
              <span className="font-roboto not-italic font-semibold text-text-color text-[28px] leading-[125%]">
                {data?.data.original_price || "Liên hệ"}
              </span>
            </div>
            {data?.supplier?.district || data?.supplier?.city ? (
              <div className="flex flex-row gap-[13px] mb-2">
                <LocationIcon className="" />
                <span className="font-roboto not-italic font-normal text-base text-text-color leading-[150%]">
                  {data?.supplier?.district}{" "}
                  {data?.supplier?.district ? "," : ""} {data?.supplier?.city}
                </span>
              </div>
            ) : (
              <></>
            )}

            <div className="flex mb-4">
              <ShopCartIcon className="" />
              <span className="ml-[9px] mr-4 font-roboto not-italic text-text-color font-normal text-base leading-[150%]">
                Số lượng
              </span>
              <span className="font-roboto not-italic text-text-color font-normal text-base leading-[150%]">
                300 -1000
              </span>
            </div>
            <div>
              <h3 className="font-roboto not-italic leading-[150%] text-xl font-medium text-[#343434]">
                Mô tả sản phẩm
              </h3>
              <ul
                className={`pl-7 font-roboto font-normal text-[#343434] text-base leading-[150%] transition ${
                  isHidden ? "h-[240px] overflow-y-hidden" : ""
                }`}
              >
                {data?.data?.description &&
                  data?.data?.description.split("|").map((item, idx) => (
                    <li key={idx} className="list-disc">
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
            {data?.data.description &&
              data.data.description.split("|").length > 4 && (
                <button
                  className={`w-full flex gap-[5px] items-center justify-center h-[70px] bottom-0 left-0 ${
                    isHidden ? "bg-gradient-white-to-transparent absolute" : ""
                  }`}
                  onClick={() => setIsHidden((prev) => !prev)}
                >
                  <span className="font-roboto not-italic font-medium text-primary-color leading-[150%]">
                    {isHidden ? "Xem thêm" : "Thu gọn"}
                  </span>
                  <UpDownIcon
                    className={`fill-[#eb7a01] transition ${
                      isHidden ? "" : "rotate-180"
                    }`}
                  />
                </button>
              )}
          </div>
          <div className="flex flex-row justify-between mt-4">
            <button className="flex items-center justify-center px-[23px] py-[10px] rounded border border-solid border-primary-color text-primary-color gap-[6px] hover:bg-primary-color transition group">
              <PhoneIcon className="fill-[#eb7a01] group-hover:fill-white" />
              <span className="font-roboto not-italic font-medium text-base leading-[150%] group-hover:text-white">
                {data?.supplier?.phone || "0123456789"}
              </span>
            </button>
            {data && (
              <Button
                title="Theo dõi sản phẩm"
                icon={HeartIcon}
                isBookMark={data?.is_bookmark}
                isLoading={loading}
                onClick={handleAddOrRemoveFavorite}
                overClass="px-[23px]"
              />
            )}
            <Button title="Thông tin nhà cung cấp" overClass="px-[23px]" />
          </div>
        </div>
      </div>
      {data?.data.technical_details && (
        <div className="max-w-[1280px] mx-auto my-0 mt-10">
          <TechnicalParametersProduct
            title="Thông số kỹ thuật"
            parameters={arrayTitle}
            values={arrayValue}
          />
        </div>
      )}
      <div className="max-w-[1280px] mx-auto my-0 mt-10">
        <div className="flex flex-row justify-between">
          <h3 className="font-roboto not-italic font-medium text-xl leading-[150%] text-text-color mb-6">
            Cùng nhà cung cấp
          </h3>
          <button className="text-primary-color font-roboto not-italic font-medium text-base leading-[150%]">
            Xem thêm
          </button>
        </div>
        <ListProduct products={relevantProducts} />
      </div>
      <div className="max-w-[1280px] mx-auto my-0 mt-10">
        <div className="flex flex-row justify-between">
          <h3 className="font-roboto not-italic font-medium text-xl leading-[150%] text-text-color mb-6">
            Cùng danh mục
          </h3>
          <button className="text-primary-color font-roboto not-italic font-medium text-base leading-[150%]">
            Xem thêm
          </button>
        </div>
        <ListProduct products={relevantProducts} />
      </div>
    </div>
  );
};

ProductDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default ProductDetail;
