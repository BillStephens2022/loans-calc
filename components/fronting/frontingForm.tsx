import React, { useState, ChangeEvent, FormEvent } from "react";
import { FrontingExampleFormData } from "../../types/types";
import Button from "../ui/button";
import classes from "./frontingForm.module.css";

interface FrontingFormProps {
  onSubmit: (formData: FrontingExampleFormData) => void;
}

// form for the user to entering Fronting examples. Displayed in the pop up Modal component on the Fronting Page.
// captures data entered by user and ultimately submits to database

const initialFormData: FrontingExampleFormData = {
  borrower: "",
  facility: "",
  yourBankName: "",
  globalCommitment: 0.0,
  globalFundedLoans: 0.0,
  globalLettersOfCredit: 0.0,
  yourBankCommitment: 0.0,
  isLCIssuer: true,
  isSwinglineLender: true,
  isNonAccrual: false,
  swinglineSublimit: 0.0,
  swinglinesFundedByYourBank: 0.0,
  lcSublimit: 0.0,
  lcsIssuedByYourBank: 0.0
};

const FrontingForm: React.FC<FrontingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FrontingExampleFormData>(initialFormData);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    let newValue: string | number | boolean = value;

    if (type === "checkbox") {
      newValue = checked;
    } else if (name === "borrower" || name === "yourBankName" || name === "facility") {
      newValue = value; // Treat as string, no need to parse
    } else {
      // Parse numeric values to remove commas and convert to float
      newValue = type === "text" ? parseFloat(value.replace(/,/g, "")) : value;
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const formatNumberInput = (value: string) => {
    // Regex to add comma separators for thousands
    return value.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

const resetFormValues = () => {
  setFormData(initialFormData);
}

  return (
    <form className={classes.frontingForm} onSubmit={handleSubmit}>
     
      {Object.entries(initialFormData).map(([key, value], index) => {
        if (
          (key === "swinglineSublimit" ||
            key === "swinglinesFundedByYourBank") &&
          !formData.isSwinglineLender
        ) {
          return null; // Don't render these fields if isSwinglineLender is not checked
        }

        if (
          (key === "lcSublimit" || key === "lcsIssuedByYourBank") &&
          !formData.isLCIssuer
        ) {
          return null; // Don't render these fields if isLCIssuer is not checked
        }
        return (
          <div key={key} className={classes.formControl}>
            <label htmlFor={key}>
              {
                key
                  .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camelCase words
                  .replace(
                    /(^|\s)(lc)([a-z])/i,
                    (match, p1, p2, p3) => p1 + "LC" + p3.toUpperCase()
                  ) // Capitalize "lc"
                  .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize first letter
              }
              :{" "}
            </label>
            {typeof value === "boolean" ? (
              <input
                type="checkbox"
                id={key}
                name={key}
                checked={formData[key as keyof FrontingExampleFormData] as boolean}
                onChange={handleInputChange}
              />
            ) : (
              <div className={classes.input_span_group}>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={formData[key as keyof FrontingExampleFormData] as string | number}
                  onChange={handleInputChange}
                />
                {/* rendering formatted values only for boxes that accept numbers, first two input values are for
                borrower and yourBankName which are strings, so don't need to show formatted value */}
                {index >= 2 && (
                  <span className={classes.formattedValueSpan}>
                    Formatted Value:{" "}
                    {formatNumberInput((formData[key as keyof FrontingExampleFormData] as number).toString())}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
      <div className={classes.formControl}>
        {/* Submits form data to the database */}
        <Button type="submit" className="m_half_formSubmitButton">Submit</Button>
        {/* Button resets the form values to the initial state */}
        <Button type="button" className="m_half_formSubmitButton" onClick={resetFormValues}>Reset Values</Button>
      </div>
    </form>
  );
};

export default FrontingForm;
