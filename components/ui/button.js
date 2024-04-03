import classes from "./button.module.css";

// reusable button component

const Button = ({ children, type, onClick, className }) => {
    return (
        <button className={`${classes.button} ${classes[className]}`} type={type} onClick={onClick}>{children}</button>
    );
}

export default Button;
