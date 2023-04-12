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
import {
  HeartIcon,
  LocationIcon,
  PhoneIcon,
  ShopCartIcon,
  UpDownIcon,
} from "@/images/icons/product_types/icon_wrapper";
import { companyLogo, productLogo } from "@/images/index";
import { getProductDetail } from "@/lib/api/product";
import { addProductFavorite } from "@/lib/api/user";
import { Product, ProductImage } from "@/lib/types";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { NextPageWithLayout } from "src/pages/_app";
import Link from "next/link";
const defaultProductDetail =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAd4AAAJnCAYAAAA5szLjAAAAAXNSR0IArs4c6QAAIABJREFUeF7t3YeO69YVBVA5vffe4/SO5P8/wUivTu+99+pgD8AHPnpmRGk0+z37LAJBDI+kQy0da/NeXlJPPPXUU88cbAQIECBAgEBF4AnBW3FWhAABAgQIXAkIXo1AgAABAgSKAoK3iK0UAQIECBAQvHqAAAECBAgUBQRvEVspAgQIECAgePUAAQIECBAoCgjeIrZSBAgQIEBA8OoBAgQIECBQFBC8RWylCBAgQICA4NUDBAgQIECgKCB4i9hKESBAgAABwasHCBAgQIBAUUDwFrGVIkCAAAECglcPECBAgACBooDgLWIrRYAAAQIEBK8eIECAAAECRQHBW8RWigABAgQICF49QIAAAQIEigKCt4itFAECBAgQELx6gAABAgQIFAUEbxFbKQIECBAgIHj1AAECBAgQKAoI3iK2UgQIECBAQPDqAQIECBAgUBQQvEVspQgQIECAgODVAwQIECBAoCggeIvYShEgQIAAAcGrBwgQIECAQFFA8BaxlSJAgAABAoJXDxAgQIAAgaKA4C1iK0WAAAECBASvHiBAgAABAkUBwVvEVooAAQIECAhePUCAAAECBIoCgreIrRQBAgQIEBC8eoAAAQIECBQFBG8RWykCBAgQICB49QABAgQIECgKCN4itlIECBAgQEDw6gECBAgQIFAUELxFbKUIECBAgIDg1QMECBAgQKAoIHiL2EoRIECAAAHBqwcIECBAgEBRQPAWsZUiQIAAAQKCVw8QIECAAIGigOAtYitFgAABAgQErx4gQIAAAQJFAcFbxFaKAAECBAgIXj1AgAABAgSKAoK3iK0UAQIECBAQvHqAAAECBAgUBQRvEVspAgQIECAgePUAAQIECBAoCgjeIrZSBAgQIEBA8OoBAgQIECBQFBC8RWylCBAgQICA4NUDBAgQIECgKCB4i9hKESBAgAABwasHCBAgQIBAUUDwFrGVIkCAAAECglcPECBAgACBooDgLWIrRYAAAQIEBK8eIECAAAECRQHBW8RWigABAgQICF49QIAAAQIEigKCt4itFAECBAgQELx6gAABAgQIFAUEbxFbKQIECBAgIHj1AAECBAgQKAoI3iK2UgQIECBAQPDqAQIECBAgUBQQvEVspQgQIECAgODVAwQIECBAoCggeIvYShEgQIAAAcGrBwgQIECAQFFA8BaxlSJAgAABAoJXDxAgQIAAgaKA4C1iK0WAAAECBASvHiBAgAABAkUBwVvEVooAAQIECAhePUCAAAECBIoCgreIrRQBAgQIEBC8eoAAAQIECBQFBG8RWykCBAgQICB49QABAgQIECgKCN4itlIECBAgQEDw6gECBAgQIFAUELxFbKUIECBAgIDg1QMECBAgQKAoIHiL2EoRIECAAAHBqwcIECBAgEBRQPAWsZUiQIAAAQKCVw8QIECAAIGigOAtYitFgAABAgQErx4gQIAAAQJFAcFbxFaKAAECBAgIXj1AgAABAgSKAoK3iK0UAQIECBAQvHqAAAECBAgUBQRvEVspAgQIECAgePUAAQIECBAoCgjeIrZSBAgQIEBA8OoBAgQIECBQFBC8RWylCBAgQICA4NUDBAgQIECgKCB4i9hKESBAgAABwasHCBAgQIBAUUDwFrGVIkCAAAECglcPECBAgACBooDgLWIrRYAAAQIEBK8eIECAAAECRQHBW8RWigABAgQICF49QIAAAQIEigKCt4itFAECBAgQELx6gAABAgQIFAUEbxFbKQIECBAgIHj1AAECBAgQKAoI3iK2UgQIECBAQPDqAQIECBAgUBQQvEVspQgQIECAgODVAwQIECBAoCggeIvYShEgQIAAAcGrBwgQIECAQFFA8BaxlSJAgAABAoJXDxAgQIAAgaKA4C1iK0WAAAECBASvHiBAgAABAkUBwVvEVooAAQIECAhePUCAAAECBIoCgreIrRQBAgQIEBC8eoAAAQIECBQFBG8RWykCBAgQICB49QABAgQIECgKCN4itlIECBAgQEDw6gECBAgQIFAUELxFbKUIECBAgIDg1QMECBAgQKAoIHiL2EoRIECAAAHBqwcIECBAgEBRQPAWsZUiQIAAAQKCVw8QIECAAIGigOAtYitFgAABAgQErx4gQIAAAQJFAcFbxFaKAAECBAgIXj1AgAABAgSKAoK3iK0UAQIECBAQvHqAAAECBAgUBQRvEVspAgQIECAgePUAAQIECBAoCgjeIrZSBAgQIEBA8OoBAgQIECBQFBC8RWylCBAgQICA4NUDBAgQIECgKCB4i9hKESBAgAABwasHCBAgQIBAUUDwFrGVIkCAAAECglcPECBAgACBooDgLWIrRYAAAQIEBK8eIECAAAECRQHBW8RWigABAgQICF49QIAAAQIEigKCt4itFAECBAgQELx6gAABAgQIFAUEbxFbKQIECBAgIHj1AAECBAgQKAoI3iK2UgQIECBAQPDqAQIECBAgUBQQvEVspQgQIECAgODVAwQIECBAoCggeIvYShEgQIAAAcGrBwgQIECAQFFA8BaxlSJAgAABAoJXDxAgQIAAgaKA4C1iK0WAAAECBASvHiBAgAABAkUBwVvEVooAAQIECAhePUCAAAECBIoCgreIrRQBAgQIEBC8eoAAAQIECBQFBG8RWykCBAgQICB49QABAgQIECgKCN4itlIECBAgQEDw6gECBAgQIFAUELxFbKUIECBAgIDg1QMECBAgQKAoIHiL2EoRIECAAAHBqwcIECBAgEBRQPAWsZUiQIAAAQKCVw8QIECAAIGigOAtYitFgAABAgQErx4gQIAAAQJFAcFbxFaKAAECBAgIXj1AgAABAgSKAoK3iK0UAQIECBAQvHqAAAECBAgUBQRvEVspAgQIECAgePUAAQIECBAoCgjeIrZSBAgQIEBA8OoBAgQIECBQFBC8RWylCBAgQICA4NUDBAgQIECgKCB4i9hKESBAgAABwasHCBAgQIBAUUDwFrGVIkCAAAECglcPECBAgACBooDgLWIrRYAAAQIEBK8eIECAAAECRQHBW8RWigABAgQICF49QIAAAQIEigKCt4itFAECBAgQELx6gAABAgQIFAUEbxFbKQIECBAgIHj1AAECBAgQKAoI3iK2UgQIECBAQPDqAQIECBAgUBQQvEVspQgQIECAgODVAwQIECBAoCggeIvYShEgQIAAAcGrBwgQIECAQFFA8BaxlSJAgAABAoJXDxAgQIAAgaKA4C1iK0WAAAECBASvHiBAgAABAkUBwVvEVooAAQIECAhePUCAAAECBIoCgreIrRQBAgQIEBC8eoAAAQIECBQFBG8RWykCBAgQICB49QABAgQIECgKCN4itlIECBAgQEDw6gECBAgQIFAUELxFbKUIECBAgIDg1QMECBAgQKAoIHiL2EoRIECAAAHBqwcIECBAgEBRQPAWsZUiQIAAAQKCVw8QIECAAIGigOAtYitFgAABAgQErx4gQIAAAQJFAcFbxFaKAAECBAgIXj1AgAABAgSKAoK3iK0UAQIECBAQvHqAAAECBAgUBQRvEVspAgQIECAgePUAAQIECBAoCgjeIrZSBAgQIEBA8OoBAgQIECBQFBC8RWylCBAgQICA4NUDBAgQIECgKCB4i9hKESBAgAABwasHCBAgQIBAUUDwFrGVIkCAAAECglcPECBAgACBooDgLWIrRYAAAQIEBK8eIECAAAECRQHBW8RWigABAgQICF49QIAAAQIEigKCt4itFAECBAgQELx6gAABAgQIFAUEbxFbKQIECBAgIHj1AAECBAgQKAoI3iK2UgQIECBAQPDqAQIECBAgUBQQvEVspQgQIECAgODVAwQIECBAoCggeIvYShEgQIAAAcGrBwgQIECAQFFA8BaxlSJAgAABAoJXDxAgQIAAgaKA4C1iK0WAAAECBASvHiBAgAABAkUBwVvEVooAAQIECAhePUCAAAECBIoCgreIrRQBAgQIEBC8eoAAAQIECBQFBG8RWykCBAgQICB49QABAgQIECgKCN4itlIECBAgQEDw6gECBAgQIFAUELxFbKUIECBAgIDg1QMECBAgQKAoIHiL2EoRIECAAAHBqwcIECBAgEBRQPAWsZUiQIAAAQKCVw8QIECAAIGigOAtYitFgAABAgQErx4gQIAAAQJFAcFbxFaKAAECBAgIXj1AgAABAgSKAoK3iK3UcYF3v/vdh7e85S0PHviTn/zk8Mtf/vLaJ771rW89vOtd7zr+okce8ec///nw9NNP3/qoV7/61YfXv/71h1e+8pWHl7zkJYcXvvCFh2eeeebw3//+9/CPf/zj8Je//OXwu9/97uqfn6/bC17wgsPrXve6K4eXv/zlhxe/+MVXb/U///nP4e9///vhD3/4w5XB//73v7MIXvWqVx3e//73X/lmi+XXvva13a/1ile84vCxj31s9+O3D/zpT396+MUvfnH28z2RwF4BwbtXyuPuXSBfvB/5yEceqvOogzcB8973vvcqcPdsCZ4f//jHV2H0fNry2bzvfe87vPSlL731bf3rX/86/OAHPzjkYGbv9sQTTxze8Y53HN72trc99JRTg/c1r3nN4UMf+tDess96nOA9m84TTxQQvCeCefj9CGQ09fGPf/xZX+yN4P3Tn/50+Pa3v/2sN5awyRd59m3ZMprL6O7f//73IYGRIHrZy172rMDICDqPeT5sGeU++eSTV+93vWW0H5vtv89MQDz3hG/s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";

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

  const { data } = useSWR<Product>(query.slug, getProductDetail);

  const [logo, setLogo] = useState(() => {
    return data?.supplier?.feature_image || companyLogo;
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
      });
      return;
    }
    addOrRemoveProductFavorite();
  };

  const handleToLogin = () => {
    if (!token) {
      router.push({
        pathname: "/dang-nhap",
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
        <div className="lg:mr-8 mx-auto">
          <Image
            src={currentImage.url || currentImage.s3_image_url}
            alt="product"
            className="h-auto object-cover w-[478px]"
            width={478}
            height={615}
            onError={() =>
              setCurrentImage({ ...currentImage, url: defaultProductDetail })
            }
          />
        </div>
        <div className="flex-base flex flex-col justify-between">
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
                {data?.data?.reference_price || "Liên hệ"}
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
              className="flex items-center justify-center px-[23px] py-[10px] rounded border border-solid border-primary-color text-primary-color gap-[6px] hover:bg-primary-color transition group"
              onClick={handleToLogin}
            >
              <PhoneIcon className="fill-[#eb7a01] group-hover:fill-white" />
              <span className="font-roboto not-italic font-medium text-base leading-[150%] group-hover:text-white">
                {!token ? "Đăng nhập" : data?.supplier?.phone || "0123456789"}
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
