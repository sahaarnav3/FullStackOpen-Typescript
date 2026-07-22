import data from "../data/patients.ts";
import type {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from "../types.ts";
import { v1 as uuid } from "uuid";

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

const addNewPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  data.push(newPatientEntry);
  return newPatientEntry;
};

const getPatientData = (id: string): PatientEntry | undefined => {
  return data.find((patient) => patient.id === id);
};

export default {
  getPatients,
  getNonSensitivePatientEntry,
  addNewPatient,
  getPatientData,
};
