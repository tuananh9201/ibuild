import React from "react";
import Image from "next/image";
import { facebookIcon } from "@/constants/images";
import { signInWithProvider } from "utils/firebase";

type Props = {};

const FacebookLoginButton = (props: Props) => {
  const handleClick = async () => {
    const user = await signInWithProvider("facebook");
    console.log(user);
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
