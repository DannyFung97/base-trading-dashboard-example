import { Request, Response } from "express";
import { createUser, getUsers } from "../services/user";

export default {
  allUsers: async (req: Request, res: Response) => {
    try {
      const response = await getUsers();
      if (!response) {
        throw new Error("No users found");
      }
      res.json(response);
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({ error: "Error getting users" });
    }
  },
  getUser: async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const response = await getUsers(userId);
      if (!response) {
        throw new Error("User not found");
      }
      res.json(response);
    } catch (error) {
      console.error("Error getting user:", error);
      res.status(500).json({ error: "Error getting user" });
    }
  },
  createUser: async (req: Request, res: Response) => {
    try {
      const { newUser } = req.body;
      const response = await createUser(newUser);
      if (!response) {
        throw new Error("Error creating user");
      }
      res.json(response);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Error creating user" });
    }
  },
};
