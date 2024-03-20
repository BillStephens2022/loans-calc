import { formatAmount } from "@/util/formatting";

const LoanDetail = ({
  commitment,
  fundedLoan,
  loanMark,
  unfundedCommitment,
  upfrontFee,
  weightedAverageCost,
  cash,
  fundedMTM,
  unfundedMTM
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
      amount: (-upfrontFee / commitment) * unfundedCommitment,
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
    <div>
      <h2>Loan Details:</h2>
      <p>Total Commitment: $ {formatAmount(commitment)}</p>
      <p>Funded Loan: $ {formatAmount(fundedLoan)}</p>
      <p>Unfunded Commitment: $ {formatAmount(unfundedCommitment)}</p>
      <p>Upfront Fees: $ {formatAmount(upfrontFee)}</p>
      <p>Weighted Avg Cost: {weightedAverageCost}%</p>
      <p>Trader Mark: {loanMark}%</p>
      <h2>Journal Entries</h2>
      <h3>Balance Sheet</h3>

      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Account Category</th>
            <th>Debit</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {journalEntries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.account}</td>
              <td>{entry.category}</td>
              <td>{entry.isDebit ? formatAmount(entry.amount) : ""}</td>
              <td>{!entry.isDebit ? formatAmount(entry.amount) : ""}</td>
            </tr>
          ))}
          <tr>
            <td>
              <strong>Total Debits/(Credits)</strong>
            </td>
            <td></td>
            <td>
              <strong>{formatAmount(debitTotal)}</strong>
            </td>
            <td>
              <strong>{formatAmount(creditTotal)}</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Off Balance Sheet</h3>
      <p>Unfunded Loan Commitment: {formatAmount(unfundedCommitment)}</p>
    </div>
  );
};

export default LoanDetail;
