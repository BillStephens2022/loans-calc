const accountCategoryMapping = {
  // Account: [HighLevel Category, Category]
  Cash: ["Assets", "Cash & Cash Equivalents"],
  "Loan Principal": ["Assets", "Loan Market Value"],
  "Loan Discount/Premium": ["Assets", "Loan Market Value"],
  "Deferred Fees - Unfunded": ["Liabilities", "Unfunded Commitment Market Value"],
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
   * @param {string} highLevelCategory - The category of the account (e.g., "Assets", "Liabilities", "P&L").
   * @param {string} category - The category of the account (e.g., "Cash & Cash Equivalents", "Loan Market Value", etc).
   * @param {number} amount - The amount of the journal entry.
   * @param {boolean} isDebit - Indicates whether the entry is a debit (true) or credit (false).
   */
  constructor(account, amount, isDebit) {
    this.account = account;
    const mapping = accountCategoryMapping[account];
    if (!mapping) {
      // Handle case where account doesn't match any key in accountCategoryMapping
      console.error(`Account "${account}" doesn't have a mapping.`);
      this.highLevelCategory = "Unknown";
      this.category = "Unknown";
    } else {
      const [highLevelCategory, category] = mapping;
      this.highLevelCategory = highLevelCategory;
      this.category = category;
    }
    this.amount = amount;
    this.isDebit = isDebit;

    switch (this.account) {
      case "Cash":
        this.calculationText = "Funded Loans - Upfront Fees";
        break;
      case "Loan Principal":
        this.calculationText = "Funded Loan Amount";
        break;
      case "Loan Discount/Premium":
        this.calculationText = "Upfront Fee / Commitment * Funded Loan Amount";
        break;
      case "Deferred Fees - Unfunded":
        this.calculationText = "Upfront Fee / Commitment * Unfunded Commitment";
        break;
      case "Deferred Fees - LC":
        this.calculationText = "Upfront Fee / Commitment * Letters Of Credit";
        break;
      case "Funded Loan MTM B/S":
      case "Funded Loan MTM P&L":
        this.calculationText =
          "Funded Loan * (Weighted Average Cost - Trader Mark)";
        break;
      case "Unfunded Commitment MTM B/S":
      case "Unfunded Commitment MTM P&L":
        this.calculationText =
          "Unfunded Commitment * (Weighted Average Cost - Trader Mark)";
        break;
      case "LC/Guarantee MTM B/S":
      case "LC/Guarantee MTM P&L":
        this.calculationText =
          "Unfunded Commitment * (Weighted Average Cost - Trader Mark)";
        break;
      default:
        this.calculationText = "";
        break;
    }
  }
}
