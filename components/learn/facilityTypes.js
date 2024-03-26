import classes from "./facilityTypes.module.css";

const FacilityTypes = () => {
  return (
    <div className={classes.main}>
      <h2>Loan Facility Types</h2>
      <h3>Revolver</h3>
      <p>
        A revolver, short for revolving credit facility, is a type of loan that
        provides a borrower with the flexibility to withdraw, repay, and redraw
        funds up to a specified credit limit over a predetermined period.
        Similar to a credit card, a revolver allows borrowers to access funds as
        needed, making it suitable for managing short-term working capital
        requirements or financing fluctuating expenses. A revolver can often
        have multiple loan drawings/contracts under the facility each with its
        own terms (i.e. interest rates, repayment dates).
      </p>

      <h3>Term Loan</h3>
      <p>
        A term loan is a traditional form of corporate financing where a lender
        extends a fixed amount of funds to a borrower for a specified period,
        typically ranging from one to ten years. Unlike a revolver, term loans
        are repaid in regular installments, often with a fixed or variable
        interest rate. Term loans are commonly used to finance long-term
        investments such as equipment purchases, real estate acquisitions, or
        business expansions.
      </p>

      <h3>Letter of Credit</h3>
      <p>
        A letter of credit (LC) is a financial instrument issued by a bank on
        behalf of a buyer (applicant) to guarantee payment to a seller
        (beneficiary) for goods or services provided. In a corporate context,
        letters of credit serve as a form of trade finance, facilitating
        international transactions by mitigating the risk of non-payment. By
        providing assurance of payment, letters of credit help build trust
        between parties involved in cross-border trade.
      </p>

      <h3>Delayed Draw Term Loan</h3>
      <p>
        A delayed draw term loan is a structured loan facility that allows
        borrowers to access funds in multiple disbursements over a specified
        period, known as the drawdown period. Unlike a traditional term loan
        where the entire loan amount is disbursed upfront, a delayed draw term
        loan provides flexibility by enabling borrowers to request funds as
        needed during the drawdown period. This type of facility is commonly
        used for financing projects with phased funding requirements or
        uncertain timing of capital needs.
      </p>

      <h3>Uncommitted Facilities</h3>
      <p>
        Uncommitted facilities are types of credit arrangements where the lender
        provides a credit line to the borrower, but is not obligated to extend
        the funds. In other words, the lender has the discretion to lend or not,
        depending on the circumstances. These facilities are typically used for
        short-term financing needs and are less formal compared to committed
        credit facilities like revolvers or term loans. Since there is no
        commitment from the lender, uncommitted facilities may offer greater
        flexibility but can also carry higher interest rates or fees.
      </p>
    </div>
  );
};

export default FacilityTypes;
