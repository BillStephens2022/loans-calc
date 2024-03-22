// route: /Accounting/[exampleId]
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getLoanAccountingExampleById } from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import classes from "@/pages/Accounting/accountingExampleId.module.css";
import LoanExamplesTable from "@/components/accounting/LoanExamplesTable";
import LoanDetail from "@/components/accounting/LoanDetail";

const AccountingExampleDetail = () => {
    const router = useRouter();
    const { accountingExampleId } = router.query;
    const [example, setExample] = useState(null);
    const [loading, setLoading] = useState(true);  // accounting example data loading state
    console.log("accounting Example ID: ", accountingExampleId);
    
    useEffect(() => {
        if (accountingExampleId) {
      
          const fetchLoanAccountingExampleDetails = async () => {
            try {
              const data = await getLoanAccountingExampleById(accountingExampleId);
              setExample(data); // Update example state with fetched data
              setLoading(false);
            } catch (error) {
              console.error("Error fetching loan example accounting details:", error);
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
        upfrontFee,
        loanMark,
      } = example;

      const unfundedCommitment = commitment - fundedLoan - lettersOfCredit;
      const weightedAverageCost = (1 - upfrontFee / commitment) * 100;
      const cash = -fundedLoan + upfrontFee;
      const fundedMTM = ((loanMark - weightedAverageCost) / 100) * fundedLoan;
      const unfundedMTM =
        ((loanMark - weightedAverageCost) / 100) * unfundedCommitment;
      const lettersOfCreditMTM =
        ((loanMark - weightedAverageCost) / 100) * lettersOfCredit;
    
  return (
    <div>
    <PageHeader>
        <h1>{borrower}</h1>
        <h2>Loan Accounting Details</h2>
    </PageHeader>
    <h2 className={classes.summary_header}>Loan Facility Summary</h2>
    <main className={classes.main}>
        <LoanExamplesTable examples={[example]} showButtons={false} />
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
    </main>
  
    </div>
  );
}

export default AccountingExampleDetail;