import { motion } from "framer-motion";
import Image from "next/image";

import { OverTurn } from "@/constants/images";
import { useEffect, useState } from "react";
type Props = {
  expires?: number;
};

export default function ChangePassFailed(props: Props) {
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
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="mx-0 my-6">
        <Image
          src={OverTurn}
          alt="Vượt quá số lần nhập code"
          priority={true}
          className="mx-auto my-0"
        />
      </div>
      <div style={{ margin: "10px 0" }} className="mx-0 my-[10px]">
        <p className="text-base font-normal leading-6 text-center">
          Hãy quay trở lại sau...
        </p>
        <p className="text-xl font-medium leading-[30px] text-center">
          {hours} Giờ {minutes} Phút {seconds} Giây
        </p>
      </div>
      <p className="text-base font-normal leading-6 text-justify">
        Tài khoản đã thực hiện xác thực quá 3 lần với 3 mã khác nhau!Chúng tôi
        nghi ngờ ai đó đã cố gắng lấy tài khoản của bạn mà không phải bạn. Tài
        khoản của bạn sẽ tạm khóa trong 24 giờ, xin vui lòng liên hệ bộ phận hỗ
        trợ để được trợ giúp.
      </p>
    </motion.div>
  );
}
