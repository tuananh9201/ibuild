import Image from "next/image";
import { logo, addressIcon, phoneIcon, sendIcon } from "@/constants/images";
import { Row, Col, Input } from "antd";
export default function Footer() {
  return (
    <div className="main-footer">
      <Row style={{ width: "100%" }}>
        <Col md={24} lg={8}>
          <div className="info">
            <div className="logo-space">
              <a href="#" className="logo">
                <Image src={logo} alt="IBUILD" />
              </a>
              <span className="desc">
                Lorem Ipsum has been the industry's standard dummy text ever
                since the.
              </span>
            </div>
          </div>
          <div className="addresses">
            <div className="address-icon">
              <Image src={addressIcon} alt="" />
            </div>
            <div className="address-info">
              <div className="desc">
                Trụ sở Hà Nội: Tầng 25, Tòa tháp B, 173 Xuân Thủy, Cầu Giấy, Hà
                Nội, Việt Nam.
              </div>
              <div className="desc">
                Trụ sở HCM: Tầng 3, Số 293 Điện Biên Phủ, Phường 15, Quận Bình
                Thạnh, TP.HCM
              </div>
            </div>
          </div>
          <div className="addresses">
            <div className="address-icon">
              <Image src={addressIcon} alt="" />
            </div>
            <div className="address-info">
              <div className="desc">Trụ sở Hà Nội: (84-4) 3.768.9696</div>
              <div className="desc">Trụ sở HCM: (84-8) 5.404.2168</div>
            </div>
          </div>
          <div className="addresses">
            <div className="address-icon">
              <Image src={phoneIcon} alt="" />
            </div>
            <div className="address-info">
              <div className="desc">Fax: (84-8) 5.404.2188</div>
            </div>
          </div>
        </Col>
        <Col md={24} lg={8}>
          <div className="footer-menu">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sản phẩm
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Văn bản pháp lý
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Thông tin xây dựng
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Đăng ký / Đăng nhập
                </a>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={24} lg={8}>
          <div className="footer-form">
            <div className="input-gr">
              <input placeholder="info@gmail.com" type="text" />
              <div className="icon-send">
                <Image src={sendIcon} alt="" />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <div className="copyright">
        <div className="text">
          Bản quyền thuộc về VDI - Giấy phép số: 134/CP-CBC - Cục báo chí, Bộ
          Thông tin và Truyền thông.
        </div>
      </div>
    </div>
  );
}
