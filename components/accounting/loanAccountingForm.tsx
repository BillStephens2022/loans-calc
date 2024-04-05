import React, { useState, ChangeEvent, FormEvent } from "react";
import { LoanAccountingExampleFormData } from "../../types/types";
import Button from "../ui/button";
import classes from "./loanAccountingForm.module.css";


// form where user enters an example loan transaction.  Form is shown in the Modal component on the Accounting page.
// form is ultimately submitted via the API to the MongoDB database using the LoanAccountingExample model.
interface LoanAccountingFormProps {
  onSubmit: (formData: LoanAccountingExampleFormData) => void;
}

const LoanAccountingForm: React.FC<LoanAccountingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<LoanAccountingExampleFormData>({
    borrower: "",
    facility: "",
    commitment: 0.0,
    fundedLoan: 0.0,
    lettersOfCredit: 0.0,
    accounting: "",
    isOrigination: false,
    weightedAverageCost: 100.0,
    upfrontFee: 0.0,
    loanMark: 0.0,
  });

  // const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value, type } = event.target;

  //   // Parse number values
  //   let parsedValue: string | number = value;

  //   if (type === "number") {
  //     parsedValue = parseFloat(value);
  //   }

  //   //Update state based on field type
  //   if (type === "radio" && name === "isOrigination") {
  //     const newValue = value === "true";
  //     console.log("Is Origination:", newValue);
  //     setFormData((prevState) => ({ ...prevState, [name]: newValue }));
  //     // if isOrigination is true, calculate weightedAverageCost based on the upfront fees
  //     if (newValue) {
  //       const weightedAverageCost =
  //         (1 - (formData.upfrontFee?? 0) / formData.commitment) * 100;
  //       console.log("Weighted Average Cost:", weightedAverageCost);
  //       setFormData((prevState) => ({
  //         ...prevState,
  //         weightedAverageCost: weightedAverageCost,
  //       }));
  //     } else {
  //       // if isOrigination is false, reset weightedAverageCost to default
  //       setFormData((prevState) => ({
  //         ...prevState,
  //         weightedAverageCost: 100.0,
  //       }));
  //     }
  //   } else if (name === "upfrontFee") {
  //     // Recalculate weightedAverageCost when upfrontFee changes
  //     const weightedAverageCost = (1 - parsedValue / formData.commitment) * 100;
  //     console.log("Weighted Average Cost:", weightedAverageCost);
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       upfrontFee: parsedValue, // Update upfrontFee
  //       weightedAverageCost: weightedAverageCost,
  //     }));
  //   } else {
  //     setFormData((prevState) => ({ ...prevState, [name]: parsedValue }));
  //   }
  // };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;

    // Parse number values
    let parsedValue: string | number = value;
    if (type === "number") {
      parsedValue = parseFloat(value);
    }

    // Update state
    setFormData(prevState => ({
      ...prevState,
      [name]: parsedValue
    }));
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = value === "true";
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
    if (name === "isOrigination") {
      const weightedAverageCost = newValue
        ? (1 - (formData.upfrontFee ?? 0)/ formData.commitment) * 100
        : 100.0;
      setFormData(prevState => ({
        ...prevState,
        weightedAverageCost
      }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData); // passes formData to the parent component (Accounting Page)
  };

  return (
    <form className={classes.accountingForm} onSubmit={handleSubmit}>
    
      <div className={classes.formControl}>
        <label htmlFor="borrower">Borrower Name:</label>
        <input
          type="text"
          id="borrower"
          name="borrower"
          value={formData.borrower}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="facility">Facility Name:</label>
        <input
          type="text"
          id="facility"
          name="facility"
          value={formData.facility}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="commitment">Commitment:</label>
        <input
          type="number"
          id="commitment"
          name="commitment"
          value={formData.commitment}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="fundedLoan">Total Funded:</label>
        <input
          type="number"
          id="fundedLoan"
          name="fundedLoan"
          value={formData.fundedLoan}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="lettersOfCredit">Total LC's:</label>
        <input
          type="number"
          id="lettersOfCredit"
          name="lettersOfCredit"
          value={formData.lettersOfCredit}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="accounting">Accounting:</label>
        <select
          id="accounting"
          name="accounting"
          value={formData.accounting}
          onChange={handleInputChange}
          required
          className={classes.selectInput}
        >
          <option className={classes.option} value="">Select accounting</option>
          <option className={classes.option} value="HFI">HFI - Held For Investment</option>
          <option className={classes.option} value="HFS">HFS - Held For Sale</option>
          <option className={classes.option} value="FVO">FVO - Fair Value Option</option>
          
        </select>
      </div>
      <div className={classes.formControl}>
        <fieldset>
          <legend className={classes.legend}>Purchase / Origination:</legend>
          <label>
            <input
              type="radio"
              name="isOrigination"
              value="false"
              checked={!formData.isOrigination}
              onChange={handleRadioChange}
              className={classes.radioInput}
            />
            Purchase
          </label>
          <label>
            <input
              type="radio"
              name="isOrigination"
              value="true"
              checked={formData.isOrigination}
              onChange={handleRadioChange}
              className={classes.radioInput}
            />
            Origination
          </label>
        </fieldset>
      </div>
      {!formData.isOrigination && (
        <div className={classes.formControl}>
          <label htmlFor="weightedAverageCost">Purchase Price:</label>
          <input
            type="number"
            id="weightedAverageCost"
            name="weightedAverageCost"
            value={formData.weightedAverageCost}
            onChange={handleInputChange}
            required
          />
        </div>
      )}
      {formData.isOrigination && (
        <div className={classes.formControl}>
          <label htmlFor="upfrontFee">Upfront Fee:</label>
          <input
            type="number"
            id="upfrontFee"
            name="upfrontFee"
            value={formData.upfrontFee}
            onChange={handleInputChange}
          />
        </div>
      )}
      <div className={classes.formControl}>
        <label htmlFor="loanMark">Loan Mark (i.e. 99.5, 97, etc):</label>
        <input
          type="number"
          id="loanMark"
          name="loanMark"
          step={0.01}
          value={formData.loanMark}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formControl}>
        <Button className="formSubmitButton" type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default LoanAccountingForm;
