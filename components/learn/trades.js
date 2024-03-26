import classes from "./trades.module.css";

const Trades = () => {
  return (
    <div className={classes.main}>
      <h2>Trades - Assignments & Participations</h2>

      <h3>Assignments</h3>
      <p>
        Assignments in corporate lending refer to the transfer of rights and
        obligations under a credit agreement from one party (the assignor) to
        another party (the assignee). These transactions typically occur when
        the original lender wishes to sell or transfer its exposure to another
        financial institution or investor. Assignments require the consent of
        the buyer and seller and often requires borrower consent. Once
        completed, the assignee assumes the rights and obligations of the
        original lender (becoming the "lender of record"), including the right
        to receive loan payments and enforce loan covenants.
      </p>

      <h3>Participations</h3>
      <p>
        Participation trades involve one lender selling a portion of its loan
        exposure to another lender through a participation agreement. Unlike
        assignments, where the assignee becomes the lender of record, in
        participation trades, the original lender retains its status as the
        lender of record. The participating lender purchases a participation
        interest in the loan, entitling it to a share of the loan payments and
        associated rights proportional to its participation percentage.
        Participation trades allow lenders to manage their exposure to specific
        loans while maintaining relationships with borrowers and facilitating
        liquidity in the secondary loan market.
      </p>
    </div>
  );
};

export default Trades;
