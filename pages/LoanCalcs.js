

const LoanCalcs = () => {
  return (
    <div>
    <h1>Loan Journal Entries</h1>
    <h2>Enter Loan Details and submit to see simulated journal entries</h2>
    <div>
      <form>
        <div>
            <label htmlFor="commitment">commitment:</label>
            <input id="commitment" name="commitment" />
        </div>
        <div>
            <label htmlFor="fundedloan">total funded:</label>
            <input id="fundedloan" name="fundedloan" />
        </div>
        <div>
            <label htmlFor="upfrontfees">upfront fees:</label>
            <input id="upfrontfees" name="upfrontfees" />
        </div>
        <button>Submit</button>
      </form>
      
      </div>
     
    </div>
  );
}

export default LoanCalcs;