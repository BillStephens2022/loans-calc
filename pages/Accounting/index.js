import { useState, useEffect } from "react";
import useSWR from "swr";
import PageHeader from "@/components/PageHeader";
import LoanAccountingForm from "@/components/accounting/LoanAccountingForm";
import {
  createLoanAccountingExample,
  getLoanAccountingExamples,
  deleteLoanAccountingExampleById,
} from "@/lib/api";
import classes from "@/pages/Accounting/Accounting.module.css";
import LoanExamplesTable from "@/components/accounting/LoanExamplesTable";

// Accounting Page

const Accounting = ({ loanAccountingExamples }) => {
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

  const handleFormSubmit = async (formData) => {
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

  return (
    <div className={classes.accounting_main}>
      <PageHeader>
        <h1>Loan Accounting</h1>
      </PageHeader>
      <div className={classes.accountingFormAndSummaryWrapper}>
        <LoanExamplesTable
          examples={examples}
          onDelete={handleDeleteExample}
          showButtons={true}
        />
        <div className={classes.formContainer}>
          <h2>Loan Example Input Form</h2>

          <div>
            <p>Enter details below to view</p>
            <p>associated journal entries</p>
          </div>

          <LoanAccountingForm onSubmit={handleFormSubmit} />
        </div>
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
