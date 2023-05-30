import { RenderImageError } from "@/components/common";
import Image from "next/image";

interface RenderMultipleImageProps {
  images: string[];
}

const RenderMultipleImage = ({ images }: RenderMultipleImageProps) => {
  const lenImage = images?.length || 0;
  return (
    <div className={lenImage > 1 ? "flex flex-row gap-1" : "w-full"}>
      <RenderImageError
        defaultImage=""
        image={images[0] || ""}
        width={170}
        height={150}
        title="image1"
        className={
          lenImage > 1
            ? "w-[170px] h-[150px] max-w-[285px] object-cover rounded-l overflow-hidden"
            : "w-full h-[150px] object-cover rounded overflow-hidden"
        }
      />
      {lenImage > 1 && (
        <div className="flex-base flex flex-col justify-between">
          <Image
            src="https://scontent.fhan1-1.fna.fbcdn.net/v/t1.15752-9/350361383_1421710131980870_6008296597101239733_n.png?_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=lf7hvtHsKakAX80mCTJ&_nc_ht=scontent.fhan1-1.fna&oh=03_AdQT8oAYGN1Zen4jvpfXdU8DeAu_aM7P_FUELr4gKFuK1Q&oe=649BCE6C"
            alt="image2"
            width={111}
            height={75}
          />
          <Image
            src="https://scontent.fhan1-1.fna.fbcdn.net/v/t1.15752-9/350361324_643617104284465_2026340415675763683_n.png?_nc_cat=111&ccb=1-7&_nc_sid=ae9488&_nc_ohc=Lh2Lt4Y9q3cAX-3o8ok&_nc_ht=scontent.fhan1-1.fna&oh=03_AdTZdzi9Ch_27I9iB1td3StpKOWHHIRUC7Cdnyk2geP9dg&oe=649BD52F"
            alt="image2"
            width={111}
            height={75}
          />
        </div>
      )}
    </div>
  );
};

export default RenderMultipleImage;
