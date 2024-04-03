import { useState, useEffect } from "react";
import useSWR from "swr";
import {
  createLoanAccountingExample,
  getLoanAccountingExamples,
  deleteLoanAccountingExampleById,
  getJournalEntries,
} from "../../lib/api";
import PageHeader from "../../components/layout/pageHeader";
import LoanAccountingForm from "../../components/accounting/loanAccountingForm";
import LoanExamplesTable from "../../components/accounting/loanExamplesTable";
import Button from "../../components/ui/button";
import Modal from "../../components/ui/modal";
import FullBalanceSheet from "../../components/accounting/fullBalanceSheet";
import OffBalanceSheetTable from "../../components/accounting/offBalanceSheetTable";
import BlinkingInstructions from "../../components/ui/blinkingInstructions";
import AccountingPieChart from "../../components/accounting/accountingPieChart";
import classes from "./accounting.module.css";

// page route: /accounting
// Accounting Page summary - renders table of loan examples (LoanExamplesTable) and buttons where user can opt to
// add new examples via a modal form, view the full balance sheet of the examples portfolio (FullBalanceSheet),
// the Off Balance Sheet (OffBalanceSheetTable), or view the total commitments by accounting methodoloy (AccountingPieChart).
// The LoanExamplesTable is interactive, so user can click an individual loan example's accounting details via
// dynamic page routing.

