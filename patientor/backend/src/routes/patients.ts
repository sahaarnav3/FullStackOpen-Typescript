import express, { type Response } from "express";
import patientService from "../services/patientService.ts";
import type { NonSensitivePatientEntry } from "../types.ts";
import { parseNewPatientEntry } from "../utils.ts";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  const patientData = patientService.getNonSensitivePatientEntry();
  res.send(patientData);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = parseNewPatientEntry(req.body);
    const addedEntry = patientService.addNewPatient(newPatientEntry);
    return res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError)
      return res.status(400).send({ error: error.issues });
    else return res.status(400).send({ error: "unknown error" });
  }
});

export default router;
