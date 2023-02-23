import { motion } from "framer-motion";
import Image from "next/image";

import { OverTurn } from "@/constants/images";

type Props = {};

export default function ChangePassFailed({}: Props) {
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
      <div className="change-password-success">
        <Image src={OverTurn} alt="Vượt quá số lần nhập code" priority={true} />
      </div>
      <div style={{ margin: "10px 0" }}>
        <p className="change-password-noty">Hãy quay trở lại sau...</p>
        <p className="change-password-noty-hours">23 Giờ 59 Phút 59 Giây</p>
      </div>
      <p className="change-password-desc">
        Tài khoản đã thực hiện xác thực quá 3 lần với 3 mã khác nhau!Chúng tôi
        nghi ngờ ai đó đã cố gắng lấy tài khoản của bạn mà không phải bạn. Tài
        khoản của bạn sẽ tạm khóa trong 24 giờ, xin vui lòng liên hệ bộ phận hỗ
        trợ để được trợ giúp.
      </p>
    </motion.div>
  );
}
