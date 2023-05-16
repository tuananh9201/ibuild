import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { ChangePassSuccessImage } from "@/constants/images";
import { Modal } from "@/components/common";

interface ChangeSuccessProps {
  title: string;
}

const ChangeSuccess = ({ title }: ChangeSuccessProps) => {
  const bodyContent = (
    <motion.div>
      <div className="w-full text-center flex justify-center items-center">
        <Image
          src={ChangePassSuccessImage}
          alt={title}
          priority={true}
          className="w-fit"
        />
      </div>
      <p className="mt-6 font-normal text-base text-[#333333] leading-6 text-center">
        {title}
      </p>
    </motion.div>
  );

  return <Modal isOpen body={bodyContent} />;
};

export default memo(ChangeSuccess);
