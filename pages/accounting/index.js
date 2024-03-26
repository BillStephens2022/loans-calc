import { useState, useEffect } from "react";
import useSWR from "swr";
import { ImArrowDown } from "react-icons/im";
import PageHeader from "../../components/pageHeader";
import LoanAccountingForm from "../../components/accounting/loanAccountingForm";
import {
  createLoanAccountingExample,
  getLoanAccountingExamples,
  deleteLoanAccountingExampleById,
} from "../../lib/api";
import classes from "./accounting.module.css";
import LoanExamplesTable from "../../components/accounting/loanExamplesTable";
import Button from "../../components/ui/button";

// Accounting Page

const Accounting = ({ loanAccountingExamples }) => {
  const [examples, setExamples] = useState(loanAccountingExamples || {});
  const [showForm, setShowForm] = useState(false);

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
        <h1 className={classes.pageHeader}>Loan Accounting</h1>
        <h2 className={classes.subHeader}>Examples</h2>
      </PageHeader>
      <div className={classes.formAndButtonContainer}>
        <h2 className={classes.instructionHeader}><ImArrowDown />&nbsp;&nbsp;Click a loan below to view accounting details&nbsp;&nbsp;<ImArrowDown /></h2>
      <Button className="m_1" onClick={() => setShowForm(!showForm)}>{showForm ? "Hide Form" : "Add New Example"}</Button>
      {showForm && (
        <div className={classes.formContainer}>
          <LoanAccountingForm onSubmit={handleFormSubmit} />
        </div>
      )}
      </div>
      <div className={classes.accountingExamplesTableContainer}>
        <LoanExamplesTable
          examples={examples}
          onDelete={handleDeleteExample}
          showButtons={true}
        />
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
