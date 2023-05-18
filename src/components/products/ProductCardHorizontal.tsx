import {
  HeartBgWhiteIcon,
  HeartIcon,
} from "@/images/icons/product_types/icon_wrapper";
import { followSupplier } from "@/lib/api/supplier";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

const ProductCardHorizontal = () => {
  return (
    <div className="w-full bg-[#f8f9ff] rounded-lg p-4 relative">
      <div className="flex gap-4">
        <Image
          src="https://scontent.fhan5-10.fna.fbcdn.net/v/t1.15752-9/346108400_600574812034250_7936412841012868797_n.png?_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=9RzmjloVoI4AX92I0de&_nc_ht=scontent.fhan5-10.fna&oh=03_AdQZGpHG4F0VEz0fkmEQuRdNlBCr1lgOxsPwS314FCjaMQ&oe=648D99B6"
          alt="product"
          width={170}
          height={150}
          className="rounded-lg overflow-hidden object-cover"
        />
        <div>
          <div className="flex flex-row items-center gap-1 mb-2">
            <Image
              src="https://scontent.fhan5-9.fna.fbcdn.net/v/t1.15752-9/341798742_783152030042426_2104254176789910436_n.png?stp=cp0_dst-png&_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=4Rv-nGrGODAAX-tIJqW&_nc_ht=scontent.fhan5-9.fna&oh=03_AdQl-PbbcflRoAnhA6LHq-h3ceeyZ3BBwnyy_VMYInK5-w&oe=648DA335"
              alt="logo"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full"
            />
            <h1 className="font-medium text-xl leading-[150%] text-text-secondary-color line-clamp-1 cursor-pointer uppercase">
              Trung Tâm Vlxl Đồng Tâm
            </h1>
          </div>
          <h2 className="text-secondary-color text-base font-normal mb-1">
            Camera Wifi không dây Yoosee HD 3 râu 1080p
          </h2>
          <div className="px-3 py-[3px] bg-[#0000001a] inline-block rounded mb-3">
            <span className="text-xs font-robot not-italic font-normal leading-[150%] line-clamp-1">
              Mã:
            </span>
          </div>
          <div className="mb-[13.5px]">
            <span className="font-roboto not-italic font-semibold text-lg leading-[150%] text-secondary-color">
              Liên hệ
            </span>
          </div>
          <Link
            href="#"
            className="mt-4 text-primary-color text-base leading-[150%] font-medium"
          >
            <span>Xem chi tiết</span>
          </Link>
        </div>
      </div>
      <ButtonFollow supplierId={""} follow={true} />
    </div>
  );
};

export default ProductCardHorizontal;
