import Image from "next/image";

import { companyLogo } from "@/images";
import {
  PhoneIcon,
  LocationIcon,
  ShopMallIcon,
  SupervisionIcon,
  DateRangeIcon,
  HeartIcon,
} from "@/images/icons/product_types/icon_wrapper";

const SupplierCard = () => {
  return (
    <div className="w-full bg-[#f8f9ff] rounded-lg p-4 flex flex-row relative">
      <div className="w-[170px] h-full overflow-hidden rounded-[6px] mr-4">
        <Image
          src={companyLogo}
          width={170}
          height={150}
          alt="logo"
          className="w-full h-full"
        />
      </div>
      <div className="flex-base flex flex-col gap-4">
        <h1 className="font-medium text-xl leading-[150%] text-text-secondary-color line-clamp-1">
          Công Ty CPTM Vật Liệu Xây Dựng Minh Tuấn
        </h1>
        <div className="flex flex-row items-center gap-3">
          <PhoneIcon className="fill-text-color" />
          <span className="font-normal text-base leading-[150%] text-text-color">
            0272 387 2233
          </span>
        </div>
        <div className="flex flex-row items-center gap-3">
          <LocationIcon className="fill-text-color" />
          <span className="font-normal text-base leading-[150%] text-text-color">
            Cầu Giấy, Hà Nội
          </span>
        </div>
        <div className="flex flex-row items-center gap-8">
          <div className="flex flex-row items-center">
            <ShopMallIcon className="fill-text-color mr-2" />
            <span className="text-text-color font-normal text-base leading-[150%] mr-4">
              Sản phẩm
            </span>
            <span className="font-medium text-base leading-[150%] text-text-color">
              70
            </span>
          </div>
          <div className="flex flex-row items-center">
            <SupervisionIcon className="fill-text-color mr-2" />
            <span className="text-text-color font-normal text-base leading-[150%] mr-4">
              Người theo dõi
            </span>
            <span className="font-medium text-base leading-[150%] text-text-color">
              1000
            </span>
          </div>
          <div className="flex flex-row items-center">
            <DateRangeIcon className="fill-text-color mr-2" />
            <span className="text-text-color font-normal text-base leading-[150%] mr-4">
              Ngày tham gia
            </span>
            <span className="font-medium text-base leading-[150%] text-text-color">
              12/10/2019
            </span>
          </div>
        </div>
      </div>
      <button className="absolute top-4 right-4 flex flex-row gap-3 items-center">
        <HeartIcon className="fill-primary-color" />
        <span className="text-primary-color font-normal text-sm leading-[150%]">
          Theo dõi
        </span>
      </button>
    </div>
  );
};

export default SupplierCard;
