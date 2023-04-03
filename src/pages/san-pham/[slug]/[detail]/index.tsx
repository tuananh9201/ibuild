import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import MainLayout from "@/components/main-layout";
import { NextPageWithLayout } from "src/pages/_app";
import { exampleProductDetail, companyLogo } from "@/images/index";
import {
  LocationIcon,
  ShopCartIcon,
  UpDownIcon,
  PhoneIcon,
  HeartIcon,
} from "@/images/icons/product_types/icon_wrapper";
import TechnicalParametersProduct from "@/components/products/TechnicalParametersProduct";
import ListProduct from "@/components/products/ListProduct";
import ProductCarouselVertical from "@/components/products/ProductCarouselVertical";

const TECHNICAL_PARAMETERS = [
  {
    title: "Hãng sản xuất",
    value: "HIKVISION",
  },
  {
    title: "Camera",
    value: "Camera Wifi không dây Yoosee HD 3 râu 1080p",
  },
  {
    title: "Độ phân giải",
    value: "1080 MP",
  },
  {
    title: "Cảm biến hình",
    value: "1/2.8″ progressive scan CMOS",
  },
  {
    title: "Tầm xa hồng ngoại",
    value: "Tầm xa hồng ngoại 30m",
  },
  {
    title: "Phương thức kết nối",
    value: "Kết nối qua dây mạng hoặc wifi",
  },
  {
    title: "Ống kính",
    value: "2.8/4 mm",
  },
  {
    title: "Độ nhạy sáng",
    value: "0.01 Lux @ (F1.2,AGC ON),0 Lux with IR",
  },
  {
    title: "Tính năng",
    value:
      "Tính năng DWDR; 3D DNR; ICR;BLC, HLC, Hồng ngoại thông minh, Tích hợp mic thu âm. Tiêu chuẩn ngoài trời IP66. Nguồn vào 12 VDC",
  },
  {
    title: "Đầu ghi",
    value: "Đầu ghi 4 kênh Wifi DS-7104NI-K1/W/M",
  },
  {
    title: "Hỗ trợ Camera",
    value: "Camera IP độ phân giải ghi hình tối đa 4MP",
  },
  {
    title: "Chuẩn nén hình",
    value: "H.265+/H.265/H.264+/H.264",
  },
  {
    title: "Cổng màn hình",
    value: "Cổng ra HDMI và VGA với độ phân giải 1920X1080P",
  },
  {
    title: "Phần mềm",
    value: "Hik-connect / IVMS 4200/ Ezviz/ Hik-proconnect",
  },
  {
    title: "Xem qua mạng",
    value:
      "Hỗ trợ dịch vụ Hik-connect P2P, tên miền Cameraddns miễn phí trọn đời",
  },
  {
    title: "Phụ kiện kèm theo",
    value:
      "Cáp nguồn: cáp nguồn 4 × camera IPC, cáp nguồn 1 × NVRCáp Ethernet: RJ45, Cat5e UTP, 1 m. Kết nối NVR và SwitchCáp HDMI: 1 × Cáp HDMI, 2m, màu đen",
  },
];

