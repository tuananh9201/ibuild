import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { useMediaQuery } from "react-responsive";

const Carousel = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const images: ReactImageGalleryItem[] = [
    {
      original:
        "https://spider-website.s3-ap-southeast-1.amazonaws.com/s3url_f2855e32-d2c2-11ec-ab98-5611200c0840.jpg",
      thumbnail:
        "https://spider-website.s3-ap-southeast-1.amazonaws.com/s3url_f2855e32-d2c2-11ec-ab98-5611200c0840.jpg",
    },
    {
      original:
        "https://spider-website.s3-ap-southeast-1.amazonaws.com/s3url_f2787faa-d2c2-11ec-ab98-5611200c0840.jpg",
      thumbnail:
        "https://spider-website.s3-ap-southeast-1.amazonaws.com/s3url_f2787faa-d2c2-11ec-ab98-5611200c0840.jpg",
    },
    {
      original:
        "https://spider-website.s3-ap-southeast-1.amazonaws.com/s3url_f2474494-d2c2-11ec-ab98-5611200c0840.jpg",
      thumbnail:
        "https://spider-website.s3-ap-southeast-1.amazonaws.com/s3url_f2474494-d2c2-11ec-ab98-5611200c0840.jpg",
    },
    {
      original:
        "https://spider-website.s3-ap-southeast-1.amazonaws.com/s3url_9d8e1394-e08b-11eb-b40b-7ad56781bd98.jpg",
      thumbnail:
        "https://spider-website.s3-ap-southeast-1.amazonaws.com/s3url_9d8e1394-e08b-11eb-b40b-7ad56781bd98.jpg",
    },
    {
      original:
        "https://spider-website.s3-ap-southeast-1.amazonaws.com/s3url_9dcae580-e08b-11eb-b40b-7ad56781bd98.jpg",
      thumbnail:
        "https://spider-website.s3-ap-southeast-1.amazonaws.com/s3url_9dcae580-e08b-11eb-b40b-7ad56781bd98.jpg",
    },
    {
      original:
        "https://spider-website.s3-ap-southeast-1.amazonaws.com/s3url_9e06cd70-e08b-11eb-b40b-7ad56781bd98.jpg",
      thumbnail:
        "https://spider-website.s3-ap-southeast-1.amazonaws.com/s3url_9e06cd70-e08b-11eb-b40b-7ad56781bd98.jpg",
    },
    {
      original:
        "https://spider-website.s3-ap-southeast-1.amazonaws.com/s3url_9d8e1394-e08b-11eb-b40b-7ad56781bd98.jpg",
      thumbnail:
        "https://spider-website.s3-ap-southeast-1.amazonaws.com/s3url_9d8e1394-e08b-11eb-b40b-7ad56781bd98.jpg",
    },
  ];
  return (
    <ImageGallery
      showBullets={false}
      showFullscreenButton={false}
      showNav={false}
      showPlayButton={false}
      items={images}
      thumbnailPosition={isDesktopOrLaptop ? "left" : "bottom"}
    />
  );
};

export default Carousel;
