import { JournalEntry } from "../../util/helperClasses";
import JournalEntryTable from "./journalEntryTable";
import OffBalanceSheetTable from "./offBalanceSheetTable";
import BalanceSheetSummary from "./balanceSheetSummary";
import classes from "./loanDetail.module.css";

const LoanDetail = ({
  borrower,
  facility,
  commitment,
  fundedLoan,
  lettersOfCredit,
  accounting,
  loanMark,
  unfundedCommitment,
  upfrontFee,
  weightedAverageCost,
  cash,
  fundedMTM,
  unfundedMTM,
  lettersOfCreditMTM,
}) => {

  // calculate total based on condition (i.e. sum all entries where entry is a debit, or entry is to an asset account, etc).
  const calculateTotal = (journalEntries, condition) =>
    journalEntries.reduce((total, entry) => (condition(entry) ? total + entry.amount : total), 0);

  // create array of journal entries using custom JournalEntry class which has been imported
  // constructor calls for (string account, string accounting, float amount, boolean isDebit)
  const journalEntries = [
    new JournalEntry("Cash", accounting, cash, cash > 0),
    new JournalEntry("Loan Principal", accounting, fundedLoan, true),
    new JournalEntry(
      "Loan Discount/Premium",
      accounting,
      (-upfrontFee / commitment) * fundedLoan,
      upfrontFee < 0
    ),
    new JournalEntry(
      "Deferred Fees - Unfunded",
      accounting,
      (-upfrontFee / commitment) * unfundedCommitment,
      upfrontFee < 0
    ),
    new JournalEntry(
      "Deferred Fees - LC",
      accounting,
      (-upfrontFee / commitment) * lettersOfCredit,
      upfrontFee < 0
    ),
    new JournalEntry("Funded Loan MTM B/S", accounting, fundedMTM, fundedMTM > 0),
    new JournalEntry("Funded Loan MTM P&L", accounting, -fundedMTM, fundedMTM < 0),
    new JournalEntry(
      "Unfunded Commitment MTM B/S",
      accounting,
      unfundedMTM,
      unfundedMTM > 0
    ),
    new JournalEntry(
      "Unfunded Commitment MTM P&L",
      accounting,
      -unfundedMTM,
      unfundedMTM < 0
    ),
    new JournalEntry(
      "LC/Guarantee MTM B/S",
      accounting,
      lettersOfCreditMTM,
      unfundedMTM > 0
    ),
    new JournalEntry(
      "LC/Guarantee MTM P&L",
      accounting,
      -lettersOfCreditMTM,
      unfundedMTM < 0
    ),
  ];

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
      <h2 className={classes.table_headers}>Balance Sheet Summary</h2>
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
