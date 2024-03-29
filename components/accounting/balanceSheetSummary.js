import { formatAmount } from "../../util/formatting";
import classes from "./balanceSheetSummary.module.css";

const BalanceSheetSummary = ({
  assetsTotal,
  liabilitiesTotal,
  cashTotal,
  loanMarketValueTotal,
  commitmentMarketValueTotal,
  lcMarketValueTotal,
  mtmPnlTotal,
  pnlTotal,
  accounting
}) => {
  let loanBookValueDescription;
  let commitmentBookValueDescription;
  let lettersOfCreditBookValueDescription;
  switch(accounting) {
    case "HFI":
      loanBookValueDescription = "HFI Loans at Amortized Cost";
      commitmentBookValueDescription = "HFI Commitments at Amortized Cost";
      lettersOfCreditBookValueDescription = "Letters of Credit (Guarantees) - nonFVO";
      break;
    case "HFS":
      loanBookValueDescription = "HFS Loans at LOCOM";
      commitmentBookValueDescription = "HFS Commitments at LOCOM";
      lettersOfCreditBookValueDescription = "Letters of Credit (Guarantees) - nonFVO";
      break;
    case "FVO":
      loanBookValueDescription = "FVO Loans Market Value";
      commitmentBookValueDescription = "FVO Commitments Market Value";
      lettersOfCreditBookValueDescription = "FVO Letters of Credit (Guarantees) Market Value";
      break;

    default:
      break;

  }

  return (
    <div className={classes.balanceSheetSummary}>
       
      <div className={classes.assetsSide}>
        <h3 className={classes.assetsSide_header}>Assets - Debit/(Credit)</h3>
        <div>
          <p className={classes.accountBalance}>Cash and Cash Equivalents: $ {formatAmount(cashTotal)}</p>
          <p className={classes.accountBalance}>{loanBookValueDescription}: $ {formatAmount(loanMarketValueTotal)} </p>
          <h4>
            <strong>Total Assets: $ {formatAmount(assetsTotal)}</strong>
          </h4>
        </div>
      </div>
      <div className={classes.liabilitiesSide}>
        <h3 className={classes.liabilitiesSide_header}>Liabilities - Debit/(Credit)</h3>
        <div>
          <h4 className={classes.subCategory}>Other Liabilities</h4>
          <p className={classes.accountBalance}>{commitmentBookValueDescription}: $ {formatAmount(commitmentMarketValueTotal)}</p>
          <p className={classes.accountBalance}>{lettersOfCreditBookValueDescription}: $ {formatAmount(lcMarketValueTotal)} </p>
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
        <div className={classes.table_caption}>Note: Losses are Debits (positive), Gains are Credits (negative)</div>
      </div>
    </div>
  );
};

export default BalanceSheetSummary;
