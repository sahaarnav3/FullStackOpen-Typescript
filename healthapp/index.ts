import express from "express";
const app = express();

import calculateBmi from "./bmiCalculator.ts";
import { calculateExercise } from "./exerciseCalculator.ts";
import { isNotNumber } from "./utils.ts";

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight || height === 0 || weight === 0)
    return res.status(400).json({ error: "malformatted parameters" });
  const bmi = calculateBmi(height, weight);
  return res.status(200).json({ height, weight, bmi });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target)
    return res.status(400).json({ error: "parameters missing" });
  for (let i = 0; i < daily_exercises.length; i++)
    if (isNotNumber(daily_exercises[i]))
      return res
        .status(400)
        .json({ error: "malformatted values for daily exercises" });
  if (isNotNumber(target))
    return res.status(400).json({ error: "malformatted value for target" });
  const exerciseResponse = calculateExercise(daily_exercises, target);
  return res.status(200).json(exerciseResponse);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
