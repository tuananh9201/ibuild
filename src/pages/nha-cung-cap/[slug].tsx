import moment from "moment";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";

import { RenderImageError } from "@/components/common";
import MainLayout from "@/components/main-layout";
import AllProducts from "@/components/supplier/sections/AllProducts";
import GeneralIntroduction from "@/components/supplier/sections/GeneralIntroduction";
import SupplierInformation from "@/components/supplier/sections/SupplierInformation";
import { IBuildLogo, SupplierBgDefault } from "@/images";
import {
  DateRangeIcon,
  LocationIcon,
  PhoneIcon,
  ShopIcon,
  SupervisionIcon,
} from "@/images/icons/product_types/icon_wrapper";
import { fetchSupplierInfoBySlug } from "@/lib/api/supplier";
import { FormatNumber, getRangeAddress } from "@/lib/hooks";
import { ISupplierInfo } from "@/lib/types";
import { RootState } from "@/store/store";
import { Tabs } from "antd";
import { NextPageWithLayout } from "../_app";

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
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const router = useRouter();
  const { query } = router;
  const { slug } = query;

  const [currentTab, setCurrentTab] = useState("1");

  const { data: supplier } = useSWR<ISupplierInfo | undefined>(
    slug,
    fetchSupplierInfoBySlug
  );

  //function
  const handleOnchangeTab = (key: string) => {
    setCurrentTab(key);
  };
  const handleClickPhone = () => {
    if (!token) {
      router.push({
        pathname: "/dang-nhap",
        query: {
          redirect: router.asPath,
        },
      });
    }
  };

  useEffect(() => {
    if (!supplier) return;
  }, [supplier]);

  return (
    <section>
      <div className="relative">
        <RenderImageError
          defaultImage={SupplierBgDefault.src}
          image={supplier?.cover_image || ""}
          width={1280}
          height={230}
          title="bg supplier"
          className="mx-auto w-full object-cover"
        />
        <div className="w-[170px] h-[170px] rounded-full overflow-hidden absolute bottom-0 left-20 translate-y-1/2">
          <RenderImageError
            defaultImage={IBuildLogo.src}
            image={supplier?.logo || ""}
            width={170}
            height={170}
            title="logo"
            className="w-[170] h-[170] object-cover"
          />
        </div>
      </div>
      <div className="pt-28 lg:pt-5 lg:pl-[300px]">
        <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:justify-between items-center">
          <div>
            <div className="flex flex-row gap-3 mb-2">
              {getRangeAddress(supplier?.addresses, false).map((add, idx) => {
                if (idx < 2) {
                  return (
                    <span
                      key={idx}
                      className="flex gap-2 text-text-color font-normal text-base"
                    >
                      <LocationIcon className="fill-text-color" />
                      {add}
                    </span>
                  );
                } else {
                  return (
                    <span
                      key={idx}
                      className="flex gap-2 text-text-color font-normal text-base"
                    >
                      <LocationIcon className="fill-text-color" />
                      +3
                    </span>
                  );
                }
              })}
            </div>
            <h1 className="font-semibold text-[28px] text-text-color leading-[125%] line-clamp-1">
              {supplier?.name || ""}
            </h1>
          </div>

          <button
            className="flex flex-row items-center gap-3 px-8 py-3 bg-primary-color rounded"
            onClick={handleClickPhone}
          >
            <PhoneIcon className="fill-white" />
            <span className="text-white text-base font-normal">
              {!token ? "Đăng nhập để xem thông tin" : supplier?.phone || ""}
            </span>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 mt-8 gap-y-3">
          <div className="flex flex-row gap-2 line-clamp-1">
            <ShopIcon className="" />
            <span>Sản phẩm</span>
            <span>{FormatNumber(supplier?.products || 0)}</span>
          </div>
          <div className="flex flex-row gap-2 line-clamp-1">
            <SupervisionIcon className="" />
            <span>Người theo dõi</span>
            <span>{FormatNumber(supplier?.followers || 0)}</span>
          </div>
          <div className="flex flex-row gap-2 line-clamp-1">
            <DateRangeIcon className="" />
            <span>Ngày tham gia</span>
            <span>
              {supplier?.participation_date
                ? moment(supplier.participation_date).format("DD/MM/YYYY")
                : "Không rõ"}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-14 custom-width-tab">
        <Tabs
          defaultActiveKey={currentTab}
          centered
          items={TABS_NAME}
          onChange={handleOnchangeTab}
          tabBarStyle={{
            width: "500px",
          }}
        />
      </div>
      {currentTab === "1" && supplier?.id && (
        <SupplierInformation supplierId={supplier?.id} supplier={supplier} />
      )}
      {currentTab === "2" && supplier?.id && (
        <AllProducts supplierId={supplier.id} />
      )}
      {currentTab === "3" && supplier?.id && (
        <GeneralIntroduction
          aboutSupplier={supplier.about}
          supplierId={supplier.id}
        />
      )}
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
