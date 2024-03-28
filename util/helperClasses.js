const accountCategoryMapping = {
  // Account: [HighLevel Category, Category]
  Cash: ["Assets", "Cash & Cash Equivalents"],
  "Loan Principal": ["Assets", "Loan Market Value"],
  "Loan Discount/Premium": ["Assets", "Loan Market Value"],
  "Deferred Fees - Unfunded": [
    "Liabilities",
    "Unfunded Commitment Market Value",
  ],
  "Deferred Fees - LC": ["Liabilities", "LC/Guarantee Market Value"],
  "Funded Loan MTM B/S": ["Assets", "Loan Market Value"],
  "Unfunded Commitment MTM B/S": [
    "Liabilities",
    "Unfunded Commitment Market Value",
  ],
  "LC/Guarantee MTM B/S": ["Liabilities", "LC/Guarantee Market Value"],
  "Funded Loan MTM P&L": ["P&L", "MTM P&L (unrealized)"],
  "Unfunded Commitment MTM P&L": ["P&L", "MTM P&L (unrealized)"],
  "LC/Guarantee MTM P&L": ["P&L", "MTM P&L (unrealized)"],
};

/**
 * Represents a journal entry.
 * @class
 */

export class JournalEntry {
  /**
   * Create a new journal entry.
   * @constructor
   * @param {string} account - The account name.
   * @param {string} accounting - The accounting method (e.g. "HFI", "HFS", "FVO", "FVTPL")
   * @param {string} highLevelCategory - The category of the account (e.g., "Assets", "Liabilities", "P&L").
   * @param {string} category - The category of the account (e.g., "Cash & Cash Equivalents", "Loan Market Value", etc).
   * @param {number} amount - The amount of the journal entry.
   * @param {boolean} isDebit - Indicates whether the entry is a debit (true) or credit (false).
   * @param {string} calculationText - shows formula for how amount is calculated
   */
  constructor(account, accounting, amount, isDebit) {
    this.account = account;
    this.accounting = accounting;
    const mapping = accountCategoryMapping[account] || ["Unknown", "Unknown"];

    [this.highLevelCategory, this.category] = mapping;

    this.amount = amount;
    this.isDebit = isDebit;
    
    this.calculationText = this.getCalculationText();
  }
  // method to get the calculation text based on the account posted to
  getCalculationText() {
    switch (this.account) {
      case "Cash":
        return "Funded Loans - Upfront Fees";
      case "Loan Principal":
        return "Funded Loan Amount";
      case "Loan Discount/Premium":
        return "Upfront Fee / Commitment * Funded Loan Amount";
      case "Deferred Fees - Unfunded":
        return "Upfront Fee / Commitment * Unfunded Commitment";
      case "Deferred Fees - LC":
        return "Upfront Fee / Commitment * Letters Of Credit";
      case "Funded Loan MTM B/S":
      case "Funded Loan MTM P&L":
      case "Unfunded Commitment MTM B/S":
      case "Unfunded Commitment MTM P&L":
      case "LC/Guarantee MTM B/S":
      case "LC/Guarantee MTM P&L":
        return "Some calculation for MTM";
      default:
        return "";
    }
  }
}