const ProductDetail: NextPageWithLayout = () => {
  const { query } = useRouter();
  console.log(query);

  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className="w-full mt-[60px]">
      <div className="max-w-[1280px] mx-auto my-0 flex flex-row min-h-[615px]">
        <div className="mr-[26px] w-[84px]">
          <ProductCarouselVertical />
        </div>
        <div className="mr-8">
          <Image
            src={exampleProductDetail}
            alt="product"
            className="w-auto h-full object-cover"
          />
        </div>
        <div className="flex-base flex flex-col justify-between">
          <div className="relative">
            <div className="px-3 py-[3px] bg-[#0000001a] inline-block rounded mb-2">
              <span className="text-base font-robot not-italic font-normal leading-[150%] text-[#333333]">
                Mã: G1236
              </span>
            </div>
            <div className="mb-2">
              <h1 className="font-roboto not-italic font-normal text-2xl text-[#333333] leading-[150%]">
                Camera Wifi không dây Yoosee HD 3 râu 1080p
              </h1>
            </div>
            <div className="flex flex-row gap-2 mb-4">
              <Image src={companyLogo} alt="logo" />
              <h2 className="font-roboto not-italic font-medium text-base leading-[150%] text-[#333333] uppercase">
                Trung Tâm Vlxl Đồng Tâm
              </h2>
            </div>
            <div className="mb-2">
              <span className="font-roboto not-italic font-semibold text-text-color text-[28px] leading-[125%]">
                590.000 VND
              </span>
            </div>
            <div className="flex flex-row gap-[13px] mb-2">
              <LocationIcon className="" />
              <span className="font-roboto not-italic font-normal text-base text-text-color leading-[150%]">
                158 Nguyễn Khánh Toàn, Quan Hoa, Cầu Giấy, Hà Nội
              </span>
            </div>
            <div className="flex mb-4">
              <ShopCartIcon className="" />
              <span className="ml-[9px] mr-4 font-roboto not-italic text-text-color font-normal text-base leading-[150%]">
                Số lượng
              </span>
              <span className="font-roboto not-italic text-text-color font-normal text-base leading-[150%]">
                300 -1000
              </span>
            </div>
            <div>
              <h3 className="font-roboto not-italic leading-[150%] text-xl font-medium text-[#343434]">
                Mô tả sản phẩm
              </h3>
              <ul
                className={`pl-7 font-roboto font-normal text-[#343434] text-base leading-[150%] transition ${
                  isHidden ? "h-[240px] overflow-y-hidden" : ""
                }`}
              >
                <li className="list-disc">Hình ảnh sắc nét full HD – 1080p.</li>
                <li className="list-disc">Báo động khi có người đột nhập.</li>
                <li className="list-disc">Chế độ xoay theo người di chuyển.</li>
                <li className="list-disc">
                  Đèn hồng ngoại quay đêm lên đến 10 m.
                </li>
                <li className="list-disc">
                  Kết nối Wifi không dây hoặc dây Lan.
                </li>
                <li className="list-disc">
                  Hỗ trợ khe cắm thẻ nhớ (max 256G).
                </li>
                <li className="list-disc">Không tốn điện hàng tháng (5v).</li>
                <li className="list-disc">Giám sát từ xa qua điện thoại.</li>
                <li className="list-disc">
                  Có thể treo tường hoặc đặt bàn, kệ…
                </li>
                <li className="list-disc">
                  Có thể treo tường hoặc đặt bàn, kệ…
                </li>
                <li className="list-disc">
                  Có thể treo tường hoặc đặt bàn, kệ…
                </li>
                <li className="list-disc">
                  Có thể treo tường hoặc đặt bàn, kệ…
                </li>
                <li className="list-disc">
                  Có thể treo tường hoặc đặt bàn, kệ…
                </li>
                <li className="list-disc">
                  Có thể treo tường hoặc đặt bàn, kệ…
                </li>
                <li className="list-disc">Điều Khiển Xoay 360 Độ</li>
              </ul>
            </div>
            <button
              className={`w-full flex gap-[5px] items-center justify-center h-[70px] bottom-0 left-0 ${
                isHidden ? "bg-gradient-white-to-transparent absolute" : ""
              }`}
              onClick={() => setIsHidden((prev) => !prev)}
            >
              <span className="font-roboto not-italic font-medium text-primary-color leading-[150%]">
                {isHidden ? "Xem thêm" : "Thu gọn"}
              </span>
              <UpDownIcon
                className={`fill-[#eb7a01] transition ${
                  isHidden ? "" : "rotate-180"
                }`}
              />
            </button>
          </div>
          <div className="flex flex-row justify-between mt-4">
            <button className="flex items-center justify-center px-[23px] py-[10px] rounded border border-solid border-primary-color text-primary-color gap-[6px] hover:bg-primary-color transition group">
              <PhoneIcon className="fill-[#eb7a01] group-hover:fill-white" />
              <span className="font-roboto not-italic font-medium text-base leading-[150%] group-hover:text-white">
                0272 387 2233
              </span>
            </button>
            <button className="flex items-center justify-center px-[23px] py-[10px] rounded border border-solid border-primary-color text-primary-color gap-[6px] hover:bg-primary-color transition group">
              <HeartIcon className="fill-[#eb7a01] group-hover:fill-white" />
              <span className="font-roboto not-italic font-medium text-base leading-[150%] group-hover:text-white">
                Theo dõi sản phẩm
              </span>
            </button>
            <button className="flex items-center justify-center px-[23px] py-[10px] rounded border border-solid border-primary-color text-primary-color gap-[6px] hover:bg-primary-color transition group">
              <span className="font-roboto not-italic font-medium text-base leading-[150%] group-hover:text-white">
                Thông tin nhà cung cấp
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto my-0 mt-10">
        <TechnicalParametersProduct
          title="Thông số kỹ thuật"
          parameters={TECHNICAL_PARAMETERS}
        />
      </div>
      <div className="max-w-[1280px] mx-auto my-0 mt-10">
        <h3 className="font-roboto not-italic font-medium text-xl leading-[150%] text-text-color mb-6">
          Cùng nhà cung cấp
        </h3>
        {/* <ListProduct /> */}
      </div>
    </div>
  );
};

ProductDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default ProductDetail;
