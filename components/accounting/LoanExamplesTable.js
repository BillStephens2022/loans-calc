import { useState } from "react";
import { formatAmount } from "@/util/formatting";
import { GoTrash } from "react-icons/go";
import Button from "../ui/Button";
import Link from "next/link";
import classes from "@/components/accounting/LoanExamplesTable.module.css";

const LoanExamplesTable = ({ examples, onDelete, showButtons }) => {
  const [loading, setLoading] = useState(false); // use state to disable delete button while process is executing

  const handleDeleteExample = async (exampleId) => {
    setLoading(true);
    try {
      onDelete(exampleId); // Notify parent component that example was deleted
    } catch (error) {
      console.error("Error deleting example:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <table className={classes.loanExamples_table}>
      <thead>
        <tr>
          <th>Borrower</th>
          <th>Facility</th>
          <th>Total Commitment</th>
          <th>Funded Loans</th>
          <th>Letters of Credit</th>
          <th>Unfunded Commitment</th>
          <th>Upfront Fees</th>
          <th>Weighted Average Cost</th>
          <th>Loan Mark</th>
          {showButtons && <th>View</th>}
          {showButtons && <th>Delete</th>}
        </tr>
      </thead>
      <tbody>
        {examples.map((example) => {
          return (
            <tr key={example._id}>
              <td>{example.borrower}</td>
              <td>{example.facility}</td>
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
              <td>{(1 - example.upfrontFee / example.commitment) * 100}</td>
              <td>{example.loanMark}</td>
              {showButtons && (
                <td>
                  <Link href={`/Accounting/${example._id}`}>
                    <Button className="width_8">GL Entries</Button>
                  </Link>
                </td>
              )}
              {showButtons && (
                <td className={classes.deleteCell}>
                  <Button
                    className="deleteButton"
                    onClick={() => handleDeleteExample(example._id)}
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
  );
};

export default LoanExamplesTable;
