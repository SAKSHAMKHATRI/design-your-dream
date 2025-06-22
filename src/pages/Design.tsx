
import { useState } from "react"; // Added useState
import { RequirementsForm } from "@/components/RequirementsForm";
import { GeneratingProgress } from "@/components/GeneratingProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Added Button
import { useDesignManager } from "@/hooks/useDesignManager";
import { DesignPageHeader } from "@/components/design/DesignPageHeader";
import { DesignResultsContainer } from "@/components/design/DesignResultsContainer";
import { NoValidRoomsMessageCard } from "@/components/design/NoValidRoomsMessageCard";
import { DesignRequirements, GeneratedDesign } from "@/types/design";

// Import new composable components
import { useFloorPlanBuilder, FloorPlanBuilderInput } from "@/hooks/useFloorPlanBuilder";
import { ComposableModelViewer } from "@/components/ComposableModelViewer";
import { FloorPlanner2D } from "@/components/FloorPlanner2D";


export type { DesignRequirements, GeneratedDesign };


const Design = () => {
  const {
    currentStep,
    requirements,
    generatedDesign,
    selectedVariant,
    allFloorPlanVariants,
    preSelectedCategory,
    handleFormSubmit,
    handleVariantSelect,
    handleStartOver,
    downloadFloorPlan,
    download3DModel,
    downloadSummary,
  } = useDesignManager();

  // State for the new demo section
  const [showComposableDemo, setShowComposableDemo] = useState(false);
  const [demoInputs, setDemoInputs] = useState<FloorPlanBuilderInput>({
    numBedrooms: 5,
    includeKitchen: true,
    includeLivingRoom: true,
    includeBathroom: true,
    extras: ['parking'],
  });
  const demoModelParts = useFloorPlanBuilder(demoInputs);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <DesignPageHeader selectedCategory={preSelectedCategory} />

        <div className="my-4 p-4 border border-dashed border-blue-300 rounded-lg bg-blue-50">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Composable 3D/2D Demo</h2>
          <p className="text-sm text-blue-600 mb-3">
            This section demonstrates the new composable 3D viewer and 2D SVG planner. 
            Ensure you have `.glb` files in <code>public/assets/models/parts/</code> (e.g., bedroom.glb, kitchen.glb).
          </p>
          <Button onClick={() => setShowComposableDemo(!showComposableDemo)} variant="outline" className="mb-4">
            {showComposableDemo ? 'Hide' : 'Show'} Composable Demo
          </Button>

          {showComposableDemo && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Demo Inputs:</h3>
                <div className="flex flex-wrap gap-4 mb-4 p-2 bg-white rounded shadow">
                  <label className="flex items-center gap-2">
                    Bedrooms:
                    <input 
                      type="number" 
                      value={demoInputs.numBedrooms}
                      onChange={(e) => setDemoInputs(prev => ({...prev, numBedrooms: parseInt(e.target.value) || 0}))}
                      className="w-16 p-1 border rounded"
                      min="0"
                    />
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={demoInputs.includeKitchen} onChange={(e) => setDemoInputs(prev => ({...prev, includeKitchen: e.target.checked}))} /> Kitchen
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={demoInputs.includeLivingRoom} onChange={(e) => setDemoInputs(prev => ({...prev, includeLivingRoom: e.target.checked}))} /> Living Room
                  </label>
                   <label className="flex items-center gap-2">
                    <input type="checkbox" checked={demoInputs.includeBathroom} onChange={(e) => setDemoInputs(prev => ({...prev, includeBathroom: e.target.checked}))} /> Bathroom
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={demoInputs.extras?.includes('parking')} onChange={(e) => {
                      const extras = e.target.checked 
                        ? [...(demoInputs.extras || []), 'parking'] 
                        : (demoInputs.extras || []).filter(ex => ex !== 'parking');
                      setDemoInputs(prev => ({...prev, extras }));
                    }} /> Parking
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <FloorPlanner2D modelParts={demoModelParts} />
                <ComposableModelViewer modelParts={demoModelParts} />
              </div>
            </div>
          )}
        </div>

        <div className="max-w-6xl mx-auto">
          
          {currentStep === 'form' && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl">Smart Design Requirements</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Our AI will generate custom floor plans and replace unsupported rooms automatically
                </p>
              </CardHeader>
              <CardContent>
                <RequirementsForm onSubmit={handleFormSubmit} preSelectedStyle={preSelectedCategory} />
              </CardContent>
            </Card>
          )}

          {currentStep === 'generating' && requirements && (
            <GeneratingProgress requirements={requirements} />
          )}

          {currentStep === 'results' && requirements && selectedVariant && (
            <>
              {selectedVariant.rooms.length > 0 && generatedDesign ? (
                <DesignResultsContainer
                  requirements={requirements}
                  generatedDesign={generatedDesign}
                  selectedVariant={selectedVariant}
                  allFloorPlanVariants={allFloorPlanVariants}
                  onVariantSelect={handleVariantSelect}
                  onStartOver={handleStartOver}
                  onDownloadFloorPlanPdf={() => downloadFloorPlan('pdf')}
                  onDownloadFloorPlanPng={() => downloadFloorPlan('png')}
                  onDownload3DModel={download3DModel}
                  onDownloadSummary={downloadSummary}
                />
              ) : (
                <NoValidRoomsMessageCard onStartOver={handleStartOver} />
              )}
            </>
          )}
           {currentStep === 'results' && !selectedVariant && ( // Fallback if selectedVariant is missing
             <NoValidRoomsMessageCard onStartOver={handleStartOver} />
           )}
        </div>
      </div>
    </div>
  );
};

export default Design;
