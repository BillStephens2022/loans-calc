import mongoose from "mongoose";
import JournalEntry from "./journalEntry";

const Schema = mongoose.Schema;

// Loan Accounting Example - entered by user via the LoanAccountingForm in the modal on the Accounting Page
const LoanAccountingExampleSchema = new Schema({
  borrower: { type: String, required: true },
  facility: { type: String, required: true },
  commitment: { type: Number, required: true },
  fundedLoan: { type: Number, required: true },
  lettersOfCredit: { type: Number, required: true },
  accounting: { type: String, required: true },
  isOrigination: { type: Boolean, required: true },
  weightedAverageCost: { type: Number, required: true },
  upfrontFee: { type: Number, default: 0 },
  loanMark: { type: Number, required: true },
});

// Middleware to delete associated journal entries before deleting the LoanAccountingExample
LoanAccountingExampleSchema.pre(
  "deleteOne",
  { document: true },
  async function (next) {
    try {
      await JournalEntry.deleteMany({ loanAccountingExample: this._id });
      next();
    } catch (error) {
      next(error);
    }
  }
);

export default mongoose.models.LoanAccountingExample ||
  mongoose.model("LoanAccountingExample", LoanAccountingExampleSchema);
