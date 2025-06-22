import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FloorPlanViewer } from "./FloorPlanViewer";
import { Model3DViewer } from "./Model3DViewer";
import { Download, RotateCcw } from "lucide-react";
import { GeneratedDesign, DesignRequirements } from "@/pages/Design";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface DesignResultsProps {
  design: GeneratedDesign;
  requirements: DesignRequirements;
  onStartOver: () => void;
}

export const DesignResults = ({ design, requirements, onStartOver }: DesignResultsProps) => {
  
  const downloadFloorPlan = async (format: 'pdf' | 'png' | 'svg') => {
    const element = document.getElementById('floor-plan-canvas');
    if (!element) return;

    if (format === 'png') {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'floor-plan.png';
      link.href = canvas.toDataURL();
      link.click();
    } else if (format === 'pdf') {
      const canvas = await html2canvas(element);
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save('floor-plan.pdf');
    }
  };

  const download3DModel = () => {
    // Simulate downloading 3D model
    const link = document.createElement('a');
    link.download = 'model.glb';
    link.href = '#'; // In real implementation, this would be the actual model URL
    link.click();
  };

  const downloadSummary = () => {
    const summaryText = `
Architecture Design Summary
==========================

Project Details:
- Building Type: ${requirements.buildingType}
- Location: ${requirements.city}, ${requirements.country}
- Style: ${requirements.style}
- Plot Size: ${requirements.plotSize} sq ft
- Dimensions: ${requirements.length} × ${requirements.breadth} ft
- Floors: ${requirements.floors}
- Budget: $${requirements.budget.toLocaleString()}

Room Layout:
${design.floorPlan.rooms.map(room => 
  `- ${room.name}: ${room.length_ft} × ${room.breadth_ft} ft`
).join('\n')}

Features:
${requirements.extras.map(extra => `- ${extra}`).join('\n')}

Total Area: ${design.summary.totalArea} sq ft
Total Rooms: ${design.summary.totalRooms}
    `;

    const blob = new Blob([summaryText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = 'project-summary.txt';
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary">Your Design is Ready! 🎉</h2>
        <Button variant="outline" onClick={onStartOver}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Start Over
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Design Views</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="floorplan" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
                <TabsTrigger value="3d">3D Model</TabsTrigger>
              </TabsList>
              
              <TabsContent value="floorplan" className="mt-4">
                <FloorPlanViewer rooms={design.floorPlan.rooms} />
              </TabsContent>
              
              <TabsContent value="3d" className="mt-4">
                <Model3DViewer modelUrl={design.modelUrl} buildingType={requirements.buildingType} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium">Total Rooms:</p>
                  <p className="text-muted-foreground">{design.summary.totalRooms}</p>
                </div>
                <div>
                  <p className="font-medium">Total Area:</p>
                  <p className="text-muted-foreground">{design.summary.totalArea} sq ft</p>
                </div>
                <div>
                  <p className="font-medium">Style:</p>
                  <p className="text-muted-foreground">{design.summary.style}</p>
                </div>
                <div>
                  <p className="font-medium">Budget:</p>
                  <p className="text-muted-foreground">${requirements.budget.toLocaleString()}</p>
                </div>
              </div>
              
              <div>
                <p className="font-medium mb-2">Features:</p>
                <div className="flex flex-wrap gap-1">
                  {design.summary.features.map((feature, index) => (
                    <span key={index} className="text-xs bg-secondary px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Download Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <p className="font-medium text-sm">Floor Plan</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => downloadFloorPlan('pdf')}>
                    <Download className="h-3 w-3 mr-1" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => downloadFloorPlan('png')}>
                    <Download className="h-3 w-3 mr-1" />
                    PNG
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium text-sm">3D Model</p>
                <Button variant="outline" size="sm" onClick={download3DModel}>
                  <Download className="h-3 w-3 mr-1" />
                  GLB
                </Button>
              </div>

              <div className="space-y-2">
                <p className="font-medium text-sm">Summary</p>
                <Button variant="outline" size="sm" onClick={downloadSummary}>
                  <Download className="h-3 w-3 mr-1" />
                  TXT
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
