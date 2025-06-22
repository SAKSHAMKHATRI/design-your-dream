import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";
import { DesignViewTabs } from "./DesignViewTabs";
import { ProjectSummaryCard } from "./ProjectSummaryCard";
import { DownloadOptionsCard } from "./DownloadOptionsCard";
import { NoValidRoomsMessageCard } from "./NoValidRoomsMessageCard";
import { DesignRequirements, GeneratedDesign } from "@/pages/Design"; // Will update
import { FloorPlanVariant } from "@/types/floorPlan";

interface DesignResultsContainerProps {
  requirements: DesignRequirements;
  generatedDesign: GeneratedDesign;
  selectedVariant: FloorPlanVariant;
  allFloorPlanVariants: FloorPlanVariant[];
  onVariantSelect: (variant: FloorPlanVariant) => void;
  onStartOver: () => void;
  onDownloadFloorPlanPdf: () => void;
  onDownloadFloorPlanPng: () => void;
  onDownload3DModel: () => void;
  onDownloadSummary: () => void;
}

export const DesignResultsContainer = ({
  requirements,
  generatedDesign,
  selectedVariant,
  allFloorPlanVariants,
  onVariantSelect,
  onStartOver,
  onDownloadFloorPlanPdf,
  onDownloadFloorPlanPng,
  onDownload3DModel,
  onDownloadSummary,
}: DesignResultsContainerProps) => {

  if (!selectedVariant) { // Should be handled by parent, but as a safeguard
    return <NoValidRoomsMessageCard onStartOver={onStartOver} />;
  }
  
  // This specific condition is for when a variant is selected, but it has no rooms.
  // The `generatedDesign` might still exist but its `floorPlan.rooms` would be empty.
  // `selectedVariant.rooms.length === 0` is the key.
  if (selectedVariant.rooms.length === 0) {
    return <NoValidRoomsMessageCard onStartOver={onStartOver} />;
  }

  // This implies selectedVariant exists AND has rooms, so generatedDesign should also be fully populated.
  if (!generatedDesign || !generatedDesign.summary || !generatedDesign.modelUrl) {
     // This case implies a bigger issue, likely state inconsistency.
     console.error("DesignResultsContainer: Inconsistent state - selectedVariant has rooms, but generatedDesign is incomplete.");
     return (
        <div>
            <p>An error occurred displaying results. Please try starting over.</p>
            <Button onClick={onStartOver}>Start Over</Button>
        </div>
     );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-primary">Your Smart Design is Ready! 🎉</h2>
          <p className="text-muted-foreground">
            AI-generated floor plan for "{selectedVariant.name}" with {selectedVariant.rooms.length} optimally positioned rooms.
          </p>
        </div>
        <Button variant="outline" onClick={onStartOver}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Return to Editor
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Smart Floor Plan & Design Gallery ({selectedVariant.name})</CardTitle>
          </CardHeader>
          <CardContent>
            <DesignViewTabs
              selectedVariant={selectedVariant}
              allFloorPlanVariants={allFloorPlanVariants}
              onVariantSelect={onVariantSelect}
              buildingType={requirements.buildingType}
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <ProjectSummaryCard
            summary={generatedDesign.summary}
            budget={requirements.budget}
            selectedVariantName={selectedVariant.name}
            selectedVariantLayout={selectedVariant.layout}
          />
          <DownloadOptionsCard
            onDownloadFloorPlanPdf={onDownloadFloorPlanPdf}
            onDownloadFloorPlanPng={onDownloadFloorPlanPng}
            onDownload3DModel={onDownload3DModel}
            onDownloadSummary={onDownloadSummary}
            selectedVariantName={selectedVariant.name}
          />
        </div>
      </div>
    </div>
  );
};
