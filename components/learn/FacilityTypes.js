import classes from "@/components/learn/FacilityTypes.module.css";

const FacilityTypes = () => {
  return (
    <div className={classes.main}>
      <h2>Loan Facility Types in Corporate Financing</h2>
      <h3>Revolver</h3>
      <p>
        A revolver, short for revolving credit facility, is a type of loan that
        provides a borrower with the flexibility to withdraw, repay, and redraw
        funds up to a specified credit limit over a predetermined period.
        Similar to a credit card, a revolver allows borrowers to access funds as
        needed, making it suitable for managing short-term working capital
        requirements or financing fluctuating expenses.
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
    </div>
  );
};

export default FacilityTypes;
