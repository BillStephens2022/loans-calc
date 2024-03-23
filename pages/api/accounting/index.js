// /api/accounting
// route used for adding new loan accounting examples, getting all loan examples

import dbConnect from "@/lib/db";
import LoanAccountingExample from "@/models/loanAccountingExample";

const handler = async (req, res) => {
  await dbConnect();
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

  // Add a new Loan Accounting Example
  if (req.method === "POST") {
    const {
      borrower,
      facility,
      commitment,
      fundedLoan,
      lettersOfCredit,
      upfrontFee,
      loanMark,
    } = req.body;

    try {
      const newLoanAccountingExample = new LoanAccountingExample({
        borrower,
        facility,
        commitment,
        fundedLoan,
        lettersOfCredit,
        upfrontFee,
        loanMark,
      });
      await newLoanAccountingExample.save();
      res.status(201).json({ message: "Loan Accounting Example added successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "GET") {
    try {
      const loanAccountingExamples = await LoanAccountingExample.find({});
      res.status(200).json(loanAccountingExamples);
    } catch (error) {
      console.error("Error fetching loan accounting examples:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
