import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  body: React.ReactElement;
}

const Modal = ({ isOpen, body }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl px-5 lg:h-auto">
          <motion.div
            className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
            initial={{
              opacity: 0,
              scale: 0.75,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                ease: "easeOut",
                duration: 0.4,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.75,
              transition: {
                ease: "easeIn",
                duration: 0.4,
              },
            }}
          >
            <div className="relative p-10 flex-auto">{body}</div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;
