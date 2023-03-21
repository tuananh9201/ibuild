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
      key="form-success"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5,
      }}
    >
      <div className="w-full text-center flex justify-center items-center">
        <Image
          src={ChangePassSuccessImage}
          alt="thay doi mat khau thanh cong"
          priority={true}
          className="w-fit"
        />
      </div>
      <p className="mt-6 font-normal text-base text-[#333333] leading-6">
        Tài khoản đã thành công đổi mật khẩu hiện tại, do đó bạn có thể tiếp tục
        vào Tài khoản iBuild của bạn. Để đảm bảo an toàn vui lòng không cung cấp
        mật khẩu này cho bất kì ai.
      </p>
    </motion.div>
  );
}
