import { formatAmount } from "@/util/formatting";
import classes from "@/components/accounting/balanceSheetSummary.module.css";

const BalanceSheetSummary = ({
  assetsTotal,
  liabilitiesTotal,
  cashTotal,
  loanMarketValueTotal,
  commitmentMarketValueTotal,
  lcMarketValueTotal,
  mtmPnlTotal,
  pnlTotal
}) => {
  return (
    <div className={classes.balanceSheetSummary}>
       
      <div className={classes.assetsSide}>
        <h3 className={classes.assetsSide_header}>Assets - Debit/(Credit)</h3>
        <div>
          <p className={classes.accountBalance}>Cash and Cash Equivalents: $ {formatAmount(cashTotal)}</p>
          <p className={classes.accountBalance}>Loan Market Value: $ {formatAmount(loanMarketValueTotal)} </p>
          <h4>
            <strong>Total Assets: $ {formatAmount(assetsTotal)}</strong>
          </h4>
        </div>
      </div>
      <div className={classes.liabilitiesSide}>
        <h3 className={classes.liabilitiesSide_header}>Liabilities - Debit/(Credit)</h3>
        <div>
          <h4 className={classes.subCategory}>Other Liabilities</h4>
          <p className={classes.accountBalance}>Commitment - Fair Value: $ {formatAmount(commitmentMarketValueTotal)}</p>
          <p className={classes.accountBalance}>Letter Of Credit / Guarantee Fair Value: $ {formatAmount(lcMarketValueTotal)} </p>
          <p className= {classes.subCategory}>
            <strong>Subtotal Other Liabilities: $ {formatAmount(commitmentMarketValueTotal + lcMarketValueTotal)} </strong>
          </p>
          <h4>Total Liabilities: $ {formatAmount(liabilitiesTotal)}</h4>
        </div>
        <h3 className={classes.liabilitiesSide_header}>Owner's Equity - P&L - Debit/(Credit)</h3>
        <div>
          <p className={classes.accountBalance}>Trading P&L: $ {formatAmount(mtmPnlTotal)} </p>
          <p>
            <strong>Total P&L: $ {formatAmount(pnlTotal)}</strong>
          </p>
        </div>
        <h4>Total Liabilities + Owner's Equity: $ {formatAmount(liabilitiesTotal + pnlTotal)}</h4>
        <caption className={classes.table_caption}>Note: Losses are Debits (positive), Gains are Credits (negative)</caption>
      </div>
    </div>
  );
};

export default BalanceSheetSummary;
