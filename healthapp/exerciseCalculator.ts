import { isNotNumber } from "./utils.ts";
interface ExerciseStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercise = (
  dailyValue: number[],
  targetValue: number,
): ExerciseStats => {
  const periodLength = dailyValue.length;
  let trainingDays = 0;
  let totalHrs = 0;
  dailyValue.forEach((hr) => {
    if (hr > 0) trainingDays++;
    totalHrs += hr;
  });
  // eslint-disable-next-line no-useless-assignment
  let rating = 0;
  // eslint-disable-next-line no-useless-assignment
  let ratingDescription = "";
  const average = totalHrs / periodLength;
  const workoutPercentage = average / targetValue;
  if (workoutPercentage <= 0.5) {
    rating = 3;
    ratingDescription = "Not Good. Please Work Harder";
  } else if (workoutPercentage < 1) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "Superb. Keep up the momentum";
  }
  const success = average >= targetValue ? true : false;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetValue,
    average,
  };
};

// console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2));

try {
  const dailyValue: number[] = process.argv.slice(3).map((val) => {
    if (isNotNumber(val)) throw new Error("Provided Values were not numbers!");
    return Number(val);
  });
  const targetValue: number = Number(process.argv[2]);
  console.log(dailyValue, targetValue);
  console.log(calculateExercise(dailyValue, targetValue));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) errorMessage += " Error: " + error;
  console.log(errorMessage);
}
