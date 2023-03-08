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
      className="ibuild-btn"
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {isLoading ? <LoadingComponent /> : <span>{prefix}</span>}
    </button>
  );
};

export default IbuildButton;
