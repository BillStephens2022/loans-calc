import { useState, useEffect } from "react";
import useSWR from "swr";
import PageHeader from "@/components/PageHeader";
import LoanAccountingForm from "@/components/accounting/LoanAccountingForm";
import LoanDetail from "@/components/accounting/LoanDetail";
import {
  createLoanAccountingExample,
  getLoanAccountingExamples,
  deleteLoanAccountingExampleById,
} from "@/lib/api";
import { formatAmount } from "@/util/formatting";
import classes from "@/pages/Accounting/Accounting.module.css";
import Button from "@/components/ui/Button";
import LoanExamplesTable from "@/components/accounting/LoanExamplesTable";

const initialFormData = {
  borrower: "",
  facility: "",
  commitment: 0.0,
  fundedLoan: 0.0,
  lettersOfCredit: 0.0,
  upfrontFee: 0.0,
};

const Accounting = ({ loanAccountingExamples }) => {
  const [accountingFormData, setAccountingFormData] = useState(initialFormData);
  const [showLoanDetail, setShowLoanDetail] = useState(false);
  const [examples, setExamples] = useState(loanAccountingExamples || {});

  const { data: updatedExamples, error } = useSWR(
    "/api/accounting/",
    getLoanAccountingExamples,
    {
      refreshInterval: 1000,
    }
  );

  useEffect(() => {
    if (updatedExamples) {
      const sortedExamples = updatedExamples.sort((a, b) =>
        a.borrower.localeCompare(b.borrower)
      );
      setExamples(sortedExamples);
    }
  }, [updatedExamples]);

  examples?.forEach((example) => console.log(example.borrower));

  const handleFormSubmit = async (formData) => {
    setAccountingFormData(formData);
    setShowLoanDetail(true);
    await createLoanAccountingExample(formData);
  };

  const handleDeleteExample = async (exampleId) => {
    try {
      await deleteLoanAccountingExampleById(exampleId);
      setExamples(examples.filter((example) => example._id !== exampleId));
    } catch (error) {
      console.error("Error deleting example:", error.message);
    }
  };

  const {
    borrower,
    facility,
    commitment,
    fundedLoan,
    lettersOfCredit,
    upfrontFee,
    loanMark,
  } = accountingFormData;
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
      <PageHeader>
        <h1>Loan Accounting</h1>
      </PageHeader>
      <div className={classes.accountingFormAndSummaryWrapper}>
        <LoanExamplesTable examples={examples} onDelete={handleDeleteExample} />
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

export async function getStaticProps() {
  let loanAccountingExamples = [];

  try {
    const loanAccountingExamplesJSON = await getLoanAccountingExamples();
    loanAccountingExamples = loanAccountingExamplesJSON.sort((a, b) =>
      a.borrower.localeCompare(b.borrower)
    );
  } catch (error) {
    console.error(error.message);
  }

  return {
    props: {
      loanAccountingExamples,
    },
    revalidate: 1200, // Re-generate page every 1200 seconds (20 minutes)
  };
}

export default Accounting;
