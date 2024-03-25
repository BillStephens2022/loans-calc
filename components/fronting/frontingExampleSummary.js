import classes from "./frontingExampleSummary.module.css";
import { formatAmount } from "../../util/formatting";

const FrontingExampleSummary = ({
  borrower,
  yourBankName,
  globalCommitment,
  globalFundedLoans,
  globalLettersOfCredit,
  lcIssuer,
  swinglineLender,
  swinglineSublimit,
  lcSublimit,
  yourBankCommitment,
  lcsIssuedByYourBank,
  swinglinesFundedByYourBank,
  globalAvailability,
  yourBankPercentShare,
  unfundedSwinglineFrontingExposure,
  fundedSwinglineFrontingExposure,
  unissuedLCFrontingExposure,
  issuedLCFrontingExposure,
}) => {
  return (
    <div className={classes.mainContainer}>
      <h2 className={classes.mainHeaderExample}>Example Summary</h2>
      <div className={classes.mainHeader}>
        <div className={classes.tableContainer}>
          <table className={classes.table}>
            <thead>
              <tr className={classes.tableHeaderRoles}>
                <th colSpan="4">Roles</th>
              </tr>
            </thead>
            <tbody>
              <tr className={classes.tableRow}>
                <td className={classes.tableCell}>Your Bank's Name</td>
                <td className={classes.tableCell}>{yourBankName}</td>
              </tr>
              <tr className={classes.tableRow}>
                <td className={classes.tableCell}>Borrower</td>
                <td className={classes.tableCell}>{borrower}</td>
              </tr>
              {swinglineLender && (
                <tr className={classes.tableRow}>
                  <td className={classes.tableCell}>Swingline Lender</td>
                  <td className={classes.tableCell}>{yourBankName}</td>
                </tr>
              )}
              {lcIssuer && (
                <tr className={classes.tableRow}>
                  <td className={classes.tableCell}>LC Issuing Bank</td>
                  <td className={classes.tableCell}>{yourBankName}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={classes.tableContainer}>
        <table className={classes.table}>
          <thead>
            <tr className={classes.tableHeader}>
              <th colSpan="4">Commitment Breakdown</th>
            </tr>
            <tr className={classes.tableRow_header}>
              <th
                className={`${classes.tableCell} ${classes.tableCellAmountHeader}`}
              >
                Balance Description
              </th>
              <th
                className={`${classes.tableCell} ${classes.tableCellAmountHeader}`}
              >
                Global
              </th>
              <th
                className={`${classes.tableCell} ${classes.tableCellAmountHeader}`}
              >
                {yourBankName}'s Share: ({yourBankPercentShare * 100})%
              </th>
              <th className={classes.tableCell}>
                Other Lenders' Share: ({(1 - yourBankPercentShare) * 100})%
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className={classes.tableRow}>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                Commitment
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(globalCommitment)}
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(yourBankCommitment)}
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(globalCommitment - yourBankCommitment)}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                Funded Loans
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(globalFundedLoans)}
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(globalFundedLoans * yourBankPercentShare)}
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(globalFundedLoans * (1 - yourBankPercentShare))}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                LC's
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(globalLettersOfCredit)}
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(globalLettersOfCredit * yourBankPercentShare)}
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(
                  globalLettersOfCredit * (1 - yourBankPercentShare)
                )}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                Unutilized Commitment
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(globalAvailability)}
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(globalAvailability * yourBankPercentShare)}
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(globalAvailability * (1 - yourBankPercentShare))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={classes.tableContainer}>
        <table className={classes.table}>
          <thead>
            <tr className={classes.tableHeader}>
              <th colSpan="4">Fronting Sublimit Activity</th>
            </tr>
            <tr className={classes.tableRow_header}>
              <th className={classes.tableCell}>Balance Description</th>
              <th className={classes.tableCell}>Global</th>
              <th className={classes.tableCell}>
                {yourBankName}'s Share: 100%
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>Swingline Sublimit</td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(swinglineSublimit)}
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(swinglineSublimit)}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>Fronted Swinglines</td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(swinglinesFundedByYourBank)}
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(swinglinesFundedByYourBank)}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>
                Available Swingline Sublimit
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(swinglineSublimit - swinglinesFundedByYourBank)}
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(swinglineSublimit - swinglinesFundedByYourBank)}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>LC Sublimit</td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(lcSublimit)}
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(lcSublimit)}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>Fronted LCs</td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(lcsIssuedByYourBank)}
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(lcsIssuedByYourBank)}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>Available LC Sublimit</td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(lcSublimit - lcsIssuedByYourBank)}
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(lcSublimit - lcsIssuedByYourBank)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={classes.tableContainer}>
        <table className={classes.table}>
          <thead>
            <tr className={classes.tableHeader}>
              <th colSpan="4">Fronting Exposure</th>
            </tr>
            <tr className={classes.tableRow_header}>
              <th className={classes.tableCell}>Fronting Type</th>
              <th className={classes.tableCell}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>Funded Swingline Fronting</td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(fundedSwinglineFrontingExposure)}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>Unfunded Swingline Fronting</td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(unfundedSwinglineFrontingExposure)}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>
                <strong>Subtotal Swingline Fronting</strong>
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                <strong>
                  {formatAmount(
                    fundedSwinglineFrontingExposure +
                      unfundedSwinglineFrontingExposure
                  )}
                </strong>
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>Issued LC Fronting</td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(issuedLCFrontingExposure)}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>Unissued LC Fronting</td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(unissuedLCFrontingExposure)}
              </td>
            </tr>

            <tr className={classes.tableRow}>
              <td>
                <strong>Subtotal Issued LC Fronting</strong>
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                <strong>
                  {formatAmount(
                    issuedLCFrontingExposure + unissuedLCFrontingExposure
                  )}
                </strong>
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>
                <strong>Total Fronting Exposure</strong>
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                <strong>
                  {formatAmount(
                    fundedSwinglineFrontingExposure +
                      unfundedSwinglineFrontingExposure +
                      issuedLCFrontingExposure +
                      unissuedLCFrontingExposure
                  )}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FrontingExampleSummary;
