
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GeneratedDesign } from "@/pages/Design"; // Will update
import { DesignRequirements } from "@/pages/Design"; // Will update
import { FloorPlanVariant } from "@/types/floorPlan";


interface ProjectSummaryCardProps {
  summary: GeneratedDesign['summary'];
  budget: DesignRequirements['budget'];
  selectedVariantName: FloorPlanVariant['name'];
  selectedVariantLayout: FloorPlanVariant['layout'];
}

export const ProjectSummaryCard = ({
  summary,
  budget,
  selectedVariantName,
  selectedVariantLayout,
}: ProjectSummaryCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="font-medium">Total Rooms:</p>
            <p className="text-muted-foreground">{summary.totalRooms}</p>
          </div>
          <div>
            <p className="font-medium">Total Area:</p>
            <p className="text-muted-foreground">{summary.totalArea} sq ft</p>
          </div>
          <div>
            <p className="font-medium">Style:</p>
            <p className="text-muted-foreground">{summary.style}</p>
          </div>
          <div>
            <p className="font-medium">Budget:</p>
            <p className="text-muted-foreground">${budget.toLocaleString()}</p>
          </div>
        </div>
        
        <div>
          <p className="font-medium mb-1">Variant:</p>
          <p className="text-sm text-muted-foreground mb-2">{selectedVariantName} ({selectedVariantLayout})</p>
          <p className="font-medium mb-1">Features:</p>
          <div className="flex flex-wrap gap-1">
            {summary.features.map((feature, index) => (
              <span key={index} className="text-xs bg-secondary px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
