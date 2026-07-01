import express from "express";
import diagnoseService from "../services/diagnoseService.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  const diagnosesData = diagnoseService.getDiagnoses();
  res.send(diagnosesData);
});

export default router;
