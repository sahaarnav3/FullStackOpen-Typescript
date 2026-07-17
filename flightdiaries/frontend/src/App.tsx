import { useEffect, useState } from "react";
import { type FlightData } from "./types";
import AllFlightData from "./components/AllFlightData";
import AddNewFlight from "./components/AddNewFlight";
import flightServices from "./services/flightServices";

function App() {
  const [flightData, setFlightData] = useState<FlightData[]>([]);
  useEffect(() => {
    flightServices.getFlightData().then((data) => setFlightData(data));
  }, []);

  return (
    <>
      <AddNewFlight flightData={flightData} setFlightData={setFlightData} />
      <AllFlightData flightData={flightData} />
    </>
  );
}

export default App;
