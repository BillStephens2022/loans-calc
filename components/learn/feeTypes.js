import classes from "./feeTypes.module.css";

const FeeTypes = () => {
  return (
    <div className={classes.main}>
      <h2>Corporate Lending Fees</h2>

      <h3>Upfront Fees</h3>
      <p>
        Upfront fees, also known as commitment fees, are charges levied by
        lenders to compensate for the commitment of funds under a credit
        facility. These fees are typically calculated as a percentage of the
        undrawn portion of the facility and are paid upfront upon the
        establishment of the credit arrangement.
      </p>

      <h3>Unused Fees</h3>
      <p>
        Unused fees, sometimes referred to as unutilized or undrawn fees, are
        charges imposed on the unused portion of a revolving credit facility.
        Lenders may assess these fees to encourage borrowers to utilize the
        entire credit line or to compensate for the availability of funds that
        could have been deployed elsewhere.
      </p>

      <h3>Facility Fees</h3>
      <p>
        Facility fees are recurring charges associated with the availability and
        maintenance of a credit facility. These fees are typically assessed
        annually or semi-annually and are based on the total commitment amount
        of the facility, regardless of utilization.
      </p>

      <h3>Utilized Fees</h3>
      <p>
        Utilized fees, also known as drawn fees, are charges incurred on the
        portion of a credit facility that has been utilized by the borrower.
        Lenders may impose these fees to cover the administrative costs and
        risks associated with disbursing and managing the deployed funds.
      </p>

      <h3>Letter of Credit Issuance Fees</h3>
      <p>
        Letter of credit issuance fees are charges levied by banks for the
        issuance of letters of credit (LCs) on behalf of borrowers. These fees
        compensate the issuing bank for the administrative effort, risk
        assessment, and documentation involved in issuing LCs to facilitate
        trade transactions.
      </p>

      <h3>Letter of Credit Participation Fees</h3>
      <p>
        Letter of credit participation fees are fees paid by borrowers to
        compensate participating lenders for their share of any letters Of
        credit (LCs) that are issued under the facility. The fee paid to each
        lender is proportional to their share in the LC.
      </p>

      <h3>Admin/Agency Fees</h3>
      <p>
        Admin/agency fees, also known as administrative or agency fees, are
        charges assessed by administrative agents for their services in
        facilitating and administering corporate lending transactions. These
        fees cover the administrative overhead, documentation, monitoring, and
        coordination efforts involved in managing credit facilities on behalf of
        lenders and borrowers.
      </p>
    </div>
  );
};

export default FeeTypes;
