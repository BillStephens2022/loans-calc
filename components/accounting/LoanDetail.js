import { formatAmount } from "@/util/formatting";
import classes from "@/components/accounting/LoanDetail.module.css";

const LoanDetail = ({
  commitment,
  fundedLoan,
  lettersOfCredit,
  loanMark,
  unfundedCommitment,
  upfrontFee,
  weightedAverageCost,
  cash,
  fundedMTM,
  unfundedMTM,
}) => {
  console.log("cash", cash);

  const journalEntries = [
    { account: "Cash", category: "Assets", amount: cash, isDebit: cash > 0 },
    {
      account: "Loan Principal",
      category: "Assets",
      amount: fundedLoan,
      isDebit: true,
    },
    {
      account: "Loan Discount/Premium",
      category: "Assets",
      amount: (-upfrontFee / commitment) * fundedLoan,
      isDebit: upfrontFee < 0,
    },
    {
      account: "Deferred Fees",
      category: "Liabilities",
      amount: (-upfrontFee / commitment) * (commitment - fundedLoan),
      isDebit: upfrontFee < 0,
    },
    {
      account: "Funded Loan MTM",
      category: "Assets",
      amount: fundedMTM,
      isDebit: fundedMTM > 0,
    },
    {
      account: "Funded Loan MTM P&L",
      category: "P&L",
      amount: -fundedMTM,
      isDebit: fundedMTM < 0,
    },
    {
      account: "Unfunded Commitment MTM",
      category: "P&L",
      amount: unfundedMTM,
      isDebit: unfundedMTM > 0,
    },
    {
      account: "Unfunded Commitment MTM P&L",
      category: "P&L",
      amount: -unfundedMTM,
      isDebit: unfundedMTM < 0,
    },
  ];

  // Calculate totals for debit and credit columns
  const debitTotal = journalEntries.reduce(
    (total, entry) => (entry.isDebit ? total + entry.amount : total),
    0
  );
  const creditTotal = journalEntries.reduce(
    (total, entry) => (!entry.isDebit ? total + entry.amount : total),
    0
  );

  return (
    <div className={classes.loanDetail_container}>
      <div className={classes.loanDetail_summary}>
        <h2>Loan Detail Summary:</h2>
        <p>Total Commitment: $ {formatAmount(commitment)}</p>
        <p>Funded Loan: $ {formatAmount(fundedLoan)}</p>
        <p>Letters Of Credit: $ {formatAmount(lettersOfCredit)}</p>
        <p>Unfunded Commitment: $ {formatAmount(unfundedCommitment)}</p>
        <p>Upfront Fees: $ {formatAmount(upfrontFee)}</p>
        <p>Weighted Avg Cost: {weightedAverageCost}%</p>
        <p>Trader Mark: {loanMark}%</p>
      </div>

      <div className={classes.loanDetail_journalEntries}>
        <h2>Journal Entries</h2>
        <h3>Balance Sheet</h3>

        <table className="journalEntry_table">
          <thead>
            <tr>
              <th className={classes.tableCell}>Account</th>
              <th className={classes.tableCell}>Account Category</th>
              <th className={`${classes.tableCell} ${classes.tableCellAmountHeader}`}>Debit</th>
              <th className={`${classes.tableCell} ${classes.tableCellAmountHeader}`}>Credit</th>
            </tr>
          </thead>
          <tbody>
            {journalEntries.map((entry, index) => (
              <tr key={index}>
                <td className={classes.tableCell}>{entry.account}</td>
                <td className={classes.tableCell}>{entry.category}</td>
                <td className={`${classes.tableCell} ${classes.tableCellAmounts}`}>{entry.isDebit ? formatAmount(entry.amount) : ""}</td>
                <td className={`${classes.tableCell} ${classes.tableCellAmounts}`}>{!entry.isDebit ? formatAmount(entry.amount) : ""}</td>
              </tr>
            ))}
            <tr>
              <td className={classes.tableCell}>
                <strong>Total Debits/(Credits)</strong>
              </td>
              <td className={classes.tableCell}></td>
              <td className={`${classes.tableCell} ${classes.tableCellAmounts}`}>
                <strong>{formatAmount(debitTotal)}</strong>
              </td>
              <td className={`${classes.tableCell} ${classes.tableCellAmounts}`}>
                <strong>{formatAmount(creditTotal)}</strong>
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Off Balance Sheet</h3>
        <p>Unfunded Loan Commitment: {formatAmount(unfundedCommitment)}</p>
        <p>Guarantees/Letters of Credit: {formatAmount(lettersOfCredit)}</p>
        <p>
          Total Off Balance Sheet Exposure:{" "}
          {formatAmount(lettersOfCredit + unfundedCommitment)}
        </p>
      </div>
    </div>
  );
};

export default LoanDetail;
