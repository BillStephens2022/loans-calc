import { JournalEntry } from "./helperClasses";

export const createJournalEntries = (exampleFormData) => {
  const {
    commitment,
    fundedLoan,
    lettersOfCredit,
    accounting,
    weightedAverageCost,
    upfrontFee,
    loanMark,
  } = exampleFormData;

  const unfundedCommitment = commitment - fundedLoan - lettersOfCredit;
  const cash = -fundedLoan + upfrontFee;
  let loanMTM = commitment * ((loanMark - weightedAverageCost) / 100);
  if (accounting === "HFS" && loanMTM > 0) {
    loanMTM = 0; // apply LOCOM (lower of cost or market) accounting for HFS. MTM can only be negative on HFS loans
  }
  if (accounting === "HFI") {
    loanMTM = 0; // HFI loans aren't marked to market, so set to zero
  }

  // Pro-rate the Loan MTM
  const fundedMTM = (loanMTM / commitment) * fundedLoan; // calculate funded portion of Loan MTM
  const unfundedMTM = (loanMTM / commitment) * unfundedCommitment; // calculate unfunded portion of Loan MTM
  const lettersOfCreditMTM = (loanMTM / commitment) * lettersOfCredit; // calculate letter of credit portion of Loan MTM
  
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
  console.log("JOURNAL ENTRIES FROM NEW FUNCTION: ", journalEntries);
  return journalEntries;
};
