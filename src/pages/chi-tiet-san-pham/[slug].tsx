import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import useSWR from "swr";

import { Button } from "@/components/common";
import MainLayout from "@/components/main-layout";
import ProductCarouselVertical from "@/components/products/ProductCarouselVertical";
import ProductSection from "@/components/products/ProductSection";
import SameCategory from "@/components/products/SameCategory";
import TechnicalParametersProduct from "@/components/products/TechnicalParametersProduct";
import { productLogo } from "@/images";
import {
  HeartIcon,
  LocationIcon,
  PhoneIcon,
  UpDownIcon,
} from "@/images/icons/product_types/icon_wrapper";
import defaultProductDetail from "@/images/product/imageoffline-co-placeholder-image.png";
import { getProductDetail } from "@/lib/api/product";
import { addProductFavorite } from "@/lib/api/user";
import { Product, ProductImage } from "@/lib/types";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import { NextPageWithLayout } from "src/pages/_app";

const ProductDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const { query } = useRouter();
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState<ProductImage>({
    image_id: "",
    url: "",
    web_image_code: "",
    s3_image_url: "",
  });

  const { data } = useSWR<Product>(query.slug, getProductDetail, {
    onError: () => {
      router.push("/404");
    },
  });

  const [logo, setLogo] = useState(() => {
    return data?.supplier?.feature_image || productLogo;
  });

  useEffect(() => {
    if (data && data.images && data.images.length) {
      setCurrentImage({
        ...currentImage,
        ...data.images[0],
      });
    }
  }, [data]);

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
    if (!token) {
      router.push({
        pathname: "/dang-nhap",
        query: {
          redirect: router.asPath,
        },
      });
      return;
    }
    addOrRemoveProductFavorite();
  };

  const handleToLogin = () => {
    if (!token) {
      router.push({
        pathname: "/dang-nhap",
        query: {
          redirect: router.asPath,
        },
      });
    }
  };

  return (
    <div className="w-full mt-[60px] px-3 lg:px-0">
      <div className="max-w-[1280px] mx-auto my-0 flex flex-col gap-5 lg:flex-row lg:gap-0 min-h-[615px]">
        <div className="lg:mr-[26px] w-full lg:w-[84px]">
          {data && data?.images && data?.images.length && (
            <ProductCarouselVertical
              images={data.images}
              currentImage={currentImage}
              setCurrentImage={setCurrentImage}
            />
          )}
        </div>
        {(currentImage.url || currentImage.s3_image_url) && (
          <div className="lg:mr-8 mx-auto">
            <Image
              src={currentImage.url || currentImage.s3_image_url}
              alt="product"
              className="h-auto object-cover w-[478px]"
              width={478}
              height={615}
              onError={() =>
                setCurrentImage({
                  ...currentImage,
                  url: defaultProductDetail.src,
                })
              }
            />
          </div>
        )}

        <div className="flex-base flex flex-col">
          <div className="relative">
            {data?.data?.model_num && (
              <div className="px-3 py-[3px] bg-[#0000001a] inline-block rounded mb-2">
                <span className="text-base font-robot not-italic font-normal leading-[150%] text-[#333333]">
                  Mã: {data?.data?.model_num || ""}
                </span>
              </div>
            )}
            <div className="flex flex-row gap-[13px] mb-2">
              <LocationIcon className="" />
              <span className="font-roboto not-italic font-normal text-base text-text-color leading-[150%]">
                {data?.supplier?.district} {data?.supplier?.district ? "," : ""}{" "}
                {data?.supplier?.city}
              </span>
            </div>
            <div className="mb-2">
              <h1 className="font-roboto not-italic font-normal text-2xl text-[#333333] leading-[150%]">
                {data?.data?.product_name}
              </h1>
            </div>
            <div className="flex flex-row gap-2 mb-4 h-8">
              <Image
                src={logo}
                alt="logo"
                width={32}
                height={32}
                className="rounded-full w-8 h-8 object-cover"
                onError={() => setLogo(productLogo)}
              />
              <h2 className="font-roboto not-italic font-medium text-base leading-8 text-[#333333] uppercase">
                {data?.supplier?.cname || data?.supplier?.name}
              </h2>
            </div>
            <div className="mb-2">
              <span className="font-roboto not-italic font-semibold text-text-color text-[28px] leading-[125%]">
                {`${
                  data?.data?.reference_price && data?.data.reference_price > 0
                    ? `${new Intl.NumberFormat().format(
                        data?.data?.reference_price
                      )} VNĐ`
                    : "Liên hệ"
                }`}
              </span>
            </div>

            <div className="flex mb-4">
              <span className="ml-[9px] mr-4 font-roboto not-italic text-text-color font-normal text-base leading-[150%] w-20">
                Số lượng
              </span>
              <span className="font-roboto not-italic text-text-color font-normal text-base leading-[150%]">
                {data?.data?.quantity || "Đang cập nhật"}
              </span>
            </div>
            <div className="flex mb-4">
              <span className="ml-[9px] mr-4 font-roboto not-italic text-text-color font-normal text-base leading-[150%] w-20">
                Tình trạng
              </span>
              <span className="font-roboto not-italic text-text-color font-normal text-base leading-[150%]">
                Liên hệ
              </span>
            </div>
            <div>
              <h3 className="font-roboto not-italic leading-[150%] text-xl font-medium text-[#343434]">
                Mô tả sản phẩm
              </h3>

              {data?.data?.description && (
                <ul
                  className={`pl-7 font-roboto font-normal text-[#343434] text-base leading-[150%] transition ${
                    isHidden ? "h-[240px] overflow-y-hidden" : ""
                  }`}
                >
                  {data?.data?.description &&
                    data?.data?.description.split("|") &&
                    data?.data?.description.split("|").map((item, idx) => {
                      return (
                        <li key={idx} className="list-disc">
                          {item}
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
            {data?.data?.description &&
              data.data?.description.split("|") &&
              data.data?.description.split("|").length > 5 && (
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
          <div className="flex flex-col gap-3 md:flex-row justify-between mt-4">
            <button
              className="flex items-center justify-center px-[23px] min-w-[200px] py-[10px] rounded border border-solid border-transparent text-primary-color gap-[6px] bg-[#EFF1F9] transition group"
              onClick={handleToLogin}
            >
              <PhoneIcon className="fill-black" />
              <span className="font-roboto not-italic font-medium text-base text-black leading-[150%]">
                {!token ? "Đăng nhập để xem" : data?.supplier?.phone || ""}
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
            <Link href={`/nha-cung-cap/${data?.supplier?.slug}`}>
              <Button title="Thông tin nhà cung cấp" overClass="px-[23px]" />
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto my-0 mt-10">
        <TechnicalParametersProduct
          title="Thông số kỹ thuật"
          parameters={data?.data?.technical_details}
        />
      </div>
      <ProductSection
        title="Cùng nhà cung cấp"
        supplierId={data?.supplier?.id}
        productId={data?.id}
      />
      {data && (
        <SameCategory
          title="Cùng danh mục"
          categoryId={data?.category_id}
          slug={data?.category_info?.slug}
        />
      )}
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
