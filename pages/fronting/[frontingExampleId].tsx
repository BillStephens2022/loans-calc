import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getFrontingExampleById } from "../../lib/api";
import { FrontingExampleDocument } from "../../models/frontingExample";
import { UpdatedFrontingExample } from "../../types/types";
import PageHeader from "../../components/layout/pageHeader";
import classes from "./frontingExampleId.module.css";
import FrontingExampleSummary from "../../components/fronting/frontingExampleSummary";
import BackLink from "../../components/ui/backLink";
import Loader from "../../components/ui/loader";

// page route: /fronting/[frontingExampleId]
// Fronting Example Detail page summary - rendered via dynamic routing when user clicks on an individual fronting example in the
// FrontingExamplesTable on the Fronting Page. Shows the FrontingExampleSummary component - this component contains several tables
// summarizing the risk including the calculated fronting risk.

const FrontingExampleDetail: React.FC = () => {
  // useRouter is used for getting the id from the example clicked on previous page
  const router = useRouter();
  // get id from the dynamic page route
  const { frontingExampleId } = router.query as {
    frontingExampleId: string | undefined;
  };

  // state for setting example when example data retrieved from the database
  const [example, setExample] = useState<FrontingExampleDocument | null>(null);
  // loading state, set to false once data is loaded
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (frontingExampleId) {
      const fetchFrontingExampleDetails = async () => {
        try {
          // use imported function for getting details for the specific fronting example (using the id from the dynamic routing) from the database
          const exampleData: FrontingExampleDocument =
            await getFrontingExampleById(frontingExampleId);
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
    // Loading state while fetching fronting example details or if example is null
    return <Loader loadingText="Fetching Selected Fronting Example..." />;
  }

  // Calculate new values based on example
  const calculateNewValues = (
    example: FrontingExampleDocument
  ): UpdatedFrontingExample => {
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
    const globalAvailability: number = isNonAccrual
      ? 0
      : globalCommitment - globalFundedLoans - globalLettersOfCredit;
    // boolean to indicate whether facility has any availability
    const hasAvailability: boolean = globalAvailability > 0;
    // calculate lender's ('your Bank' from example) share of the global facility's commitment
    const yourBankPercentShare: number = yourBankCommitment / globalCommitment;
    // calulate other lenders' share of the syndicated facility (100% - your bank's share of the global)
    const otherLendersShare: number = 1 - yourBankPercentShare;
    // calculate availability remaining under the swingline sublimit
    const swinglineSublimitAvailability: number =
      swinglineSublimit - swinglinesFundedByYourBank;
    // calculate availability remaining under the lc sublimit
    const lcSublimitAvailability: number = lcSublimit - lcsIssuedByYourBank;
    // calculate total availability under both fronting sublimits (i.e. swingline & LC)
    const totalSublimitAvailability: number =
      swinglineSublimitAvailability + lcSublimitAvailability;
    // boolean to indicate whether borrower has full access to its remaining sublimits
    // i.e. if global availability is less than the total sublimit availabity, borrower can't
    // fully access its sublimits - max fronting exposure will need to be capped based on global availability
    const hasFullSublimitAvailability: boolean =
      globalAvailability >= totalSublimitAvailability;
    // amount sublimit availability exceeds the global (will be used to cap fronting exposure when hasFullSublimitAvailability is false)
    const sublimitOverage: number =
      totalSublimitAvailability - globalAvailability;

    // if availability under sublimits is greater than global facility availability,
    // adjust the availability under the sublimits by a pro-rata share of overage
    const adjustedSwinglineAvailability: number = hasFullSublimitAvailability
      ? swinglineSublimitAvailability
      : swinglineSublimitAvailability -
        (sublimitOverage / totalSublimitAvailability) *
          swinglineSublimitAvailability;

    // if availability under sublimits is greater than global facility availability,
    // adjust the availability under the sublimits by a pro-rata share of overage
    const adjustedLCAvailability: number = hasFullSublimitAvailability
      ? lcSublimitAvailability
      : lcSublimitAvailability -
        (sublimitOverage / totalSublimitAvailability) * lcSublimitAvailability;

    // calculate unfunded swingline fronting exposure based on availability
    const unfundedSwinglineFrontingExposure: number =
      hasAvailability && totalSublimitAvailability > 0
        ? otherLendersShare * adjustedSwinglineAvailability
        : 0;
    // calculate funded swingline fronting exposure based on swinglines drawn
    const fundedSwinglineFrontingExposure: number =
      otherLendersShare * swinglinesFundedByYourBank;
    // calculate unissued LC fronting exposure based on lc sublimit availability
    const unissuedLCFrontingExposure: number =
      hasAvailability && totalSublimitAvailability > 0
        ? otherLendersShare * adjustedLCAvailability
        : 0;
    // calculate issued LC fronting exposure based on LC's issued
    const issuedLCFrontingExposure: number =
      otherLendersShare * lcsIssuedByYourBank;
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
  const updatedExample: UpdatedFrontingExample = calculateNewValues(example);

  return (
    <div>
      <PageHeader>
        <h1 className={classes.pageHeader}>{updatedExample?.borrower}</h1>
        <h2 className={classes.subHeader}>Fronting Details</h2>
      </PageHeader>
      <main className={classes.main}>
        {/* Compponent to render link w/message - link will route back to previous Fronting page */}
        <BackLink page="fronting" text="Fronting Examples" />
        {/* Render Fronting Example risk tables using the updated examples with the calculated values */}
        <FrontingExampleSummary example = {updatedExample} />
      </main>
    </div>
  );
};

export default FrontingExampleDetail;
