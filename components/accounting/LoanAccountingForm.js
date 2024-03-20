import { useState } from "react";
import classes from "@/components/accounting/LoanAccountingForm.module.css";

const LoanAccountingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    commitment: 0.0,
    fundedLoan: 0.0,
    lettersOfCredit: 0.0,
    upfrontFee: 0.0,
    loanMark: 0.0
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
          type="text"
          id="commitment"
          name="commitment"
          placeholder="Total Commitment"
          value={formData.commitment}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="fundedLoan">Total funded:</label>
        <input
          type="text"
          id="fundedLoan"
          name="fundedLoan"
          value={formData.fundedLoan}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="lettersOfCredit">Total Letters of Credit:</label>
        <input
          type="text"
          id="lettersOfCredit"
          name="lettersOfCredit"
          value={formData.lettersOfCredit}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="upfrontFee">Upfront fee:</label>
        <input
          type="text"
          id="upfrontFee"
          name="upfrontFee"
          value={formData.upfrontFee}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="loanMark">Loan Mark (i.e. 99.5, 97, etc):</label>
        <input
          type="text"
          id="loanMark"
          name="loanMark"
          value={formData.loanMark}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoanAccountingForm;
