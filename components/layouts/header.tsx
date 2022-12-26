import {
  arrowBackIos,
  filterIcon,
  logo,
  menuIcon,
  searchIcon,
} from "@/constants/images";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const menus = [
  {
    name: "Sản phẩm",
    href: "/san-pham",
  },
  {
    name: "Văn bản pháp lý",
    href: "/van-ban-phap-ly",
  },
  {
    name: "Thông tin xây dựng",
    href: "/thong-tin-xay-dung",
  },
];
const MainHeader = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const headerClass = currentPath === "/" ? "" : "header-border";
  console.log("currentPath :", currentPath);

  return (
    <div className={`main-header ${headerClass}`}>
      <div className="header-nav">
        <div className="headerLeft">
          <div className="nav_navigate">
            <Image src={arrowBackIos} alt="" />
          </div>
          <Link href="/" className="logo">
            <Image src={logo} alt="IBUILD" />
          </Link>
          <div
            className="toggle-button hidden-lg"
            data-bs-toggle="offcanvas"
            data-bs-target="#menuDrawer"
            aria-controls="offcanvasNavbar"
          >
            <Image src={menuIcon} alt="" />
          </div>
          <div className="headerSearch">
            <div className="search-icon">
              <Image src={searchIcon} alt="" />
            </div>
            <input type="text" placeholder="Bạn đang muốn tìm gì?" />
          </div>
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
    </div>
  );
};

export default MainHeader;
