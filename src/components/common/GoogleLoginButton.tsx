import { googleIcon } from "@/constants/images";
import { message } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { setToken } from "src/lib/api/api";
import { authWithSocialAccessToken } from "src/lib/api/auth";
import { login } from "src/store/features/auth/auth";
import { signInWithProvider } from "src/utils/firebase";

type Props = {};

const GoogleLoginButton = (props: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClick = async () => {
    const result = await signInWithProvider("google");
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
      className="mb-6 ibuild-btn bg-[#fff] border border-solid border-[#314eac] w-full flex-row text-primary-color font-medium"
    >
      <Image src={googleIcon} alt="" /> Đăng nhập bằng tài khoản Google
    </button>
  );
};
export default GoogleLoginButton;
