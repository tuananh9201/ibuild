import {
  arrowBackIos,
  filterIcon,
  logo,
  menuIcon,
  searchIcon,
} from "@/constants/images";
import { Drawer } from "antd";
import useUser from "src/lib/hooks/user";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserAvatar from "./avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { setToken } from "src/lib/api/api";
import { login } from "src/store/features/auth/auth";

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
    <div className="flex flex-row justify-between pt-14 pr-5 pb-4 pl-5 lg:py-4 lg:px-14 gap-4 bg-white w-full border-b border-solid border-[#bfbfbf] lg:border-none">
      <div className="flex flex-row justify-between items-center gap-4 bg-white w-full">
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
                  menu.href === currentPath ? "active" : ""
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
        <ul className="navbar-nav-mobile">
          {menus.map((menu) => (
            <li key={menu.href} className="nav-item">
              <span
                className="nav-link menu-item"
                onClick={() => {
                  router.push(menu.href);
                  setOpenMenu(false);
                }}
              >
                {menu.name}
              </span>
            </li>
          ))}
          <li className="nav-item">
            <span className="sepec-menu">
              <Link href="/dang-ky" className="nav-link menu-item">
                Đăng ký{" "}
              </Link>
              <span className="spece"> / </span>
              <Link href="/dang-nhap" className="nav-link menu-item">
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
