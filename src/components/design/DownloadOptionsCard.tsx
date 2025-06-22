
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

interface DownloadOptionsCardProps {
  onDownloadFloorPlanPdf: () => void;
  onDownloadFloorPlanPng: () => void;
  onDownload3DModel: () => void;
  onDownloadSummary: () => void;
  selectedVariantName: string;
}

export const DownloadOptionsCard = ({
  onDownloadFloorPlanPdf,
  onDownloadFloorPlanPng,
  onDownload3DModel,
  onDownloadSummary,
  selectedVariantName,
}: DownloadOptionsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Download Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <p className="font-medium text-sm">Floor Plan ({selectedVariantName})</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onDownloadFloorPlanPdf}>
              <Download className="h-3 w-3 mr-1" />
              PDF
            </Button>
            <Button variant="outline" size="sm" onClick={onDownloadFloorPlanPng}>
              <Download className="h-3 w-3 mr-1" />
              PNG
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-sm">3D Model</p>
          <Button variant="outline" size="sm" onClick={onDownload3DModel}>
            <Download className="h-3 w-3 mr-1" />
            GLB
          </Button>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-sm">Summary</p>
          <Button variant="outline" size="sm" onClick={onDownloadSummary}>
            <Download className="h-3 w-3 mr-1" />
            TXT
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
