import { ImArrowLeft, ImArrowRight } from "react-icons/im";
import { formatAmount } from "../../util/formatting";
import classes from "./journalEntryTable.module.css";


// show table of journal entries retrieved from database
const JournalEntryTable = ({ journalEntries, debitTotal, creditTotal }) => {

  return (
    <div>
    <div className={classes.journalEntryTableWrapper}>
    <table className={classes.journalEntry_table}>
      <thead>
        <tr className={classes.tableRow_header}>
          <th className={classes.tableCell}>Account</th>
          <th className={classes.tableCell}>High Level Category</th>
          <th className={classes.tableCell}>Category</th>
          <th className={classes.tableCell}>Acctg</th>
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
            <td className={classes.tableCell}>{entry.accounting}</td>
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
    
    </div>
    {/* Note: below will only be rendered if screen size is too small to fit width - controlled with CSS media query display property */}
    <p className={classes.scrollText}><ImArrowLeft /> Scroll <ImArrowRight /></p>
</div>
  );
};

export default JournalEntryTable;
