interface InputProps {
  placeHolder: string;
}

const Input = ({ placeHolder }: InputProps) => {
  return (
    <input
      type="text"
      className="outline-none border border-solid border-[#e6e6e6] rounded-lg h-[46px] placeholder:text-[#333333] p-4"
      placeholder={placeHolder}
    />
  );
};

export default Input;
