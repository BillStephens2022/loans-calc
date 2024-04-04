import { JournalEntry } from "./helperClasses";


// custom function to create journal entries using the example data entered by the user on the LoanAccountingForm.
// function will create journal entries based on the custom JournalEntry class imported above.
export const createJournalEntries = (exampleFormData: any): JournalEntry[] => {
  
  // deconstruct the form data object for values needed for calculations and for creating the journal entries
  const {
    commitment,
    fundedLoan,
    lettersOfCredit,
    accounting,
    weightedAverageCost,
    upfrontFee,
    loanMark,
  } = exampleFormData;

  // calculate the unfunded commitment
  const unfundedCommitment: number = commitment - fundedLoan - lettersOfCredit;
  // calculate the cash impact for the new loan booking
  const cash: number = -fundedLoan + upfrontFee;
  // calculate the loanMTM using the mark and cost 
  // adjust the loanMTM calc based on accounting methodology.  
  // If HFS, use LOCOM (Lower of Cost or Market), so if loanMTM is greater than zero, set loanMTM to zero.
  // If HFI, loans are not marked to market, so set loanMTM to zero.
  let loanMTM: number = commitment * ((loanMark - weightedAverageCost) / 100);
  if (accounting === "HFS" && loanMTM > 0) {
    loanMTM = 0; // apply LOCOM (lower of cost or market) accounting for HFS. MTM can only be negative on HFS loans
  }
  if (accounting === "HFI") {
    loanMTM = 0; // HFI loans aren't marked to market, so set to zero
  }

  // Pro-rate the Loan MTM across the unfunded commitment, funded loan, letters of credit
  const fundedMTM: number = (loanMTM / commitment) * fundedLoan; // calculate funded portion of Loan MTM
  const unfundedMTM: number = (loanMTM / commitment) * unfundedCommitment; // calculate unfunded portion of Loan MTM
  const lettersOfCreditMTM: number = (loanMTM / commitment) * lettersOfCredit; // calculate letter of credit portion of Loan MTM
  
  // create the journal entries using the custom JournalEntry class (imported above) and its constructor
  const journalEntries: JournalEntry[] = [
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
  // return the journal entries
  return journalEntries;
};
