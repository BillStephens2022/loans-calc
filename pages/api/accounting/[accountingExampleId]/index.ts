// route: api/accounting/[accountingExampleId]
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from "../../../../lib/db";
import LoanAccountingExample, { LoanAccountingExampleDocument } from "../../../../models/loanAccountingExample";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

  const { accountingExampleId } = req.query;

  // Delete a specific accounting example
  if (req.method === "DELETE") {
    try {
      const existingAccountingExample: LoanAccountingExampleDocument | null = await LoanAccountingExample.findById(
        accountingExampleId
      );

      if (!existingAccountingExample) {
        return res.status(404).json({ error: "Loan Example not found" });
      }
      await existingAccountingExample.deleteOne();
      res.status(200).json({ message: "Loan Example deleted successfully" });
    } catch (error) {
      console.error("Error deleting Loan example:", error);
      res.status(500).json({ error: "Internal server error" });
    }
    // Fetch a specific loan accounting example
  } else if (req.method === "GET") {
    try {
      const existingAccountingExample: LoanAccountingExampleDocument | null = await LoanAccountingExample.findById(
        accountingExampleId
      );

      if (!existingAccountingExample) {
        return res.status(404).json({ error: "Example not found" });
      }

      res.status(200).json(existingAccountingExample);
    } catch (error) {
      console.error("Error fetching example:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default handler;
