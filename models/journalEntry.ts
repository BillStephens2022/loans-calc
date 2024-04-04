import mongoose, { Document, Schema } from "mongoose";
import { LoanAccountingExampleDocument } from "./loanAccountingExample";

export interface JournalEntryDocument extends Document {
  loanAccountingExample: LoanAccountingExampleDocument;
  account: string;
  accounting: string;
  amount: number;
  isDebit: boolean;
  highLevelCategory: string;
  category: string;
  calculationText: string;
}

// Journal Entries - created off the back of the LoanAccountingExamples entered by the User in the
// LoanAccountingForm in the modal on the Accounting Page
const JournalEntrySchema = new Schema<JournalEntryDocument>({
  loanAccountingExample: {
    type: Schema.Types.ObjectId,
    ref: "LoanAccountingExample",
  },
  account: { type: String, required: true },
  accounting: { type: String, required: true },
  amount: { type: Number, required: true },
  isDebit: { type: Boolean, required: true },
  highLevelCategory: { type: String, required: true },
  category: { type: String, required: true },
  calculationText: { type: String, required: true },
});

export default mongoose.models.JournalEntry ||
  mongoose.model<JournalEntryDocument>("JournalEntry", JournalEntrySchema);
