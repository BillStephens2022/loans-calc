import classes from "../../components/learn/loanDocs.module.css";

const LoanDocs = () => {
  return (
    <div className={classes.main}>
      <h2>Corporate Lending Loan Documentation</h2>

      <h3>Term Sheet</h3>
      <p>
        The term sheet is an initial document outlining the key terms and
        conditions of a proposed corporate lending facility. It serves as a
        preliminary agreement between the borrower and the lender, detailing
        important aspects such as the loan amount, interest rate, maturity date,
        collateral requirements, and other terms negotiated between the parties.
        While not legally binding, the term sheet provides a framework for
        further negotiations and serves as a basis for drafting the formal
        credit agreement. Since this is not legally binding, there are no
        accounting events or disclosures triggered by this document.
      </p>

      <h3>Commitment Letter</h3>
      <p>
        The commitment letter is a formal document (which is legally binding)
        issued by the lender confirming its commitment to provide financing to
        the borrower based on the terms outlined in the term sheet. It includes
        specific details about the loan facility, such as the amount, interest
        rate, maturity date, conditions precedent, and covenants. The commitment
        letter signifies the lender's intention to proceed with the transaction
        and typically includes a timeline for finalizing the credit
        documentation. Since this document is legally binding, a lending bank is
        required to disclose this commitment as part of its Off Balance Sheet
        disclosure.
      </p>

      <h3>Credit Agreement</h3>
      <p>
        The credit agreement, also known as the loan agreement or facility
        agreement, is a comprehensive legal document that formalizes the terms
        and conditions of the corporate lending facility. It outlines the rights
        and obligations of both the borrower and the lender, incorporating the
        terms agreed upon in the term sheet and commitment letter. The credit
        agreement covers various aspects of the loan, including disbursement
        mechanics, repayment terms, events of default, representations and
        warranties, and remedies in case of breach. At this point, the borrower
        can start utilizing the facility (i.e. draw loans, etc).
      </p>
    </div>
  );
};

export default LoanDocs;
