import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  OutlinedInput,
  Box,
  Chip,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Diagnosis, NewEntry, Entry } from "../../types";
import patientService from "../../services/patients";

type DiagnosisProps = {
  allDiagnosesCodes: Diagnosis[];
  patientId: string;
  onSubmitSuccess: (newEntry: Entry) => void; // Added matching signature here
};

const AddEntryFrom = ({
  allDiagnosesCodes,
  patientId,
  onSubmitSuccess,
}: DiagnosisProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const [entryType, setEntryType] = useState<NewEntry["type"] | "">(
    "OccupationalHealthcare",
  );
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>(["S62.5"]);
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  function diagnosesCodeComponent() {
    const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
      const {
        target: { value },
      } = event;
      setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
    };

    return (
      <FormControl fullWidth size="small" sx={{ marginTop: "1em" }} required>
        <InputLabel>Chip</InputLabel>
        <Select
          multiple
          value={diagnosisCodes}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {allDiagnosesCodes.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} -- {diagnosis.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  function cancelButtonHandler() {
    setEntryType("");
    setDate("");
    setDescription("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setHealthCheckRating(0);

    setShowForm(false);
  }

  async function formHandler(e: SyntheticEvent) {
    e.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };
    let entryPayload: NewEntry;

    switch (entryType) {
      case "HealthCheck":
        entryPayload = {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating,
        };
        break;

      case "Hospital":
        entryPayload = {
          ...baseEntry,
          type: "Hospital",
        };
        break;

      case "OccupationalHealthcare":
        entryPayload = {
          ...baseEntry,
          type: "OccupationalHealthcare",
        };
        break;

      default:
        alert("Please select a valid entry type");
        return;
    }

    try {
      const entryData: Entry = await patientService.createPatientEntry(
        entryPayload,
        patientId,
      );

      onSubmitSuccess(entryData);

      cancelButtonHandler();
    } catch (error) {
      console.error("Error creating medical entry details:", error);
    }
  }

  if (!showForm) {
    return (
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: "1em" }}
        onClick={() => setShowForm(true)}
      >
        Add New Entry
      </Button>
    );
  }

  return (
    <form
      style={{
        border: "2px dashed #a9a9a9",
        borderRadius: "0.2em",
        padding: "1em",
        marginTop: "0.3em",
      }}
      onSubmit={formHandler}
    >
      <Typography variant="h6" sx={{ fontWeight: "600" }}>
        New Entry
      </Typography>
      <FormControl fullWidth size="small" sx={{ marginTop: "1em" }}>
        <InputLabel>Entry Type</InputLabel>
        <Select
          label="Entry Type"
          value={entryType}
          onChange={({ target }) =>
            setEntryType(target.value as NewEntry["type"])
          }
          required
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>
      </FormControl>
      <TextField
        type="date"
        size="small"
        fullWidth
        label="Date"
        value={date}
        sx={{ marginTop: "1em" }}
        onChange={({ target }) => setDate(target.value)}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Description"
        fullWidth
        size="small"
        sx={{ marginTop: "1em" }}
        value={description}
        required
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        size="small"
        sx={{ marginTop: "1em" }}
        value={specialist}
        required
        onChange={({ target }) => setSpecialist(target.value)}
      />
      {diagnosesCodeComponent()}
      {entryType && entryType === "HealthCheck" && (
        <FormControl fullWidth size="small" sx={{ marginTop: "1em" }}>
          <InputLabel>Health Check Rating</InputLabel>
          <Select
            label="Health Check Rating"
            value={healthCheckRating}
            onChange={({ target }) =>
              setHealthCheckRating(Number(target.value))
            }
          >
            <MenuItem value={0}>0 -- Healthy</MenuItem>
            <MenuItem value={1}>1 -- Low Risk</MenuItem>
            <MenuItem value={2}>2 -- High Risk</MenuItem>
            <MenuItem value={3}>3 -- Critical Risk</MenuItem>
          </Select>
        </FormControl>
      )}
      <div style={{ margin: "1em 0em" }}>
        <Button variant="contained" sx={{ marginRight: "1em" }} type="submit">
          Add
        </Button>
        <Button
          variant="outlined"
          color="error"
          type="button"
          onClick={cancelButtonHandler}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddEntryFrom;
