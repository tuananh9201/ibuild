import { addressIcon, faxIcon, logo, sendIcon } from "@/constants/images";
import { ERRORS } from "@/constants/msg";
import { message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [emailSubcriber, setEmailSubcriber] = useState("");
  const [emailValidateMessages, setEmailValidateMessages] = useState("");
  const handleValidEmail = (email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };
  const onSubmitSubcriber = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    <div className="flex flex-col justify-start py-4 px-6 lg:py-6 gap-4">
      <div className="logo-space flex flex-col">
        <Image className="ml-2 lg:ml-32" src={logo} alt="IBUILD" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full mt-4">
        <div className="info pr-6 ml-2 lg:pl-32">
          <div>
            <div className="address flex justify-start py-0 gap-2 mb-4 last:mb-0">
              <div className="address-icon w-6 h-6">
                <Image src={addressIcon} alt="" />
              </div>
              <div className="address-info">
                <p className="mb-2 font-normal text-sm last:mb-0">
                  Trụ sở Hà Nội: Tầng 25, Tòa tháp B, 173 Xuân Thủy, Cầu Giấy,
                  Hà Nội, Việt Nam.
                </p>
                <p className="mb-2 font-normal text-sm last:mb-0">
                  Liên hệ: (84-4) 3.768.9696
                </p>
              </div>
            </div>
            <div className="address flex justify-start py-0 gap-2 mb-4 last:mb-0">
              <div className="address-icon w-6 h-6">
                <Image src={addressIcon} alt="" />
              </div>
              <div className="address-info">
                <p className="mb-2 font-normal text-sm last:mb-0">
                  Trụ sở HCM: Tầng 3, Số 293 Điện Biên Phủ, Phường 15, Quận Bình
                  Thạnh, TP.HCM
                </p>
                <p className="mb-2 font-normal text-sm last:mb-0">
                  Liên hệ: (84-8) 5.404.2168
                </p>
              </div>
            </div>
            <div className="address flex justify-start py-0 gap-2 mb-4 last:mb-0">
              <div className="address-icon w-6 h-6">
                <Image src={faxIcon} alt="" />
              </div>
              <div className="address-info">
                <p className="mb-2 font-normal text-sm last:mb-0">
                  Fax: (84-8) 5.404.2188
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-menus mt-4 px-2 lg:px-16 lg:mt-0">
          <ul className="font-normal font-roboto">
            <li className="mb-4 last:mb-0">
              <Link
                className="text-base text-[#343434] hover:text-primary-color"
                href="/ve-chung-toi"
              >
                Về chúng tôi
              </Link>
            </li>
            <li className="mb-4 last:mb-0">
              <Link
                className="text-base text-[#343434] hover:text-primary-color"
                href="/san-pham"
              >
                Sản phẩm
              </Link>
            </li>
            <li className="mb-4 last:mb-0">
              <Link
                className="text-base text-[#343434] hover:text-primary-color"
                href="/van-ban-phap-ly"
              >
                Văn bản pháp lý
              </Link>
            </li>
            <li className="mb-4 last:mb-0">
              <Link
                className="text-base text-[#343434] hover:text-primary-color"
                href="/thong-tin-xay-dung"
              >
                Thông tin xây dựng
              </Link>
            </li>
          </ul>
        </div>
        <div className="subcribers">
          <form
            onSubmit={onSubmitSubcriber}
            className="mt-4 lg:mt-2 p-2 lg:pr-12 "
          >
            <label htmlFor="email" className="font-normal text-base">
              Theo dõi thông tin
            </label>
            <div className="mt-2 w-full h-11 flex justify-between bg-white border border-solid border-[#999999] rounded-lg">
              <div className="p-1">
                <input
                  value={emailSubcriber}
                  onChange={onChangeEmailSubcriberInput}
                  placeholder="info@gmail.com"
                  type="text"
                  className="w-full border-none h-full p-2 placeholder:font-normal placeholder:text-sm placeholder:text-[#717171]"
                />
              </div>
              <button
                type="submit"
                className="icon w-14 h-11 bg-primary-color flex items-center justify-center rounded hover:cursor-pointer"
              >
                <Image src={sendIcon} alt="" />
              </button>
            </div>
            <div className="helper mt-2">
              {emailValidateMessages ? (
                <span className="text-red-500 font-normal text-base">
                  {emailValidateMessages}
                </span>
              ) : null}
            </div>
          </form>
        </div>
      </div>

      {/* <Row style={{ width: "100%" }}>
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
      </Row> */}
      <div className="w-full flex items-center py-4 px-6 lg:pb-4 gap-4">
        <div className="w-full flex flex-row justify-center items-start p-0 font-normal text-xs text-center">
          Bản quyền thuộc về VDI - Giấy phép số: 134/CP-CBC - Cục báo chí, Bộ
          Thông tin và Truyền thông.
        </div>
      </div>
    </div>
  );
}
