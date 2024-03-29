import { useState } from "react";
import { useRouter } from "next/router";
import { GoTrash } from "react-icons/go";
import { formatAmount } from "../../util/formatting";
import Button from "../ui/button";
import classes from "./frontingExamplesTable.module.css";

const FrontingExamplesTable = ({ examples, onDelete, portfolioPage }) => {
  const [loading, setLoading] = useState(false); // use state to disable delete button while process is executing
  const router = useRouter();
  const handleDeleteExample = async (exampleId, event) => {
    event.stopPropagation(); // Stop event propagation to prevent row click event
    setLoading(true);
    try {
      onDelete(exampleId); // Notify parent component that example was deleted
    } catch (error) {
      console.error("Error deleting example:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (exampleId, event) => {
    if (!event.target.closest("button")) {
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
              const calculateGlobalUnfundedCommitment = (example) => {
                return example.globalCommitment - example.globalFundedLoans - example.globalLettersOfCredit;
              }
              
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
                  <td>{formatAmount(calculateGlobalUnfundedCommitment(example))}</td>
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
                        onClick={(event) =>
                          handleDeleteExample(example._id, event)
                        }
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
    </div>
  );
};

export default FrontingExamplesTable;
