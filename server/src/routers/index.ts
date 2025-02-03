import express, { Application, Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import api from "./api";

export default function configure(app: Application) {
  // Enable CORS for all routes
  app.use(express.static("public")).use(json()).use("/api", api());
}
