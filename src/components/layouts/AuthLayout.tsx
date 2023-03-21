import { AnimatePresence } from "framer-motion";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: Props) {
  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <div className="max-w-[1440px] mx-auto my-0 flex h-screen">
        {children}
      </div>
    </AnimatePresence>
  );
}
