import Image from "next/image";

import AvatarDefault from "@/images/avatar_default.png";
import {
  ReloadIcon,
  TrashCanIcon,
} from "@/images/icons/product_types/icon_wrapper";

const AvatarInfo = () => {
  return (
    <div className="flex flex-row items-center gap-10">
      <Image src={AvatarDefault} alt="avatar" />
      <div>
        <p className="text-text-color font-medium text-base mb-2">Ảnh hồ sơ</p>
        <div className="flex flex-row items-center gap-5">
          <span className="flex flex-row items-center gap-2 text-primary-color font-normal text-base cursor-pointer">
            <ReloadIcon className="fill-primary-color" />
            Thay ảnh
          </span>
          <span className="flex flex-row items-center gap-2 text-primary-color font-normal text-base cursor-pointer">
            <TrashCanIcon className="fill-primary-color" />
            Xóa
          </span>
        </div>
      </div>
    </div>
  );
};

export default AvatarInfo;
