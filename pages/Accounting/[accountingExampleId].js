// route: /Accounting/[exampleId]
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PageHeader from "@/components/PageHeader";
import classes from "@/pages/Accounting/accountingExampleId.module.css";

const AccountingExampleDetail = () => {
    const router = useRouter();
    const { accountingExampleId } = router.query;
    // const [example, setExample] = useState(null);
    console.log("accounting Example ID: ", accountingExampleId);

    
  return (
    <div>
    <PageHeader>
        <h1>Example Detail</h1>
        <h2>{accountingExampleId}</h2>
    </PageHeader>
    </div>
  );
}

export default AccountingExampleDetail;