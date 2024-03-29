import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FrontingExampleSchema = new Schema({
  borrower: { type: String, required: true },
  yourBankName: { type: String, required: true },
  facility: { type: String, required: true },
  globalCommitment: { type: Number, required: true },
  globalFundedLoans: { type: Number, required: true },
  globalLettersOfCredit: { type: Number, required: true },
  yourBankCommitment: { type: Number, required: true },
  isLCIssuer: { type: Boolean, required: true },
  isSwinglineLender: { type: Boolean, required: true },
  isNonAccrual: { type: Boolean, required: true },
  swinglineSublimit: { type: Number, required: true },
  lcSublimit: { type: Number, required: true },
  lcsIssuedByYourBank: { type: Number, required: true },
});


export default mongoose.modelsFrontingExample ||
  mongoose.model("FrontingExample", FrontingExampleSchema);