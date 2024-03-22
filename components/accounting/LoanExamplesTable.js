import classes from "@/components/accounting/LoanExamplesTable.module.css";
import { formatAmount } from "@/util/formatting";
import Button from "../ui/Button";

const LoanExamplesTable = ({ examples }) => {
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
          <th>Action</th>
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
              <td>
                <Button className="width_8">GL Entries</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LoanExamplesTable;
