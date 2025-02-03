import { Router } from "express";
import controller from "../controllers/user";

export default function user() {
  const router = Router();

  router.get("/", controller.allUsers);
  router.get("/:id", controller.getUser);
  router.post("/post", controller.createUser);

  return router;
}
