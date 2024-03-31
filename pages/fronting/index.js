  import { useState, useEffect } from "react";
  import useSWR from "swr";
  import { ImArrowDown } from "react-icons/im";
  import PageHeader from "../../components/pageHeader";
  import Modal from "../../components/ui/modal";
  import FrontingForm from "../../components/fronting/frontingForm";
  import Button from "../../components/ui/button";
  import {
    createFrontingExample,
    deleteFrontingExampleById,
  } from "../../lib/api";
  import classes from "./fronting.module.css";
  import FrontingExamplesTable from "../../components/fronting/frontingExamplesTable";
  import BlinkingInstructions from "../../components/ui/blinkingInstructions";

  const Fronting = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleFormSubmit = async (formData) => {
      try {
        await createFrontingExample(formData);
        // Form submission successful, close the modal
        setIsModalOpen(false);
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
        <Button className="addExample" onClick={() => setIsModalOpen(true)}>
          Add Example
        </Button>
        {isModalOpen &&
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          content={<FrontingForm onSubmit={handleFormSubmit} />}
          title="Add Fronting Example"
        />}

        <h2>Fronting Examples</h2>
        <div className={classes.frontingExamplesTableContainer}>
          <FrontingExamplesTable
            examples={frontingExamples}
            onDelete={handleDeleteExample}
            portfolioPage={true}
          />
        </div>
      </main>
    );
  };

  export default Fronting;
