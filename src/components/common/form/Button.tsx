import { useState } from "react";

interface ButtonProps {
  title: string;
  icon?: Function;
  isBookMark?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const Button = ({
  title,
  icon,
  isBookMark,
  isLoading,
  onClick,
}: ButtonProps) => {
  const [addedFavorite, setAddedFavorite] = useState(isBookMark);

  const Component = icon;

  const handleClick = () => {
    if (!onClick) return;
    onClick();
  };

  return (
    <button
      className={`flex items-center justify-center px-[23px] py-[10px] rounded border border-solid border-primary-color text-primary-color gap-[6px] hover:bg-primary-color transition group ${
        addedFavorite ? "bg-primary-color" : ""
      } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
      onClick={handleClick}
    >
      {Component && (
        <Component
          className={`fill-primary-color group-hover:fill-white ${
            addedFavorite ? "fill-white" : ""
          }`}
        />
      )}
      <span
        className={`font-roboto not-italic font-medium text-base leading-[150%] group-hover:text-white ${
          addedFavorite ? "text-white" : ""
        }`}
      >
        {title}
      </span>
    </button>
  );
};

export default Button;
