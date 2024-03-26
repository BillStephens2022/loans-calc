import { useState } from "react";
import PageHeader from "../../components/pageHeader";
import FrontingForm from "../../components/fronting/frontingForm";
import Button from "../../components/ui/button";
import classes from "./fronting.module.css";
import FrontingExampleSummary from "../../components/fronting/frontingExampleSummary";

const Fronting = () => {
  const [formData, setFormData] = useState(null);
  const [showFrontingExposure, setShowFrontingExposure] = useState(false);
  const [showForm, setShowForm] = useState(true);

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
      nonAccrual,
    } = formData;

    const globalAvailability = nonAccrual
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
        (sublimitOverage / totalSublimitAvailability) *
          lcSublimitAvailability;

    const unfundedSwinglineFrontingExposure =
      hasAvailability && totalSublimitAvailability > 0
        ? otherLendersShare * adjustedSwinglineAvailability
        : 0;
    const fundedSwinglineFrontingExposure =
      hasAvailability && totalSublimitAvailability > 0
        ? otherLendersShare * swinglinesFundedByYourBank
        : 0;
    const unissuedLCFrontingExposure =
      hasAvailability && totalSublimitAvailability > 0
        ? otherLendersShare * adjustedLCAvailability
        : 0;
    const issuedLCFrontingExposure =
      hasAvailability && totalSublimitAvailability > 0
        ? otherLendersShare * lcsIssuedByYourBank
        : 0;

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

  const handleFormSubmit = (data) => {
    const combinedProps = calculateNewValues(data);
    setFormData(combinedProps);
    setShowForm(false); // Hide the form after submission
    setShowFrontingExposure(true);
  };

  const handleUpdateForm = () => {
    setShowForm(true); // Show the form again when "Update Form" button is clicked
    setShowFrontingExposure(false);
  };

  return (
    <main className={classes.fronting_main}>
      <PageHeader>
        <h1 className={classes.pageHeader}>Fronting Risk</h1>
      </PageHeader>

      <div className={classes.formContainer}>
        {showForm ? (
          <div>
            <h2 className={classes.fronting_subheader}>
              Enter details about a loan to calculate potential Fronting
              Exposure
            </h2>
            <FrontingForm onSubmit={handleFormSubmit} />
          </div>
        ) : (
          <Button className="addExample" onClick={handleUpdateForm}>
            Try New Example
          </Button>
        )}
      </div>
      {showFrontingExposure && (
        <div className={classes.frontingExampleContainer}>
          {/* Pass the combined props to FrontingExampleSummary */}
          <FrontingExampleSummary {...formData} />
        </div>
      )}
    </main>
  );
};

export default Fronting;
