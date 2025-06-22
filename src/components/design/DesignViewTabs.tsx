
import { EnhancedFloorPlanViewer } from "@/components/EnhancedFloorPlanViewer";
import { FloorPlanVariant } from "@/types/floorPlan";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon } from 'lucide-react';

interface DesignViewTabsProps {
  selectedVariant: FloorPlanVariant;
  allFloorPlanVariants: FloorPlanVariant[];
  onVariantSelect: (variant: FloorPlanVariant) => void;
  buildingType: string;
}

export const DesignViewTabs = ({
  selectedVariant,
  allFloorPlanVariants,
  onVariantSelect,
  buildingType,
}: DesignViewTabsProps) => {
  if (!selectedVariant) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-center">Smart Floor Plan</h3>
        <EnhancedFloorPlanViewer
          floorPlan={{
            rooms: selectedVariant.rooms,
            totalArea: selectedVariant.rooms.reduce((sum, room) =>
              sum + (room.length_ft * room.breadth_ft), 0
            ),
            layout: selectedVariant.layout as any,
            variants: allFloorPlanVariants,
          }}
          onVariantSelect={onVariantSelect}
        />
      </div>
      <div className="border-t pt-6 text-center bg-gray-50/50 rounded-b-lg -m-6 -mb-7 px-6 pb-6">
        <h3 className="text-lg font-semibold mb-2">Want More Ideas?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Explore a gallery of inspirational designs for your building type.
        </p>
        <Button asChild>
          <Link to={`/designs/${buildingType.toLowerCase()}`} target="_blank" rel="noopener noreferrer">
            <ImageIcon className="mr-2" />
            View {buildingType.charAt(0).toUpperCase() + buildingType.slice(1)} Design Gallery
          </Link>
        </Button>
      </div>
    </div>
  );
};
