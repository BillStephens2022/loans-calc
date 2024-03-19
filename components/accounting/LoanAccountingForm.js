import { useState } from "react";

const LoanAccountingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    commitment: 0.0,
    fundedLoan: 0.0,
    upfrontFee: 0.0,
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="commitment">Commitment:</label>
        <input
          type="text"
          id="commitment"
          name="commitment"
          value={formData.commitment}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="fundedLoan">Total funded:</label>
        <input
          type="text"
          id="fundedLoan"
          name="fundedLoan"
          value={formData.fundedLoan}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="upfrontFee">Upfront fee:</label>
        <input
          type="text"
          id="upfrontFee"
          name="upfrontFee"
          value={formData.upfrontFee}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoanAccountingForm;
