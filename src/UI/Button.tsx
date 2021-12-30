import React from "react";
import classes from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type,
  disabled
}) => {
  return (
    <button
      className={`${classes.btn} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
