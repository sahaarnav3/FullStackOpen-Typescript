import data from "../data/patients.ts";
import type { PatientEntry, NonSensitivePatientEntry } from "../types.ts";

const getPatients = (): PatientEntry[] => {
  return data;
};

const getNonSensitivePatientEntry = (): NonSensitivePatientEntry[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getPatients, getNonSensitivePatientEntry };
