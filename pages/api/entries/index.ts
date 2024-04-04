// route: api/entries
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from "../../../lib/db";
import JournalEntry, { JournalEntryDocument } from "../../../models/journalEntry";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

  // Get all journal entries for a specific loan account example
  if (req.method === "GET") {
    try {
      const journalEntries: JournalEntryDocument[] = await JournalEntry.find({});

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
