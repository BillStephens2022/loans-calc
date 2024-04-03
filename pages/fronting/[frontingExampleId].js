import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getFrontingExampleById } from "../../lib/api";
import PageHeader from "../../components/layout/pageHeader";
import classes from "./frontingExampleId.module.css";
import FrontingExampleSummary from "../../components/fronting/frontingExampleSummary";
import BackLink from "../../components/ui/backLink";

// page route: /fronting/[frontingExampleId]
// Fronting Example Detail page summary - rendered via dynamic routing when user clicks on an individual fronting example in the 
// FrontingExamplesTable on the Fronting Page. Shows the FrontingExampleSummary component - this component contains several tables
// summarizing the risk including the calculated fronting risk.

const FrontingExampleDetail = () => {
  // useRouter is used for getting the id from the example clicked on previous page
  const router = useRouter();
   // get id from the dynamic page route
  const { frontingExampleId } = router.query;

  // state for setting example when example data retrieved from the database
  const [example, setExample] = useState(null);
  // loading state, set to false once data is loaded
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (frontingExampleId) {
      const fetchFrontingExampleDetails = async () => {
        try {
          // use imported function for getting details for the specific fronting example (using the id from the dynamic routing) from the database 
          const exampleData = await getFrontingExampleById(frontingExampleId);
          // once retrieved, set the state with fronting example 
          setExample(exampleData);
          // upon successfully retriving data, set loading state to false
          setLoading(false);
        } catch (error) {
          console.error(
            "Error fetching loan example accounting details:",
            error
          );
        }
      };

      fetchFrontingExampleDetails();
    }
  }, [frontingExampleId]);

  if (loading || example === null) {
    return <div>Loading...</div>; // Loading state while fetching fronting example details or if example is null
  }

  // Calculate new values based on example
  const calculateNewValues = (example) => {
    // destructure values needed to perform calculation from the fronting example
    const {
      globalCommitment,
      globalFundedLoans,
      globalLettersOfCredit,
      yourBankCommitment,
      isNonAccrual,
      swinglineSublimit,
      swinglinesFundedByYourBank,
      lcSublimit,
      lcsIssuedByYourBank,
    } = example;

    // determine global availability under facility (i.e. can borrower draw additional funds or request additional LCs).  
    // if non-accrual, assume availability is zero since lender has defaulted and can't utilize facility any further
    const globalAvailability = isNonAccrual
      ? 0
      : globalCommitment - globalFundedLoans - globalLettersOfCredit;
    // boolean to indicate whether facility has any availability
    const hasAvailability = globalAvailability > 0;
    // calculate lender's ('your Bank' from example) share of the global facility's commitment
    const yourBankPercentShare = yourBankCommitment / globalCommitment;
    // calulate other lenders' share of the syndicated facility (100% - your bank's share of the global)
    const otherLendersShare = 1 - yourBankPercentShare;
    // calculate availability remaining under the swingline sublimit
    const swinglineSublimitAvailability =
      swinglineSublimit - swinglinesFundedByYourBank;
    // calculate availability remaining under the lc sublimit
    const lcSublimitAvailability = lcSublimit - lcsIssuedByYourBank;
    // calculate total availability under both fronting sublimits (i.e. swingline & LC)
    const totalSublimitAvailability =
      swinglineSublimitAvailability + lcSublimitAvailability;
    // boolean to indicate whether borrower has full access to its remaining sublimits
    // i.e. if global availability is less than the total sublimit availabity, borrower can't
    // fully access its sublimits - max fronting exposure will need to be capped based on global availability
    const hasFullSublimitAvailability =
      globalAvailability >= totalSublimitAvailability;
    // amount sublimit availability exceeds the global (will be used to cap fronting exposure when hasFullSublimitAvailability is false)
    const sublimitOverage = totalSublimitAvailability - globalAvailability;

    // if availability under sublimits is greater than global facility availability,
    // adjust the availability under the sublimits by a pro-rata share of overage
    const adjustedSwinglineAvailability = hasFullSublimitAvailability
      ? swinglineSublimitAvailability
      : swinglineSublimitAvailability -
        (sublimitOverage / totalSublimitAvailability) *
          swinglineSublimitAvailability;

    // if availability under sublimits is greater than global facility availability,
    // adjust the availability under the sublimits by a pro-rata share of overage
    const adjustedLCAvailability = hasFullSublimitAvailability
      ? lcSublimitAvailability
      : lcSublimitAvailability -
        (sublimitOverage / totalSublimitAvailability) * lcSublimitAvailability;

    // calculate unfunded swingline fronting exposure based on availability
    const unfundedSwinglineFrontingExposure =
      hasAvailability && totalSublimitAvailability > 0
        ? otherLendersShare * adjustedSwinglineAvailability
        : 0;
    // calculate funded swingline fronting exposure based on swinglines drawn
    const fundedSwinglineFrontingExposure =
      otherLendersShare * swinglinesFundedByYourBank;
    // calculate unissued LC fronting exposure based on lc sublimit availability
    const unissuedLCFrontingExposure =
      hasAvailability && totalSublimitAvailability > 0
        ? otherLendersShare * adjustedLCAvailability
        : 0;
    // calculate issued LC fronting exposure based on LC's issued
    const issuedLCFrontingExposure = otherLendersShare * lcsIssuedByYourBank;
    // return example object update with newly calculated values above
    return {
      ...example,
      globalAvailability,
      yourBankPercentShare,
      unfundedSwinglineFrontingExposure,
      fundedSwinglineFrontingExposure,
      unissuedLCFrontingExposure,
      issuedLCFrontingExposure,
    };
  };

  // create updated example - included newly calculated values using calculateNewValues function
  const updatedExample = calculateNewValues(example);

  return (
    <div>
      <PageHeader>
        <h1 className={classes.pageHeader}>{updatedExample.borrower}</h1>
        <h2 className={classes.subHeader}>Fronting Details</h2>
      </PageHeader>
      <main className={classes.main}>
        {/* Compponent to render link w/message - link will route back to previous Fronting page */}
        <BackLink page="fronting" text="Fronting Examples" />
        {/* Render Fronting Example risk tables using the updated examples with the calculated values */}
        <FrontingExampleSummary {...updatedExample} />
      </main>
    </div>
  );
};

export default FrontingExampleDetail;
