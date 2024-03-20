import classes from "@/components/ui/Button.module.css";

const Button = ({ children, type }) => {
    return (
        <button className={classes.button} type={type}>{children}</button>
    );
}

export default Button;