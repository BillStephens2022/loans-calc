import { formatAmount } from "../../util/formatting";
import classes from "./fullBalanceSheet.module.css";

const FullBalanceSheet = ({ journalEntries }) => {
  const sumEntriesByCategory = (journalEntries, category, accounting) => {
    const categoryTotal = journalEntries.reduce((total, entry) => {
      if (
        entry.category === category &&
        (!accounting || entry.accounting === accounting)
      ) {
        return total + entry.amount;
      } else {
        return total;
      }
    }, 0);

    return categoryTotal;
  };

  const sumEntriesByHighLevelCategory = (journalEntries, highLevelCategory) => {
    const highLevelCategoryTotal = journalEntries.reduce((total, entry) => {
      if (entry.highLevelCategory === highLevelCategory) {
        return total + entry.amount;
      } else {
        return total;
      }
    }, 0);

    return highLevelCategoryTotal;
  };

  // Category totals
  // For balance sheet presentation purposes assume 1B of invested capital at inception (debit cash 1B, credit equity 1B)
  const cashStartingBalance = 1000000000;
  const equityStartingBalance = -cashStartingBalance;
  const cashTotal =
    cashStartingBalance +
    sumEntriesByCategory(journalEntries, "Cash & Cash Equivalents");
  const loanMarketValueHFITotal = sumEntriesByCategory(
    journalEntries,
    "Loan Market Value",
    "HFI"
  );
  const loanMarketValueHFSTotal = sumEntriesByCategory(
    journalEntries,
    "Loan Market Value",
    "HFS"
  );
  const loanMarketValueFVOTotal = sumEntriesByCategory(
    journalEntries,
    "Loan Market Value",
    "FVO"
  );

  const loanMarketValueTotal =
    loanMarketValueHFITotal +
    loanMarketValueHFSTotal +
    loanMarketValueFVOTotal;

  const commitmentMarketValueHFSTotal = sumEntriesByCategory(
    journalEntries,
    "Unfunded Commitment Market Value",
    "HFS"
  );

  const commitmentMarketValueFVOTotal = sumEntriesByCategory(
    journalEntries,
    "Unfunded Commitment Market Value",
    "FVO"
  );

  const commitmentMarketValueTotal =
    commitmentMarketValueHFSTotal +
    commitmentMarketValueFVOTotal;

  const lettersOfCreditMarketValueHFSTotal = sumEntriesByCategory(
    journalEntries,
    "LC/Guarantee Market Value",
    "HFS"
  );

  const lettersOfCreditMarketValueFVOTotal = sumEntriesByCategory(
    journalEntries,
    "LC/Guarantee Market Value",
    "FVO"
  );



  const lettersOfCreditMarketValueTotal =
    lettersOfCreditMarketValueHFSTotal +
    lettersOfCreditMarketValueFVOTotal;

    const deferredFeesTotal = sumEntriesByCategory(
        journalEntries,
        "Unfunded Commitment Market Value",
        "HFI"
      ) + sumEntriesByCategory(
        journalEntries,
        "LC/Guarantee Market Value",
        "HFI"
      );
    

  const mtmPnlTotal = sumEntriesByCategory(
    journalEntries,
    "MTM P&L (unrealized)"
  );

  // High Level Category (i.e. Assets & Liabilities) Totals
  const assetsTotal =
    cashStartingBalance +
    sumEntriesByHighLevelCategory(journalEntries, "Assets");
  const liabilitiesTotal = sumEntriesByHighLevelCategory(
    journalEntries,
    "Liabilities"
  );

  return (
    <div className={classes.main}>
      <div className={classes.balanceSheetSummary}>
        <div className={classes.assetsSide}>
          <h3 className={classes.assetsSide_header}>Assets - Debit/(Credit)</h3>
          <div>
            <h4>Cash</h4>
            <p className={classes.accountBalance}>
              Cash and Cash Equivalents: $ {formatAmount(cashTotal)}{" "}
              <span className={classes.footnote}>(1)</span>
            </p>
            <h4>Total Cash: $ {formatAmount(cashTotal)} </h4>
            <h4>Loans</h4>
            <p className={classes.accountBalance}>
              Loans - Held for Investment (Amortized Cost): ${" "}
              {formatAmount(loanMarketValueHFITotal)}{" "}
            </p>
            <p className={classes.accountBalance}>
              Loans - Held for Sale - LOCOM: ${" "}
              {formatAmount(loanMarketValueHFSTotal)}{" "}
            </p>
            <p className={classes.accountBalance}>
              Loans - Fair Value Option (Market Value): ${" "}
              {formatAmount(loanMarketValueFVOTotal)}{" "}
            </p>
            <h4>Total Loans: $ {formatAmount(loanMarketValueTotal)} </h4>
            <h4 className={classes.assetsLiabilitiesSubtotals}>
            Total Assets: $ {formatAmount(assetsTotal)}
            </h4>
          </div>
          <p className={classes.footnoteDesc}>
        <span className={classes.footnote}>(1)</span>Assumes $1B of invested
        capital at inception
      </p>
        </div>

        <div className={classes.liabilitiesSide}>
          <h3 className={classes.liabilitiesSide_header}>
            Liabilities - Debit/(Credit)
          </h3>
          <div>
            <h4>Deferred Fees</h4>
            <p className={classes.accountBalance}>
              Deferred Fees - HFI: ${" "}
              {formatAmount(deferredFeesTotal)}
            </p>
            <h4 className={classes.accountBalance}>
              Total Deferred Fees: $
              {formatAmount(deferredFeesTotal)}
            </h4>
            <h4>Commitments</h4>
            <p className={classes.accountBalance}>
              Commitments - Held For Sale - LOCOM: ${" "}
              {formatAmount(commitmentMarketValueHFSTotal)}
            </p>
            <p className={classes.accountBalance}>
              Commitments - FVO - Market Value: ${" "}
              {formatAmount(commitmentMarketValueFVOTotal)}
            </p>
            <h4 className={classes.accountBalance}>
              Total Commitment Market Value: $
              {formatAmount(commitmentMarketValueTotal)}
            </h4>
            <h4>LC's / Guarantees</h4>
            <p className={classes.accountBalance}>
              LCs / Guarantees - Held For Sale - LOCOM: ${" "}
              {formatAmount(lettersOfCreditMarketValueHFSTotal)}{" "}
            </p>
            <p className={classes.accountBalance}>
              LCs / Guarantees - FVO - Market Value: ${" "}
              {formatAmount(lettersOfCreditMarketValueFVOTotal)}{" "}
            </p>
            <h4 className={classes.accountBalance}>
              Total LC/Guarantee Market Value: $
              {formatAmount(lettersOfCreditMarketValueTotal)}
            </h4>

            <h4 className={classes.assetsLiabilitiesSubtotals}>Total Liabilities: $ {formatAmount(liabilitiesTotal)}</h4>
          </div>
          <h3 className={classes.liabilitiesSide_header}>
            Owner's Equity - Debit/(Credit)
          </h3>
          <div>
            <p className={classes.accountBalance}>
              Paid-In-Capital: $ {formatAmount(equityStartingBalance)}{" "}
            </p>
            <h4 className={classes.accountBalance}>
              Total Equity: $ {formatAmount(equityStartingBalance)}
            </h4>
            <p className={classes.accountBalance}>
              Trading P&L: $ {formatAmount(mtmPnlTotal)}{" "}
            </p>
            <h4 className={classes.accountBalance}>
              Total P&L: $ {formatAmount(mtmPnlTotal)}
            </h4>
            <h4 className={classes.assetsLiabilitiesSubtotals}>
              Total Owner's Equity: $ {formatAmount(mtmPnlTotal + equityStartingBalance)}
            </h4>
          </div>
          <h4 className={classes.assetsLiabilitiesSubtotals}>
            Total Liabilities + Owner's Equity: ${" "}
            {formatAmount(
              liabilitiesTotal + equityStartingBalance + mtmPnlTotal
            )}
          </h4>
          <p className={classes.footnoteDesc}>
        <span className={classes.footnote}>(1)</span>Assumes $1B of invested
        capital at inception
      </p>
          <div className={classes.table_caption}>
            Note: Losses are Debits (positive), Gains are Credits (negative)
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default FullBalanceSheet;
