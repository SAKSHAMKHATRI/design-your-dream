import type { BaseRoom, Room, FloorPlanVariant } from "@/types/floorPlan";

// Define a local interface for the requirements needed by this module
// This helps avoid circular dependencies with Design.tsx
interface PlanRequirements {
  rooms: string[];
  customRooms?: string[];
  // We can add other fields from DesignRequirements here if they become
  // relevant for floor plan generation logic in the future (e.g., country for Vastu).
}

export const baseRooms: BaseRoom[] = [
  { name: "Living Room", length_ft: 18, breadth_ft: 16, type: "living", priority: 1 },
  { name: "Dining Room", length_ft: 12, breadth_ft: 10, type: "dining", priority: 2 },
  { name: "Kitchen", length_ft: 12, breadth_ft: 8, type: "kitchen", priority: 3 },
  { name: "Master Bedroom", length_ft: 16, breadth_ft: 14, type: "bedroom", priority: 4 },
  { name: "Bathroom (Master)", length_ft: 8, breadth_ft: 6, type: "bathroom", priority: 5 },
  { name: "Bedroom 2", length_ft: 12, breadth_ft: 10, type: "bedroom", priority: 6 },
  { name: "Bathroom 1", length_ft: 7, breadth_ft: 5, type: "bathroom", priority: 7 },
  { name: "Bedroom 3", length_ft: 11, breadth_ft: 10, type: "bedroom", priority: 8 },
  { name: "Bathroom 2", length_ft: 7, breadth_ft: 5, type: "bathroom", priority: 9 },
  { name: "Store Room", length_ft: 6, breadth_ft: 5, type: "utility", priority: 10 },
  { name: "Pooja Room", length_ft: 6, breadth_ft: 5, type: "other", priority: 11 }, // Added Pooja Room
  { name: "Meditation Room", length_ft: 8, breadth_ft: 8, type: "other", priority: 12 }, // Priority adjusted
  { name: "Balcony", length_ft: 8, breadth_ft: 4, type: "other", priority: 13 }, // Priority adjusted
  { name: "Music Room", length_ft: 10, breadth_ft: 8, type: "other", priority: 14 }, // Priority adjusted
];

// Helper function to sort rooms for better proximity in grid layouts
const sortRoomsForProximity = (rooms: BaseRoom[]): BaseRoom[] => {
  const getSortKey = (room: BaseRoom): number => {
    // Specific ordering for Master Bedroom and its bathroom
    if (room.name === "Master Bedroom") return 1;
    if (room.name === "Bathroom (Master)") return 2;

    // Group other bedrooms and their potential bathrooms
    if (room.name === "Bedroom 2") return 3;
    if (room.name === "Bathroom 1") return 4; // Assumed for Bedroom 2
    if (room.name === "Bedroom 3") return 5;
    if (room.name === "Bathroom 2") return 6; // Assumed for Bedroom 3
    
    // Group living, dining, balcony
    if (room.name === "Living Room") return 10;
    if (room.name === "Dining Room") return 11;
    if (room.name === "Balcony") return 12; // Attempt to place near living areas

    // Group kitchen and store room
    if (room.name === "Kitchen") return 20;
    if (room.name === "Store Room") return 21;

    // Other specific rooms
    if (room.name === "Music Room") return 30;
    if (room.name === "Meditation Room") return 31;
    if (room.name === "Pooja Room") return 32; // Added Pooja Room sort key
    
    // Fallback for any other rooms based on original priority
    return 100 + room.priority;
  };
  return [...rooms].sort((a, b) => getSortKey(a) - getSortKey(b));
};

// Layout functions
export function getOptimizedLayout(initialRooms: BaseRoom[]): Room[] {
  if (!initialRooms || initialRooms.length === 0) return [];
  const sortedRooms = sortRoomsForProximity(initialRooms);
  return sortedRooms.map((room, index) => ({
    ...room,
    position: [Math.floor(index % 4) * 20, Math.floor(index / 4) * 20] as [number, number],
  }));
}

export function getCompactLayout(initialRooms: BaseRoom[]): Room[] {
  if (!initialRooms || initialRooms.length === 0) return [];
  const sortedRooms = sortRoomsForProximity(initialRooms);
  return sortedRooms.map((room, index) => ({
    ...room,
    position: [Math.floor(index % 3) * 15, Math.floor(index / 3) * 15] as [number, number],
  }));
}

