import { formatAmount } from "@/util/formatting";
import { JournalEntry } from "@/util/helperClasses";
import LoanDetailSummary from "@/components/accounting/LoanDetailSummary";
import JournalEntryTable from "@/components/accounting/JournalEntryTable";
import OffBalanceSheetTable from "@/components/accounting/OffBalanceSheetTable";
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

  return (
    <div className={classes.loanDetail_container}>
      <div className={classes.loanDetail_summary}>
        <h2>Loan Detail Summary</h2>
        <h3>Your Example:</h3>
        <LoanDetailSummary
          commitment={commitment}
          fundedLoan={fundedLoan}
          lettersOfCredit={lettersOfCredit}
          unfundedCommitment={unfundedCommitment}
          upfrontFee={upfrontFee}
          weightedAverageCost={weightedAverageCost}
          loanMark={loanMark}
        />
      </div>
      <div className={classes.loanDetail_journalEntries}>
        <h2>Journal Entries</h2>
        <JournalEntryTable
          journalEntries={journalEntries}
          debitTotal={debitTotal}
          creditTotal={creditTotal}
        />
        <h3>Off Balance Sheet</h3>
        <OffBalanceSheetTable
          unfundedCommitment={unfundedCommitment}
          lettersOfCredit={lettersOfCredit}
        />
      </div>
    </div>
  );
};

export default LoanDetail;
