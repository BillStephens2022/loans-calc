import { useState, useEffect } from "react";
import useSWR from "swr";
import PageHeader from "../../components/layout/pageHeader";
import LoanAccountingForm from "../../components/accounting/loanAccountingForm";
import {
  createLoanAccountingExample,
  getLoanAccountingExamples,
  deleteLoanAccountingExampleById,
  getJournalEntries,
} from "../../lib/api";
import classes from "./accounting.module.css";
import LoanExamplesTable from "../../components/accounting/loanExamplesTable";
import Button from "../../components/ui/button";
import Modal from "../../components/ui/modal";
import FullBalanceSheet from "../../components/accounting/fullBalanceSheet";
import OffBalanceSheetTable from "../../components/accounting/offBalanceSheetTable";
import BlinkingInstructions from "../../components/ui/blinkingInstructions";
import AccountingPieChart from "@/components/accounting/accountingPieChart";

// Accounting Page

const Accounting = ({ loanAccountingExamples }) => {
  const [examples, setExamples] = useState(loanAccountingExamples || {});
  const [journalEntries, setJournalEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBalanceSheet, setShowBalanceSheet] = useState(false);
  const [showChart, setShowChart] = useState(false);

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
    if (updatedExamples) {
      const sortedExamples = updatedExamples.loanExamples.sort((a, b) =>
        a.borrower.localeCompare(b.borrower)
      );
      setExamples(sortedExamples);
      setJournalEntries(updatedExamples.journalEntriesData);
    }
  }, [updatedExamples]);

  const handleFormSubmit = async (formData) => {
    try {
      await createLoanAccountingExample(formData);
      // Form submission successful, close the modal
      setIsModalOpen(false);
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
    return (
      total +
      (example.commitment - example.fundedLoan - example.lettersOfCredit)
    );
  }, 0);

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
        <BlinkingInstructions page="accounting" />
        <Button className="addExample" onClick={() => setIsModalOpen(true)}>
          Add Example
        </Button>
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
        <LoanExamplesTable
          examples={examples}
          onDelete={handleDeleteExample}
          portfolioPage={true}
        />
      </div>
      <div className={classes.showButtonsDiv}>
        <Button
          className="showButton"
          onClick={() => handleShowContent(true, false)}
        >
          Show Commitments by Acctg
        </Button>
        <Button
          className="showButton"
          onClick={() => handleShowContent(false, true)}
        >
          Show Balance Sheet
        </Button>
      </div>

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
