import { useState } from "react";
import { useRouter } from "next/router";
import { GoTrash } from "react-icons/go";
import { formatAmount } from "../../util/formatting";
import Button from "../ui/button";
import classes from "./loanExamplesTable.module.css";

const LoanExamplesTable = ({ examples, onDelete, portfolioPage }) => {
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
      router.push(`/accounting/${exampleId}`);
    }
  };

  const calculateUnfundedCommitment = (example) => {
    return example.commitment - example.fundedLoan - example.lettersOfCredit;
  };

  const calculateLoanMTM = (example) => {
    let loanMTM =
      (example.commitment * (example.loanMark - example.weightedAverageCost)) /
      100;
    if (
      (example.accounting === "HFS" && loanMTM > 0) ||
      example.accounting === "HFI"
    ) {
      loanMTM = 0;
    }
    return loanMTM;
  };

  // Function to calculate totals for specified columns
  const calculateColumnTotal = (column) => {
    return examples.reduce((total, example) => total + example[column], 0);
  };

  // Calculate column totals
  const totalCommitment = calculateColumnTotal("commitment");
  const totalFundedLoans = calculateColumnTotal("fundedLoan");
  const totalLettersOfCredit = calculateColumnTotal("lettersOfCredit");
  const totalUnfundedCommitment = examples.reduce((total, example) => {
    return total + calculateUnfundedCommitment(example);
  }, 0);
  const totalUpfrontFees = calculateColumnTotal("upfrontFee");

  const totalLoanMTM = examples.reduce((total, example) => {
    return total + calculateLoanMTM(example);
  }, 0);

  const calculateWeightedAverageMark = () => {
    const weightedSum = examples.reduce((total, example) => {
      return total + example.commitment * example.loanMark;
    }, 0);
    const totalCommitment = calculateColumnTotal("commitment");
    return weightedSum / totalCommitment;
  };

  const weightedAverageMark = calculateWeightedAverageMark();

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
              <th className={classes.price}>Weighted Average Cost</th>
              <th className={classes.price}>Loan Mark</th>
              <th>MTM</th>
              {portfolioPage && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {examples.map((example) => {
              return (
                <tr
                  key={example._id}
                  className={classes.tableBodyRows}
                  onClick={(event) => handleRowClick(example._id, event)}
                >
                  <td>{example.borrower}</td>
                  <td>{example.facility}</td>
                  <td>{example.accounting}</td>
                  <td>{formatAmount(example.commitment)}</td>
                  <td>{formatAmount(example.fundedLoan)}</td>
                  <td>{formatAmount(example.lettersOfCredit)}</td>
                  <td>{formatAmount(calculateUnfundedCommitment(example))}</td>
                  <td>{formatAmount(example.upfrontFee)}</td>
                  <td className={classes.price}>
                    {example.weightedAverageCost.toFixed(4)}
                  </td>
                  <td className={classes.price}>
                    {example.loanMark.toFixed(4)}
                  </td>
                  <td>{formatAmount(calculateLoanMTM(example))}</td>
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
          <tfoot>
            <tr className={`${classes.tableBodyRows} ${classes.tableFooter}`}>
              <td className={classes.totalCell}>Total:</td>
              <td className={classes.totalCell}></td>
              <td className={classes.totalCell}></td>
              <td className={classes.totalCell}>
                {formatAmount(totalCommitment)}
              </td>
              <td className={classes.totalCell}>
                {formatAmount(totalFundedLoans)}
              </td>
              <td className={classes.totalCell}>
                {formatAmount(totalLettersOfCredit)}
              </td>
              <td className={classes.totalCell}>
                {formatAmount(totalUnfundedCommitment)}
              </td>
              <td className={classes.totalCell}>
                {formatAmount(totalUpfrontFees)}
              </td>
              <td className={classes.totalCell}>
                {(
                  ((totalCommitment - totalUpfrontFees) / totalCommitment) *
                  100
                ).toFixed(4)}{" "}
                {portfolioPage && <span className={classes.footnote}>(1)</span>}
              </td>
              <td className={classes.totalCell}>
                {weightedAverageMark.toFixed(4)}{" "}
                {portfolioPage && <span className={classes.footnote}>(2)</span>}
              </td>
              <td className={classes.totalCell}>
                {formatAmount(totalLoanMTM)}
              </td>
              {portfolioPage && <td></td>}
            </tr>
          </tfoot>
        </table>
        {portfolioPage && (
          <div className={classes.footnoteDiv}>
            <p className={classes.footnoteDesc}>
              <span className={classes.footnote}>(1)</span>Weighted Average Cost
              for Portfolio
            </p>
            <p className={classes.footnoteDesc}>
              <span className={classes.footnote}>(2)</span>Weighted Average Mark
              for Portfolio
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanExamplesTable;
