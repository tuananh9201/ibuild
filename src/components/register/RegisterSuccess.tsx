import React, { useEffect } from "react";
import Image from "next/image";
import { signUpSuccess } from "@/constants/images";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { reset } from "src/store/features/auth/register";
type Props = {
  redirectToLogin?: boolean;
};

const RegisterSuccess = (props: Props) => {
  const dispath = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      const pathRedirect = props?.redirectToLogin ? "/dang-nhap" : "/";
      router.push({
        pathname: pathRedirect,
      });
      setTimeout(() => {
        dispath(reset());
      }, 1000);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [dispath]);

  return (
    <div className="flex flex-col w-full items-center justify-center gap-6">
      <Image alt="" src={signUpSuccess} />
      <div className="font-normal text-base leading-normal">
        Cảm ơn bạn đã tạo tài khoản iBuild. Hãy sử dụng tài khoản này để nghiên
        cứu, tham khảo thông tin và nhiều điều thú vị về xây dựng do iBuild cung
        cấp nhé.
      </div>
    </div>
  );
};

export default RegisterSuccess;
