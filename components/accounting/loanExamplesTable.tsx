import React, { useState } from "react";
import { useRouter } from "next/router";
import { GoTrash } from "react-icons/go";
import { ImArrowLeft, ImArrowRight } from "react-icons/im";
import { formatAmount } from "../../util/formatting";
import { LoanAccountingExampleDocument } from "../../models/loanAccountingExample";
import Button from "../ui/button";
import classes from "./loanExamplesTable.module.css";

// Loan Examples Table shows a summary of all of the loan examples on the Accounting page (if portfolioPage prop is true)
// If portfolioPage prop is false, it shows 1 row for a summary of the specific example on the [accountingExampleId] page.
// also renders a delete button in the table so user can delete a specific example - only shows on
// Accounting page where portfolioPage prop is true)
interface LoanExamplesTableProps {
  examples: LoanAccountingExampleDocument[];
  onDelete?: (exampleId: string) => void;
  portfolioPage: boolean;
}

const LoanExamplesTable: React.FC<LoanExamplesTableProps> = ({
  examples,
  onDelete,
  portfolioPage,
}) => {
  // state used to disable delete button while process is executing
  const [loading, setLoading] = useState(false);
  // used for routing when a specific loan example is clicked on the table
  const router = useRouter();

  // handler for deleting a specific loan accounting example
  const handleDeleteExample = async (
    exampleId: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Stop event propagation to prevent row click event
    event.stopPropagation();
    setLoading(true);
    try {
      // Check if onDelete exists before calling it (onDelete is an optional prop for this component)
      if (onDelete) {
        onDelete(exampleId); // Notify parent component that example was deleted
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting example:", error.message);
      } else {
        console.error("Unknown error!");
      }
    } finally {
      setLoading(false);
    }
  };

  // handler for clicking on a row in the table - user will be routed to the [accountingExampleId] page which will show
  // details about the specific loan clicked. Uses the NextJS dynamic routing.
  const handleRowClick = (
    exampleId: string,
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    const target = event.target as Element;
    if (!target.closest || !target.closest("button")) {
      router.push(`/accounting/${exampleId}`);
    }
  };

  // calculate unfunded commitment
  const calculateUnfundedCommitment = (example: LoanAccountingExampleDocument): number => {
    return example.commitment - example.fundedLoan - example.lettersOfCredit;
  };
  // calculate Loan Mark to Market
  const calculateLoanMTM = (example: LoanAccountingExampleDocument): number => {
    let loanMTM =
      (example.commitment * (example.loanMark - example.weightedAverageCost)) /
      100;
    // adjust Loan MTM based on accounting methodology
    // if HFS, Loan MTM is set to zero if calculated Loan MTM is positive since Lower of Cost or Market accounting applied
    // if HFI, Loan MTM is set to zero since HFI loans are held at amortized cost and not market to market.
    if (
      (example.accounting === "HFS" && loanMTM > 0) ||
      example.accounting === "HFI"
    ) {
      loanMTM = 0;
    }
    return loanMTM;
  };

  // Function to calculate totals for specified columns
  const calculateColumnTotal = (column: keyof LoanAccountingExampleDocument) => {
    return examples.reduce((total, example) => total + example[column], 0);
  };

  // Calculate column totals
  const totalCommitment: number = calculateColumnTotal("commitment");
  const totalFundedLoans: number = calculateColumnTotal("fundedLoan");
  const totalLettersOfCredit: number = calculateColumnTotal("lettersOfCredit");
  const totalUnfundedCommitment: number = examples.reduce((total, example) => {
    return total + calculateUnfundedCommitment(example);
  }, 0);
  const totalUpfrontFees: number = calculateColumnTotal("upfrontFee");

  const totalLoanMTM: number = examples.reduce((total, example) => {
    return total + calculateLoanMTM(example);
  }, 0);

  const calculateWeightedAverageMark = () : number => {
    const weightedSum: number = examples.reduce((total, example) => {
      return total + example.commitment * example.loanMark;
    }, 0);
    const totalCommitment: number = calculateColumnTotal("commitment");
    return weightedSum / totalCommitment;
  };

  const weightedAverageMark: number = calculateWeightedAverageMark();

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
                  <td>{formatAmount(example.upfrontFee ?? 0)}</td>
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
      </div>
      <p className={classes.scrollText}>
        <ImArrowLeft /> Scroll <ImArrowRight />
      </p>
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
  );
};

export default LoanExamplesTable;
