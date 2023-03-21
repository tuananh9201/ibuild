import { lockEmail } from "@/constants/images";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  expires: number;
};

const LockWrongPassword = (props: Props) => {
  const [timeRemaining, setTimeRemaining] = useState(props.expires || 86400);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  return (
    <div className="flex flex-col">
      <Image alt="" src={lockEmail} />
      <div className="text-center mt-6 text-base font-normal">
        Hãy quay trở lại sau...
      </div>
      <div className="w-full flex justify-center gap-6 font-medium text-xl text-[#333333] mx-0 my-2 leading-[150%]">
        <span>{hours} Giờ</span>
        <span>{minutes} Phút</span>
        <span>{seconds} Giây</span>
      </div>
      <div className="font-normal text-base text-[#333333] leading-[150%]">
        Tài khoản đã sai mật khẩu quá 5 lần! Tài khoản tạm khóa trong 24 giờ,
        nếu không thể nhớ được mật khẩu của tài khoản vui lòng sử dụng tính năng{" "}
        <Link href="/quen-mat-khau">Quên mật khẩu</Link>
      </div>
    </div>
  );
};

export default LockWrongPassword;
