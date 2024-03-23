import { formatAmount } from "../../util/formatting";
import classes from "./offBalanceSheetTable.module.css";

const OffBalanceSheetTable = ({ unfundedCommitment, lettersOfCredit }) => {
  return (
    <table className={classes.offBalanceSheet_table}>
      <thead>
        <tr>
          <th>Off Balance Sheet Account</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Unfunded Commitment</td>
          <td>{formatAmount(unfundedCommitment)}</td>
        </tr>
        <tr>
          <td>Letters of Credit / Guarantees</td>
          <td>{formatAmount(lettersOfCredit)}</td>
        </tr>
        <tr>
          <td><strong>Total Off Balance Sheet Exposure</strong></td>
          <td><strong>{formatAmount(unfundedCommitment + lettersOfCredit)}</strong></td>
        </tr>
      </tbody>
    </table>
  );
};

export default OffBalanceSheetTable;
