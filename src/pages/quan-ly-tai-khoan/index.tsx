import { ReactElement, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/main-layout";
import { Tabs } from "antd";
import {
  AccountInfo,
  BecomeExpertModal,
  ChangePassword,
} from "@/components/account";

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
  const router = useRouter();
  const { query } = router;

  const [currentTab, setCurrentTab] = useState("1");
  const [isOpenExpertModal, setIsOpenExpertModal] = useState(false);

  const handleOnchangeTab = (key: string) => {
    setCurrentTab(key);
  };

  const handleUpgradeAccount = () => {
    setIsOpenExpertModal(true);
  };

  useEffect(() => {
    if (!query) return;
    if (query?.tab) {
      setCurrentTab(query.tab as string);
    }
    if (query?.openModal) {
      setIsOpenExpertModal(true);
    }
  }, [query]);

  return (
    <>
      <Head>
        <title>Quản lý tài khoản</title>
      </Head>
      <section className="flex flex-row mt-14">
        <div className="custom-position-tab w-1/4">
          <h2 className="text-text-color font-medium text-2xl mb-6">
            Quản lý tài khoản
          </h2>
          <Tabs
            activeKey={currentTab}
            centered
            items={TABS_NAME}
            onChange={handleOnchangeTab}
            tabPosition="right"
          />
        </div>
        <div className="w-3/4 pt-14">
          {currentTab === "1" && <AccountInfo onClick={handleUpgradeAccount} />}
          {currentTab === "3" && <ChangePassword />}
        </div>

        <BecomeExpertModal
          isOpen={isOpenExpertModal}
          onClose={setIsOpenExpertModal}
        />
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
