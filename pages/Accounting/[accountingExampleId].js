// route: /Accounting/[exampleId]
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getLoanAccountingExampleById } from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import classes from "@/pages/Accounting/accountingExampleId.module.css";

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
    
  return (
    <div>
    <PageHeader>
        <h1>Example Detail</h1>
        <h2>{accountingExampleId}</h2>
    </PageHeader>
    <h1>{example.borrower}</h1>
    </div>
  );
}

export default AccountingExampleDetail;