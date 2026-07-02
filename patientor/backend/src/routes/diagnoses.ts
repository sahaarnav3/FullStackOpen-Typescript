import express, { type Response } from "express";
import diagnoseService from "../services/diagnoseService.ts";
import type { DiagnosesEntry } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<DiagnosesEntry[]>) => {
  const diagnosesData = diagnoseService.getDiagnoses();
  res.send(diagnosesData);
});

export default router;
