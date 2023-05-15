import Image from "next/image";
import { useState } from "react";
import Cropper from "react-easy-crop";
import { Area, Point } from "react-easy-crop/types";
import { Slider } from "antd";

import AvatarDefault from "@/images/avatar_default.png";
import {
  ReloadIcon,
  TrashCanIcon,
} from "@/images/icons/product_types/icon_wrapper";
import { Modal } from "../common";
import { getCroppedImg } from "@/lib/hooks/useCropImage";

const AvatarInfo = () => {
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState({
    imageSrc:
      "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000",
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 1,
    croppedAreaPixels: {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    },
  });

  // function
  const onCropChange = (crop: Point) => {
    setImage((prev) => ({
      ...prev,
      crop: {
        ...prev.crop,
        ...crop,
      },
    }));
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setImage((prev) => ({
      ...prev,
      croppedAreaPixels: {
        ...prev.croppedAreaPixels,
        ...croppedAreaPixels,
      },
    }));
  };

  const onZoomChange = (zoom: number) => {
    setImage((prev) => ({
      ...prev,
      zoom,
    }));
  };

  const handleCropImage = async () => {
    const res = await getCroppedImg(image.imageSrc, image.croppedAreaPixels, 0);
    console.log(res);
  };

  // element
  const bodyContentModal = (
    <div>
      <div className="relative min-h-[300px] mb-8 custom-crop-image">
        <Cropper
          image={image.imageSrc}
          crop={image.crop}
          zoom={image.zoom}
          aspect={image.aspect}
          cropShape="round"
          showGrid={false}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
        />
      </div>
      <div className="custom-dot mb-8">
        <Slider
          min={1}
          max={3}
          step={0.1}
          defaultValue={image.zoom}
          onChange={(zoom) => onZoomChange(zoom)}
        />
      </div>
      <div className="flex flex-row gap-2 items-center justify-center">
        <button
          className="text-text-color font-medium text-base w-[150px] py-3 rounded hover:bg-red-100"
          onClick={() => setOpenModal((prev) => !prev)}
        >
          Hủy bỏ
        </button>
        <button
          className="text-white font-medium text-base w-[150px] py-3 rounded bg-primary-color"
          onClick={handleCropImage}
        >
          Thay ảnh
        </button>
      </div>
    </div>
  );

  // function
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div className="flex flex-row items-center gap-10">
      <Image src={AvatarDefault} alt="avatar" />
      <div>
        <p className="text-text-color font-medium text-base mb-2">Ảnh hồ sơ</p>
        <div className="flex flex-row items-center gap-5">
          <span
            className="flex flex-row items-center gap-2 text-primary-color font-normal text-base cursor-pointer"
            onClick={handleOpenModal}
          >
            <ReloadIcon className="fill-primary-color" />
            Thay ảnh
          </span>
          <span className="flex flex-row items-center gap-2 text-primary-color font-normal text-base cursor-pointer">
            <TrashCanIcon className="fill-primary-color" />
            Xóa
          </span>
        </div>
      </div>
      <Modal isOpen={openModal} body={bodyContentModal} />
    </div>
  );
};

export default AvatarInfo;
