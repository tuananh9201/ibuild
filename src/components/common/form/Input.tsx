interface InputProps {
  placeHolder: string;
  classNameString?: string;
}

const Input = ({ placeHolder, classNameString }: InputProps) => {
  return (
    <input
      type="text"
      className={`outline-none border border-solid border-[#e6e6e6] rounded-lg h-[46px] placeholder:text-[#333333] p-4 w-full ${
        classNameString ? classNameString : ""
      }`}
      placeholder={placeHolder}
    />
  );
};

export default Input;
