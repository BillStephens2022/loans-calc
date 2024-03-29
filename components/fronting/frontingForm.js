import { useState } from "react";
import Button from "../ui/button";
import classes from "./frontingForm.module.css";

const initialFormData = {
  borrower: "Vandelay Industries",
  facility: "Revolver",
  yourBankName: "Bank of Costanza",
  globalCommitment: 100000000.0,
  globalFundedLoans: 45000000.0,
  globalLettersOfCredit: 22000000.0,
  yourBankCommitment: 18000000.0,
  isLCIssuer: true,
  isSwinglineLender: true,
  isNonAccrual: false,
  swinglineSublimit: 11000000.0,
  swinglinesFundedByYourBank: 3000000.0,
  lcSublimit: 14000000.0,
  lcsIssuedByYourBank: 4000000.0
};

const FrontingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    let newValue = value;

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

  const formatNumberInput = (value) => {
    // Regex to add comma separators for thousands
    return value.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    onSubmit(formData);
  };

const resetFormValues = () => {
  setFormData(initialFormData);
}

  return (
    <form className={classes.frontingForm} onSubmit={handleSubmit}>
      <h4 className={classes.formTitle}>Fronting Example Input Form</h4>
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
                checked={formData[key]}
                onChange={handleInputChange}
              />
            ) : (
              <div className={classes.input_span_group}>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                />
                {/* rendering formatted values only for boxes that accept numbers, first two input values are for
                borrower and yourBankName which are strings, so don't need to show formatted value */}
                {index >= 2 && (
                  <span className={classes.formattedValueSpan}>
                    Formatted Value:{" "}
                    {formatNumberInput(formData[key].toString())}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
      <div className={classes.formControl}>
        <Button type="submit" className="m_half">Submit</Button>
        <Button type="button" className="m_half" onClick={resetFormValues}>Reset Values</Button>
      </div>
    </form>
  );
};

export default FrontingForm;
