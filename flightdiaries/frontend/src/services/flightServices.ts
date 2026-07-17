import axios from "axios";
import { type FlightData, type FlightDataInput } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getFlightData = () => {
  return axios.get<FlightData[]>(baseUrl).then((response) => response.data);
};

const createFlightData = (newFlightData: FlightDataInput) => {
  return axios
    .post<FlightData>(baseUrl, newFlightData)
    .then((response) => response.data);
};

export default { getFlightData, createFlightData };
