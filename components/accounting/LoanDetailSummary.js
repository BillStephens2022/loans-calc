import { formatAmount } from "@/util/formatting";
import classes from "@/components/accounting/LoanDetailSummary.module.css";

const LoanDetailSummary = ({
  commitment,
  fundedLoan,
  lettersOfCredit,
  unfundedCommitment,
  upfrontFee,
  weightedAverageCost,
  loanMark,
}) => {
  return (
    <table className={classes.loanDetail_summary_table}>
      <thead>
        <tr>
          <th>Total Commitment</th>
          <th>Funded Loans</th>
          <th>Letters of Credit</th>
          <th>Unfunded Commitment</th>
          <th>Upfront Fees</th>
          <th>Weighted Average Cost</th>
          <th>Trader Mark</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>$ {formatAmount(commitment)}</td>
          <td>$ {formatAmount(fundedLoan)}</td>
          <td>$ {formatAmount(lettersOfCredit)}</td>
          <td>$ {formatAmount(unfundedCommitment)}</td>
          <td>$ {formatAmount(upfrontFee)}</td>
          <td>{formatAmount(weightedAverageCost)}%</td>
          <td>{formatAmount(loanMark)}%</td>
        </tr>
      </tbody>
    </table>
  );
};

export default LoanDetailSummary;
