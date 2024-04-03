import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getLoanAccountingExampleById, getJournalEntriesByExampleId } from "../../lib/api";
import PageHeader from "../../components/layout/pageHeader"
import LoanExamplesTable from "../../components/accounting/loanExamplesTable";
import LoanDetail from "../../components/accounting/loanDetail";
import BackLink from "../../components/ui/backLink";
import classes from "./accountingExampleId.module.css"


// page route: /accounting/[accountingExampleId]
// Accounting Example Detail page summary - rendered via dynamic routing when user clicks on an individual loan example in the 
// LoanExamplesTable on the Accounting Page. Shows LoanExamples component which is the row from the table on the Accounting page, 
// and the LoanDetail component - this component contains several other components which show Balance Sheet, Off Balance Sheet, and
// Journal Entries details.

const AccountingExampleDetail = () => {
  // useRouter is used for getting the id from the example clicked on previous page
  const router = useRouter();
  // get id from the dynamic page route
  const { accountingExampleId } = router.query;
  // state for setting example when example data retrieved from the database
  const [example, setExample] = useState(null);
  // state for setting journal entries when examples journal entries are retrieved from the database
  const [journalEntries, setJournalEntries] = useState([]);
  // loading state, set to false once data is loaded
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (accountingExampleId) {
      const fetchLoanAccountingExampleDetails = async () => {
        try {
          // use imported function for getting details for the specific loan example (using the id from the dynamic routing) from the database 
          const exampleData = await getLoanAccountingExampleById(accountingExampleId);
          // use imported function for getting journal entries for the specific loan example (using the id from the dynamic routing) from the database 
          const journalEntriesData = await getJournalEntriesByExampleId(accountingExampleId);
          // once retrieved, set the state with example and journal entry data
          setExample(exampleData);
          setJournalEntries(journalEntriesData);
          // upon successfully retriving data, set loading state to false
          setLoading(false);
        } catch (error) {
          console.error(
            "Error fetching loan example accounting details:",
            error
          );
        }
      };

      fetchLoanAccountingExampleDetails();
    }
  }, [accountingExampleId]);

  if (loading || example === null) {
    return <div>Loading...</div>; // Loading state while fetching accounting example details or if example is null
  }

  // destructure detail needed from loan example object
  const {
    borrower,
    commitment,
    fundedLoan,
    lettersOfCredit,
    accounting,
    weightedAverageCost,
    loanMark,
  } = example;

  // calculate the unfunded commitment for the example
  const unfundedCommitment = commitment - fundedLoan - lettersOfCredit;

  // calculate the loan mark to market
  let loanMTM = commitment * ((loanMark - weightedAverageCost) / 100);

  // adjust loan MTM based on accounting methodology - 
  // if HFS, factor in lower of cost or market methodology - if loanMTM is greater than zero, set loan MTM to zero. 
  // if HFI, loan MTM is zero since HFI loans are not marked to market (held at amortized cost)
  if (accounting === "HFS" && loanMTM > 0) {
    loanMTM = 0;  // apply LOCOM (lower of cost or market) accounting for HFS. MTM can only be negative on HFS loans
  } 
  if (accounting === "HFI") {
    loanMTM = 0;  // HFI loans aren't marked to market, so set to zero
  }


  return (
    <div>
      <PageHeader>
        <h1 className={classes.pageHeader}>{borrower}</h1>
        <h2 className={classes.subHeader}>Loan Accounting Details</h2>
      </PageHeader>
      
      <main className={classes.main}>
      {/* Compponent to render link w/message - link will route back to previous Accounting page */}
      <BackLink page="accounting" text="Accounting Examples" />
      <h2 className={classes.summary_header}>Loan Facility Summary</h2>
      {/* shows summary of example selected from Accounting page*/}
        <LoanExamplesTable examples={[example]} portfolioPage={false} />
        {/* Loan Detail component contains other components which show balance sheet and off balance sheet as well as journal entries */}
        <LoanDetail
          journalEntries={journalEntries}         
          lettersOfCredit={lettersOfCredit}
          accounting={accounting}
          unfundedCommitment={unfundedCommitment}         
        />
      </main>
    </div>
  );
};

export default AccountingExampleDetail;
