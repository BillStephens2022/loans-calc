import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

export default mongoose.models.LoanAccountingExample || mongoose.model('LoanAccountingExample', LoanAccountingExampleSchema);