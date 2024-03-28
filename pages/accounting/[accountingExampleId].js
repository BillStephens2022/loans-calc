// route: /accounting/[exampleId]
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ImArrowLeft } from "react-icons/im";
import { getLoanAccountingExampleById, getJournalEntriesByExampleId } from "@/lib/api";
import PageHeader from "../../components/pageHeader"
import classes from "./accountingExampleId.module.css"
import LoanExamplesTable from "../../components/accounting/loanExamplesTable";
import LoanDetail from "../../components/accounting/loanDetail";
import Link from "next/link";

const AccountingExampleDetail = () => {
  const router = useRouter();
  const { accountingExampleId } = router.query;
  const [example, setExample] = useState(null);
  const [journalEntries, setJournalEntries] = useState([]);
  const [loading, setLoading] = useState(true); // accounting example data loading state

  useEffect(() => {
    if (accountingExampleId) {
      const fetchLoanAccountingExampleDetails = async () => {
        try {
          const exampleData = await getLoanAccountingExampleById(accountingExampleId);
          const journalEntriesData = await getJournalEntriesByExampleId(accountingExampleId);
          setExample(exampleData);
          setJournalEntries(journalEntriesData);
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

  const {
    borrower,
    facility,
    commitment,
    fundedLoan,
    lettersOfCredit,
    accounting,
    weightedAverageCost,
    upfrontFee,
    loanMark,
  } = example;



  const unfundedCommitment = commitment - fundedLoan - lettersOfCredit;
  const cash = -fundedLoan + upfrontFee;
  let loanMTM = commitment * ((loanMark - weightedAverageCost) / 100);
  if (accounting === "HFS" && loanMTM > 0) {
    loanMTM = 0;  // apply LOCOM (lower of cost or market) accounting for HFS. MTM can only be negative on HFS loans
  } 
  if (accounting === "HFI") {
    loanMTM = 0;  // HFI loans aren't marked to market, so set to zero
  }

  // Pro-rate the Loan MTM
  const fundedMTM = loanMTM / commitment * fundedLoan; // calculate funded portion of Loan MTM
  const unfundedMTM = loanMTM / commitment * unfundedCommitment; // calculate unfunded portion of Loan MTM
  const lettersOfCreditMTM = loanMTM / commitment * lettersOfCredit; // calculate letter of credit portion of Loan MTM

  return (
    <div>
      <PageHeader>
        <h1 className={classes.pageHeader}>{borrower}</h1>
        <h2 className={classes.subHeader}>Loan Accounting Details</h2>
      </PageHeader>
      
      <main className={classes.main}>
      <Link className={classes.link} href="/accounting"><p><ImArrowLeft />&nbsp;&nbsp;<span className={classes.backLinkText}>Back to Examples</span></p></Link>
      <h2 className={classes.summary_header}>Loan Facility Summary</h2>
        <LoanExamplesTable examples={[example]} showButtons={false} />
        <LoanDetail
          example={example}
          borrower={borrower}
          facility={facility}
          commitment={commitment}
          fundedLoan={fundedLoan}
          lettersOfCredit={lettersOfCredit}
          accounting={accounting}
          unfundedCommitment={unfundedCommitment}
          upfrontFee={upfrontFee}
          loanMark={loanMark}
          weightedAverageCost={weightedAverageCost}
          cash={cash}
          fundedMTM={fundedMTM}
          unfundedMTM={unfundedMTM}
          lettersOfCreditMTM={lettersOfCreditMTM}
        />
      </main>
    </div>
  );
};

export default AccountingExampleDetail;
