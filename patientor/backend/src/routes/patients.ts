import express, { type Response, type Request } from "express";
import patientService from "../services/patientService.ts";
import type {
  NonSensitivePatientEntry,
  NewPatientEntry,
  PatientEntry,
  Entry,
} from "../types.ts";
import { NewEntrySchema } from "../types.ts";
import { newPatientParser, errorMiddleware } from "../middleware.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  const patientData = patientService.getNonSensitivePatientEntry();
  res.send(patientData);
});

router.get("/:id", (req, res: Response<PatientEntry>) => {
  const patientId = req.params.id;
  const patientData = patientService.getPatientData(patientId);
  res.send(patientData);
});

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientEntry>,
  ) => {
    const addedEntry = patientService.addNewPatient(req.body);
    return res.json(addedEntry);
  },
);

router.post("/:id/entries", (req, res: Response<Entry>) => {
  const patientId = req.params.id;
  const validateNewEntry = NewEntrySchema.parse(req.body);
  const addedEntry = patientService.addEntry(patientId, validateNewEntry);
  res.status(201).json(addedEntry);
});

router.use(errorMiddleware);

export default router;
