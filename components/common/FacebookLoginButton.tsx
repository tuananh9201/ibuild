import React from "react";
import Image from "next/image";
import { facebookIcon } from "@/constants/images";
import { signInWithProvider } from "utils/firebase";
import { authWithSocialAccessToken } from "lib/api/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { setToken } from "lib/api/api";
import { login } from "store/features/auth/auth";

type Props = {};

const FacebookLoginButton = (props: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClick = async () => {
    const result = await signInWithProvider("facebook");
    if (!result) {
      message.error("Lỗi");
      return;
    }
    const accessToken = result;
    if (!accessToken) return;
    return await handleLoginWithSocialToken(accessToken, "google.com");
  };
  const handleLoginWithSocialToken = async (
    accessToken: string,
    authProvider: string
  ) => {
    const res = await authWithSocialAccessToken({
      accessToken,
      authProvider,
    });
    const data = res?.data;
    if (!data) return;
    const access_token = data?.data?.access_token;
    if (access_token) {
      setToken(access_token);
      dispatch(login(access_token));

      setTimeout(() => {
        let redirectPath = router.query?.redirect || "/";
        if (typeof redirectPath === "object") {
          redirectPath = "/";
        }
        let currentQuery = router.query;
        delete currentQuery["redirect"];
        router.push({
          pathname: redirectPath,
          query: currentQuery,
        });
      }, 1000);
    }
  };
  return (
    <button
      onClick={() => handleClick()}
      className="sign-other-btn sign-facebook"
    >
      <Image src={facebookIcon} alt="" /> Đăng nhập bằng tài khoản Facebook
    </button>
  );
};
export default FacebookLoginButton;
