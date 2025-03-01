import { Router } from "express";
import database from "./database";
import user from "./user";

export default function api() {
  const router = Router();

  router
    .use((req, res, next) => {
      if (!req.body) {
        next(new Error("Bad request"));
        return;
      }

      next();
    })
    .use("/v1", apiV1())
    .use((req, res, next) => {
      res.json({
        error: "Invalid route",
      });
    });

  return router;
}

function apiV1() {
  const router = Router();

  router.use("/database", database());
  router.use("/user", user());

  return router;
}
