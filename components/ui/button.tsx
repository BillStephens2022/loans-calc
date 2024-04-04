import React from "react";
import classes from "./button.module.css";

interface ButtonProps {
    children?: React.ReactNode,
    type?: "button" | "submit";
    onClick?: () => void;
    className?: string;
  }
  

// reusable button component

const Button: React.FC<ButtonProps> = ({ children, type, onClick, className }) => {
    const computedClassName = className ? classes[className] : ''; // Provides a default value for className

    return (
        
        <button className={`${classes.button} ${classes[computedClassName]}`} type={type} onClick={onClick}>{children}</button>
    );
}

export default Button;
