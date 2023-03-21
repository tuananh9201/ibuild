import * as React from "react";

import { LoadingComponent } from "@/components/common";

interface IIbuildButtonProps {
  prefix: React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  isLoading?: boolean;
  onClick?: () => void;
}

const IbuildButton: React.FunctionComponent<IIbuildButtonProps> = ({
  prefix,
  disabled = false,
  type = "button",
  isLoading,
  onClick,
}) => {
  return (
    <button
      className={`w-full h-12 text-base font-medium flex justify-center items-center bg-primary-color rounded-lg text-white disabled:hover:cursor-not-allowed  ${
        isLoading ? "bg-[#d4d1d1]" : ""
      }`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {isLoading ? <LoadingComponent /> : <span>{prefix}</span>}
    </button>
  );
};

export default IbuildButton;
