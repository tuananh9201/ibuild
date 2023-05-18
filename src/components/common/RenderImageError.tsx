import { useState, useEffect } from "react";
import Image from "next/image";

interface RenderImageErrorProps {
  defaultImage: string;
  image: string;
  width: number;
  height: number;
  title: string;
  className?: string;
}

const RenderImageError = ({
  defaultImage,
  image,
  width,
  height,
  title,
  className,
}: RenderImageErrorProps) => {
  const [url, setUrl] = useState(defaultImage);

  useEffect(() => {
    setUrl(image || defaultImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  return (
    <Image
      src={url}
      alt={title}
      width={width}
      height={height}
      className={className || ""}
      onError={() => setUrl(defaultImage)}
    />
  );
};

export default RenderImageError;