export function getOpenLivingLayout(initialRooms: BaseRoom[]): Room[] {
  if (!initialRooms || initialRooms.length === 0) return [];
  let currentX = 0;
  const roomsToProcess = [...initialRooms]; 
  const finalOrderedRooms: Room[] = []; 

  const processingOrder: (string | { type: BaseRoom['type'], exclude?: string[] })[] = [
    "Living Room",
    "Dining Room", 
    "Kitchen",     
    "Store Room",  
    "Balcony",     
    "Master Bedroom",
    "Bathroom (Master)", 
    "Bedroom 2",
    "Bathroom 1",        
    "Bedroom 3",
    "Bathroom 2",       
    "Pooja Room",        // Added Pooja Room to processing order
    "Music Room",        
    "Meditation Room",   
  ];

  for (const item of processingOrder) {
    let roomIndex = -1;
    if (typeof item === 'string') {
      roomIndex = roomsToProcess.findIndex(r => r.name === item);
    } else if (typeof item === 'object' && item.type) {
      roomIndex = roomsToProcess.findIndex(r => r.type === item.type && (!item.exclude || !item.exclude.includes(r.name)));
    }

    if (roomIndex > -1) {
      const room = roomsToProcess.splice(roomIndex, 1)[0];
      const position: [number, number] = [currentX, 0]; 
      finalOrderedRooms.push({ ...room, position });
      currentX += room.length_ft + 5; 
    }
  }

  roomsToProcess.forEach(room => {
    const position: [number, number] = [currentX, 0];
    finalOrderedRooms.push({ ...room, position });
    currentX += room.length_ft + 5;
  });

  return finalOrderedRooms;
}


// Function to generate smart floor plan variants
export const generateSmartFloorPlan = (requirements: PlanRequirements): { variants: FloorPlanVariant[] } => {
  const allSelectedRoomNames = new Set([...requirements.rooms, ...(requirements.customRooms || [])]);
  
  // Filter baseRooms to include only those selected by the user
  const activeRooms = baseRooms.filter(room => allSelectedRoomNames.has(room.name));

  // If no rooms are selected or match, we might end up with empty layouts.
  // The layout functions (getOptimizedLayout, etc.) should ideally handle empty `activeRooms` gracefully (e.g., return empty array).
  // Added checks in layout functions.

  const optimizedRooms = getOptimizedLayout(activeRooms);
  const compactRooms = getCompactLayout(activeRooms);
  const openLivingRooms = getOpenLivingLayout(activeRooms);

  const variants: FloorPlanVariant[] = [
    {
      name: "Optimized Layout",
      description: "Functionally related rooms are close, ensuring natural flow.",
      rooms: optimizedRooms,
      layout: "Optimized",
      benefits: ["Efficient flow", "Functional adjacency", "Good for daily use"],
    },
    {
      name: "Compact Design",
      description: "Minimizes space by reducing distances and grouping utilities.",
      rooms: compactRooms,
      layout: "Compact",
      benefits: ["Space saving", "Cost-effective", "Ideal for smaller plots"],
    },
    {
      name: "Open Living Concept",
      description: "Connects living, dining, and kitchen for a spacious feel. Other rooms follow sequentially.",
      rooms: openLivingRooms,
      layout: "Open Living",
      benefits: ["Spacious feel", "Modern aesthetic", "Great for entertaining"],
    },
  ];

  // Filter out variants that have no rooms, if all selected rooms were unknown
  const validVariants = variants.filter(variant => variant.rooms.length > 0);
  
  if (validVariants.length === 0 && activeRooms.length === 0 && allSelectedRoomNames.size > 0) {
    // This case means user selected rooms, but none of them were in baseRooms.
    // We could return a default small plan or specific message.
    // For now, returning empty variants will be handled by the caller in Design.tsx
    console.warn("No known rooms selected. Floor plan variants will be empty or based on defaults if any.");
  }


  return { variants: validVariants.length > 0 ? validVariants : variants }; // Return original variants if all are empty to not break structure
};
