import { formatAmount } from "@/util/formatting";

const LoanDetail = ({ commitment, fundedLoan, unfundedCommitment, upfrontFee, weightedAverageCost }) => {
  return (
    <div>
      <h2>Loan Details:</h2>
      <p>Total Commitment: $ {formatAmount(commitment)}</p>
      <p>Funded Loan: $ {formatAmount(fundedLoan)}</p>
      <p>Unfunded Commitment: $ {formatAmount(unfundedCommitment)}</p>
      <p>Upfront Fees: $ {formatAmount(upfrontFee)}</p>
      <p>Weighted Avg Cost: {weightedAverageCost}%</p>
    </div>
  );
};

export default LoanDetail;
