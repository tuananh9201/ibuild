import { ReactNode } from "react";

interface DropdownWrapperProps {
  children: ReactNode;
}

const DropdownWrapper = ({ children }: DropdownWrapperProps) => {
  return <>{children}</>;
};

export default DropdownWrapper;
