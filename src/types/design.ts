
import { Room } from "./floorPlan"; // Assuming Room includes all necessary fields

export interface DesignRequirements {
  buildingType: string;
  country: string;
  city: string;
  budget: number;
  plotSize: number;
  length: number;
  breadth: number;
  floors: number;
  rooms: string[];
  extras: string[];
  style: string;
  customRooms?: string[];
  colorScheme?: string;
  interiorPreference?: string;
  exteriorElements?: string[];
}

export interface GeneratedDesignFloorPlanRoom extends Room {
  // Already has name, length_ft, breadth_ft, position, type, priority from Room
}

export interface GeneratedDesign {
  floorPlan: {
    rooms: GeneratedDesignFloorPlanRoom[];
    totalArea: number;
  };
  modelUrl: string;
  summary: {
    totalRooms: number;
    totalArea: number;
    estimatedCost: number;
    style: string;
    features: string[];
  };
  variants?: Array<{
    name: string;
    description: string;
    floorPlanUrl: string; 
    model3dUrl: string;
  }>;
}
