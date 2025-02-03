import { Request, Response } from "express";
import { getMessages, postMessage } from "../services/database";

export default {
  getMessages: async (req: Request, res: Response) => {
    // Logic to get all users
    const response = await getMessages();
    if (!!response) {
      res.status(200).json(response);
    } else {
      res.status(500).send("Error fetching messages");
    }
  },
  postMessage: async (req: Request, res: Response) => {
    const { text } = req.body;
    const response = await postMessage(text);
    if (!!response) {
      res.status(201).json(response);
    } else {
      res.status(500).send("Error inserting message");
    }
  },
};
