import { useState } from "react";
import Button from "../ui/Button";
import classes from "@/components/fronting/FrontingForm.module.css";

const FrontingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    borrower: "",
    yourBankName: "",
    globalCommitment: 0.0,
    globalFundedLoans: 0.0,
    globalLettersOfCredit: 0.0,
    lcIssuer: false,
    swinglineLender: false,
    swinglineSublimit: 0.0,
    lcSublimit: 0.0,
    shareOfGlobal: 0.0,
    issuedLCs: 0.0,
    fundedSwinglines: 0.0
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData); // passes formData to the parent component (Fronting Page)
  };

  return (
    <form className={classes.frontingForm} onSubmit={handleSubmit}>
      <div className={classes.formControl}>
        <label htmlFor="globalCommitment">Global Commitment:</label>
        <input
          type="text"
          id="globalCommitment"
          name="globalCommitment"
          placeholder="Global Commitment"
          value={formData.globalCommitment}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="globalFundedLoans">Global Funded Loans:</label>
        <input
          type="text"
          id="globalFundedLoans"
          name="globalFundedLoans"
          value={formData.globalFundedLoans}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="globalLettersOfCredit">Global Letters of Credit:</label>
        <input
          type="text"
          id="globalLettersOfCredit"
          name="globalLettersOfCredit"
          value={formData.globalLettersOfCredit}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="swinglineSublimit">Swingline Sublimit:</label>
        <input
          type="text"
          id="swinglineSublimit"
          name="swinglineSublimit"
          value={formData.swinglineSublimit}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="lcSublimit">LC Sublimit:</label>
        <input
          type="text"
          id="lcSublimit"
          name="lcSublimit"
          value={formData.lcSublimit}
          onChange={handleInputChange}
        />
        </div>
      <div className={classes.formControl}>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default FrontingForm;