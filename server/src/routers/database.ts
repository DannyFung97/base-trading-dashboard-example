import { Router } from "express";
import controller from "../controllers/database";

export default function user() {
  const router = Router();

  router.get("/", controller.getMessages);
  router.post("/post", controller.postMessage);

  return router;
}
