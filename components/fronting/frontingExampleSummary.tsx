import React from "react";
import { ImArrowDown } from "react-icons/im";
import { UpdatedFrontingExample } from "../../types/types";
import { formatAmount } from "../../util/formatting";
import classes from "./frontingExampleSummary.module.css";

interface FrontingExampleSummaryProps {
  example: UpdatedFrontingExample;
}
// Shows several tables summarizing the Fronting Example, shows example details,
// sublimit availability, fronting exposure, and total exposure summaries.
const FrontingExampleSummary: React.FC<FrontingExampleSummaryProps> = ({ example }) => {
  const {
    borrower,
    facility,
    yourBankName,
    globalCommitment,
    globalFundedLoans,
    globalLettersOfCredit,
    isLCIssuer,
    isSwinglineLender,
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
    isNonAccrual,
  } = example;

  return (
    <div className={classes.mainContainer}>
      <h2 className={classes.mainHeaderExample}>Example Summary</h2>
      <div className={classes.mainHeader}>
        <div className={classes.tableContainer}>
          <table className={classes.table}>
            <thead>
              <tr className={classes.tableHeaderRoles}>
                <th colSpan={4}>Roles</th>
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
              {isSwinglineLender && (
                <tr className={classes.tableRow}>
                  <td className={classes.tableCell}>Swingline Lender</td>
                  <td className={classes.tableCell}>{yourBankName}</td>
                </tr>
              )}
              {isLCIssuer && (
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
              <th colSpan={4}>Commitment Breakdown</th>
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
                {yourBankName}'s Share: (
                {(yourBankPercentShare * 100).toFixed(2)})%
              </th>
              <th className={classes.tableCell}>
                Other Lenders' Share: (
                {((1 - yourBankPercentShare) * 100).toFixed(2)})%
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
              <th colSpan={4}>Fronting Sublimit Activity</th>
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
      <div className={`${classes.tableContainer} ${classes.frontingContainer}`}>
        {isNonAccrual && (
          <div className={classes.nonAccrualMessage}>
            <p>
              Facility is Non-Accrual,
              <br />
              therefore no availability
              <br />
              for borrowing/fronting. Only
              <br />
              exposure is for what is
              <br />
              already funded/issued.
            </p>
            <ImArrowDown />
          </div>
        )}
        <table className={classes.table}>
          <thead>
            <tr className={classes.tableHeader}>
              <th colSpan={4}>Fronting Exposure</th>
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
              <td className={classes.tableCell}>
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
      <div className={classes.tableContainer}>
        <table className={classes.table}>
          <thead>
            <tr className={classes.tableHeader}>
              <th colSpan={4}>{borrower}</th>
            </tr>
            <tr className={classes.tableHeader}>
              <th colSpan={4}>{facility}</th>
            </tr>
            <tr className={classes.tableHeader}>
              <th colSpan={4}>Total Risk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={2} className={classes.tableSubheader}>
                Net Exposure (Net of Fronting)
              </th>
            </tr>

            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>Net Commitment</td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(yourBankCommitment)}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>Net Funded Loans</td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(globalFundedLoans * yourBankPercentShare)}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>Net LC's</td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(globalLettersOfCredit * yourBankPercentShare)}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>Net Unfunded Commitment</td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(globalAvailability * yourBankPercentShare)}
              </td>
            </tr>
            <tr>
              <th colSpan={2} className={classes.tableSubheader}>
                Fronting Exposure
              </th>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>Fronted Funded Swinglines</td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(fundedSwinglineFrontingExposure)}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>Fronted Issued LC's</td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(issuedLCFrontingExposure)}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>Fronted Unfunded Swinglines</td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(unfundedSwinglineFrontingExposure)}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>Fronted Unissued LC's</td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(unissuedLCFrontingExposure)}
              </td>
            </tr>
            <tr>
              <th colSpan={2} className={classes.tableSubheader}>
                Gross Exposure (Net + Fronting)
              </th>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>
                Gross Commitment<span className={classes.footnote}>(1)</span>
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(
                  yourBankCommitment +
                    fundedSwinglineFrontingExposure +
                    unfundedSwinglineFrontingExposure +
                    issuedLCFrontingExposure +
                    unissuedLCFrontingExposure
                )}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>
                Gross Funded<span className={classes.footnote}>(2)</span>
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(
                  globalFundedLoans * yourBankPercentShare +
                    fundedSwinglineFrontingExposure
                )}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>
                Gross LC's<span className={classes.footnote}>(3)</span>
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(
                  globalLettersOfCredit * yourBankPercentShare +
                    issuedLCFrontingExposure
                )}
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableCell}>
                Gross Unfunded Commitment
                <span className={classes.footnote}>(4)</span>
              </td>
              <td
                className={`${classes.tableCell} ${classes.tableCellAmounts}`}
              >
                {formatAmount(
                  globalAvailability * yourBankPercentShare +
                    unfundedSwinglineFrontingExposure +
                    unissuedLCFrontingExposure
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className={classes.footnoteDiv}>
          <p className={classes.footnoteDesc}>
            <span className={classes.footnote}>(1)</span>Net Commitment + Total
            Fronting Exposure (all categories)
          </p>
          <p className={classes.footnoteDesc}>
            <span className={classes.footnote}>(2)</span>Net Funded Loans +
            Fronted Funded Swinglines
          </p>
          <p className={classes.footnoteDesc}>
            <span className={classes.footnote}>(3)</span>Net LC's + Fronted
            Issued LC's
          </p>
          <p className={classes.footnoteDesc}>
            <span className={classes.footnote}>(4)</span>Net Unfunded Commitment
            + Fronted Unfunded Swinglines + Fronted Unissed LC's
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrontingExampleSummary;
