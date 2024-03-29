import { useState, useEffect } from "react";
import useSWR from "swr";
import PageHeader from "../../components/pageHeader";
import FrontingForm from "../../components/fronting/frontingForm";
import Button from "../../components/ui/button";
import { createFrontingExample, deleteFrontingExampleById } from "../../lib/api";
import classes from "./fronting.module.css";
import FrontingExampleSummary from "../../components/fronting/frontingExampleSummary";
import FrontingExamplesTable from "@/components/fronting/frontingExamplesTable";

const Fronting = () => {
  const [formData, setFormData] = useState(null);
  // const [showFrontingExposure, setShowFrontingExposure] = useState(false);
  const [showForm, setShowForm] = useState(true);
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

  const handleUpdateForm = () => {
    setShowForm(true); // Show the form again when "Update Form" button is clicked
    // setShowFrontingExposure(false);
  };

  const handleDeleteExample = async (exampleId) => {
    try {
      await deleteFrontingExampleById(exampleId);
      setFrontingExamples(frontingExamples.filter((example) => example._id !== exampleId));
    } catch (error) {
      console.error("Error deleting fronting example:", error.message);
    }
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
      {/* {showFrontingExposure && (
        <div className={classes.frontingExampleContainer}>
          // Pass the combined props to FrontingExampleSummary 
          <FrontingExampleSummary {...formData} />
        </div>
      )} */}
      
        {frontingExamples.map((example) => {
          console.log(example);
          return (
          <div key={example._id}>
          <p>Borrower: {example.borrower}</p>
          <p>Facility: {example.facility}</p>
          <p>Global Commitment: {example.globalCommitment}</p>
          <p>LC Issuer? {String(example.isLCIssuer)}</p>
          <p>Swingline Lender? {String(example.isSwinglineLender)}</p>
          <p>Non Accrual? {String(example.isNonAccrual)}</p>
          </div>)
})}

          <FrontingExamplesTable examples={frontingExamples} onDelete={handleDeleteExample} portfolioPage={true}/>
    
    </main>
  );
};

export default Fronting;
