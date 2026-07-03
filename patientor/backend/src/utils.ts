import { NewPatientEntrySchema, type NewPatientEntry } from "./types.ts";

export const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientEntrySchema.parse(object);
};