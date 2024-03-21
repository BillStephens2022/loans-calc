import PageHeader from "@/components/PageHeader";
import FrontingForm from "@/components/fronting/FrontingForm";
import classes from "@/pages/Fronting/Fronting.module.css";

const Fronting = () => {
  return (
    <main className={classes.fronting_main}>
      <PageHeader>Fronting Risk</PageHeader>
      <div className={classes.formContainer}>
        <FrontingForm />
      </div>
    </main>
  );
};

export default Fronting;
