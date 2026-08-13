import axios from "axios";
import type { Patient, PatientFormValues, Diagnosis, NewEntry, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getPatientWithId = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getDiagnosesDetails = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

const createPatientEntry = async(entryObject: NewEntry, id: string): Promise<Entry> => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, entryObject);
  return data;
};

export default {
  getAll,
  create,
  getPatientWithId,
  getDiagnosesDetails,
  createPatientEntry,
};
