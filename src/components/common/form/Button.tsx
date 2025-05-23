import { useState } from "react";

interface ButtonProps {
  title?: string;
  icon?: Function;
  isBookMark?: boolean;
  isLoading?: boolean;
  overClass?: string;
  onClick?: () => void;
}

const Button = ({
  title,
  icon,
  isBookMark,
  isLoading,
  overClass,
  onClick,
}: ButtonProps) => {
  const [addedFavorite, setAddedFavorite] = useState(isBookMark);

  const Component = icon;

  const handleClick = () => {
    if (!onClick) return;
    setAddedFavorite((prev) => !prev);
    onClick();
  };

  return (
    <button
      className={`flex items-center justify-center py-[10px] rounded border border-solid border-primary-color text-primary-color gap-[6px] hover:bg-primary-color transition group ${
        addedFavorite ? "bg-primary-color" : ""
      } ${isLoading ? "cursor-not-allowed opacity-50" : ""} ${
        overClass ? overClass : ""
      }`}
      onClick={handleClick}
    >
      {Component && (
        <Component
          className={`fill-primary-color group-hover:fill-white w-5 h-5 ${
            addedFavorite ? "fill-white" : ""
          }`}
        />
      )}
      {title && (
        <span
          className={`font-roboto not-italic font-medium text-base leading-[150%] group-hover:text-white ${
            addedFavorite ? "text-white" : ""
          }`}
        >
          {title}
        </span>
      )}
    </button>
  );
};

export default Button;
