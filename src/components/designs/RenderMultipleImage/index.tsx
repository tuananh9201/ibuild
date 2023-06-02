import { RenderImageError } from "@/components/common";
import { IBuildLogo } from "@/images";

interface RenderMultipleImageProps {
  images: string[];
}

const RenderMultipleImage = ({ images }: RenderMultipleImageProps) => {
  const lenImage = images?.length || 0;
  return (
    <div className={lenImage > 1 ? "flex flex-row gap-1" : "w-full"}>
      <RenderImageError
        defaultImage={IBuildLogo.src}
        image={images[0] || ""}
        width={170}
        height={150}
        title="image1"
        className={
          lenImage > 1
            ? "w-1/2 h-[150px] max-w-[285px] object-cover rounded-l overflow-hidden"
            : "w-full h-[150px] object-cover rounded overflow-hidden"
        }
      />
      {lenImage > 1 && (
        <div className="flex-base flex flex-col justify-between gap-1">
          <RenderImageError
            defaultImage={IBuildLogo.src}
            image={images[1]}
            title="image2"
            width={111}
            height={75}
            className={`w-full object-cover overflow-hidden ${
              lenImage === 2 ? "rounded-r h-full" : "rounded-tr h-[73px]"
            }`}
          />
          {lenImage >= 3 && (
            <RenderImageError
              defaultImage={IBuildLogo.src}
              image={images[2]}
              title="image2"
              width={111}
              height={75}
              className="rounded-br w-full h-[73px] object-cover"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RenderMultipleImage;
