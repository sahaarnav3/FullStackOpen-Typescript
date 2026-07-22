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

export const EntrySchema = z.object({});

export type Entry = z.infer<typeof EntrySchema>;

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
export interface PatientEntry extends NewPatientEntry {
  id: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;
