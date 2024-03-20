import FrontingForm from "@/components/fronting/FrontingForm";
import classes from "@/pages/Fronting/Fronting.module.css";

const Fronting = () => {
  return (
    <main className={classes.fronting_main}>
      <h1 className={classes.fronting_header}>Fronting Risk</h1>
      <div className={classes.formContainer}>
        <FrontingForm />
      </div>
    </main>
  );
};

export default Fronting;
