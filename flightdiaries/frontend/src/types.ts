export interface FlightData {
  concat(data: FlightData): import("react").SetStateAction<FlightData[]>;
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

export interface FlightDataInput {
  date: string;
  weather: string;
  visibility: string;
}
