import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import LoanAccountingForm from "@/components/accounting/LoanAccountingForm";
import LoanDetail from "@/components/accounting/LoanDetail";
import { createLoanAccountingExample, getLoanAccountingExamples } from "@/lib/api";
import classes from "@/pages/Accounting/Accounting.module.css";


const initialFormData = {
  borrower: "",
  facility: "",
  commitment: 0.0,
  fundedLoan: 0.0,
  lettersOfCredit: 0.0,
  upfrontFee: 0.0,
};

const Accounting = () => {
  const [accountingFormData, setAccountingFormData] = useState(initialFormData);
  const [showLoanDetail, setShowLoanDetail] = useState(false);

  const handleFormSubmit = async (formData) => {
    setAccountingFormData(formData);
    setShowLoanDetail(true);
    await createLoanAccountingExample(formData);
  };

  const { borrower, facility, commitment, fundedLoan, lettersOfCredit, upfrontFee, loanMark } =
    accountingFormData;
  const unfundedCommitment = commitment - fundedLoan - lettersOfCredit;
  const weightedAverageCost = (1 - upfrontFee / commitment) * 100;
  const cash = -fundedLoan + upfrontFee;
  const fundedMTM = ((loanMark - weightedAverageCost) / 100) * fundedLoan;
  const unfundedMTM =
    ((loanMark - weightedAverageCost) / 100) * unfundedCommitment;
  const lettersOfCreditMTM =
    ((loanMark - weightedAverageCost) / 100) * lettersOfCredit;

  return (
    <div className={classes.accounting_main}>
      <PageHeader>Loan Accounting</PageHeader>
      <div className={classes.accountingFormAndSummaryWrapper}>
        <div className={classes.formContainer}>
          <h2>Loan Example Input Form</h2>
          {!showLoanDetail && (
            <div>
              <p>Enter details below to view</p>
              <p>associated journal entries</p>
            </div>
          )}

          <LoanAccountingForm onSubmit={handleFormSubmit} />
        </div>

        {showLoanDetail && (
          <LoanDetail
            borrower={borrower}
            facility={facility}
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
    </div>
  );
};

export default Accounting;
