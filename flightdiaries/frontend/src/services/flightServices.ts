import axios from "axios";
import { type FlightData } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getFlightData = () => {
  return axios.get<FlightData[]>(baseUrl).then((response) => response.data);
};

export default { getFlightData };
