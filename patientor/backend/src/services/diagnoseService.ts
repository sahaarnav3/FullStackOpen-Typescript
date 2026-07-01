import data from "../data/diagnoses.ts";
import type { DiagnosesEntry } from "../types.ts";


const getDiagnoses = (): DiagnosesEntry[] => {
  return data;
};

export default { getDiagnoses };
