import classes from "./loanTypes.module.css";

const LoanTypes = () => {
  return (
    <div className={classes.main}>
      <h2>Loan Types</h2>
      <div>
        <h3>Corporate Loans</h3>
        <p>
          Corporate loans serve as a cornerstone for businesses seeking
          financial stability and growth. These loans are structured financial
          arrangements between a lending institution and a corporation, aimed at
          providing the necessary capital to fund various business activities.
          From financing expansion projects to managing operational expenses,
          corporate loans offer versatile solutions tailored to the unique needs
          of each business entity.
        </p>
        <h3>Types of Corporate Loan Deals</h3>
        <h4>Syndicated Loans</h4>
        <p>
          Syndicated loans involve a consortium of lenders pooling their
          resources to provide a single loan facility to a borrower. In this
          arrangement, one lead bank or financial institution, known as the
          arranger, coordinates the syndicate and administers the loan on behalf
          of the borrower. Syndicated loans are typically sought by large
          corporations requiring substantial capital, offering advantages such
          as diversified funding sources, flexible terms, and efficient
          execution of complex financing needs.
        </p>
        <h4>Bilateral Loans</h4>
        <p>
          Bilateral loans involve a straightforward lending arrangement between
          a single lender and a borrower. Unlike syndicated loans, bilateral
          loans do not involve multiple lenders. Instead, they offer a simpler
          structure with terms negotiated directly between the borrower and the
          lending institution. Bilateral loans are commonly sought by smaller or
          mid-sized businesses seeking more personalized financing solutions
          tailored to their specific requirements.
        </p>
      </div>
    </div>
  );
};

export default LoanTypes;
