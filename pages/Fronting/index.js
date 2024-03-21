import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import FrontingForm from "@/components/fronting/FrontingForm";
import Button from "@/components/ui/Button";
import { formatAmount } from "@/util/formatting";
import classes from "@/pages/Fronting/Fronting.module.css";

const Fronting = () => {
  const [formData, setFormData] = useState(null);
  const [showFrontingExposure, setShowFrontingExposure] = useState(false);
  const [frontingExposure, setFrontingExposure] = useState({});
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    if (formData) {
      const {
        globalCommitment,
        globalFundedLoans,
        globalLettersOfCredit,
        lcIssuer,
        swinglineLender,
        swinglineSublimit,
        lcSublimit,
        yourBankCommitment,
        lcsIssuedByYourBank,
        swinglinesFundedByYourBank,
      } = formData;

      const globalAvailability =
        globalCommitment - globalFundedLoans - globalLettersOfCredit;
      console.log("Global Availability", globalAvailability);
      const hasAvailability = globalAvailability > 0;
      const yourBankPercentShare = yourBankCommitment / globalCommitment;
      const otherLendersShare = 1 - yourBankPercentShare;
      const swinglineSublimitAvailability =
        swinglineSublimit - swinglinesFundedByYourBank;
      const lcSublimitAvailability = lcSublimit - lcsIssuedByYourBank;
      const totalSublimitAvailability =
        swinglineSublimitAvailability + lcSublimitAvailability;

      let unfundedSwinglineFrontingExposure = 0;
      let fundedSwinglineFrontingExposure = 0;
      let unissuedLCFrontingExposure = 0;
      let issuedLCFrontingExposure = 0;

      if (hasAvailability && totalSublimitAvailability > 0) {
        if (swinglineSublimitAvailability > 0) {
          unfundedSwinglineFrontingExposure =
            otherLendersShare * swinglineSublimitAvailability;
          fundedSwinglineFrontingExposure =
            otherLendersShare * swinglinesFundedByYourBank;
        }
        if (lcSublimitAvailability > 0) {
          unissuedLCFrontingExposure =
            otherLendersShare * lcSublimitAvailability;
          issuedLCFrontingExposure = otherLendersShare * lcsIssuedByYourBank;
        }
      }

      const exposure = {
        unfundedSwinglineFrontingExposure,
        fundedSwinglineFrontingExposure,
        unissuedLCFrontingExposure,
        issuedLCFrontingExposure,
      };

      setFrontingExposure(exposure);
      setShowFrontingExposure(true);
    }
  }, [formData]);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setShowForm(false); // Hide the form after submission
  };

  const handleUpdateForm = () => {
    setShowForm(true); // Show the form again when "Update Form" button is clicked
  };

  return (
    <main className={classes.fronting_main}>
      <PageHeader>Fronting Risk</PageHeader>
      <h2 className={classes.fronting_subheader}>
        Enter details about a loan to calculate potential Fronting Exposure
      </h2>
      <div className={classes.formContainer}>
        {showForm ? (
          <FrontingForm onSubmit={handleFormSubmit} />
        ) : (
          <Button onClick={handleUpdateForm}>Try a New Example</Button>
        )}
      </div>
      {showFrontingExposure && (
        <div>
          <h3>Fronting Exposure:</h3>
          <ul className={classes.frontingExposureList}>
            <li className={classes.frontingExposureListItem}>
              Unfunded Swingline Fronting:{" "}
              {formatAmount(frontingExposure.unfundedSwinglineFrontingExposure)}
            </li>
            <li className={classes.frontingExposureListItem}>
              Funded Swingline Fronting:{" "}
              {formatAmount(frontingExposure.fundedSwinglineFrontingExposure)}
            </li>
            <li className={classes.frontingExposureListItem}>
              Unissued/Unutilized LC Fronting:{" "}
              {formatAmount(frontingExposure.unissuedLCFrontingExposure)}
            </li>
            <li className={classes.frontingExposureListItem}>
              Issued LC Fronting:{" "}
              {formatAmount(frontingExposure.issuedLCFrontingExposure)}
            </li>
          </ul>
        </div>
      )}
    </main>
  );
};

export default Fronting;
