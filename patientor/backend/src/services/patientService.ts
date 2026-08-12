import data from "../data/patients.ts";
import type {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
  NewEntry,
  Entry,
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

const addEntry = (patientId: string, newEntry: NewEntry): Entry => {
  const patientData = data.find((patient) => patient.id === patientId);
  if (!patientData) throw new Error(`Patient with id ${patientId} not found`);

  const entryWithId: Entry = {
    id: uuid(),
    ...newEntry,
  };

  if (!patientData.entries) patientData.entries = [];
  patientData.entries.push(entryWithId);
  return entryWithId;
};

export default {
  getPatients,
  getNonSensitivePatientEntry,
  addNewPatient,
  getPatientData,
  addEntry,
};
