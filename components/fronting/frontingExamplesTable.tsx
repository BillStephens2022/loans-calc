import React, { useState } from "react";
import { useRouter } from "next/router";
import { GoTrash } from "react-icons/go";
import { ImArrowLeft, ImArrowRight } from "react-icons/im";
import { formatAmount } from "../../util/formatting";
import Button from "../ui/button";
import classes from "./frontingExamplesTable.module.css";
import { FrontingExampleDocument } from "../../models/frontingExample";

// Fronting Examples Table shows a summary of all of the fronting examples on the Fronting page
// also renders a delete button in the table so user can delete a specific example
interface FrontingExamplesTableProps {
  examples: FrontingExampleDocument[];
  onDelete: (exampleId: string) => void;
  portfolioPage: boolean;
}
const FrontingExamplesTable: React.FC<FrontingExamplesTableProps> = ({
  examples,
  onDelete,
  portfolioPage,
}) => {
  // state used to disable delete button while process is executing
  const [loading, setLoading] = useState<boolean>(false);
  // used for routing when a specific loan example is clicked on the table
  const router = useRouter();

  // handler for deleting a specific fronting example from the database/table
  const handleDeleteExample = async (
    exampleId: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Stop event propagation to prevent row click event - i.e. don't want the page to route to the detailed example page
    // this prevents 'handleRowClick' (defined below) from executing.
    event.stopPropagation();
    // set loading state to true while waiting to delete from the dabase
    setLoading(true);
    try {
      onDelete(exampleId); // Notify parent component that example was deleted
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting example:", error.message);
      } else {
        console.error("Unknown error!");
      }
    } finally {
      // set loading state to false
      setLoading(false);
    }
  };

  // if user clicks on row, route to the [frontingExampleId] page to view the details for the specific example
  const handleRowClick = (
    exampleId: string,
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    const target = event.target as Element;
    if (!target.closest || !target.closest("button")) {
      router.push(`/fronting/${exampleId}`);
    }
  };

  return (
    <div className={classes.tableWrapper}>
      <div className={classes.scrollableTableWrapper}>
        <table className={classes.loanExamples_table}>
          <thead>
            <tr className={classes.tableHeaderRow}>
              <th>Borrower</th>
              <th>Facility</th>
              <th>Global Commitment</th>
              <th>Global Funded Loans</th>
              <th>Global LC's</th>
              <th>Global Unfunded Commitment</th>
              <th>Your Bank's Commitment</th>
              <th>Swingline Lender</th>
              <th>LC Issuer</th>
              <th>NonAccrual</th>
              <th>Swingline Sublimit</th>
              <th>Swinglines Funded by Your Bank</th>
              <th>LC Sublimit</th>
              <th>LC's Issued by Your Bank</th>
              {portfolioPage && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {examples.map((example) => {
              const calculateGlobalUnfundedCommitment = (
                example: FrontingExampleDocument
              ) => {
                return (
                  example.globalCommitment -
                  example.globalFundedLoans -
                  example.globalLettersOfCredit
                );
              };

              return (
                <tr
                  key={example._id}
                  className={classes.tableBodyRows}
                  onClick={(event) => handleRowClick(example._id, event)}
                >
                  <td>{example.borrower}</td>
                  <td>{example.facility}</td>
                  <td>{formatAmount(example.globalCommitment)}</td>
                  <td>{formatAmount(example.globalFundedLoans)}</td>
                  <td>{formatAmount(example.globalLettersOfCredit)}</td>
                  <td>
                    {formatAmount(calculateGlobalUnfundedCommitment(example))}
                  </td>
                  <td>{formatAmount(example.yourBankCommitment)}</td>
                  <td>{example.isSwinglineLender ? "Y" : "N"}</td>
                  <td>{example.isLCIssuer ? "Y" : "N"}</td>
                  <td>{example.isNonAccrual ? "Y" : "N"}</td>
                  <td>{formatAmount(example.swinglineSublimit)}</td>
                  <td>{formatAmount(example.swinglinesFundedByYourBank)}</td>
                  <td>{formatAmount(example.lcSublimit)}</td>
                  <td>{formatAmount(example.lcsIssuedByYourBank)}</td>
                  {portfolioPage && (
                    <td className={classes.deleteCell}>
                      <Button
                        className="deleteButton"
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) => handleDeleteExample(example._id, event)}
                        disabled={loading}
                      >
                        <GoTrash />
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className={classes.scrollText}>
        <ImArrowLeft /> Scroll <ImArrowRight />
      </p>
    </div>
  );
};

export default FrontingExamplesTable;
