import { motion } from "framer-motion";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: Props) {
  return (
    <>
      <Head>
        <title>IBUILD</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="max-w-[1440px] mx-auto my-0 flex h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
