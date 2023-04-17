import Image from "next/image";

const SupplierProductCard = () => {
  return (
    <div className="max-w-[203px] py-4">
      <h2 className="font-normal text-sm leading-[150%] text-text-secondary-color line-clamp-2 mb-1">
        Camera Wifi không dây Yoosee HD 3 râu 1080p
      </h2>
      <div className="px-3 py-[3px] bg-[#0000001a] inline-block rounded mb-3">
        <span className="text-xs font-robot not-italic font-normal leading-[150%]">
          Mã: G1236
        </span>
      </div>
      <div className="mb-[13.5px]">
        <span className="font-roboto not-italic font-semibold text-lg leading-[150%] text-secondary-color">
          Liên hệ
        </span>
      </div>
      <div className="flex flex-row justify-between items-center mb-3">
        <span className="font-roboto not-italic text-sm leading-[150%] text-text-color font-normal">
          Hãng
        </span>
        <span className="text-sm dark:text-white font-normal">Yoosee</span>
      </div>
      <div className="flex flex-row justify-between items-center mb-3">
        <span className="font-roboto not-italic text-sm leading-[150%] text-text-color font-normal">
          Số lượng sản phẩm
        </span>
        <span className="font-roboto not-italic text-sm leading-[150%] text-text-color font-normal">
          100 - 999
        </span>
      </div>
      <div className="mb-3 w-full max-w-[203px]">
        <Image
          src="https://cf.shopee.vn/file/0ad414977b2a130d234054ff62b94d03"
          width={203}
          height={120}
          placeholder="blur"
          blurDataURL="https://placehold.co/270x140"
          alt="product"
          className="w-full h-[120px] rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default SupplierProductCard;
