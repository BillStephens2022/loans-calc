import { useState, useEffect } from "react";
import useSWR from "swr";
import { ImArrowDown } from "react-icons/im";
import PageHeader from "../../components/pageHeader";
import FrontingForm from "../../components/fronting/frontingForm";
import Button from "../../components/ui/button";
import {
  createFrontingExample,
  deleteFrontingExampleById,
} from "../../lib/api";
import classes from "./fronting.module.css";
import FrontingExampleSummary from "../../components/fronting/frontingExampleSummary";
import FrontingExamplesTable from "@/components/fronting/frontingExamplesTable";
import BlinkingInstructions from "@/components/ui/blinkingInstructions";

const Fronting = () => {
  const [formData, setFormData] = useState(null);
  // const [showFrontingExposure, setShowFrontingExposure] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [frontingExamples, setFrontingExamples] = useState([]);

  const { data, error } = useSWR(
    "/api/fronting/",
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 1000 }
  );

  useEffect(() => {
    if (error) {
      console.error("Error fetching fronting examples:", error);
    }
    if (data) {
      const sortedFrontingExamples = data.sort((a, b) =>
        a.borrower.localeCompare(b.borrower)
      );
      setFrontingExamples(sortedFrontingExamples);
    }
  }, [data, error]);

  const calculateNewValues = (formData) => {
    // Calculate new values based on formData
    const {
      globalCommitment,
      globalFundedLoans,
      globalLettersOfCredit,
      lcSublimit,
      lcsIssuedByYourBank,
      swinglineSublimit,
      swinglinesFundedByYourBank,
      yourBankCommitment,
      isNonAccrual,
    } = formData;

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
      ...formData,
      globalAvailability,
      yourBankPercentShare,
      unfundedSwinglineFrontingExposure,
      fundedSwinglineFrontingExposure,
      unissuedLCFrontingExposure,
      issuedLCFrontingExposure,
    };
  };

  const handleFormSubmit = async (formData) => {
    // const combinedProps = calculateNewValues(data);
    // setFormData(combinedProps);
    // setShowForm(false); // Hide the form after submission
    // setShowFrontingExposure(true);

    try {
      await createFrontingExample(formData);
      // Form submission successful, hide the form
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const handleDeleteExample = async (exampleId) => {
    try {
      await deleteFrontingExampleById(exampleId);
      setFrontingExamples(
        frontingExamples.filter((example) => example._id !== exampleId)
      );
    } catch (error) {
      console.error("Error deleting fronting example:", error.message);
    }
  };

  return (
    <main className={classes.fronting_main}>
      <PageHeader>
        <h1 className={classes.pageHeader}>Fronting Risk</h1>
        <h2 className={classes.subHeader}>Examples</h2>
      </PageHeader>
      <BlinkingInstructions page="fronting risk" />
      <Button className="addExample" onClick={() => setShowForm(!showForm)}>
        {!showForm ? "Try New Example" : "Hide Form"}
      </Button>
      <div className={classes.formContainer}>
        {showForm && (
          <div>
            <FrontingForm onSubmit={handleFormSubmit} />
          </div>
        )}
      </div>
      {/* {showFrontingExposure && (
        <div className={classes.frontingExampleContainer}>
          // Pass the combined props to FrontingExampleSummary 
          <FrontingExampleSummary {...formData} />
        </div>
      )} */}

      <h2>Fronting Examples</h2>

      <FrontingExamplesTable
        examples={frontingExamples}
        onDelete={handleDeleteExample}
        portfolioPage={true}
      />
    </main>
  );
};

export default Fronting;
