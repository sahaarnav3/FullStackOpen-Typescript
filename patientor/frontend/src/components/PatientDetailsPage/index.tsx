import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import type { Patient, Diagnosis, Entry } from "../../types";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EntryDetails from "./EntryDetails";
import AddEntryFrom from "./AddEntryForm";

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

  // Callback function to insert the newly added entry into local state smoothly
  const handleNewEntryAdded = (newEntry: Entry) => {
    if (patientData) {
      setPatientData({
        ...patientData,
        entries: patientData.entries.concat(newEntry),
      });
    }
  };

  return (
    patientData &&
    diagnosesCodes && (
      <div>
        <Typography
          variant="h4"
          sx={{ marginBottom: "0.5em", fontWeight: 500 }}
        >
          {patientData.name}{" "}
          {patientData.gender === "male" ? (
            <MaleIcon fontSize="large" />
          ) : (
            <FemaleIcon fontSize="large" />
          )}
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
        <AddEntryFrom
          allDiagnosesCodes={diagnosesCodes}
          patientId={patientData.id}
          onSubmitSuccess={handleNewEntryAdded} // Passing the handler prop down here
        />
        <div>
          <Typography variant="h5" sx={{ margin: "1em 0" }}>
            entries
          </Typography>
          <EntryDetails
            entries={patientData?.entries}
            diagnosesCodes={diagnosesCodes}
          />
        </div>
      </div>
    )
  );
};

export default PatientDetailsPage;
