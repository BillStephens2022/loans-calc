import classes from "./utilization.module.css";

const Utilization = () => {
  return (
    <div className={classes.main}>
      <h1>Loan Facility Utilization</h1>

      <h3>Drawn Loans</h3>
      <p>
        Drawn loans refer to the portion of a loan facility that has been
        accessed or utilized by the borrower. When a borrower draws down funds
        from a loan facility, it becomes a drawn loan. Drawn loans are typically
        subject to repayment terms, including interest payments and scheduled
        repayments, as outlined in the loan agreement.
      </p>

      <h3>Standby Letters of Credit</h3>
      <p>
        A standby letter of credit (SBLC) is a financial instrument issued by a
        bank or financial institution on behalf of a client, typically a company
        or corporation, to provide assurance of payment to a third party in the
        event that the client fails to fulfill their contractual obligations. In
        the context of corporate loan facilities, an SBLC serves as a form of
        guarantee or backup mechanism for the lender, providing them with a
        level of security against default or non-payment by the borrower.
      </p>

      <h3>Undrawn Commitments</h3>
      <p>
        Undrawn commitments refer to the portion of a loan facility that has
        been approved but remains untapped by the borrower. Lenders extend
        undrawn commitments to borrowers as a line of credit or credit limit,
        allowing them to access funds as needed within specified terms and
        conditions. Unlike drawn loans, undrawn commitments do not incur
        interest or require immediate repayment until utilized by the borrower.
      </p>
    </div>
  );
};

export default Utilization;
