import { formatAmount } from "@/util/formatting";

const LoanDetail = ({ commitment, fundedLoan, unfundedCommitment, upfrontFee, weightedAverageCost, cash }) => {
  return (
    <div>
      <h2>Loan Details:</h2>
      <p>Total Commitment: $ {formatAmount(commitment)}</p>
      <p>Funded Loan: $ {formatAmount(fundedLoan)}</p>
      <p>Unfunded Commitment: $ {formatAmount(unfundedCommitment)}</p>
      <p>Upfront Fees: $ {formatAmount(upfrontFee)}</p>
      <p>Weighted Avg Cost: {weightedAverageCost}%</p>
      <h2>Journal Entries</h2>
      <h3>Balance Sheet</h3>
      <p>{cash < 0 ? "Credit" : "Debit"} Cash:  {formatAmount(cash)}</p>
      <p>Debit Loan Principal: {formatAmount(fundedLoan)}</p>
      <p>{upfrontFee < 0 ? "Debit" : "Credit"} Loan Discount/Premium: {formatAmount(-upfrontFee)}</p>
      <h3>Off Balance Sheet</h3>
      <p>Unfunded Loan Commitment: {formatAmount(unfundedCommitment)}</p>
    </div>
  );
};

export default LoanDetail;
