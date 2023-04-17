import { AllProductIcon } from "@/images/icons/product_types/icon_wrapper";

const ProductGroupCard = () => {
  return (
    <div className="min-w-[302px] bg-[#f8f9ff] rounded-lg border border-solid border-[#e6e6e6] p-4 flex flex-col gap-2">
      <AllProductIcon className="fill-text-secondary-color w-10 h-10" />
      <h3 className="font-medium text-base leading-[150%] text-secondary-color">
        Vật liệu nhựa xây dựng
      </h3>
    </div>
  );
};

export default ProductGroupCard;
