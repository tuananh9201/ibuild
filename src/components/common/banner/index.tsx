import Carousel from "react-multi-carousel";

import { RenderImageError } from "@/components/common";
import { getSellImage } from "@/lib/utils";

interface BannerProps {
  images: string[];
}

const Banner = ({ images }: BannerProps) => {
  console.log(images);
  return (
    <div className="banner">
      <h3 className="text-text-color text-xl font-medium mb-6">
        Chương trình khuyến mại
      </h3>
      <Carousel
        additionalTransfrom={0}
        autoPlay
        autoPlaySpeed={3000}
        dotListClass=""
        infinite
        minimumTouchDrag={80}
        pauseOnHover
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
          },
        }}
        shouldResetAutoplay
        showDots
        sliderClass=""
        slidesToSlide={1}
      >
        {images.map((image, idx) => {
          console.log(getSellImage(image));
          return (
            <RenderImageError
              key={idx}
              defaultImage="https://placehold.co/1280x670"
              image={`${getSellImage(image)}`}
              width={1280}
              height={670}
              title="banner"
              className="max-w-[1280px] h-[670px] mx-auto"
            />
          );
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
