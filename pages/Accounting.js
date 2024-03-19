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
    setAccountingFormData(formData);
    setShowLoanDetail(true);
  };

  const { commitment, fundedLoan, upfrontFee } = accountingFormData;
  const unfundedCommitment = commitment - fundedLoan;
  const weightedAverageCost = (1 - upfrontFee / commitment) * 100;

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
          weightedAverageCost={weightedAverageCost}
        />
      )}
    </div>
  );
};

export default Accounting;
