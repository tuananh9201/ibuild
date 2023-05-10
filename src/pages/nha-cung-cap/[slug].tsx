import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";

import MainLayout from "@/components/main-layout";
import { IBuildLogo, SupplierBgDefault } from "@/images";
import {
  DateRangeIcon,
  LocationIcon,
  PhoneIcon,
  ShopIcon,
  SupervisionIcon,
} from "@/images/icons/product_types/icon_wrapper";
import { NextPageWithLayout } from "../_app";
import { Tabs } from "antd";
import SupplierInformation from "@/components/supplier/sections/SupplierInformation";
import AllProducts from "@/components/supplier/sections/AllProducts";
import GeneralIntroduction from "@/components/supplier/sections/GeneralIntroduction";

const TABS_NAME = [
  {
    key: "1",
    label: "Thông tin nhà cung cấp",
  },
  {
    key: "2",
    label: "Tất cả sản phẩm",
  },
  {
    key: "3",
    label: "Giới thiệu chung",
  },
];

const NhaCungCap: NextPageWithLayout = () => {
  const { query } = useRouter();

  const [currentTab, setCurrentTab] = useState("1");

  const handleOnchangeTab = (key: string) => {
    console.log(key);
    setCurrentTab(key);
  };

  return (
    <section>
      <div className="relative">
        <Image
          src={SupplierBgDefault}
          alt="background supplier"
          className="mx-auto w-full object-cover"
        />
        <div className="w-[170px] h-[170px] rounded-full overflow-hidden absolute bottom-0 left-20 translate-y-1/2">
          <Image
            src={IBuildLogo}
            alt="ibuild logo"
            className="w-[170px] h-[170px] object-cover"
          />
        </div>
      </div>
      <div className="pt-28 lg:pt-5 lg:pl-[300px]">
        <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:justify-between items-center">
          <div>
            <div className="flex flex-row gap-3 mb-2">
              <span className="flex gap-2 text-text-color font-normal text-base">
                <LocationIcon className="fill-text-color" />
                Cầu Giấy, Hà Nội
              </span>
              <span className="flex gap-2 text-text-color font-normal text-base">
                <LocationIcon className="fill-text-color" />
                Bắc Từ Liêm, Hà Nội
              </span>
              <span className="flex gap-2 text-text-color font-normal text-base">
                <LocationIcon className="fill-text-color" />
                +3
              </span>
            </div>
            <h1 className="font-semibold text-[28px] text-text-color leading-[125%]">
              Trung tâm VLXD Thống nhất
            </h1>
          </div>

          <button className="flex flex-row items-center gap-3 px-8 py-3 bg-primary-color rounded">
            <PhoneIcon className="fill-white" />
            <span className="text-white text-base font-normal">
              Đăng nhập để xem thông tin
            </span>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 mt-8 gap-y-3">
          <div className="flex flex-row gap-2 line-clamp-1">
            <ShopIcon className="" />
            <span>Sản phẩm</span>
            <span>70</span>
          </div>
          <div className="flex flex-row gap-2 line-clamp-1">
            <SupervisionIcon className="" />
            <span>Người theo dõi</span>
            <span>1,000</span>
          </div>
          <div className="flex flex-row gap-2 line-clamp-1">
            <DateRangeIcon className="" />
            <span>Ngày tham gia</span>
            <span>12/10/2019</span>
          </div>
        </div>
      </div>
      <div className="mt-14">
        <Tabs
          defaultActiveKey="1"
          centered
          items={TABS_NAME}
          onChange={handleOnchangeTab}
          tabBarStyle={{
            width: "500px",
          }}
        />
      </div>
      {currentTab === "1" && <SupplierInformation />}
      {currentTab === "2" && <AllProducts />}
      {currentTab === "3" && <GeneralIntroduction />}
    </section>
  );
};

NhaCungCap.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default NhaCungCap;
