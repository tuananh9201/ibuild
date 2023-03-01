import {
  arrowBackIos,
  filterIcon,
  logo,
  menuIcon,
  searchIcon,
} from "@/constants/images";
import { Drawer } from "antd";
import useUser from "lib/hooks/user";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import UserAvatar from "./avatar";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const menus = [
  {
    name: "Sản phẩm",
    href: "/san-pham",
  },
  {
    name: "Mẫu thiết kế",
    href: "/mau-thiet-ke",
  },
  {
    name: "Văn bản pháp lý",
    href: "/van-ban-phap-ly",
  },
];
const pathsShowBackButton = ["/"];
const MainHeader = () => {
  const router = useRouter();
  const { user } = useUser();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const currentPath = router.pathname;
  const [openMenu, setOpenMenu] = useState(false);
  const headerClass = currentPath === "/" ? "" : "header-border";
  const isHidden = pathsShowBackButton.includes(router.pathname);
  const handleClickBack = () => {
    router.back();
  };
  return (
    <div className={`main-header ${headerClass}`}>
      <div className="header-nav">
        <div className="headerLeft">
          {isHidden ? null : (
            <div onClick={() => handleClickBack()} className="nav_navigate">
              {" "}
              <Image src={arrowBackIos} alt="" />
            </div>
          )}

          <Link href="/" className="logo">
            <Image src={logo} alt="IBUILD" />
          </Link>
          <div
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
            className="toggle-button hidden-lg"
          >
            <Image src={menuIcon} alt="" />
          </div>
          {/* <div className="headerSearch">
            <div className="search-icon">
              <Image src={searchIcon} alt="" />
            </div>
            <input type="text" placeholder="Bạn đang muốn tìm gì?" />
          </div> */}
        </div>
        <div className="menu">
          <div className="menu-items">
            {menus.map((menu, idx) => (
              <Link
                key={idx}
                href={menu.href}
                className={`menu-item ${
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
              <span className="wrap-menu">
                <Link href="/dang-ky" className="menu-item">
                  Đăng ký <div className="bottom-menu"></div>
                </Link>
                /
                <Link href="/dang-nhap" className="menu-item">
                  Đăng nhập
                  <div className="bottom-menu"></div>
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="search-mobile">
        <div className="header-search-mobile">
          <div className="search-icon">
            <Image src={searchIcon} alt="" />
          </div>
          <input type="text" placeholder="Bạn đang muốn tìm gì?" />
        </div>
        <div className="icon-filter">
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
