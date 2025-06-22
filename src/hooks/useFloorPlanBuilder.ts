
import { useMemo } from 'react';

export interface FloorPlanBuilderInput {
  numBedrooms: number;
  includeKitchen: boolean;
  includeLivingRoom: boolean;
  includeBathroom: boolean;
  extras?: string[]; // e.g., ['parking']
}

export interface ModelPart {
  id: string;
  type: string;
  url: string;
  position: [number, number, number];
  // Add rotation and scale if needed later
  // rotation?: [number, number, number];
  // scale?: [number, number, number];
}

export const useFloorPlanBuilder = (inputs: FloorPlanBuilderInput): ModelPart[] => {
  return useMemo(() => {
    const parts: ModelPart[] = [];
    let currentX = 0;
    const spacing = 5; // Spacing between models

    // Add bedrooms
    for (let i = 0; i < inputs.numBedrooms; i++) {
      parts.push({
        id: `bedroom-${i}`,
        type: 'bedroom',
        url: '/assets/models/parts/bedroom.glb',
        position: [currentX, 0, 0],
      });
      currentX += spacing;
    }

    // Add kitchen
    if (inputs.includeKitchen) {
      parts.push({
        id: 'kitchen-1',
        type: 'kitchen',
        url: '/assets/models/parts/kitchen.glb',
        position: [currentX, 0, 0],
      });
      currentX += spacing;
    }

    // Add living room
    if (inputs.includeLivingRoom) {
      parts.push({
        id: 'livingroom-1',
        type: 'livingroom',
        url: '/assets/models/parts/livingroom.glb',
        position: [currentX, 0, 0],
      });
      currentX += spacing;
    }
    
    // Add bathroom
    if (inputs.includeBathroom) {
      parts.push({
        id: 'bathroom-1',
        type: 'bathroom',
        url: '/assets/models/parts/bathroom.glb',
        position: [currentX, 0, 0],
      });
      currentX += spacing;
    }

    // Add extras like parking
    if (inputs.extras?.includes('parking')) {
      parts.push({
        id: 'parking-1',
        type: 'parking',
        url: '/assets/models/parts/parking.glb',
        position: [currentX, 0, -spacing * 2], // Place parking a bit offset
      });
    }

    console.log('Generated model parts:', parts);
    return parts;
  }, [inputs]);
};
