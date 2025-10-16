export interface Region {
  id: string;
  name: string;
  location: string;
  carbonIntensity: number; // gCO2/kWh
  cost: number; // $/hour
  latency: number; // ms
  availability: number; // percentage
}

export interface Job {
  name: string;
  cpuUsage: number; // cores
  runtime: number; // hours
  urgency: "low" | "medium" | "high";
}

export interface ScheduleResult {
  region: Region;
  estimatedEnergy: number; // kWh
  estimatedCO2: number; // kg
  estimatedCost: number; // $
  carbonSaved: number; // kg CO2 compared to average
}
