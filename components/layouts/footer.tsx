import Image from "next/image";
import { logo, addressIcon, phoneIcon, sendIcon } from "@/constants/images";
import { Row, Col, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { ERRORS } from "@/constants/msg";
export default function Footer() {
  const [emailSubcriber, setEmailSubcriber] = useState("");
  const [emailValidateMessages, setEmailValidateMessages] = useState("");
  const handleValidEmail = (email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };
  const onSubmitSubcriber = async () => {
    let emailValidateMessages = "";
    if (emailSubcriber.length === 0) {
      emailValidateMessages = ERRORS.PLEASE_INPUT_EMAIL;
    } else if (!handleValidEmail(emailSubcriber)) {
      emailValidateMessages = ERRORS.MSG008;
    }
    setEmailValidateMessages(emailValidateMessages);
    emailValidateMessages.length === 0 &&
      message.success("Đăng ký theo dõi thành công !");
  };
  const onChangeEmailSubcriberInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setEmailSubcriber(value);
  };
  return (
    <div className="main-footer">
      <Row style={{ width: "100%" }}>
        <Col md={24} lg={8}>
          <div className="info">
            <div className="logo-space">
              <Link href="/" className="logo">
                <Image src={logo} alt="IBUILD" />
              </Link>
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
                <Link href="/ve-chung-toi" className={`nav-link`}>
                  Về chúng tôi
                  <div className="bottom-menu"></div>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/san-pham">
                  Sản phẩm
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Văn bản pháp lý
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Thông tin xây dựng
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={24} lg={8}>
          <div className="footer-form">
            <div className="label">Theo dõi</div>
            <div className="input-gr">
              <input
                value={emailSubcriber}
                onChange={onChangeEmailSubcriberInput}
                placeholder="info@gmail.com"
                type="text"
              />
              <div onClick={onSubmitSubcriber} className="icon-send">
                <Image src={sendIcon} alt="" />
              </div>
            </div>
            <div className="helper">
              {emailValidateMessages ? (
                <span className="error">{emailValidateMessages}</span>
              ) : null}
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
