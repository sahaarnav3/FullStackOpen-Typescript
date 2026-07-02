import { Gender, type NewPatientEntry } from "./types.ts";

export const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object")
    throw new Error("Incorrect or missing data");

  //object is unknown so object._ will not work. e.g object.name wont worj. So we do this -
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDob(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newEntry;
  }
  throw new Error("Incorrect data: Some fields are missing");
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) throw new Error("Incorrect or missing Name: " + name);
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const parseDob = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date))
    throw new Error("Incorrect or missing date: " + date);
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) throw new Error("Incorrect or missing ssn: " + ssn);
  return ssn;
};

const isGender = (gender: string): gender is Gender => {
    return (Object.values(Gender) as string[]).includes(gender);
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender))
    throw new Error("Incorrect or missing gender: " + gender);
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation))
    throw new Error("Incorrect or missing occupation: " + occupation);
  return occupation;
};
