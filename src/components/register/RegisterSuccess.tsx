import React, { useEffect } from "react";
import Image from "next/image";
import { signUpSuccess } from "@/constants/images";
import { useRouter } from "next/router";
type Props = {};

const RegisterSuccess = (props: Props) => {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push({
        pathname: "/",
      });
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

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
