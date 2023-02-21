import React from "react";
import Image from "next/image";
import { googleIcon } from "@/constants/images";
import { signInWithProvider } from "utils/firebase";

type Props = {};

const GoogleLoginButton = (props: Props) => {
  const handleClick = async () => {
    const user = await signInWithProvider("google");
    console.log(user);
  };
  return (
    <button
      onClick={() => handleClick()}
      className="sign-other-btn sign-google"
    >
      <Image src={googleIcon} alt="" /> Đăng nhập bằng tài khoản Google
    </button>
  );
};
export default GoogleLoginButton;
