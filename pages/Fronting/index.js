import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import FrontingForm from "@/components/fronting/FrontingForm";
import classes from "@/pages/Fronting/Fronting.module.css";


const Fronting = () => {
  
  return (
    <main className={classes.fronting_main}>
      <PageHeader>Fronting Risk</PageHeader>
      <h2 className={classes.fronting_subheader}>Enter details about a loan to calculate potential Fronting Exposure</h2>
      <div className={classes.formContainer}>
        <FrontingForm />
      </div>
    </main>
  );
};

export default Fronting;
