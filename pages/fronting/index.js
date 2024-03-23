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
    } = formData;

    const globalAvailability =
      globalCommitment - globalFundedLoans - globalLettersOfCredit;
    const hasAvailability = globalAvailability > 0;
    const yourBankPercentShare = yourBankCommitment / globalCommitment;
    const otherLendersShare = 1 - yourBankPercentShare;
    const swinglineSublimitAvailability =
      swinglineSublimit - swinglinesFundedByYourBank;
    const lcSublimitAvailability = lcSublimit - lcsIssuedByYourBank;
    const totalSublimitAvailability =
      swinglineSublimitAvailability + lcSublimitAvailability;

    const unfundedSwinglineFrontingExposure =
      hasAvailability && totalSublimitAvailability > 0
        ? otherLendersShare * swinglineSublimitAvailability
        : 0;
    const fundedSwinglineFrontingExposure =
      hasAvailability && totalSublimitAvailability > 0
        ? otherLendersShare * swinglinesFundedByYourBank
        : 0;
    const unissuedLCFrontingExposure =
      hasAvailability && totalSublimitAvailability > 0
        ? otherLendersShare * lcSublimitAvailability
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
      <PageHeader><h1>Fronting Risk</h1></PageHeader>
      
      <div className={classes.formContainer}>
        {showForm ? (
          <div>
          <h2 className={classes.fronting_subheader}>
          Enter details about a loan to calculate potential Fronting Exposure
        </h2>
          <FrontingForm onSubmit={handleFormSubmit} />
          </div>
        ) : (
          <Button onClick={handleUpdateForm}>Try a New Example</Button>
        )}
      </div>
      {showFrontingExposure && (
        <div>

          {/* Pass the combined props to FrontingExampleSummary */}
          <FrontingExampleSummary {...formData} />
        </div>
      )}
    </main>
  );
};

export default Fronting;
