import classes from "@/components/ui/Button.module.css";



const Button = ({ children, type, onClick, className }) => {
    

    return (
        <button className={`${classes.button} ${classes[className]}`} type={type} onClick={onClick}>{children}</button>
    );
}

export default Button;