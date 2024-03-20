const accountCategoryMapping = {
  // Account: [HighLevel Category, Category]
  Cash: ["Assets", "Cash & Cash Equivalents"],
  "Loan Principal": ["Assets", "Loan Market Value"],
  "Loan Discount/Premium": ["Assets", "Loan Market Value"],
  "Deferred Fees - Unfunded": ["Liabilities", "Commitment Market Value"],
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
  }
}