const Accounting = ({ loanAccountingExamples }) => {
  // state for setting examples as data is retrieved from the database as well as new 
  // examples are created or existing examples are deleted.  Note that getStaticProps is used
  // for server side rendering for the exising examples in the database.
  const [examples, setExamples] = useState(loanAccountingExamples || {});
  // state for setting journal entries as data is retrieved from the database.  note that journal
  // entries are associated with loan examples as well via the models.
  const [journalEntries, setJournalEntries] = useState([]);
  // state for opening / closing the modal containing the LoanAccountingForm for entering loan examples
  const [isModalOpen, setIsModalOpen] = useState(false);
  // toggles showing / hiding the FullBalanceSheet component
  const [showBalanceSheet, setShowBalanceSheet] = useState(false);
  // toggles showing / hiding the accountingPieChart component
  const [showChart, setShowChart] = useState(false);

  // useSWR hook used for data (examples & journal entries) retrieval
  const { data: updatedExamples, error } = useSWR(
    ["/api/accounting/", "/api/entries"], // Include both endpoints
    async () => {
      const [loanExamples, journalEntriesData] = await Promise.all([
        getLoanAccountingExamples(),
        getJournalEntries(),
      ]);

      return { loanExamples, journalEntriesData };
    },
    {
      refreshInterval: 1000,
    }
  );

 
  useEffect(() => {
    // sort the examples by borrower name (alphabetical order) and update state
    // so examples are rendered in order
    if (updatedExamples) {
      const sortedExamples = updatedExamples.loanExamples.sort((a, b) =>
        a.borrower.localeCompare(b.borrower)
      );
      setExamples(sortedExamples);
      setJournalEntries(updatedExamples.journalEntriesData);
    }
  }, [updatedExamples]);

  // handle the loanAccountingForm submit (in the pop up modal). Uses
  // imported custom function 'createAccountingExample' to post the
  // example to the database and close the modal.
  const handleFormSubmit = async (formData) => {
    try {
      await createLoanAccountingExample(formData);
      // Form submission successful, close the modal
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  // handle deleting an example from the database when a delete button 
  // is clicked on a specific example in the LoanExamplesTable component.
  const handleDeleteExample = async (exampleId) => {
    try {
      // imported custom function to delete specific example from the database
      await deleteLoanAccountingExampleById(exampleId);
      // remove deleted item from examples dataset and reset state
      setExamples(examples.filter((example) => example._id !== exampleId));
    } catch (error) {
      console.error("Error deleting example:", error.message);
    }
  };

  // calculate total unfunded commitments across examples portfolio
  const totalUnfundedCommitments = examples.reduce((total, example) => {
    return (
      total +
      (example.commitment - example.fundedLoan - example.lettersOfCredit)
    );
  }, 0);

  // calculate total letters of credit across examples portfolio
  const totalLettersOfCredit = examples.reduce((total, example) => {
    return total + example.lettersOfCredit;
  }, 0);

  // Function to calculate totals by accounting methodology
  const calculateTotalByAccounting = (accounting) => {
    return examples.reduce((total, example) => {
      if (example.accounting === accounting) {
        return total + example.commitment;
      }
      return total;
    }, 0);
  };

  // Calculate total commitments by accounting methodology
  const totalCommitmentHFI = calculateTotalByAccounting("HFI");
  const totalCommitmentHFS = calculateTotalByAccounting("HFS");
  const totalCommitmentFVO = calculateTotalByAccounting("FVO");

  // handles button click for showing either chart or balance sheet
  const handleShowContent = (chart, balanceSheet) => {
    setShowChart(chart);
    setShowBalanceSheet(balanceSheet);
  };

  return (
    <div className={classes.accounting_main}>
      <PageHeader>
        <h1 className={classes.pageHeader}>Loan Accounting</h1>
        <h2 className={classes.subHeader}>Examples</h2>
      </PageHeader>
      <div className={classes.formAndButtonContainer}>
        {/* Instructions for clicking on a specific example in table to see further detail */}
        <BlinkingInstructions page="accounting" />
        {/* Button to toggle modal opening of form for entering a new loan example */}
        <Button className="addExample" onClick={() => setIsModalOpen(true)}>
          Add Example
        </Button>
        {/* If modal is open (via button click above), show the form */}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            content={<LoanAccountingForm onSubmit={handleFormSubmit} />}
            title="Add Loan Example"
          />
        )}
      </div>
      <div className={classes.accountingExamplesTableContainer}>
        {/* Table showing all entered examples from the database */}
        <LoanExamplesTable
          examples={examples}
          onDelete={handleDeleteExample}
          portfolioPage={true}
        />
      </div>
      <div className={classes.showButtonsDiv}>
        {/* Show pie chart of commitments by accounting methodology (i.e. HFI, HFS, FVO) */}
        <Button
          className="showButton"
          onClick={() => handleShowContent(true, false)}
        >
          Show Commitments by Acctg
        </Button>
        {/* Show full balance sheet and off balance sheet of examples portfolio */}
        <Button
          className="showButton"
          onClick={() => handleShowContent(false, true)}
        >
          Show Balance Sheet
        </Button>
      </div>
      {/* Toggled by button above to show the full balance sheet and off balance sheet table */}
      {showBalanceSheet && (
        <div className={classes.balanceSheetView}>
          <h2 className={classes.chartHeader}>
            Portfolio Balance Sheet
          </h2>
          <FullBalanceSheet journalEntries={journalEntries} />
          <h2 className={classes.chartHeader}>
            Portfolio Off Balance Sheet
          </h2>
          <OffBalanceSheetTable
            unfundedCommitment={totalUnfundedCommitments}
            lettersOfCredit={totalLettersOfCredit}
            isPortfolioPage={true}
          />
        </div>
      )}
       {/* Toggled by button above to show the pie chart of commitments by accounting methodology */}
      {showChart && (
        <div className={classes.pieChartWrapper}>
          <h3 className={classes.chartHeader}>Commitments by Accounting Methodology</h3>
          <AccountingPieChart
            totalCommitmentHFI={totalCommitmentHFI}
            totalCommitmentHFS={totalCommitmentHFS}
            totalCommitmentFVO={totalCommitmentFVO}
          />
        </div>
      )}
    </div>
  );
};

// for serving up table of examples
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
    revalidate: 1200, // Re-generate page every 1200 seconds (20 minutes) using loan examples props from the database
  };
}

export default Accounting;
