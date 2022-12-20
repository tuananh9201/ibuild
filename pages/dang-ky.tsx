import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import OnBoardLayout from "@/components/onboard-layout";
import Image from "next/image";
import { backIcon, logo } from "@/constants/images";
import Link from "next/link";
const EmptyPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Đăng ký</title>
      </Head>
      <div className="left-signup"></div>
      <div className="right-signin">
        <div className="right-signin-container">
          <div className="right-signin-container-nav">
            <Image src={backIcon} alt="" />
          </div>
          <div className="right-signin-container-content">
            <div className="heading">
              <div className="logo">
                <Image src={logo} alt="" />
              </div>
              <div className="welcome">Tạo tài khoản</div>
            </div>
            <div className="group-input">
              <div className="mb-4">
                <label htmlFor="username" className="form-label">
                  Tên đăng nhập
                </label>
                <input
                  className="form-control"
                  id="username"
                  placeholder="Nhập tên đăng nhập"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Mật khẩu <span className="field-required">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirm-password" className="form-label">
                  Nhập lại mật khẩu <span className="field-required">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm-password"
                  placeholder="Nhập mật khẩu"
                />
              </div>
            </div>
            <div className="group-action">
              <button className="ibuild-btn signin">Đăng ký</button>
              <div className="register-link">
                <span className="have-account">Bạn đã có tài khoản?</span>
                <Link href="/dang-ky" className="register-now">
                  Đăng nhập ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
EmptyPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <OnBoardLayout>{page}</OnBoardLayout>
    </>
  );
};
export default EmptyPage;
