import React, { useEffect, useState } from "react";
import Image from "next/image";
import { lockEmail } from "@/constants/images";
import Link from "next/link";

type Props = {
  expires: number;
};

const LockWrongPassword = (props: Props) => {
  const [timeRemaining, setTimeRemaining] = useState(props.expires || 86400);
  // props.expires = 2023-02-21 03:39:01.621610
  // const expireTime = Date.parse(props.expires);
  // const now = new Date();
  // const countDownTime = expireTime - now.getTime();

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Image alt="" src={lockEmail} />
      <div
        style={{
          textAlign: "center",
          marginTop: 24,
          fontSize: 16,
          fontWeight: 400,
        }}
      >
        Hãy quay trở lại sau...
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          fontWeight: 500,
          fontSize: 20,
          color: "#333333",
          margin: "8px 0",
          lineHeight: "150%",
        }}
      >
        <span>{hours} Giờ</span>
        <span>{minutes} Phút</span>
        <span>{seconds} Giây</span>
      </div>
      <div
        style={{
          fontWeight: 400,
          fontSize: 16,
          color: "#333333",
          lineHeight: "150%",
        }}
      >
        Tài khoản đã sai mật khẩu quá 5 lần! Tài khoản tạm khóa trong 24 giờ,
        nếu không thể nhớ được mật khẩu của tài khoản vui lòng sử dụng tính năng{" "}
        <Link href="/quen-mat-khau">Quên mật khẩu</Link>
      </div>
    </div>
  );
};

export default LockWrongPassword;
