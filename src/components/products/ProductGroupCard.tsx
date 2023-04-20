import Image from "next/image";
import { useRouter } from "next/router";

import { getCategoriesIcon } from "@/lib/utils";

interface ProductGroupCardProps {
  id?: string;
  title: string;
  icon: string | undefined;
}

const ProductGroupCard = ({ id, title, icon }: ProductGroupCardProps) => {
  const urlIcon = getCategoriesIcon(icon ? icon : "all", false);

  const router = useRouter();

  const handleRedirectToDetail = () => {
    if (id) {
      router.push({
        pathname: `/danh-sach-nha-cung-cap/${id}`,
      });
    }
  };

  return (
    <div
      className="min-w-[302px] bg-[#f8f9ff] rounded-lg border border-solid border-[#e6e6e6] p-4 flex flex-col gap-2 cursor-pointer"
      onClick={handleRedirectToDetail}
    >
      <Image
        src={urlIcon}
        alt={title}
        width={32}
        height={32}
        className="w-8 h-8"
      />
      <h3 className="font-medium text-base leading-[150%] text-secondary-color">
        {title}
      </h3>
    </div>
  );
};

export default ProductGroupCard;
