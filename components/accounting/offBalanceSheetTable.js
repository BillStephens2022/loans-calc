import { formatAmount } from "../../util/formatting";
import classes from "./offBalanceSheetTable.module.css";

// shows table of off balance sheet (OBS) exposure (unfunded commitments and letters of credit)
// if isPortfolioPage prop is true, it shows the OBS exposure for entire examples portfolio.
// if isPortfolioPage prop is false, it shows the OBS exposure for a specific loan example
// isPortfolioPage prop is determined in the page in which it is rendered.
const OffBalanceSheetTable = ({ unfundedCommitment, lettersOfCredit, isPortfolioPage }) => {
  return (
    <div className={classes.offBalanceSheetTableWrapper}>
    <table className={classes.offBalanceSheet_table}>
      <thead>
        <tr>
          <th>Off Balance Sheet Account</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Unfunded Commitment{isPortfolioPage ? "s" : ""}</td>
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
    </div>
  );
};

export default OffBalanceSheetTable;
