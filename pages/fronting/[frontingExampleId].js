import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getFrontingExampleById } from "../../lib/api";
import PageHeader from "../../components/layout/pageHeader";
import classes from "./frontingExampleId.module.css";
import FrontingExampleSummary from "../../components/fronting/frontingExampleSummary";
import BackLink from "../../components/ui/backLink";

const FrontingExampleDetail = () => {
  const router = useRouter();
  const { frontingExampleId } = router.query;

  const [example, setExample] = useState(null);
  const [loading, setLoading] = useState(true); // loading state, set to false once data is loaded

  useEffect(() => {
    if (frontingExampleId) {
      const fetchFrontingExampleDetails = async () => {
        try {
          const exampleData = await getFrontingExampleById(frontingExampleId);
          setExample(exampleData);

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

  const calculateNewValues = (example) => {
    // Calculate new values based on example
    const {
      borrower,
      yourBankName,
      facility,
      globalCommitment,
      globalFundedLoans,
      globalLettersOfCredit,
      yourBankCommitment,
      isLCIssuer,
      isSwinglineLender,
      isNonAccrual,
      swinglineSublimit,
      swinglinesFundedByYourBank,
      lcSublimit,
      lcsIssuedByYourBank,
    } = example;

    const globalAvailability = isNonAccrual
      ? 0
      : globalCommitment - globalFundedLoans - globalLettersOfCredit;
    const hasAvailability = globalAvailability > 0;
    const yourBankPercentShare = yourBankCommitment / globalCommitment;
    const otherLendersShare = 1 - yourBankPercentShare;
    const swinglineSublimitAvailability =
      swinglineSublimit - swinglinesFundedByYourBank;
    const lcSublimitAvailability = lcSublimit - lcsIssuedByYourBank;

    const totalSublimitAvailability =
      swinglineSublimitAvailability + lcSublimitAvailability;

    const hasFullSublimitAvailability =
      globalAvailability >= totalSublimitAvailability;
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

    const unfundedSwinglineFrontingExposure =
      hasAvailability && totalSublimitAvailability > 0
        ? otherLendersShare * adjustedSwinglineAvailability
        : 0;
    const fundedSwinglineFrontingExposure =
      otherLendersShare * swinglinesFundedByYourBank;

    const unissuedLCFrontingExposure =
      hasAvailability && totalSublimitAvailability > 0
        ? otherLendersShare * adjustedLCAvailability
        : 0;

    const issuedLCFrontingExposure = otherLendersShare * lcsIssuedByYourBank;

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

  const updatedExample = calculateNewValues(example);

  return (
    <div>
      <PageHeader>
        <h1 className={classes.pageHeader}>{updatedExample.borrower}</h1>
        <h2 className={classes.subHeader}>Fronting Details</h2>
      </PageHeader>
      <main className={classes.main}>
        <BackLink page="fronting" text="Fronting Examples" />
        <FrontingExampleSummary {...updatedExample} />
      </main>
    </div>
  );
};

export default FrontingExampleDetail;
