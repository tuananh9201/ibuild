import Image from "next/image";

import { companyLogo } from "@/images";
import {
  LocationIcon,
  PhoneIcon,
  HeartBgWhiteIcon,
} from "@/images/icons/product_types/icon_wrapper";
import SupplierProductCard from "./SupplierProductCard";

const ProductAdsCard = () => {
  return (
    <div className="w-full bg-[#f8f9ff] border-2 border-solid border-[#8eb4ff] rounded-lg flex flex-col lg:flex-row relative">
      <div className="w-1/4 text-center px-8 py-[30px]">
        <div className="bg-white w-[126px] h-[126px] rounded-full overflow-hidden mb-4 mx-auto">
          <Image
            src={companyLogo}
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="font-medium text-xl leading-[150%] uppercase text-text-secondary-color mb-2">
          Trung Tâm Vlxl Đồng Tâm
        </h1>
        <div className="mb-4 flex flex-row justify-between items-center">
          <span className="flex flex-row gap-2 items-center">
            <LocationIcon className="fill-text-color" />
            <span>Cầu Giấy, Hà Nội</span>
          </span>
          <span className="flex flex-row gap-2 items-center">
            <PhoneIcon className="fill-text-color" />
            <span>0272 387 2233</span>
          </span>
        </div>
        <div className="flex flex-row justify-between gap-3 h-11">
          <button className="flex-base border border-solid border-primary-color rounded bg-primary-color text-white font-medium text-base leading-[150%]">
            Xem chi tiết
          </button>
          <button className="border border-solid border-primary-color rounded bg-primary-color w-11 h-11 flex justify-center items-center">
            <HeartBgWhiteIcon className="w-4 h-4 fill-white" />
          </button>
        </div>
      </div>
      <div className="flex-base flex justify-around">
        <SupplierProductCard />
        <SupplierProductCard />
        <SupplierProductCard />
        <SupplierProductCard />
      </div>
      <div className="absolute right-4 bottom-0 w-[97px] h-11 bg-[#8eb4ff] rounded-t flex justify-center items-center">
        <span className="font-medium text-base leading-[150%] text-white">
          Quảng cáo
        </span>
      </div>
    </div>
  );
};

export default ProductAdsCard;
