import * as React from "react";

interface IIbuildButtonProps {
  prefix: React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
}

const IbuildButton: React.FunctionComponent<IIbuildButtonProps> = ({
  prefix,
  disabled = false,
  type = "button",
}) => {
  return (
    <button className="ibuild-btn" disabled={disabled} type={type}>
      {prefix}
    </button>
  );
};

export default IbuildButton;
