import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import type { Patient, Diagnosis } from "../../types";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const PatientDetailsPage = () => {
  const patientId = useParams().id;
  const [patientData, setPatientData] = useState<Patient>();
  const [diagnosesCodes, setDiagnosesCodes] = useState<Diagnosis[]>();
  useEffect(() => {
    const fetchPatient = async (patientId: string) => {
      const patient = await patientService.getPatientWithId(patientId);
      const diagnosis = await patientService.getDiagnosesDetails();
      setPatientData(patient);
      setDiagnosesCodes(diagnosis);
    };
    void fetchPatient(patientId as string);
  }, [patientId]);

  return (
    patientData && (
      <div>
        <Typography
          variant="h4"
          sx={{ marginBottom: "0.5em", fontWeight: 500 }}
        >
          {patientData.name} <b>{patientData.gender === "male" ? "♂" : "♀"}</b>
        </Typography>
        <div>
          <Typography variant="subtitle1">ssn: {patientData.ssn}</Typography>
          <Typography variant="subtitle1">
            occupation: {patientData.occupation}
          </Typography>
          <Typography variant="subtitle1">
            date of birth: {patientData.dateOfBirth}
          </Typography>
        </div>
        <div>
          <Typography variant="h5" sx={{ margin: "1em 0" }}>
            entries
          </Typography>
          {patientData.entries.map((entry) => (
            <div key={entry.id}>
              <Typography variant="subtitle1">
                {entry.date} {entry.description}
              </Typography>
              {entry?.diagnosisCodes && (
                <ul>
                  {entry.diagnosisCodes.map((code) => {
                    const diagnosisDetails = diagnosesCodes?.find(
                      (diagnosis) => diagnosis.code === code,
                    );
                    return (
                      <li key={code}>
                        <Typography variant="subtitle1">
                          {diagnosisDetails?.code} {diagnosisDetails?.name}
                        </Typography>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default PatientDetailsPage;
