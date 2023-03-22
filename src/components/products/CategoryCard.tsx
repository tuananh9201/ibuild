import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
type Props = {
  category: {
    id: number;
    image: any;
    name: string;
    slug: string;
  };
};

const CategoryCard = (props: Props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileInView={{ rotate: 0 }}
      initial={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1.5,
      }}
      className="isolate relative hover:cursor-pointer"
    >
      <Link href={`/san-pham/${props.category.slug}`}>
        <Image
          src={props.category.image}
          alt={props.category.name}
          priority
          className="w-full h-full rounded-lg lg:rounded-2xl"
        />
        <div className="name absolute top-7 left-10 right-7 w-5/6">
          <div className="flex flex-row justify-between items-center">
            <motion.h3
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -30 }}
              className="text-white font-medium text-2xl font-roboto"
            >
              {props.category.name}
            </motion.h3>
            <div className="icon w-10 h-10 bg-white rounded-full flex justify-center items-center">
              <svg
                width="35"
                height="34"
                viewBox="0 0 35 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.1204 22.6274L21.0188 14.7291L21.0188 21.6304C21.0188 22.182 21.4713 22.6345 22.0229 22.6345C22.5744 22.6345 23.0199 22.189 23.0199 21.6375L23.0199 12.3178C23.0199 11.7663 22.5744 11.3208 22.0229 11.3208L12.7032 11.3067C12.1517 11.3067 11.7062 11.7521 11.7062 12.3037C11.7062 12.8552 12.1517 13.3007 12.7032 13.3007L19.6046 13.3148L11.7062 21.2132C11.3173 21.6021 11.3173 22.2385 11.7062 22.6274C12.0951 23.0163 12.7315 23.0163 13.1204 22.6274Z"
                  fill="#FF4D14"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
