// /api/fronting
// route used for adding new fronting examples, getting all fronting examples

import dbConnect from "../../../lib/db";
import FrontingExample from "../../../models/frontingExample";

const handler = async (req, res) => {
  await dbConnect();
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  // Add a new Fronting Example
  if (req.method === "POST") {
    const {
      borrower,
      yourBankName,
      facility,
      globalCommitment,
      globalFundedLoans,
      globalLettersOfCredit,
      yourBankCommitment,
      isLCIssuer,
      isSwinglineLender,
      isNonAccrual,
      swinglineSublimit,
      swinglinesFundedByYourBank,
      lcSublimit,
      lcsIssuedByYourBank,
    } = req.body;

    try {
      // Create a new Fronting Example
      const newFrontingExample = new FrontingExample({
        borrower,
        yourBankName,
        facility,
        globalCommitment,
        globalFundedLoans,
        globalLettersOfCredit,
        yourBankCommitment,
        isLCIssuer,
        isSwinglineLender,
        isNonAccrual,
        swinglineSublimit,
        swinglinesFundedByYourBank,
        lcSublimit,
        lcsIssuedByYourBank,
      });

      // Save the new Fronting Example
      await newFrontingExample.save();

      res.status(201).json({
        message: "Fronting Example added successfully",
      });
    } catch (error) {
      console.error("Error adding Fronting Example:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "GET") {
    try {
      const frontingExamples = await FrontingExample.find({});
      res.status(200).json(frontingExamples);
    } catch (error) {
      console.error("Error fetching fronting examples:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
