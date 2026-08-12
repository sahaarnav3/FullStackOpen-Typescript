import type { Entry, Diagnosis } from "../../types";
import { Typography, Card } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";

type EntryProps = {
  entries: Entry[];
  diagnosesCodes: Diagnosis[];
};

const EntryDetails = ({ entries, diagnosesCodes }: EntryProps) => {
  function iconType(type: string) {
    if (type === "Hospital") return <LocalHospitalIcon />;
    if (type === "OccupationalHealthcare") return <WorkIcon />;
    if (type === "HealthCheck") return <MedicalServicesIcon />;
  }
    function heartIconType(rating: number){
        if(rating === 0)
            return <FavoriteIcon sx={{ color: "green" }} />;
        if(rating === 1)
            return <FavoriteIcon sx={{ color: "yellow" }} />;
        if(rating === 2)
            return <FavoriteIcon sx={{ color: "orange" }} />;
        if(rating === 3)
            return <FavoriteIcon sx={{ color: "red" }} />;
    }

  return (
    entries &&
    entries.map((entry) => (
      <Card
        variant="outlined"
        sx={{ marginTop: ".5em", border: "1.5px solid black", padding: "10px" }}
        key={entry.id}
      >
        <Typography variant="subtitle1">
          {entry.date} {iconType(entry.type)}{" "}
          {entry.type === "OccupationalHealthcare" ? (
            <b>
              <i>{entry.employerName}</i>
            </b>
          ) : (
            ""
          )}
        </Typography>
        <Typography variant="subtitle1">
          <i>{entry.description}</i>
        </Typography>
        {entry.type === "HealthCheck"
          ? heartIconType(entry.healthCheckRating)
          : ""}
        <Typography variant="subtitle1">
          diagnose by {entry.specialist}
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
      </Card>
    ))
  );
};

export default EntryDetails;
