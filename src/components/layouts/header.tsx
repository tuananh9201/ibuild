import {
  arrowBackIos,
  filterIcon,
  logo,
  menuIcon,
  searchIcon,
} from "@/constants/images";
import { Drawer } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "src/lib/api/api";
import useUser from "src/lib/hooks/user";
import { login } from "src/store/features/auth/auth";
import { RootState } from "src/store/store";
import UserAvatar from "./avatar";

const menus = [
  {
    name: "Sản phẩm",
    href: "/san-pham",
    role: ["user", "expert"],
  },
  {
    name: "Mẫu thiết kế",
    href: "/mau-thiet-ke",
    role: ["user"],
  },
  {
    name: "Văn bản pháp lý",
    href: "/van-ban-phap-ly",
    role: ["user", "expert"],
  },
  {
    name: "Thông tin xây dựng",
    href: "/thong-tin-xay-dung",
    role: ["expert"],
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
  const headerClass = currentPath === "/" ? "" : "header-border";
  const isHidden = pathsShowBackButton.includes(router.pathname);
  const handleClickBack = () => {
    router.back();
  };
  // const unAuthorized = useSelector(
  //   (state: RootState) => state.auth.unAuthorized
  // );
  // useEffect(() => {
  //   if (unAuthorized) {
  //     console.log("unAuthorized");
  //   }
  // }, [unAuthorized, router]);
  const autoLogin = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setToken(token);
      dispatch(login(token));
    }
  };
  useEffect(() => {
    autoLogin();
  }, []);
  const userRole = user?.user_type || "user";
  const menusByUser = menus.filter((m) => m.role.find((r) => r === userRole));

  return (
    <div
      className={`flex flex-row justify-between gap-4 bg-[#fff] w-full pt-[56px] pr-5 pb-4 pl-5 border-solid border-[#bfbfbf] border-b lg:px-[60px] lg:py-4 ${
        headerClass
          ? "flex flex-col border-solid border-[#ececec]"
          : "border-b-0"
      }`}
    >
      <div className="flex flex-row justify-between items-center gap-4 bg-[#fff] w-full">
        <div className="w-full lg:w-auto flex flex-row gap-6 items-center justify-between">
          {isHidden ? null : (
            <div
              onClick={() => handleClickBack()}
              className="block lg:hidden w-8 h-8 cursor-pointer"
            >
              {" "}
              <Image src={arrowBackIos} alt="" />
            </div>
          )}

          <Link href="/" className="gap-6 max-w-[90px] max-h-6">
            <Image src={logo} alt="IBUILD" />
          </Link>
          <div
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
            className="flex justify-center items-center cursor-pointer lg:hidden hover:cursor-pointer"
          >
            <Image src={menuIcon} alt="" />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="hidden lg:flex flex-row items-center p-0 gap-8">
            {menusByUser.map((menu, idx) => (
              <Link
                key={idx}
                href={menu.href}
                className={`font-roboto not-italic font-normal text-base leading-[150%] cursor-pointer text-[#343434] no-underline hover:text-primary-color hover:font-medium hover:mb-0 menu-item ${
                  menu.href === currentPath ? "active" : ""
                }`}
              >
                {menu.name}
                <div className="bottom-menu"></div>
              </Link>
            ))}
            {user && accessToken ? (
              <UserAvatar user={user} />
            ) : (
              <span className="flex flex-row items-center gap-2">
                <Link
                  href="/dang-ky"
                  className="font-roboto not-italic font-normal text-base leading-[150%] cursor-pointer text-[#343434] no-underline hover:text-primary-color hover:font-medium hover:mb-0 menu-item"
                >
                  Đăng ký <div className="bottom-menu"></div>
                </Link>
                /
                <Link
                  href="/dang-nhap"
                  className="font-roboto not-italic font-normal text-base leading-[150%] cursor-pointer text-[#343434] no-underline hover:text-primary-color hover:font-medium hover:mb-0 menu-item"
                >
                  Đăng nhập
                  <div className="bottom-menu"></div>
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          headerClass ? "" : "hidden"
        } flex justify-between items-center lg:hidden`}
      >
        <div className="flex items-center py-[10px] pl-[111px] pr-4 gap-2 bg-[#ffffff] border-solid border-[#dddddd] rounder-[4px] w-full max-w-[80%]">
          <div className="min-w-[30px]">
            <Image src={searchIcon} alt="" />
          </div>
          <input
            className="border-none outline-none w-full"
            type="text"
            placeholder="Bạn đang muốn tìm gì?"
          />
        </div>
        <div className="w-[30px] h-[30px] ml-6">
          <Image src={filterIcon} alt="" />
        </div>
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
