import { addressIcon, logo, phoneIcon, sendIcon } from "@/constants/images";
import { ERRORS } from "@/constants/msg";
import { Col, message, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
    <div className="flex flex-col items-start p-0 gap-4">
      <Row style={{ width: "100%" }}>
        <Col md={24} lg={8}>
          <div className="lg:pt-[56px] lg:pr-6 lg:pb-4 lg:pl-[120px] px-6 py-4">
            <div className="flex flex-col">
              <Link href="/" className="logo">
                <Image src={logo} alt="IBUILD" />
              </Link>
              <span className="mt-2 font-normal text-[14px] leading-[calc(21/14)]">
                Lorem Ipsum has been the industry's standard dummy text ever
                since the.
              </span>
            </div>
          </div>
          <div className="flex items-start px-6 py-0 lg:pl-[120px] gap-2">
            <div className="w-6 h-6">
              <Image src={addressIcon} alt="" />
            </div>
            <div>
              <div className="mb-2 font-normal text-[14px] leading-[calc(21/14)] last:mb-0">
                Trụ sở Hà Nội: Tầng 25, Tòa tháp B, 173 Xuân Thủy, Cầu Giấy, Hà
                Nội, Việt Nam.
              </div>
              <div className="mb-2 font-normal text-[14px] leading-[calc(21/14)] last:mb-0">
                Trụ sở HCM: Tầng 3, Số 293 Điện Biên Phủ, Phường 15, Quận Bình
                Thạnh, TP.HCM
              </div>
            </div>
          </div>
          <div className="flex items-start px-6 py-0 lg:pl-[120px] gap-2">
            <div className="w-6 h-6">
              <Image src={addressIcon} alt="" />
            </div>
            <div>
              <div className="mb-2 font-normal text-[14px] leading-[calc(21/14)] last:mb-0">
                Trụ sở Hà Nội: (84-4) 3.768.9696
              </div>
              <div className="mb-2 font-normal text-[14px] leading-[calc(21/14)] last:mb-0">
                Trụ sở HCM: (84-8) 5.404.2168
              </div>
            </div>
          </div>
          <div className="flex items-start px-6 py-0 lg:pl-[120px] gap-2">
            <div className="w-6 h-6">
              <Image src={phoneIcon} alt="" />
            </div>
            <div>
              <div className="mb-2 font-normal text-[14px] leading-[calc(21/14)] last:mb-0">
                Fax: (84-8) 5.404.2188
              </div>
            </div>
          </div>
        </Col>
        <Col md={24} lg={8}>
          <div className="px-6 py-4 lg:pt-[115px] lg:pr-0 lg:pb-0 lg:pl-[50px]">
            <ul>
              <li className="mb-4">
                <Link href="/ve-chung-toi" className={`nav-link`}>
                  Về chúng tôi
                  <div className="bottom-menu"></div>
                </Link>
              </li>
              <li className="mb-4">
                <Link className="nav-link" href="/san-pham">
                  Sản phẩm
                </Link>
              </li>
              <li className="mb-4">
                <Link className="nav-link" href="#">
                  Văn bản pháp lý
                </Link>
              </li>
              <li className="mb-4 mb-0">
                <Link className="nav-link" href="#">
                  Thông tin xây dựng
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={24} lg={8}>
          <div className="mx-6 my-0 lg:mx-[50px] lg:my-[115px] p-0">
            <div className="mb-2">Theo dõi</div>
            <div className="w-full max-w-[278px] flex flex-row items-center justify-between gap-[10px] bg-[#ffffff] border-solid border-[#dddddd] border-[1px] rounded-[4px]">
              <input
                value={emailSubcriber}
                onChange={onChangeEmailSubcriberInput}
                placeholder="info@gmail.com"
                type="text"
                className="border-none ml-4"
              />
              <div
                onClick={onSubmitSubcriber}
                className="w-[60px] h-[43px] bg-primary-color flex flex-row items-center justify-center rounded-[4px] hover:cursor-pointer"
              >
                <Image src={sendIcon} alt="" />
              </div>
            </div>
            <div className="mb-2">
              {emailValidateMessages ? (
                <span className="error">{emailValidateMessages}</span>
              ) : null}
            </div>
          </div>
        </Col>
      </Row>
      <div className="px-6 py-4 lg:px-0 lg:pt-0 lg:pb-4 w-full flex items-start justify-center gap-4">
        <div className="flex flex-row justify-center items-start p-0 not-italic font-normal text-[12px] leading-[150%]">
          Bản quyền thuộc về VDI - Giấy phép số: 134/CP-CBC - Cục báo chí, Bộ
          Thông tin và Truyền thông.
        </div>
      </div>
    </div>
  );
}
