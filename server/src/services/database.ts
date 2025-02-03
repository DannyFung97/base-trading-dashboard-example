import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL || "");

export const getMessages = async () => {
  try {
    // Fetch the 50 latest messages ordered by created_at in descending order
    const result = await sql`
        SELECT * FROM messages
        ORDER BY created_at DESC
        LIMIT 50
      `;

    // Reorder the fetched messages in ascending order
    const orderedResult = result.reverse();

    return orderedResult;
  } catch (error) {
    console.error("Error getting messages", error);
    return undefined;
  }
};

export const postMessage = async (text: string) => {
  const timestamp = new Date().toISOString();
  try {
    const result = await sql`
      INSERT INTO messages (text, created_at)
      VALUES (${text}, ${timestamp})
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error("Error inserting message:", error);
    return undefined;
  }
};
