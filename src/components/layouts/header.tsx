import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import UserAvatar from "./avatar";
import useUser from "src/lib/hooks/user";
import { arrowBackIos, logo, menuIcon } from "@/constants/images";
import { setToken } from "src/lib/api/api";
import { login } from "src/store/features/auth/auth";
import { RootState } from "src/store/store";
const menus = [
  {
    name: "Sản phẩm",
    href: "/san-pham",
    role: ["user", "expert"],
    isActive: [
      "/chi-tiet-san-pham/[slug]",
      "/san-pham",
      "/san-pham/[slug]",
      "/tim-kiem",
      "/tim-kiem-nhom-san-pham",
      "/danh-sach-nha-cung-cap/[slug]",
    ],
  },
  {
    name: "Mẫu thiết kế",
    href: "/mau-thiet-ke",
    role: ["user", "expert"],
    isActive: [],
  },
  {
    name: "Thông tin xây dựng",
    href: "/thong-tin-xay-dung",
    role: ["user", "expert"],
    isActive: [],
  },
  {
    name: "Văn bản pháp lý",
    href: "/van-ban-phap-ly",
    role: ["user", "expert"],
    isActive: [],
  },
];
const pathsShowBackButton = ["/"];
const MainHeader = () => {
  const router = useRouter();
  const { user } = useUser();
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const currentPath = router.pathname;
  const [openMenu, setOpenMenu] = useState(false);
  const isHidden = pathsShowBackButton.includes(router.pathname);
  const handleClickBack = () => {
    router.back();
  };
  const autoLogin = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setToken(token);
      dispatch(login(token));
    }
  };
  useEffect(() => {
    autoLogin();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const userRole = user?.user_type || "user";
  const menusByUser = menus.filter((m) => m.role.find((r) => r === userRole));

  return (
    <div className="flex flex-row justify-between p-4 sticky top-0 right-0 left-0 z-30 lg:shadow-none lg:pt-4 lg:pr-5 lg:pb-4 lg:pl-5 lg:py-4 lg:px-14 gap-4 bg-white dark:bg-black dark:text-white w-full border-b shadow lg:border-none">
      <div className="flex flex-row justify-between items-center gap-4 w-full">
        <div className="flex flex-row gap-4 items-center justify-between w-full lg:w-fit">
          {isHidden ? null : (
            <div
              onClick={() => handleClickBack()}
              className="hidden w-4 h-4 hover:cursor-pointer"
            >
              {" "}
              <Image src={arrowBackIos} alt="" />
            </div>
          )}

          <Link href="/" className="max-w-[90px] max-h-[24px]">
            <Image src={logo} alt="IBUILD" />
          </Link>
          <div
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
            className="lg:hidden hover:cursor-pointer flex justify-center items-center"
          >
            <Image src={menuIcon} alt="" />
          </div>
        </div>
        <nav className="hidden lg:block">
          <ul className="w-full flex gap-8 items-center">
            {menusByUser.map((menu, idx) => (
              <li
                key={idx}
                className={`flex flex-col items-center group font-roboto font-normal text-base text-[#343434] ${
                  menu.isActive.includes(currentPath) ? "active" : ""
                }`}
              >
                <Link
                  className="font-normal hover:font-medium hover:text-primary-color group-[.active]:text-primary-color group-[.active]:font-medium"
                  href={menu.href}
                >
                  {menu.name}
                </Link>
                <div className="dot bg-transparent h-[2px] group-hover:bg-primary-color group-[.active]:bg-primary-color w-6 group-hover:rounded"></div>
              </li>
            ))}
            {user && accessToken ? (
              <UserAvatar user={user} />
            ) : (
              <React.Fragment>
                <li
                  className={`flex flex-col items-center group font-roboto font-normal text-base text-[#343434]`}
                >
                  <Link
                    href="/dang-ky"
                    className="font-normal hover:font-medium hover:text-primary-color group-[.active]:text-primary-color group-[.active]:font-medium"
                  >
                    Đăng ký
                  </Link>
                  <div className="dot bg-transparent h-[2px] group-hover:bg-primary-color group-[.active]:bg-primary-color w-6 group-hover:rounded"></div>
                </li>
                <li className="-mr-7 -ml-8">/</li>
                <li
                  className={`flex flex-col items-center group font-roboto font-normal text-base text-[#343434]`}
                >
                  <Link
                    href="/dang-nhap"
                    className="font-normal hover:font-medium hover:text-primary-color group-[.active]:text-primary-color group-[.active]:font-medium"
                  >
                    Đăng nhập
                  </Link>
                  <div className="dot bg-transparent h-[2px] group-hover:bg-primary-color group-[.active]:bg-primary-color w-6 group-hover:rounded"></div>
                </li>
              </React.Fragment>
            )}
          </ul>
        </nav>
      </div>
      <Drawer
        onClose={() => {
          setOpenMenu(false);
        }}
        closable={false}
        title=""
        placement="right"
        destroyOnClose
        open={openMenu}
        width="100vw-44px"
      >
        <ul className="min-w-[276px] pl-7">
          {menus.map((menu) => (
            <li key={menu.href} className="mb-6 last:mb-0">
              <span
                className="text-text-color font-normal text-base leading-[150%] items-center"
                onClick={() => {
                  router.push(menu.href);
                  setOpenMenu(false);
                }}
              >
                {menu.name}
              </span>
            </li>
          ))}
          <li className="mb-6 last:mb-0">
            <span className="flex items-center">
              <Link
                href="/dang-ky"
                className="text-text-color font-normal text-base leading-[150%] items-center"
              >
                Đăng ký{" "}
              </Link>
              <span className="px-2 py-0"> / </span>
              <Link
                href="/dang-nhap"
                className="text-text-color font-normal text-base leading-[150%] items-center"
              >
                Đăng nhập
              </Link>
            </span>
          </li>
        </ul>
      </Drawer>
    </div>
  );
};

export default MainHeader;
