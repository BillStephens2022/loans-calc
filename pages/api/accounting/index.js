// /api/accounting
// route used for adding new loan accounting examples, getting all loan examples

import dbConnect from "../../../lib/db";
import LoanAccountingExample from "../../../models/loanAccountingExample";
import JournalEntry from "../../../models/journalEntry";
import { createJournalEntries } from "../../../util/createJournalEntries";

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
      accounting,
      isOrigination,
      weightedAverageCost,
      upfrontFee,
      loanMark,
    } = req.body;

    try {
      // Create a new Loan Accounting Example
      const newLoanAccountingExample = new LoanAccountingExample({
        borrower,
        facility,
        commitment,
        fundedLoan,
        lettersOfCredit,
        accounting,
        isOrigination,
        weightedAverageCost,
        upfrontFee,
        loanMark,
      });

      // Save the new Loan Accounting Example
      await newLoanAccountingExample.save();
      // Create journal entries for the new Loan Accounting Example
      const journalEntriesData = createJournalEntries(req.body);
      const createdJournalEntries = await JournalEntry.insertMany(
        journalEntriesData.map((entry) => ({
          ...entry,
          loanAccountingExample: newLoanAccountingExample._id,
        }))
      );
      res
        .status(201)
        .json({
          message: "Loan Accounting Example added successfully",
          createdJournalEntries,
        });
    } catch (error) {
      console.error("Error adding Loan Accounting Example:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "GET") {
    try {
      const loanAccountingExamples = await LoanAccountingExample.find({});
      // Check if there are any loan accounting examples
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
