import { useState } from "react";

const LoanCalcs = () => {
  const [commitment, setCommitment] = useState();
  const [fundedLoan, setFundedLoan] = useState();
  const [upfrontFees, setUpfrontFees] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const unfundedCommitment = commitment - fundedLoan;
    console.log("======= BALANCE SHEET ===========");
    console.log("CR. Cash", -fundedLoan + upfrontFees);
    console.log("DR. Loan", fundedLoan);
    console.log("CR. DEFERRED FEES", -upfrontFees);

    console.log("======= OFF BALANCE SHEET ===========");
    console.log("unfunded commitment: ", unfundedCommitment);
  };

  return (
    <div>
      <h1>Loan Journal Entries</h1>
      <h2>Enter Loan Details and submit to see simulated journal entries</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="commitment">commitment:</label>
            <input
              type="text"
              id="commitment"
              name="commitment"
              value={commitment || ""}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) {
                  setCommitment(value);
                }
              }}
            />
          </div>
          <div>
            <label htmlFor="fundedloan">total funded:</label>
            <input
              type="text"
              id="fundedloan"
              name="fundedloan"
              value={fundedLoan || ""}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) {
                  setFundedLoan(value);
                }
              }}
            />
          </div>
          <div>
            <label htmlFor="upfrontfees">upfront fees:</label>
            <input
              type="text"
              id="upfrontfees"
              name="upfrontfees"
              value={upfrontFees || ""}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) {
                  setUpfrontFees(value);
                }
              }}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default LoanCalcs;
