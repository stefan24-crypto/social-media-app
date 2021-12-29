import React from "react";
import classes from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type,
}) => {
  return (
    <button
      className={`${classes.btn} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
