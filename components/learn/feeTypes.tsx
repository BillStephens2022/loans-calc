import React from "react";
import classes from "./feeTypes.module.css";

// content for Fee Types on the Learn page
const FeeTypes: React.FC = () => {
  return (
    <div className={classes.main}>
      <h2>Corporate Lending - Interest & Fees</h2>
      <h3>Interest</h3>
      <p>
        <span className={classes.pSpan}>Description: </span>
        Interest refers to the cost of borrowing money, typically expressed as a
        percentage of the principal amount borrowed. It is the compensation paid
        by a borrower to a lender for the privilege of using their funds over a
        specified period. Interest rates can vary based on factors such as
        prevailing market conditions, creditworthiness of the borrower, and the
        duration of the loan.
      </p>
      <h4>Interest Components</h4>
      <p>
        <span className={classes.pSpan}>All-in Rate: </span>
        The All-in interest rate that is the final interest rate earned on a
        loan and is the sum of the "Base Rate" and a "Spread".
      </p>
      <p>
        <span className={classes.pSpan}>Base Rate: </span>The Base Rate, also
        known as the reference rate or benchmark rate, is a fundamental interest
        rate used to determine borrowing costs. The Base Rate reflects
        prevailing economic conditions, monetary policy decisions, and overall
        market interest rates.In recent years, financial markets have
        transitioned away from LIBOR (London Interbank Offered Rate) to
        alternative reference rates. One widely adopted alternative is SOFR
        (Secured Overnight Financing Rate). SOFR reflects the cost of borrowing
        cash overnight collateralized by Treasury securities and is considered a
        robust, transaction-based benchmark. It is administered by the Federal
        Reserve Bank of New York and is increasingly used as a replacement for
        LIBOR in various financial products, including corporate loans.
      </p>
      <p>
        <span className={classes.pSpan}>Spread: </span>
        The Spread, also referred to as the margin or markup, represents the
        additional percentage points added to the Base Rate to calculate the
        final interest rate (i.e. the "all-in rate")charged to the borrower. The
        Spread accounts for factors specific to the borrower, such as credit
        risk, repayment history, and the perceived likelihood of default.
        Lenders determine the Spread based on their assessment of the borrower's
        creditworthiness and the prevailing risk premium in the market. A higher
        credit risk typically results in a wider Spread, leading to a higher
        overall interest rate.
      </p>
      <p>
        <span className={classes.pSpan}>Accounting: </span>Interest Income is
        accrued into income daily based on the outstanding loan balance and its
        associated rate.
      </p>
      <h3>Upfront Fees</h3>
      <p>
        <span className={classes.pSpan}>Description: </span>
        Upfront fees, also known as commitment fees, are charges levied by
        lenders to compensate for the commitment of funds under a credit
        facility. These fees are typically calculated as a percentage of the
        total commitment and are paid upfront upon the
        establishment of the credit arrangement.
      </p>
      <p>
        <span className={classes.pSpan}>Accounting: </span>Upfront Fees are
        deferred and amortized into income over the life of the credit facility.
      </p>

      <h3>Unused Fees</h3>
      <p>
        <span className={classes.pSpan}>Description: </span>
        Unused fees, sometimes referred to as unutilized or undrawn fees, are
        charges imposed on the unused portion of a revolving credit facility.
        Lenders may assess these fees to encourage borrowers to utilize the
        entire credit line or to compensate for the availability of funds that
        could have been deployed elsewhere.
      </p>
      <p>
        <span className={classes.pSpan}>Accounting: </span>Unused Fees are
        accrued into income daily based on the fee rate and the daily unused
        commitment balance
      </p>

      <h3>Facility Fees</h3>
      <p>
        <span className={classes.pSpan}>Description: </span>
        Facility fees are recurring charges associated with the availability and
        maintenance of a credit facility. These fees are typically assessed
        annually or semi-annually and are based on the total commitment amount
        of the facility, regardless of utilization.
      </p>
      <p>
        <span className={classes.pSpan}>Accounting: </span>Facility Fees are
        accrued into income daily based on the fee rate and the daily commitment
        balance
      </p>

      <h3>Utilized Fees</h3>
      <p>
        <span className={classes.pSpan}>Description: </span>
        Utilized fees, also known as drawn fees, are charges incurred on the
        portion of a credit facility that has been utilized by the borrower.
        Lenders may impose these fees to cover the administrative costs and
        risks associated with disbursing and managing the deployed funds.
      </p>
      <p>
        <span className={classes.pSpan}>Accounting: </span>Utilized Fees are
        accrued into income daily based on the fee rate and the daily
        utilization of the credit facility.
      </p>

      <h3>Letter of Credit Issuance Fees</h3>
      <p>
        <span className={classes.pSpan}>Description: </span>
        Letter of credit issuance fees are charges levied by banks for the
        issuance of letters of credit (LCs) on behalf of borrowers. These fees
        compensate the issuing bank for the administrative effort, risk
        assessment, and documentation involved in issuing LCs to facilitate
        trade transactions.
      </p>
      <p>
        <span className={classes.pSpan}>Accounting: </span>LC Issuance Fees are
        accrued into income daily based on the fee rate and the daily balance of
        the LC's issued by the lending bank.
      </p>

      <h3>Letter of Credit Participation Fees</h3>
      <p>
        <span className={classes.pSpan}>Description: </span>
        Letter of credit participation fees are fees paid by borrowers to
        compensate participating lenders for their share of any letters Of
        credit (LCs) that are issued under the facility. The fee paid to each
        lender is proportional to their share in the LC.
      </p>
      <p>
        <span className={classes.pSpan}>Accounting: </span>LC Participation Fees
        are accrued into income daily based on the fee rate and the daily
        balance of the LC's of which the lending bank is a participant.
      </p>

      <h3>Admin/Agency Fees</h3>
      <p>
        <span className={classes.pSpan}>Description: </span>
        Admin/agency fees, also known as administrative or agency fees, are
        charges assessed by administrative agents for their services in
        facilitating and administering corporate lending transactions. These
        fees cover the administrative overhead, documentation, monitoring, and
        coordination efforts involved in managing credit facilities on behalf of
        lenders and borrowers.
      </p>
      <p>
        <span className={classes.pSpan}>Accounting: </span>Admin/Agency Fees are
        paid upfront on an annual basis and are deferred and amortized daily
        over the year on which it was earned.
      </p>
      <h3>Assignment / Participation Fees</h3>
      <p>
        <span className={classes.pSpan}>Description: </span>
        Assignment and/or Participation fees are charges associated with the
        transfer of rights and obligations under a credit agreement from one
        party to another. These fees compensate the parties involved for the
        administrative and legal processes required for the
        assignment/participation.
      </p>
      <p>
        <span className={classes.pSpan}>Accounting: </span>Assignment Fees are
        typically recognized at the time they are paid. Fees received are
        recorded as income, Fees paid are expensed.
      </p>
    </div>
  );
};

export default FeeTypes;
