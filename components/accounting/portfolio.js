// route: /accounting/[exampleId]
import { useState, useEffect } from "react";
import { ImArrowLeft } from "react-icons/im";
import Link from "next/link";
import PageHeader from "../../components/pageHeader"
import { getJournalEntries, getLoanAccountingExamples } from "../../lib/api";
import classes from "./portfolio.module.css"
import LoanExamplesTable from "../../components/accounting/loanExamplesTable";
import LoanDetail from "../../components/accounting/loanDetail";



const Portfolio = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
      const fetchData = async () => {
        try {
          const examplesData = await getLoanAccountingExamples();
          setExamples(examplesData);
          const journalEntriesData = await getJournalEntries();
          setJournalEntries(journalEntriesData);
          setLoading(false);
        } catch (error) {
          console.error(
            "Error fetching journal entries & examples:",
            error
          );
        }
      };

      fetchData();
    
  }, [journalEntries]);

  if (loading || journalEntries === null) {
    return <div>Loading...</div>; // Loading state while fetching accounting example details or if journal entries is null
  }


  return (
    <div>
      <PageHeader>
        <h1 className={classes.pageHeader}>Portfolio Summary</h1>
      </PageHeader>
      
      <main className={classes.main}>
      <Link className={classes.link} href="/accounting"><p><ImArrowLeft />&nbsp;&nbsp;<span className={classes.backLinkText}>Back to Examples</span></p></Link>
      <h2 className={classes.summary_header}>Portfolio Positions</h2>
      <LoanExamplesTable
          examples={examples}
          portfolioPage={true}
        />
        <h2>Portfolio Balance Sheet</h2>
      <LoanDetail
          journalEntries={journalEntries}         
           
        />
      </main>
    </div>
  );
};

export default Portfolio;