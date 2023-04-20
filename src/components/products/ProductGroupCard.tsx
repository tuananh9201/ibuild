import Image from "next/image";

import { AllProductIcon } from "@/images/icons/product_types/icon_wrapper";
import { getCategoriesIcon } from "@/lib/utils";

interface ProductGroupCardProps {
  title: string;
  icon: string | undefined;
}

const ProductGroupCard = ({ title, icon }: ProductGroupCardProps) => {
  const urlIcon = getCategoriesIcon(icon ? icon : "all", false);

  return (
    <div className="min-w-[302px] bg-[#f8f9ff] rounded-lg border border-solid border-[#e6e6e6] p-4 flex flex-col gap-2 cursor-pointer">
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
