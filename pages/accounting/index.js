import { useState, useEffect } from "react";
import useSWR from "swr";
import { ImArrowDown } from "react-icons/im";
import PageHeader from "../../components/pageHeader";
import LoanAccountingForm from "../../components/accounting/loanAccountingForm";
import {
  createLoanAccountingExample,
  getLoanAccountingExamples,
  deleteLoanAccountingExampleById,
  getJournalEntries
} from "../../lib/api";
import classes from "./accounting.module.css";
import LoanExamplesTable from "../../components/accounting/loanExamplesTable";
import Button from "../../components/ui/button";
import FullBalanceSheet from "../../components/accounting/fullBalanceSheet";
import OffBalanceSheetTable from "@/components/accounting/offBalanceSheetTable";

// Accounting Page

const Accounting = ({ loanAccountingExamples }) => {
  const [examples, setExamples] = useState(loanAccountingExamples || {});
  const [journalEntries, setJournalEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showBalanceSheet, setShowBalanceSheet] = useState(false);

  const { data: updatedExamples, error } = useSWR(
    ["/api/accounting/", "/api/entries"], // Include both endpoints
    async () => {
      const [loanExamples, journalEntriesData] = await Promise.all([
        getLoanAccountingExamples(),
        getJournalEntries()
      ]);
      
      return { loanExamples, journalEntriesData };
    },
    {
      refreshInterval: 1000,
    }
  );

  useEffect(() => {
    if (updatedExamples) {
      const sortedExamples = updatedExamples.loanExamples.sort((a, b) =>
        a.borrower.localeCompare(b.borrower)
      );
      setExamples(sortedExamples);
      setJournalEntries(updatedExamples.journalEntriesData)
    }
  }, [updatedExamples]);

  const handleFormSubmit = async (formData) => {
    try {
      await createLoanAccountingExample(formData);
      // Form submission successful, hide the form
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const handleDeleteExample = async (exampleId) => {
    try {
      await deleteLoanAccountingExampleById(exampleId);
      setExamples(examples.filter((example) => example._id !== exampleId));
    } catch (error) {
      console.error("Error deleting example:", error.message);
    }
  };

  const totalUnfundedCommitments = examples.reduce((total, example) => {
    return total + (example.commitment - example.fundedLoan - example.lettersOfCredit);
  }, 0);

  const totalLettersOfCredit = examples.reduce((total, example) => {
    return total + example.lettersOfCredit;
  }, 0);

  return (
    <div className={classes.accounting_main}>
      <PageHeader>
        <h1 className={classes.pageHeader}>Loan Accounting</h1>
        <h2 className={classes.subHeader}>Examples</h2>
      </PageHeader>
      <div className={classes.formAndButtonContainer}>
        <h2 className={classes.instructionHeader}><ImArrowDown />&nbsp;&nbsp;Click a loan below to view accounting details&nbsp;&nbsp;<ImArrowDown /></h2>
      <Button className="addExample" onClick={() => setShowForm(!showForm)}>{showForm ? "Hide Form" : "Add Example"}</Button>
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
          portfolioPage={true}
        />
      </div>
      <Button onClick={() => setShowBalanceSheet(!showBalanceSheet)}>{!showBalanceSheet ? "Show Balance Sheet" : "Hide Balance Sheet"}</Button>
      {showBalanceSheet && 
      
      <div className={classes.balanceSheetView}>
        <h2 className={classes.balanceSheetHeader}>Portfolio Balance Sheet</h2>
        <FullBalanceSheet journalEntries={journalEntries} />
        <h2 className={classes.balanceSheetHeader}>Portfolio Off Balance Sheet</h2>
        <OffBalanceSheetTable unfundedCommitment={totalUnfundedCommitments} lettersOfCredit={totalLettersOfCredit} isPortfolioPage={true}/>
      </div>}
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
