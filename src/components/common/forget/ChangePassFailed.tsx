import Image from "next/image";

import { OverTurn } from "@/constants/images";
import { useEffect, useState } from "react";
type Props = {
  expires?: number;
};

export default function ChangePassFailed(props: Props) {
  const [timeRemaining, setTimeRemaining] = useState(24 * 60 * 60);
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
  useEffect(() => {
    if (props.expires) {
      setTimeRemaining(props.expires);
    }
  }, [props]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  return (
    <div className="transition delay-150 duration-300 ease-in-out">
      <div className="w-full flex justify-center">
        <Image src={OverTurn} alt="Vượt quá số lần nhập code" priority={true} />
      </div>
      <div className="my-3">
        <p className="w-full text-center">Hãy quay trở lại sau...</p>
        <div className="mt-2 flex justify-center gap-8 font-medium text-xl">
          <div className="hours"> {hours} Giờ </div>
          <div className="minutes">{minutes} Phút</div>
          <div className="seconds">{seconds} Giây</div>
        </div>
      </div>
      <p className="font-normal text-base leading-normal">
        Tài khoản đã thực hiện xác thực quá 3 lần với 3 mã khác nhau! Chúng tôi
        nghi ngờ ai đó đã cố gắng lấy tài khoản của bạn mà không phải bạn. Tài
        khoản của bạn sẽ tạm khóa trong 24 giờ, xin vui lòng liên hệ bộ phận hỗ
        trợ để được trợ giúp.
      </p>
    </div>
  );
}
