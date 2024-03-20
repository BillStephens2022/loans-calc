import { useState } from "react";
import Button from "../ui/Button";
import classes from "@/components/accounting/LoanAccountingForm.module.css";

const LoanAccountingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    commitment: 0.00,
    fundedLoan: 0.00,
    lettersOfCredit: 0.00,
    upfrontFee: 0.00,
    loanMark: 0.00
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData); // passes formData to the parent component (Accounting Page)
  };

  return (
    <form className={classes.accountingForm} onSubmit={handleSubmit}>
      <div className={classes.formControl}>
        <label htmlFor="commitment">Commitment:</label>
        <input
          type="number"
          id="commitment"
          name="commitment"
          placeholder="Total Commitment"
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
        <label htmlFor="lettersOfCredit">Total Letters of Credit:</label>
        <input
          type="number"
          id="lettersOfCredit"
          name="lettersOfCredit"
          value={formData.lettersOfCredit}
          onChange={handleInputChange}
        />
      </div>
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
      <div className={classes.formControl}>
        <label htmlFor="loanMark">Loan Mark (i.e. 99.5, 97, etc):</label>
        <input
          type="number"
          id="loanMark"
          name="loanMark"
          step={.01}
          value={formData.loanMark}
          onChange={handleInputChange}
        />
        </div>
      <div className={classes.formControl}>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default LoanAccountingForm;
