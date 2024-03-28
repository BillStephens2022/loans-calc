// route: api/entries

import dbConnect from "../../../../lib/db";
import JournalEntry from "../../../../models/journalEntry";

const handler = async (req, res) => {
  await dbConnect();
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

  // Get journal entries for a specific loan account example
  if (req.method === "GET") {
    try {
      const journalEntries = await JournalEntry.find({});

      if (!journalEntries) {
        return res.status(404).json({ error: "Journal entries not found" });
      }

      res.status(200).json(journalEntries);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default handler;
