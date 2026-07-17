import { useEffect, useState } from "react";
import { type FlightData } from "./types";
import flightServices from "./services/flightServices";

function App() {
  const [flightData, setFlightData] = useState<FlightData[]>([]);
  useEffect(() => {
    flightServices.getFlightData().then((data) => setFlightData(data));
  }, []);

  return (
    <>
      <h1>Flight Data</h1>
      <ul>
        {flightData.map((data) => (
          <li key={data.id}>
            <h3 style={{ display: "inline" }}>Date: </h3>
            <span>{data.date}</span>
            <br />
            <h3 style={{ display: "inline" }}>Weather: </h3>
            <span>{data.weather}</span>
            <br />
            <h3 style={{ display: "inline" }}>Visibility:</h3>
            <span>{data.visibility}</span>
            <br />
            <br />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
