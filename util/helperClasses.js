export class JournalEntry {
    constructor(account, category, amount, isDebit) {
      this.account = account;
      this.category = category;
      this.amount = amount;
      this.isDebit = isDebit;
    }
  }