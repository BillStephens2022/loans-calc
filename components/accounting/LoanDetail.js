import { JournalEntry } from "@/util/helperClasses";
import JournalEntryTable from "@/components/accounting/JournalEntryTable";
import OffBalanceSheetTable from "@/components/accounting/OffBalanceSheetTable";
import BalanceSheetSummary from "@/components/accounting/BalanceSheetSummary";
import classes from "@/components/accounting/LoanDetail.module.css";

const LoanDetail = ({
  borrower,
  facility,
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
  lettersOfCreditMTM,
}) => {
  // create array of journal entries using custom JournalEntry class which has been imported
  // constructor calls for (string account, string highLevelCategory, string category, float amount, boolean isDebit)
  const journalEntries = [
    new JournalEntry("Cash", cash, cash > 0),
    new JournalEntry("Loan Principal", fundedLoan, true),
    new JournalEntry(
      "Loan Discount/Premium",
      (-upfrontFee / commitment) * fundedLoan,
      upfrontFee < 0
    ),
    new JournalEntry(
      "Deferred Fees - Unfunded",
      (-upfrontFee / commitment) * unfundedCommitment,
      upfrontFee < 0
    ),
    new JournalEntry(
      "Deferred Fees - LC",
      (-upfrontFee / commitment) * lettersOfCredit,
      upfrontFee < 0
    ),
    new JournalEntry("Funded Loan MTM B/S", fundedMTM, fundedMTM > 0),
    new JournalEntry("Funded Loan MTM P&L", -fundedMTM, fundedMTM < 0),
    new JournalEntry(
      "Unfunded Commitment MTM B/S",
      unfundedMTM,
      unfundedMTM > 0
    ),
    new JournalEntry(
      "Unfunded Commitment MTM P&L",
      -unfundedMTM,
      unfundedMTM < 0
    ),
    new JournalEntry(
      "LC/Guarantee MTM B/S",
      lettersOfCreditMTM,
      unfundedMTM > 0
    ),
    new JournalEntry(
      "LC/Guarantee MTM P&L",
      -lettersOfCreditMTM,
      unfundedMTM < 0
    ),
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

  const assetsTotal = journalEntries.reduce(
    (total, entry) =>
      entry.highLevelCategory == "Assets" ? total + entry.amount : total,
    0
  );

  const liabilitiesTotal = journalEntries.reduce(
    (total, entry) =>
      entry.highLevelCategory == "Liabilities" ? total + entry.amount : total,
    0
  );

  const pnlTotal = journalEntries.reduce(
    (total, entry) =>
      entry.highLevelCategory == "P&L" ? total + entry.amount : total,
    0
  );

  const cashTotal = journalEntries.reduce(
    (total, entry) =>
      entry.category == "Cash & Cash Equivalents"
        ? total + entry.amount
        : total,
    0
  );

  const loanMarketValueTotal = journalEntries.reduce(
    (total, entry) =>
      entry.category == "Loan Market Value" ? total + entry.amount : total,
    0
  );

  const commitmentMarketValueTotal = journalEntries.reduce(
    (total, entry) =>
      entry.category == "Commitment Market Value"
        ? total + entry.amount
        : total,
    0
  );

  const lcMarketValueTotal = journalEntries.reduce(
    (total, entry) =>
      entry.category == "LC/Guarantee Market Value"
        ? total + entry.amount
        : total,
    0
  );

  const mtmPnlTotal = journalEntries.reduce(
    (total, entry) =>
      entry.category == "MTM P&L (unrealized)" ? total + entry.amount : total,
    0
  );

  return (
    <div className={classes.loanDetail_container}>
      <h2>Balance Sheet Summary</h2>
      <BalanceSheetSummary
        assetsTotal={assetsTotal}
        liabilitiesTotal={liabilitiesTotal}
        cashTotal={cashTotal}
        loanMarketValueTotal={loanMarketValueTotal}
        commitmentMarketValueTotal={commitmentMarketValueTotal}
        lcMarketValueTotal={lcMarketValueTotal}
        mtmPnlTotal={mtmPnlTotal}
        pnlTotal={pnlTotal}
      />
      <h3>Off Balance Sheet</h3>
      <OffBalanceSheetTable
        unfundedCommitment={unfundedCommitment}
        lettersOfCredit={lettersOfCredit}
      />
      <div className={classes.loanDetail_journalEntries}>
        <h2>Journal Entries</h2>
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
