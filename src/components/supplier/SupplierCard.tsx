import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { IBuildLogo } from "@/images";
import {
  DateRangeIcon,
  HeartBgWhiteIcon,
  HeartIcon,
  LocationIcon,
  PhoneIcon,
  ShopMallIcon,
  SupervisionIcon,
} from "@/images/icons/product_types/icon_wrapper";
import { followSupplier } from "@/lib/api/supplier";
import { FormatNumber } from "@/lib/hooks";
import { ISupplierInfo } from "@/lib/types";

interface SupplierCardProps {
  supplier: ISupplierInfo;
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
    await followSupplier(supplierId);
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

const SupplierCard = ({ supplier }: SupplierCardProps) => {
  const [logo, setLogo] = useState(supplier.logo || IBuildLogo);

  const getAddress = () => {
    if (supplier?.addresses && supplier?.addresses.length > 0) {
      const add = supplier.addresses[0];
      const addressArr = [];
      if (add.wards) {
        addressArr.push(add.wards);
      }
      if (add.district) {
        addressArr.push(add.district);
      }
      if (add.city) {
        addressArr.push(add.city);
      }
      return addressArr.join(", ") || "";
    }
  };

  return (
    <div className="w-full bg-[#f8f9ff] rounded-lg p-4 flex flex-row items-center relative">
      <div className="w-[170px] h-[150px] overflow-hidden rounded-[6px] mr-4">
        {logo && (
          <Image
            src={logo}
            width={170}
            height={150}
            alt="logo"
            className="w-full h-full object-contain"
            onError={() => setLogo(IBuildLogo.src)}
          />
        )}
      </div>
      <div className="flex-base flex flex-col gap-4">
        <Link href={`/nha-cung-cap/${supplier.slug}`}>
          <h1 className="font-medium text-xl leading-[150%] text-text-secondary-color line-clamp-1 cursor-pointer">
            {supplier?.name || ""}
          </h1>
        </Link>
        <div className="flex flex-row items-center gap-3">
          <PhoneIcon className="fill-text-color" />
          <span className="font-normal text-base leading-[150%] text-text-color">
            {supplier?.phone || ""}
          </span>
        </div>
        <div className="flex flex-row items-center gap-3">
          <LocationIcon className="fill-text-color" />
          <span className="font-normal text-base leading-[150%] text-text-color line-clamp-1">
            {getAddress()}
          </span>
        </div>
        <div className="flex flex-row items-center gap-8">
          <div className="flex flex-row items-center">
            <ShopMallIcon className="fill-text-color mr-2" />
            <span className="text-text-color font-normal text-base leading-[150%] mr-4">
              Sản phẩm
            </span>
            <span className="font-medium text-base leading-[150%] text-text-color">
              {FormatNumber(supplier?.products || 0)}
              {}
            </span>
          </div>
          <div className="flex flex-row items-center">
            <SupervisionIcon className="fill-text-color mr-2" />
            <span className="text-text-color font-normal text-base leading-[150%] mr-4">
              Người theo dõi
            </span>
            <span className="font-medium text-base leading-[150%] text-text-color">
              {supplier?.followers ? FormatNumber(supplier.followers) : 0}
            </span>
          </div>
          <div className="flex flex-row items-center">
            <DateRangeIcon className="fill-text-color mr-2" />
            <span className="text-text-color font-normal text-base leading-[150%] mr-4">
              Ngày tham gia
            </span>
            <span className="font-medium text-base leading-[150%] text-text-color">
              {supplier?.participation_date
                ? moment(supplier.participation_date).format("DD/MM/YYYY")
                : "Không rõ"}
            </span>
          </div>
        </div>
        <Link
          href={`/nha-cung-cap/${supplier.slug}`}
          className="mt-4 text-primary-color text-base leading-[150%] font-medium"
        >
          <span>Xem chi tiết</span>
        </Link>
      </div>
      <ButtonFollow supplierId={supplier.id} follow={supplier.is_follow} />
    </div>
  );
};

export default SupplierCard;
