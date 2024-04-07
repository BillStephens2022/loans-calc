import React, { useState, useEffect } from "react";
import useSWR from "swr";
import {
  createFrontingExample,
  deleteFrontingExampleById,
  getFrontingExamples
} from "../../lib/api";
import { FrontingExampleDocument } from "../../models/frontingExample";
import { FrontingExampleFormData } from "../../types/types";
import PageHeader from "../../components/layout/pageHeader";
import Modal from "../../components/ui/modal";
import FrontingForm from "../../components/fronting/frontingForm";
import Button from "../../components/ui/button";
import FrontingExamplesTable from "../../components/fronting/frontingExamplesTable";
import BlinkingInstructions from "../../components/ui/blinkingInstructions";
import classes from "./fronting.module.css";

// page route: /fronting
// Fronting Page summary - the fronting page features a table of fronting examples retrieved from the database.
// A user can click the button to add a new fronting example to the database/table.  Within the table,
// the user can click on an individual example to see the calculated fronting risk as well as the total
// risk/exposure for the facility - this is done via NextJS dynamic page routing.

interface FrontingProps {
  frontingExamples: FrontingExampleDocument[];
}

const Fronting: React.FC<FrontingProps> = ({ frontingExamples }) => {
  // state for opening / closing the modal containing the FrontingForm for entering examples
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // state for setting fronting examples as data is retrieved from the database as well as new
  // examples are created or existing examples are deleted.
  const [examples, setExamples] = useState<
    FrontingExampleDocument[]
  >(frontingExamples || {});

  // useSWR hook used for fronting examples data retrieval from the database
  const { data, error } = useSWR<FrontingExampleDocument[]>(
    "/api/fronting/",
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 1000 }
  );

  useEffect(() => {
    if (error) {
      console.error("Error fetching fronting examples:", error);
    }
    // sort the fronting examples by borrower name (alphabetical order) and update state
    // so examples are rendered in order
    if (data) {
      const sortedFrontingExamples = data.sort((a, b) =>
        a.borrower.localeCompare(b.borrower)
      );
      setExamples(sortedFrontingExamples);
    }
  }, [data, error]);

  // handle the FrontingForm submit (in the pop up modal). Uses
  // imported custom function 'createFrontingExample' to post the
  // example to the database and close the modal.
  const handleFormSubmit = async (formData: FrontingExampleFormData) => {
    try {
      await createFrontingExample(formData);
      // Form submission successful, close the modal
      setIsModalOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error submitting form:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };
  // handle deleting a fronting example from the database when a delete button
  // is clicked on a specific example in the FrontingExamplesTable component.
  const handleDeleteExample = async (exampleId: string) => {
    try {
      // imported custom function to delete specific fronting example from the database
      await deleteFrontingExampleById(exampleId);
      // remove deleted item from fronting examples dataset and reset state
      setExamples(
        examples.filter((example) => example._id !== exampleId)
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error submitting form:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  return (
    <main className={classes.fronting_main}>
      <PageHeader>
        <h1 className={classes.pageHeader}>Fronting Risk</h1>
        <h2 className={classes.subHeader}>Examples</h2>
      </PageHeader>
      {/* Instructions for clicking on a specific fronting example in table to see further detail */}
      <BlinkingInstructions page="fronting risk" />
      {/* Button to toggle modal opening of form for entering a new fronting example */}
      <Button className="addExample" onClick={() => setIsModalOpen(true)}>
        Add Example
      </Button>
      {/* If modal is open (via button click above), show the form */}
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          content={<FrontingForm onSubmit={handleFormSubmit} />}
          title="Add Fronting Example"
        />
      )}

      <h2 className={classes.frontingTableHeader}>Fronting Examples</h2>
      <div className={classes.frontingExamplesTableContainer}>
        {/* Table showing all entered fronting examples from the database */}
        <FrontingExamplesTable
          examples={examples}
          onDelete={handleDeleteExample}
          portfolioPage={true}
        />
      </div>
    </main>
  );
};

// for serving up table of examples
export async function getStaticProps() {
  let frontingExamples: FrontingExampleDocument[] = [];

  try {
    const frontingExamplesJSON = await getFrontingExamples();
    frontingExamples = frontingExamplesJSON.sort((a:FrontingExampleDocument, b: FrontingExampleDocument) =>
      a.borrower.localeCompare(b.borrower)
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Uknown Error!");
    }
  }

  return {
    props: {
      frontingExamples,
    },
    revalidate: 1200, // Re-generate page every 1200 seconds (20 minutes) using loan examples props from the database
  };
}

export default Fronting;
