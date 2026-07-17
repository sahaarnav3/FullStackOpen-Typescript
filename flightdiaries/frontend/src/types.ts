export interface FlightData {
  // concat(data: FlightData): import("react").SetStateAction<FlightData[]>;
  id: number;
  date: string;
  weather: string;
  visibility: string;
  // comment: string;
}

export interface FlightDataInput {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}
