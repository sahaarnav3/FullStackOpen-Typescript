import { type FlightData } from "../types";

interface FlightDataProps {
  flightData: FlightData[];
}

export default function AllFlightData({ flightData }: FlightDataProps) {
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

// export default function AllFlightData({ flightData }: FlightData[])
// If we write the above we are indirectly writing props : FlightData[] so that is obvsly wrong.
