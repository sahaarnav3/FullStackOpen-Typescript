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
  const [comment, setComment] = useState("");

  const addFlightHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (date && weather && visibility)
      flightServices
        .createFlightData({
          id: flightData.length + 1,
          date,
          weather,
          visibility,
          comment,
        })
        .then((data) => setFlightData(flightData.concat(data)));

    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");
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
        <input
          type="radio"
          name="weather"
          onClick={() => setWeather("sunny")}
        />
        sunny{" "}
        <input
          type="radio"
          name="weather"
          onClick={() => setWeather("rainy")}
        />
        rainy{" "}
        <input
          type="radio"
          name="weather"
          onClick={() => setWeather("cloudy")}
        />
        cloudy{" "}
        <input
          type="radio"
          name="weather"
          onClick={() => setWeather("stormy")}
        />
        stormy{" "}
        <input
          type="radio"
          name="weather"
          onClick={() => setWeather("windy")}
        />
        windy{" "}
      </label>
      <br />
      <label>
        Visibility:{" "}
        <input
          type="radio"
          name="visibility"
          onClick={() => setVisibility("great")}
        />
        great{" "}
        <input
          type="radio"
          name="visibility"
          onClick={() => setVisibility("good")}
        />
        good{" "}
        <input
          type="radio"
          name="visibility"
          onClick={() => setVisibility("ok")}
        />
        ok{" "}
        <input
          type="radio"
          name="visibility"
          onClick={() => setVisibility("poor")}
        />
        poor{" "}
      </label>
      <br />
      <label>
        Comment:{" "}
        <input type="text" onChange={(e) => setComment(e.target.value)} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddNewFlight;
