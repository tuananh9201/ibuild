import { motion } from "framer-motion";
import Image from "next/image";

import { ChangePassSuccessImage } from "@/constants/images";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ChangePassSuccess() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => {
      clearTimeout(t);
    };
  }, [router]);

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
          src={ChangePassSuccessImage}
          alt="thay doi mat khau thanh cong"
          priority={true}
          className="mx-auto my-0"
        />
      </div>
      <p className="text-base font-normal leading-6 text-justify">
        Tài khoản đã thành công đổi mật khẩu hiện tại, do đó bạn có thể tiếp tục
        vào Tài khoản iBuild của bạn. Để đảm bảo an toàn vui lòng không cung cấp
        mật khẩu này cho bất kì ai.
      </p>
    </motion.div>
  );
}
