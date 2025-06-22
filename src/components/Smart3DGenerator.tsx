import { DesignRequirements } from "@/types/design";
import { FloorPlanVariant } from "@/types/floorPlan"; 

export interface Smart3DModel {
  modelUrl: string;
  style: string;
  features: string[];
  colorScheme: string;
  exteriorElements: string[];
}

export const generateSmart3DModel = (
  requirements: DesignRequirements, 
  selectedVariant: FloorPlanVariant
): Smart3DModel => {
  
  const getModelStyle = () => {
    const { style, country, exteriorElements } = requirements;
    
    if (style.toLowerCase().includes('luxury')) {
      return 'luxury';
    } else if (style.toLowerCase().includes('modern')) {
      return 'modern';
    } else if (style.toLowerCase().includes('traditional')) {
      return 'traditional';
    } else if (style.toLowerCase().includes('minimalist')) {
      return 'minimalist';
    }
    return 'contemporary';
  };

  const getModelUrl = () => {
    const bedroomCount = selectedVariant.rooms.filter(room => 
      room.name.toLowerCase().includes('bedroom')
    ).length;
    
    const modelStyle = getModelStyle();
    const hasCustomRooms = requirements.customRooms && requirements.customRooms.length > 0;
    
    if (modelStyle === 'luxury' && bedroomCount >= 3) {
      return "/assets/models/luxury-3bhk.glb";
    } else if (modelStyle === 'modern' && hasCustomRooms) {
      return "/assets/models/modern-custom.glb";
    } else if (bedroomCount === 1) {
      return "/assets/models/1bhk-" + modelStyle + ".glb";
    } else if (bedroomCount === 2) {
      return "/assets/models/2bhk-" + modelStyle + ".glb";
    } else if (bedroomCount >= 3) {
      return "/assets/models/3bhk-" + modelStyle + ".glb";
    }
    
    if (selectedVariant.rooms.length > 0 && bedroomCount === 0) {
        return "/assets/models/" + modelStyle + "-studio.glb";
    }
    return "/assets/models/" + modelStyle + "-default.glb";
  };

  const features = [
    ...selectedVariant.rooms.map(room => room.name),
    ...(requirements.exteriorElements || []),
    `${requirements.floors} Floor${requirements.floors > 1 ? 's' : ''}`,
    selectedVariant.layout + ' Layout'
  ];

  return {
    modelUrl: getModelUrl(),
    style: getModelStyle(),
    features,
    colorScheme: requirements.colorScheme || 'neutral',
    exteriorElements: requirements.exteriorElements || []
  };
};
