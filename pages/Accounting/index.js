import { useState } from "react";
import LoanAccountingForm from "@/components/accounting/LoanAccountingForm";
import LoanDetail from "@/components/accounting/LoanDetail";
import classes from "@/pages/Accounting/Accounting.module.css";

const initialFormData = {
  commitment: 0.0,
  fundedLoan: 0.0,
  lettersOfCredit: 0.0,
  upfrontFee: 0.0,
};

const Accounting = () => {
  const [accountingFormData, setAccountingFormData] = useState(initialFormData);
  const [showLoanDetail, setShowLoanDetail] = useState(false);

  const handleFormSubmit = (formData) => {
    setAccountingFormData(formData);
    setShowLoanDetail(true);
  };

  const { commitment, fundedLoan, lettersOfCredit, upfrontFee, loanMark } = accountingFormData;
  const unfundedCommitment = commitment - fundedLoan - lettersOfCredit;
  const weightedAverageCost = (1 - upfrontFee / commitment) * 100;
  const cash = -fundedLoan + upfrontFee;
  const fundedMTM = (loanMark - weightedAverageCost) / 100 * fundedLoan;
  const unfundedMTM = (loanMark - weightedAverageCost) / 100 * unfundedCommitment;
  const lettersOfCreditMTM = (loanMark - weightedAverageCost) / 100 * lettersOfCredit;

  return (
    <div className={classes.accounting_main}>
      <h1>Loan Accounting</h1>
      <h2>Enter Loan Details to view journal entries</h2>
      <div className={classes.formContainer}>
        <LoanAccountingForm onSubmit={handleFormSubmit} />
      </div>
      {showLoanDetail && (
        <LoanDetail
          commitment={commitment}
          fundedLoan={fundedLoan}
          lettersOfCredit={lettersOfCredit}
          unfundedCommitment={unfundedCommitment}
          upfrontFee={upfrontFee}
          loanMark={loanMark}
          weightedAverageCost={weightedAverageCost}
          cash={cash}
          fundedMTM={fundedMTM}
          unfundedMTM={unfundedMTM}
          lettersOfCreditMTM={lettersOfCreditMTM}
        />
      )}
    </div>
  );
};

export default Accounting;
