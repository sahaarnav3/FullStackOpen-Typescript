
import express, { type Response } from "express";
import patientService from "../services/patientService.ts";
import type { NonSensitivePatientEntry } from "../types.ts";
import { parseNewPatientEntry } from "../utils.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  const patientData = patientService.getNonSensitivePatientEntry();
  res.send(patientData);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = parseNewPatientEntry(req.body);
    const addedEntry = patientService.addNewPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = `Something went wrong.`;
    if (error instanceof Error) errorMessage += " Error: " + error.message;
    res.status(400).json(errorMessage);
  }
});

export default router;
