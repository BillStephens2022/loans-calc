// route: api/fronting/[frontingExampleId]
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/db";
import FrontingExample, { FrontingExampleDocument } from "../../../../models/frontingExample";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

  // get the id from the request object
  const { frontingExampleId } = req.query;

  // Delete a specific fronting example using the id
  if (req.method === "DELETE") {
    try {
      const existingFrontingExample: FrontingExampleDocument | null = await FrontingExample.findById(
        frontingExampleId
      );

      if (!existingFrontingExample) {
        return res.status(404).json({ error: "Fronting Example not found" });
      }
      await existingFrontingExample.deleteOne();
      res.status(200).json({ message: "Fronting Example deleted successfully" });
    } catch (error) {
      console.error("Error deleting Fronting example:", error);
      res.status(500).json({ error: "Internal server error" });
    }
    // Fetch a specific fronting example using the id
  } else if (req.method === "GET") {
    try {
      const existingFrontingExample: FrontingExampleDocument | null = await FrontingExample.findById(
        frontingExampleId
      );

      if (!existingFrontingExample) {
        return res.status(404).json({ error: "Fronting Example not found" });
      }

      res.status(200).json(existingFrontingExample);
    } catch (error) {
      console.error("Error fetching fronting example:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default handler;