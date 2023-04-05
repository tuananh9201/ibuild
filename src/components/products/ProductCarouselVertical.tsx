import { useState } from "react";
import Flickity from "react-flickity-component";
import Image from "next/image";

import { miniExampleProductDetail } from "@/images/index";
import { ProductImage } from "@/lib/types";

const flickityOptions = {
  freeScroll: true,
  freeScrollFriction: 0.05,
  contain: true,
  pageDots: false,
  prevNextButtons: true,
  initialIndex: 0,
  cellAlign: "left",
  groupCells: true,
  arrowShape:
    "M 32.3 48.3613 L 12.6413 28.7026 L 32.3 9.04397 C 34.276 7.06797 34.276 3.87597 32.3 1.89997 C 30.324 -0.0760312 27.132 -0.0760312 25.156 1.89997 L 1.89997 25.156 C -0.0760312 27.132 -0.0760312 30.324 1.89997 32.3 L 25.156 55.556 C 27.132 57.532 30.324 57.532 32.3 55.556 C 34.2253 53.58 34.276 50.3373 32.3 48.3613 Z",
};

interface ProductCarouselVerticalProps {
  images: ProductImage[];
  currentImage: ProductImage;
  setCurrentImage: Function;
}

const ProductCarouselVertical = ({
  images,
  currentImage,
  setCurrentImage,
}: ProductCarouselVerticalProps) => {
  const handleActiveImage = (idImage: string) => {
    const newImage = images.find((img) => img.image_id === idImage);
    setCurrentImage({
      ...currentImage,
      ...newImage,
    });
  };

  return (
    <div className="w-full h-full overflow-hidden">
      {images.length && (
        <Flickity
          className={`carousel flickity-vertical w-[615px]`}
          elementType={"div"}
          options={flickityOptions}
          disableImagesLoaded={true}
          reloadOnUpdate={false}
          static
        >
          {images.map((img) => (
            <div
              key={img.image_id}
              className={`mr-2 last:mr-0 rounded border-2 border-solid ${
                currentImage.image_id === img.image_id
                  ? "border-primary-color"
                  : "border-transparent"
              }  `}
              onClick={() => handleActiveImage(img.image_id)}
            >
              <Image
                src={img.s3_image_url || img.url}
                alt={img.url}
                width={80}
                height={80}
                className="-rotate-90"
              />
            </div>
          ))}
        </Flickity>
      )}
    </div>
  );
};

export default ProductCarouselVertical;
