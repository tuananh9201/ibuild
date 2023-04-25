import { ChangeEvent } from "react";

interface InputProps {
  value?: string;
  placeHolder: string;
  setValue?: Function;
  classNameString?: string;
}

const Input = ({
  value,
  setValue,
  placeHolder,
  classNameString,
}: InputProps) => {
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(e.target.value);
  };

  return (
    <input
      type="text"
      value={value || ""}
      className={`outline-none border border-solid border-[#e6e6e6] rounded-lg h-[46px] placeholder:text-[#333333] placeholder:font-normal placeholder:text-sm placeholder:leading-[150%] p-4 w-full ${
        classNameString ? classNameString : ""
      }`}
      placeholder={placeHolder}
      onChange={changeValue}
    />
  );
};

export default Input;
