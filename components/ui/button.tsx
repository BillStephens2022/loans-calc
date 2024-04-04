import React from "react";
import classes from "./button.module.css";

interface ButtonProps {
  children?: React.ReactNode;
  type?: "button" | "submit";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  onClick,
  className,
}) => {
  // Combine the default button class with the custom className if provided
  const computedClassName = className
    ? `${classes.button} ${classes[className]}`
    : classes.button;

  return (
    <button className={computedClassName} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
