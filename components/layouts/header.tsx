import { logo, menuIcon } from "@/constants/images";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const MainHeader = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const headerClass = currentPath === "/" ? "" : "header-border";
  return (
    <div className={`main-header ${headerClass}`}>
      <Link href="/" className="logo">
        <Image src={logo} alt="IBUILD" />
      </Link>
      <div className="menu">
        <div className="menu-items">
          <Link href="/san-pham" className="menu-item">
            Sản phẩm
            <div className="bottom-menu"></div>
          </Link>
          <Link href="van-ban-phap-ly" className="menu-item">
            Văn bản pháp lý
            <div className="bottom-menu"></div>
          </Link>
          <Link href="/thong-tin-xay-dung" className="menu-item">
            Thông tin xây dựng
            <div className="bottom-menu"></div>
          </Link>
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
        <div
          className="toggle-button"
          data-bs-toggle="offcanvas"
          data-bs-target="#menuDrawer"
          aria-controls="offcanvasNavbar"
        >
          <Image src={menuIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
