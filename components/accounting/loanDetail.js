import JournalEntryTable from "./journalEntryTable";
import OffBalanceSheetTable from "./offBalanceSheetTable";
import BalanceSheetSummary from "./balanceSheetSummary";
import classes from "./loanDetail.module.css";

const LoanDetail = ({
  journalEntries,
  lettersOfCredit,
  accounting,
  unfundedCommitment,
}) => {

  // calculate total based on condition (i.e. sum all entries where entry is a debit, or entry is to an asset account, etc).
  const calculateTotal = (journalEntries, condition) =>
    journalEntries.reduce((total, entry) => (condition(entry) ? total + entry.amount : total), 0);

  // Calculate totals for debit and credit columns
  const debitTotal = calculateTotal(journalEntries, entry => entry.isDebit);
  const creditTotal = calculateTotal(journalEntries, entry => !entry.isDebit);
  const assetsTotal = calculateTotal(journalEntries, entry => entry.highLevelCategory === "Assets");
  const liabilitiesTotal = calculateTotal(journalEntries, entry => entry.highLevelCategory === "Liabilities");
  const pnlTotal = calculateTotal(journalEntries, entry => entry.highLevelCategory === "P&L");
  const cashTotal = calculateTotal(journalEntries, entry => entry.category === "Cash & Cash Equivalents");
  const loanMarketValueTotal = calculateTotal(journalEntries, entry => entry.category === "Loan Market Value");
  const commitmentMarketValueTotal = calculateTotal(journalEntries, entry => entry.category === "Unfunded Commitment Market Value");
  const lcMarketValueTotal = calculateTotal(journalEntries, entry => entry.category === "LC/Guarantee Market Value");
  const mtmPnlTotal = calculateTotal(journalEntries, entry => entry.category === "MTM P&L (unrealized)");

  return (
    <div className={classes.loanDetail_container}>
      <h2 className={classes.table_headers}>Balance Sheet Impact</h2>
      <BalanceSheetSummary
        assetsTotal={assetsTotal}
        liabilitiesTotal={liabilitiesTotal}
        cashTotal={cashTotal}
        loanMarketValueTotal={loanMarketValueTotal}
        commitmentMarketValueTotal={commitmentMarketValueTotal}
        lcMarketValueTotal={lcMarketValueTotal}
        mtmPnlTotal={mtmPnlTotal}
        pnlTotal={pnlTotal}
        accounting={accounting}
      />
      <h2 className={classes.table_headers}>Off Balance Sheet</h2>
      <OffBalanceSheetTable
        unfundedCommitment={unfundedCommitment}
        lettersOfCredit={lettersOfCredit}
        isPortfolioPage={false}
      />
      <div className={classes.loanDetail_journalEntries}>
        <h2 className={classes.table_headers}>Journal Entries</h2>
        <JournalEntryTable
          journalEntries={journalEntries}
          debitTotal={debitTotal}
          creditTotal={creditTotal}
        />
      </div>
    </div>
  );
};

export default LoanDetail;
