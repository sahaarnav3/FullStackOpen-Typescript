import { useState, type Dispatch, type SetStateAction } from "react";
import flightServices from "../services/flightServices";
import { type FlightData } from "../types";

interface FlightDataProps {
  flightData: FlightData[];
  setFlightData: Dispatch<SetStateAction<FlightData[]>>;
}

const AddNewFlight = ({ flightData, setFlightData }: FlightDataProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");

  const addFlightHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (date && weather && visibility)
      flightServices
        .createFlightData({ date, weather, visibility })
        .then((data) => setFlightData(flightData.concat(data)));
  };

  return (
    <form onSubmit={addFlightHandler}>
      <h1>Add New Flight Data</h1>
      <label>
        Date:{" "}
        <input type="date" onChange={(e) => setDate(e.target.value)} required />
      </label>
      <br />
      <label>
        Weather:{" "}
        <select
          onChange={(e) => setWeather(e.target.value)}
          defaultValue="default"
        >
          <option disabled value="default">
            Please Select an option
          </option>
          <option value="sunny">Sunny</option>
          <option value="rainy">Rainy</option>
          <option value="cloudy">Cloudy</option>
          <option value="stormy">Stormy</option>
          <option value="windy">Windy</option>
        </select>
      </label>
      <br />
      <label>
        Visibility:{" "}
        <select
          onChange={(e) => setVisibility(e.target.value)}
          defaultValue="default"
        >
          <option disabled value="default">
            Please Select an option
          </option>
          <option value="great">Great</option>
          <option value="good">Good</option>
          <option value="ok">Ok</option>
          <option value="poor">Poor</option>
        </select>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddNewFlight;
