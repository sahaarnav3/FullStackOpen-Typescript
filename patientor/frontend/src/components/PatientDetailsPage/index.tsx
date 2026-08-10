import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { type Patient } from "../../types";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const PatientDetailsPage = () => {
  const patientId = useParams().id;
  const [patientData, setPatientData] = useState<Patient>();
  useEffect(() => {
    const fetchPatient = async (patientId: string) => {
      const patient = await patientService.getPatientWithId(patientId);
      setPatientData(patient);
    };
    void fetchPatient(patientId as string);
  }, [patientId]);

  return (
    patientData && (
      <div>
        <Typography variant="h5" sx={{ marginBottom: "0.5em" }}>
          {patientData.name} <b>{patientData.gender === "male" ? "♂︎" : "♀︎"}</b>
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
      </div>
    )
  );
};

export default PatientDetailsPage;
