import { useState } from "react";
import LoanAccountingForm from "@/components/accounting/LoanAccountingForm";
import LoanDetail from "@/components/accounting/LoanDetail";

const initialFormData = {
  commitment: 0.0,
  fundedLoan: 0.0,
  upfrontFee: 0.0,
};

const Accounting = () => {
  const [accountingFormData, setAccountingFormData] = useState(initialFormData);
  const [showLoanDetail, setShowLoanDetail] = useState(false);

  const handleFormSubmit = (formData) => {
    console.log("formData", formData);
    setAccountingFormData(formData);
    console.log("accountingFormData", accountingFormData);
    setShowLoanDetail(true);
  };

  const { commitment, fundedLoan, upfrontFee, loanMark } = accountingFormData;
  const unfundedCommitment = commitment - fundedLoan;
  const weightedAverageCost = (1 - upfrontFee / commitment) * 100;
  const cash = -fundedLoan + upfrontFee;
  const fundedMTM = (loanMark - weightedAverageCost) / 100 * fundedLoan;
  const unfundedMTM = (loanMark - weightedAverageCost) / 100 * unfundedCommitment;
  

  return (
    <div>
      <h1>Loan Journal Entries</h1>
      <h2>Enter Loan Details and submit to see simulated journal entries</h2>
      <div>
        <LoanAccountingForm onSubmit={handleFormSubmit} />
      </div>
      {showLoanDetail && (
        <LoanDetail
          commitment={commitment}
          fundedLoan={fundedLoan}
          unfundedCommitment={unfundedCommitment}
          upfrontFee={upfrontFee}
          loanMark={loanMark}
          weightedAverageCost={weightedAverageCost}
          cash={cash}
          fundedMTM={fundedMTM}
          unfundedMTM={unfundedMTM}
        />
      )}
    </div>
  );
};

export default Accounting;
