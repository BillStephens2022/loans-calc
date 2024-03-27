import mongoose from "mongoose";

const Schema = mongoose.Schema;

const JournalEntrySchema = new Schema({
    loanAccountingExample: { type: Schema.Types.ObjectId, ref: 'LoanAccountingExample' },
    account: { type: String, required: true },
    accounting: { type: String, required: true },
    amount: { type: Number, required: true },
    isDebit: { type: Boolean, required: true },
    highLevelCategory: { type: String, required: true },
    category: { type: String, required: true },
    calculationText: { type: String, required: true }
});

export default mongoose.models.JournalEntrySchema || mongoose.model('JournalEntry', JournalEntrySchema);

