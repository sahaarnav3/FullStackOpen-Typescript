import { z } from "zod";

export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});
const NewBaseEntrySchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});


const DischargeSchema = z.object({
  date: z.string().optional(),
  criteria: z.string().optional(),
});

const SickLeaveSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
export const HealthCheckRatingSchema = z.enum(HealthCheckRating);

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: DischargeSchema,
});
export const NewHospitalEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: DischargeSchema,
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
});
export const NewOccupationalHealthcareEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: HealthCheckRatingSchema,
});
export const NewHealthCheckEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: HealthCheckRatingSchema,
});

export const EntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema,
]);
export const NewEntrySchema = z.discriminatedUnion("type", [
  NewHospitalEntrySchema,
  NewOccupationalHealthcareEntrySchema,
  NewHealthCheckEntrySchema,
]);

export type Entry = z.infer<typeof EntrySchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;

export const NewPatientEntrySchema = z.object({
  name: z.string().trim().min(1, { message: "Name cannot be empty" }),
  dateOfBirth: z.iso.date(),
  ssn: z.string().trim().min(1).optional(),
  gender: z.enum(Gender),
  occupation: z
    .string()
    .trim()
    .min(1, { message: "Occupation cannot be empty" }),
  entries: z.array(EntrySchema),
});

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;
export const PatientEntrySchema = NewPatientEntrySchema.extend({
  id: z.string(),
});

export type PatientEntry = z.infer<typeof PatientEntrySchema>;

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;
