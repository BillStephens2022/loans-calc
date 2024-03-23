import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LoanAccountingExampleSchema = new Schema({
    borrower: { type: String, required: true },
    facility: { type: String, required: true },
    commitment: { type: Number, required: true },
    fundedLoan: { type: Number, required: true },
    lettersOfCredit: { type: Number, required: true },
    upfrontFee: { type: Number, required: true },
    loanMark: { type: Number, required: true }
});

export default mongoose.models.LoanAccountingExample || mongoose.model('LoanAccountingExample', LoanAccountingExampleSchema);