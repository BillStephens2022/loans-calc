import { useState } from "react";
import Button from "../ui/Button";
import classes from "@/components/fronting/FrontingForm.module.css";

const initialFormData = {
  borrower: "",
  yourBankName: "",
  globalCommitment: 0.0,
  globalFundedLoans: 0.0,
  globalLettersOfCredit: 0.0,
  yourBankCommitment: 0.0,
  lcIssuer: false,
  swinglineLender: false,
  swinglineSublimit: 0.0,
  lcSublimit: 0.0,
  lcsIssuedByYourBank: 0.0,
  swinglinesFundedByYourBank: 0.0,
};

const FrontingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    const newValue = type === "checkbox" ? checked : formatNumberInput(value);
 
    setFormData({ ...formData, [name]: newValue });
  };

  const formatNumberInput = (value) => {
    // Regex to add comma separators for thousands
    return value.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // onSubmit(formData);
  };

  return (
    <form className={classes.frontingForm} onSubmit={handleSubmit}>
      {Object.entries(initialFormData).map(([key, value]) => (
        <div key={key} className={classes.formControl}>
          <label htmlFor={key}>{key
              .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase words
              .replace(/(^|\s)(lc)([a-z])/i, (match, p1, p2, p3) => p1 + 'LC' + p3.toUpperCase()) // Capitalize "lc"
              .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize first letter
            }: </label>
          {typeof value === "boolean" ? (
            <input
              type="checkbox"
              id={key}
              name={key}
              checked={formData[key]}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleInputChange}
            />
          )}
        </div>
      ))}
      <div className={classes.formControl}>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default FrontingForm;
