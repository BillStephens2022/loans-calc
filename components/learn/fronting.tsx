import React from "react";
import classes from "./fronting.module.css";

// content for Fronting on the Learn page

const Fronting: React.FC = () => {
  return (
    <div className={classes.main}>
      <h2>Fronting Risks in Syndicated Revolving Credit Facilities</h2>

      <h3>Swingline Fronting Risk</h3>
      <p>
        Swingline fronting risk arises when a bank acts as a swingline lender in
        a syndicated revolving credit facility. A swingline loan serves as a
        short-term source of financing for a borrower - the primary purpose of a
        swingline loan is to provide immediate access to funds to cover urgent
        or unexpected expenses when the borrower needs quick liquidity. When the
        swingline sublimit is utilized, the swingline lender assumes the risk
        associated with funding those loans until the other syndicate banks
        contribute their pro-rata portions. If other banks fail to fund their
        portions, the swingline lender is exposed to the risk of not being
        repaid fully, potentially leading to increased credit risk and liquidity
        strain.
      </p>

      <h3>Letter of Credit (LC) Fronting Risk</h3>
      <p>
        Letter of Credit (LC) fronting risk occurs when a bank serves as the
        issuer of letters of credit in a syndicated revolving credit facility.
        When the LC sublimit is utilized by the borrower, the issuing bank
        assumes the obligation to honor draws made under those letters of credit
        on behalf of the beneficiary. If the other syndicate banks fail to
        reimburse their pro-rata shares promptly, the issuing bank bears the
        risk of non-repayment, leading to potential financial exposure and
        operational challenges.
      </p>
    </div>
  );
};

export default Fronting;
