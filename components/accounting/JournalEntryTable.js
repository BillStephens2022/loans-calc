import { formatAmount } from "@/util/formatting";
import classes from "@/components/accounting/JournalEntryTable.module.css";

const JournalEntryTable = ({ journalEntries, debitTotal, creditTotal }) => {

  return (
    <table className={classes.journalEntry_table}>
      <thead>
        <tr className={classes.tableRow_header}>
          <th className={classes.tableCell}>Account</th>
          <th className={classes.tableCell}>High Level Category</th>
          <th className={classes.tableCell}>Category</th>
          <th
            className={`${classes.tableCell} ${classes.tableCellAmountHeader}`}
          >
            Debit
          </th>
          <th
            className={`${classes.tableCell} ${classes.tableCellAmountHeader}`}
          >
            Credit
          </th>
          <th
            className={`${classes.tableCell} ${classes.tableCellAmountHeader}`}
          >
            Calculation
          </th>
        </tr>
      </thead>
      <tbody>
        {journalEntries.map((entry, index) => (
          entry.amount !== 0 && (
          <tr key={index} className={classes.tableRow}>
            <td className={classes.tableCell}>{entry.account}</td>
            <td className={classes.tableCell}>{entry.highLevelCategory}</td>
            <td className={classes.tableCell}>{entry.category}</td>
            <td className={`${classes.tableCell} ${classes.tableCellAmounts}`}>
              {entry.isDebit ? formatAmount(entry.amount) : ""}
            </td>
            <td className={`${classes.tableCell} ${classes.tableCellAmounts}`}>
              {!entry.isDebit ? formatAmount(entry.amount) : ""}
            </td>
            <td>{entry.calculationText}</td>
          </tr>
          )
        ))}
        <tr className={classes.tableRow}>
          <td className={classes.tableCell}>
            <strong>Total Debits/(Credits)</strong>
          </td>
          <td className={classes.tableCell}></td>
          <td className={classes.tableCell}></td>
          <td className={`${classes.tableCell} ${classes.tableCellAmounts}`}>
            <strong>{formatAmount(debitTotal)}</strong>
          </td>
          <td className={`${classes.tableCell} ${classes.tableCellAmounts}`}>
            <strong>{formatAmount(creditTotal)}</strong>
          </td>
          <td className={classes.tableCell}></td>
        </tr>
      </tbody>
    </table>
  );
};

export default JournalEntryTable;
