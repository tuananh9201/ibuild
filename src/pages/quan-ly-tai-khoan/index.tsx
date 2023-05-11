import { ReactElement, useState } from "react";
import Head from "next/head";

import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/main-layout";
import { Tabs } from "antd";
import { AccountInfo } from "@/components/account";

const TABS_NAME = [
  {
    key: "1",
    label: "Thông tin tài khoản",
  },
  {
    key: "2",
    label: "Danh sách theo dõi",
  },
  {
    key: "3",
    label: "Đổi mật khẩu",
  },
];

const QuanLyTaiKhoan: NextPageWithLayout = () => {
  const [currentTab, setCurrentTab] = useState("1");

  const handleOnchangeTab = (key: string) => {
    setCurrentTab(key);
  };

  return (
    <>
      <Head>
        <title>Quản lý tài khoản</title>
      </Head>
      <section className="">
        <div className="mt-14 custom-position-tab">
          <h2 className="text-text-color font-medium text-2xl mb-6">
            Quản lý tài khoản
          </h2>
          <Tabs
            defaultActiveKey={currentTab}
            centered
            items={TABS_NAME}
            onChange={handleOnchangeTab}
            tabPosition="right"
          />
        </div>
        <div>{currentTab === "1" && <AccountInfo />}</div>
      </section>
    </>
  );
};

QuanLyTaiKhoan.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default QuanLyTaiKhoan;
