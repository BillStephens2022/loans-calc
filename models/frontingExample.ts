import mongoose, { Document, Schema } from 'mongoose';

export interface FrontingExampleDocument extends Document {
  borrower: string;
  yourBankName: string;
  facility: string;
  globalCommitment: number;
  globalFundedLoans: number;
  globalLettersOfCredit: number;
  yourBankCommitment: number;
  isLCIssuer: boolean;
  isSwinglineLender: boolean;
  isNonAccrual: boolean;
  swinglineSublimit: number;
  swinglinesFundedByYourBank: number;
  lcSublimit: number;
  lcsIssuedByYourBank: number;
}

// Fronting Example - entered by user via the FrontingForm in the modal on the Fronting Page
const FrontingExampleSchema = new Schema<FrontingExampleDocument>({
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
  swinglinesFundedByYourBank: { type: Number, required: true },
  lcSublimit: { type: Number, required: true },
  lcsIssuedByYourBank: { type: Number, required: true },
});

export default mongoose.models.FrontingExample ||
  mongoose.model<FrontingExampleDocument>("FrontingExample", FrontingExampleSchema);
