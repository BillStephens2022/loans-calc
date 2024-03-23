import classes from "@/components/learn/utilization.module.css";

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

      <h3>Letters of Credit</h3>
      <p>
        Letters of credit (LCs) are financial instruments commonly used in
        international trade to facilitate transactions between buyers and
        sellers. From the perspective of loan utilization, letters of credit
        represent a form of contingent liability, where a borrower may utilize
        the credit facility by obtaining LCs to guarantee payment for goods or
        services provided by suppliers or vendors.
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
