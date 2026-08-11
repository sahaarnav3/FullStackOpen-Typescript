export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<string>;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

// 1. Define HospitalEntry conforming to the image's example data
export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

// 2. Define OccupationalHealthcareEntry
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

// 3. Define HealthCheckEntry (from the previous steps)
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

// 4. Create the final Entry union type
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// 5. Update your Patient interface to include the entries array
export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: string;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]; // Ensure this array uses the Entry union type
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
