import mongoose, { Document, Error, Schema } from 'mongoose';
import JournalEntry from "./journalEntry";

// Define interface for LoanAccountingExample document
export interface LoanAccountingExampleDocument extends Document {
  borrower: string;
  facility: string;
  commitment: number;
  fundedLoan: number;
  lettersOfCredit: number;
  accounting: string;
  isOrigination: boolean;
  weightedAverageCost: number;
  upfrontFee?: number;
  loanMark: number;
}

// Loan Accounting Example - entered by user via the LoanAccountingForm in the modal on the Accounting Page
const LoanAccountingExampleSchema = new Schema<LoanAccountingExampleDocument>({
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
LoanAccountingExampleSchema.pre<LoanAccountingExampleDocument>(
  "deleteOne",
  { document: true },
  async function (next) {
    try {
      await JournalEntry.deleteMany({ loanAccountingExample: this._id });
      next();
    } catch (error: any) {
      next(error as Error);
    }
  }
);

// Export model
const LoanAccountingExample =
  (mongoose.models
    .LoanAccountingExample as mongoose.Model<LoanAccountingExampleDocument>) ||
  mongoose.model<LoanAccountingExampleDocument>(
    "LoanAccountingExample",
    LoanAccountingExampleSchema
  );

export default LoanAccountingExample;
