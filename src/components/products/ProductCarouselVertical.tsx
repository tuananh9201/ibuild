import { useState, useRef, useEffect } from "react";
import Flickity from "react-flickity-component";
import Image from "next/image";

import { miniExampleProductDetail } from "@/images/index";

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
  className: string;
}

const ProductCarouselVertical = ({
  className,
}: ProductCarouselVerticalProps) => {
  return (
    <div className="w-full h-full">
      <Flickity
        className={`carousel flickity-vertical ${className}`}
        elementType={"div"}
        options={flickityOptions}
        disableImagesLoaded={true}
        reloadOnUpdate={false}
        static
      >
        {Array(10)
          .fill(0)
          .map((value, idx) => (
            <div key={idx} className="mr-2 last:mr-0">
              <Image src={miniExampleProductDetail} alt="product" />
            </div>
          ))}
      </Flickity>
    </div>
  );
};

export default ProductCarouselVertical;
