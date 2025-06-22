
// Interface for rooms before position is calculated
export interface BaseRoom {
  name: string;
  length_ft: number;
  breadth_ft: number;
  type: "bedroom" | "bathroom" | "kitchen" | "living" | "dining" | "utility" | "other";
  priority: number;
}

// Interface for rooms after position is calculated
export interface Room extends BaseRoom {
  position: [number, number]; // Position as a tuple [x, y]
}

// Interface for a single floor plan variant
export interface FloorPlanVariant {
  name: string;
  description: string;
  rooms: Room[];
  layout: string; // e.g., 'Optimized', 'Compact', 'Open Living'
  benefits: string[];
}

// Interface for the FloorPlan object, especially for EnhancedFloorPlanViewer props
export interface FloorPlan {
  rooms: Room[]; // Rooms of the currently selected variant
  totalArea: number; // Area of the currently selected variant
  layout: string; // Layout of the currently selected variant
  variants: FloorPlanVariant[]; // List of ALL available variants for selection
}

