import classes from "./accounting.module.css";

const Accounting = () => {
  return (
    <div className={classes.main}>
      <h2>Accounting Options for Loans (US GAAP)</h2>

      <h3>Held For Investment</h3>
      <p>
        Loans classified as Held For Investment (HFI) are recorded on the
        balance sheet at amortized cost. Under this accounting treatment, loans
        are initially recorded at their original principal amount and
        subsequently adjusted for any upfront fee/premium/discount amortization,
        as well as for any impairment losses recognized. Loans classified as HFI
        are typically subject to credit reserves, including Current Expected
        Credit Losses (CECL) under the Financial Accounting Standards Board
        (FASB) guidelines in the United States. CECL requires entities to
        estimate expected credit losses over the life of the loan and record a
        provision for credit losses based on historical data, current
        conditions, and reasonable and supportable forecasts.
      </p>

      <h3>Held For Sale</h3>
      <p>
        Loans classified as Held For Sale (HFS) are recorded on the balance
        sheet at the lower of cost or fair value. This accounting treatment
        reflects the intention to sell the loans in the near term / foreseeable
        future. Loans classified as HFS are subject to fair value adjustments,
        with any changes in fair value recorded in earnings.
      </p>

      <h3>Fair Value Option</h3>
      <p>
        The Fair Value Option (FVO) allows entities to elect to measure certain
        loans at fair value on the balance sheet, with changes in fair value
        recorded in earnings. Loans designated under the FVO are typically
        recorded at fair value with changes recorded in earnings, which may
        result in increased income volatility compared to loans measured at
        amortized cost. However, entities electing the FVO must consistently
        apply fair value measurements to similar financial instruments. 
      </p>
    </div>
  );
};

export default Accounting;
