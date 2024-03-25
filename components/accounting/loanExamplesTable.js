import { useState } from "react";
import { useRouter } from 'next/router';
import { GoTrash } from "react-icons/go";
import { formatAmount } from "../../util/formatting";
import Button from "../ui/button";
import classes from "./loanExamplesTable.module.css";

const LoanExamplesTable = ({ examples, onDelete, showButtons }) => {
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
    if (!event.target.closest('button')) {
      router.push(`/accounting/${exampleId}`);
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
              <th>Accounting</th>
              <th>Total Commitment</th>
              <th>Funded Loans</th>
              <th>Letters of Credit</th>
              <th>Unfunded Commitment</th>
              <th>Upfront Fees</th>
              <th>Weighted Average Cost</th>
              <th>Loan Mark</th>
              <th>MTM</th>
              {/* {showButtons && <th>View Acctg Details</th>} */}
              {showButtons && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {examples.map((example) => {
              let loanMTM =
                (example.commitment *
                  (example.loanMark - example.weightedAverageCost)) /
                100;
              if (
                (example.accounting === "HFS" && loanMTM > 0) ||
                example.accounting === "HFI"
              ) {
                loanMTM = 0;
              }

          

              return (
                
                  <tr key={example._id} className={classes.tableBodyRows} onClick={(event) => handleRowClick(example._id, event)}>
                    <td>{example.borrower}</td>
                    <td>{example.facility}</td>
                    <td>{example.accounting}</td>
                    <td>{formatAmount(example.commitment)}</td>
                    <td>{formatAmount(example.fundedLoan)}</td>
                    <td>{formatAmount(example.lettersOfCredit)}</td>
                    <td>
                      {formatAmount(
                        example.commitment -
                          example.fundedLoan -
                          example.lettersOfCredit
                      )}
                    </td>
                    <td>{formatAmount(example.upfrontFee)}</td>
                    <td>{example.weightedAverageCost.toFixed(4)}</td>
                    <td>{example.loanMark.toFixed(4)}</td>
                    <td>{formatAmount(loanMTM)}</td>
                    {showButtons && (
                      <td className={classes.deleteCell}>
                        <Button
                          className="deleteButton"
                          onClick={(event) => handleDeleteExample(example._id, event)}
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

export default LoanExamplesTable;
