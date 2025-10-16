import { Region, Job, ScheduleResult } from "@/types/scheduler";

const mockRegions: Region[] = [
  {
    id: "us-west-renewable",
    name: "US West (Renewable)",
    location: "Oregon, USA",
    carbonIntensity: 35,
    cost: 0.12,
    latency: 45,
    availability: 99.9,
  },
  {
    id: "eu-north-hydro",
    name: "EU North (Hydro)",
    location: "Stockholm, Sweden",
    carbonIntensity: 15,
    cost: 0.10,
    latency: 85,
    availability: 99.95,
  },
  {
    id: "asia-pacific-solar",
    name: "Asia Pacific (Solar)",
    location: "Singapore",
    carbonIntensity: 120,
    cost: 0.15,
    latency: 120,
    availability: 99.8,
  },
  {
    id: "us-east-standard",
    name: "US East (Standard)",
    location: "Virginia, USA",
    carbonIntensity: 380,
    cost: 0.08,
    latency: 30,
    availability: 99.95,
  },
  {
    id: "eu-west-wind",
    name: "EU West (Wind)",
    location: "Dublin, Ireland",
    carbonIntensity: 280,
    cost: 0.11,
    latency: 70,
    availability: 99.9,
  },
  {
    id: "canada-hydro",
    name: "Canada (Hydro)",
    location: "Quebec, Canada",
    carbonIntensity: 20,
    cost: 0.09,
    latency: 55,
    availability: 99.92,
  },
  {
    id: "brazil-renewable",
    name: "Brazil (Renewable Mix)",
    location: "São Paulo, Brazil",
    carbonIntensity: 95,
    cost: 0.13,
    latency: 140,
    availability: 99.7,
  },
  {
    id: "australia-solar",
    name: "Australia (Solar)",
    location: "Sydney, Australia",
    carbonIntensity: 110,
    cost: 0.14,
    latency: 180,
    availability: 99.85,
  },
  {
    id: "norway-hydro",
    name: "Norway (Hydro)",
    location: "Oslo, Norway",
    carbonIntensity: 12,
    cost: 0.11,
    latency: 90,
    availability: 99.96,
  },
  {
    id: "india-mixed",
    name: "India (Mixed)",
    location: "Mumbai, India",
    carbonIntensity: 320,
    cost: 0.07,
    latency: 165,
    availability: 99.6,
  },
  {
    id: "japan-renewable",
    name: "Japan (Renewable)",
    location: "Tokyo, Japan",
    carbonIntensity: 150,
    cost: 0.16,
    latency: 135,
    availability: 99.9,
  },
  {
    id: "germany-wind",
    name: "Germany (Wind)",
    location: "Frankfurt, Germany",
    carbonIntensity: 180,
    cost: 0.12,
    latency: 65,
    availability: 99.88,
  },
];

const AVERAGE_CARBON_INTENSITY = 475; // gCO2/kWh global average

export const getRegions = (): Promise<Region[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRegions), 300);
  });
};

export const scheduleJob = (job: Job): Promise<ScheduleResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple scoring algorithm
      const scoredRegions = mockRegions.map((region) => {
        let score = 0;
        
        // Carbon intensity weight (most important)
        score += (1 - region.carbonIntensity / 500) * 50;
        
        // Cost weight
        score += (1 - region.cost / 0.2) * 20;
        
        // Latency weight (urgency dependent)
        const latencyWeight = job.urgency === "high" ? 25 : job.urgency === "medium" ? 15 : 5;
        score += (1 - region.latency / 200) * latencyWeight;
        
        // Availability weight
        score += (region.availability / 100) * 5;
        
        return { region, score };
      });
      
      // Sort by score and pick best
      scoredRegions.sort((a, b) => b.score - a.score);
      const bestRegion = scoredRegions[0].region;
      
      // Calculate metrics
      const estimatedEnergy = job.cpuUsage * job.runtime * 0.3; // Simplified: 0.3 kWh per core-hour
      const estimatedCO2 = (estimatedEnergy * bestRegion.carbonIntensity) / 1000; // Convert to kg
      const estimatedCost = bestRegion.cost * job.runtime * job.cpuUsage;
      const carbonSaved = (estimatedEnergy * (AVERAGE_CARBON_INTENSITY - bestRegion.carbonIntensity)) / 1000;
      
      const result: ScheduleResult = {
        region: bestRegion,
        estimatedEnergy,
        estimatedCO2,
        estimatedCost,
        carbonSaved,
      };
      
      resolve(result);
    }, 500);
  });
};
