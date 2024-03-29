// route: api/fronting/[frontingExampleId]

import dbConnect from "../../../../lib/db";
import FrontingExample from "../../../../models/frontingExample";

const handler = async (req, res) => {
  await dbConnect();
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

  const { frontingExampleId } = req.query;

  // Delete a specific fronting example
  if (req.method === "DELETE") {
    try {
      const existingFrontingExample = await FrontingExample.findById(
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
    // Fetch a specific fronting example
  } else if (req.method === "GET") {
    try {
      const existingFrontingExample = await FrontingExample.findById(
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