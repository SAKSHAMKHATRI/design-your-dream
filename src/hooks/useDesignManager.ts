
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { DesignRequirements, GeneratedDesign } from "@/pages/Design"; // Will update this path after refactor
import { generateSmartFloorPlan } from "@/lib/floorPlanUtils";
import { FloorPlanVariant } from "@/types/floorPlan";
import { generateSmart3DModel } from "@/components/Smart3DGenerator";

export type DesignStep = 'form' | 'generating' | 'results';

export const useDesignManager = () => {
  const [currentStep, setCurrentStep] = useState<DesignStep>('form');
  const [requirements, setRequirements] = useState<DesignRequirements | null>(null);
  const [generatedDesign, setGeneratedDesign] = useState<GeneratedDesign | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<FloorPlanVariant | null>(null);
  const [allFloorPlanVariants, setAllFloorPlanVariants] = useState<FloorPlanVariant[]>([]);
  const [searchParams] = useSearchParams();
  const preSelectedCategory = searchParams.get('category');

  useEffect(() => {
    if (preSelectedCategory) {
      console.log(`Pre-selected category: ${preSelectedCategory}`);
    }
  }, [preSelectedCategory]);

  const handleFormSubmit = useCallback((data: DesignRequirements) => {
    if (!data) {
      console.error('No requirements data provided');
      toast.error('No requirements data provided');
      return;
    }

    setRequirements(data);
    setCurrentStep('generating');

    const smartFloorPlan = generateSmartFloorPlan({
      rooms: data.rooms,
      customRooms: data.customRooms,
    });

    if (!smartFloorPlan || !smartFloorPlan.variants || smartFloorPlan.variants.length === 0) {
      console.error('Failed to generate smart floor plan or no valid variants based on selection.');
      toast.error('Failed to generate smart floor plan. Please check your room selections or try again.');
      setCurrentStep('form');
      return;
    }
    
    const initialVariant = smartFloorPlan.variants.find(v => v.rooms.length > 0) || smartFloorPlan.variants[0];
    
    if (!initialVariant) {
        console.error('No suitable initial variant found.');
        toast.error('Could not determine an initial design variant.');
        setCurrentStep('form');
        return;
    }

    setSelectedVariant(initialVariant);
    setAllFloorPlanVariants(smartFloorPlan.variants);

    // AI Prompt generation (logging only as in original)
    const aiPrompt = { /* ... (same AI prompt object as in original Design.tsx) ... */ };
    console.log('Smart AI Generation Prompt:', JSON.stringify(aiPrompt, null, 2));

    setTimeout(() => {
      if (!initialVariant.rooms || initialVariant.rooms.length === 0) {
        console.error('Initial variant has no rooms. Cannot generate 3D model or design results.');
        toast.error('The selected rooms did not result in a plannable design. Please adjust selections.');
        // setSelectedVariant(initialVariant); // Ensure it's set for the "NoValidRoomsMessageCard"
        setCurrentStep('results'); // Go to results to show the message
        return;
      }

      const smart3DModel = generateSmart3DModel(data, initialVariant);
      const mockDesign: GeneratedDesign = {
        floorPlan: {
          rooms: initialVariant.rooms.map(r => ({ ...r })),
          totalArea: initialVariant.rooms.reduce((sum, room) => sum + (room.length_ft * room.breadth_ft), 0)
        },
        modelUrl: smart3DModel.modelUrl,
        summary: {
          totalRooms: initialVariant.rooms.length,
          totalArea: initialVariant.rooms.reduce((sum, room) => sum + (room.length_ft * room.breadth_ft), 0),
          estimatedCost: data.budget,
          style: smart3DModel.style,
          features: smart3DModel.features
        },
        variants: smartFloorPlan.variants.map((variant, index) => ({
          name: variant.name,
          description: variant.description,
          floorPlanUrl: `/assets/plans/${variant.layout}-${index}.png`,
          model3dUrl: `/assets/models/${smart3DModel.style}-variant-${index}.glb`
        }))
      };
      setGeneratedDesign(mockDesign);
      setCurrentStep('results');
    }, 4000);
  }, []);

  const handleVariantSelect = useCallback((variant: FloorPlanVariant) => {
    if (!requirements) { // Removed generatedDesign check as it might be null if initial variant had no rooms
      toast.error("Cannot select variant without initial requirements.");
      return;
    }
    
    setSelectedVariant(variant);

    if (variant.rooms.length === 0) {
        // If the newly selected variant has no rooms, update design state accordingly
        // but still allow showing this empty state in results.
        setGeneratedDesign(prev => {
            if (!prev) return null; // Should not happen if requirements are set
            const smart3DModelForEmptyVariant = generateSmart3DModel(requirements, variant); // Get model based on overall reqs
            return {
                ...prev,
                 floorPlan: {
                    rooms: [],
                    totalArea: 0,
                },
                modelUrl: smart3DModelForEmptyVariant.modelUrl, // It might still generate a model
                summary: {
                    ...prev.summary,
                    totalRooms: 0,
                    totalArea: 0,
                    style: smart3DModelForEmptyVariant.style,
                    features: smart3DModelForEmptyVariant.features,
                }
            };
        });
        toast.info(`Switched to ${variant.name}. This variant has no plannable rooms.`);
        return;
    }


    const smart3DModel = generateSmart3DModel(requirements, variant);
    
    setGeneratedDesign(prevGeneratedDesign => {
      if (!prevGeneratedDesign) return null; // Should ideally not be null if requirements are set
      return {
        ...prevGeneratedDesign,
        floorPlan: {
          rooms: variant.rooms.map(r => ({ ...r })),
          totalArea: variant.rooms.reduce((sum, room) => sum + (room.length_ft * room.breadth_ft), 0)
        },
        modelUrl: smart3DModel.modelUrl,
        summary: {
          ...prevGeneratedDesign.summary,
          totalRooms: variant.rooms.length,
          totalArea: variant.rooms.reduce((sum, room) => sum + (room.length_ft * room.breadth_ft), 0),
          style: smart3DModel.style,
          features: smart3DModel.features
        }
      };
    });
    toast.success(`Switched to ${variant.name} design.`);
  }, [requirements]);

  const handleStartOver = useCallback(() => {
    setCurrentStep('form');
    setRequirements(null);
    setGeneratedDesign(null);
    setSelectedVariant(null);
    setAllFloorPlanVariants([]);
    toast.info("Form reset. You can start a new design.");
  }, []);

  // Effect to handle initial state or inconsistencies
  useEffect(() => {
    if (currentStep === 'generating' && !requirements) {
      setCurrentStep('form');
    }
    
    if (currentStep === 'results') {
      if (!requirements) {
        toast.error("Incomplete data for results. Returning to form.");
        setCurrentStep('form');
        return;
      }
      if (!selectedVariant && allFloorPlanVariants.length > 0) {
        // If selectedVariant is somehow lost, try to set a default
        const defaultVariant = allFloorPlanVariants.find(v => v.rooms.length > 0) || allFloorPlanVariants[0];
        if (defaultVariant) {
          // This will trigger a re-render and the logic in handleVariantSelect or initial generation
          // might need to reconstruct `generatedDesign` if it was also lost.
          // For simplicity, we ensure selectedVariant is set. The main generation happens on submit/variant change.
          setSelectedVariant(defaultVariant);
          if (!generatedDesign && requirements) { // If design is also lost, regenerate for the new default.
              const smart3DModel = generateSmart3DModel(requirements, defaultVariant);
              const mockDesign: GeneratedDesign = {
                  floorPlan: {
                      rooms: defaultVariant.rooms.map(r => ({ ...r })),
                      totalArea: defaultVariant.rooms.reduce((sum, room) => sum + (room.length_ft * room.breadth_ft), 0)
                  },
                  modelUrl: smart3DModel.modelUrl,
                  summary: { // This summary might be partial if original requirements generated more features.
                      totalRooms: defaultVariant.rooms.length,
                      totalArea: defaultVariant.rooms.reduce((sum, room) => sum + (room.length_ft * room.breadth_ft), 0),
                      estimatedCost: requirements.budget, // From original requirements
                      style: smart3DModel.style,
                      features: smart3DModel.features
                  },
                  variants: allFloorPlanVariants.map((v, index) => ({
                      name: v.name,
                      description: v.description,
                      floorPlanUrl: `/assets/plans/${v.layout}-${index}.png`,
                      model3dUrl: `/assets/models/${smart3DModel.style}-variant-${index}.glb`
                  }))
              };
              setGeneratedDesign(mockDesign);
          }
          toast.info(`Defaulted to variant: ${defaultVariant.name}`);
        } else {
          toast.error("No valid design variants available. Returning to form.");
          setCurrentStep('form');
        }
      } else if (!generatedDesign && selectedVariant && selectedVariant.rooms.length > 0 && requirements){
          // Case: selectedVariant exists, but generatedDesign is gone (e.g. after a hot reload / state loss)
          // Re-create generatedDesign based on current selectedVariant and requirements
          const smart3DModel = generateSmart3DModel(requirements, selectedVariant);
          const recreatedDesign: GeneratedDesign = {
            floorPlan: {
              rooms: selectedVariant.rooms.map(r => ({ ...r })),
              totalArea: selectedVariant.rooms.reduce((sum, room) => sum + (room.length_ft * room.breadth_ft), 0)
            },
            modelUrl: smart3DModel.modelUrl,
            summary: {
              totalRooms: selectedVariant.rooms.length,
              totalArea: selectedVariant.rooms.reduce((sum, room) => sum + (room.length_ft * room.breadth_ft), 0),
              estimatedCost: requirements.budget,
              style: smart3DModel.style,
              features: smart3DModel.features
            },
            variants: allFloorPlanVariants.map((variant, index) => ({
              name: variant.name,
              description: variant.description,
              floorPlanUrl: `/assets/plans/${variant.layout}-${index}.png`,
              model3dUrl: `/assets/models/${smart3DModel.style}-variant-${index}.glb`
            }))
          };
          setGeneratedDesign(recreatedDesign);
          console.log("Recreated generatedDesign for selectedVariant.")
      }
    }
  }, [currentStep, requirements, generatedDesign, selectedVariant, allFloorPlanVariants]);


  const downloadFloorPlan = useCallback(async (format: 'pdf' | 'png') => {
    const element = document.getElementById('floor-plan-canvas');
    if (!element) {
      console.error("Floor plan element with ID 'floor-plan-canvas' not found for download.");
      toast.error("Could not find floor plan to download. Please ensure it's visible.");
      return;
    }
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      if (format === 'png') {
        const link = document.createElement('a');
        link.download = 'smart-floor-plan.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        toast.success('Floor plan PNG download started.');
      } else if (format === 'pdf') {
        const pdf = new jsPDF({
          orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('smart-floor-plan.pdf');
        toast.success('Floor plan PDF download started.');
      }
    } catch (error) {
      console.error("Error generating floor plan download:", error);
      toast.error("Failed to generate floor plan for download.");
    }
  }, []);

  const download3DModel = useCallback(() => {
    if (!generatedDesign || !generatedDesign.modelUrl) {
      console.error('No 3D model URL available for download.');
      toast.error('No 3D model URL available for download.');
      return;
    }
    const link = document.createElement('a');
    const modelFileName = generatedDesign.modelUrl.substring(generatedDesign.modelUrl.lastIndexOf('/') + 1) || 'smart-model.glb';
    link.download = modelFileName;
    link.href = generatedDesign.modelUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('3D Model (.glb) download started.');
  }, [generatedDesign]);

  const downloadSummary = useCallback(() => {
    if (!requirements || !generatedDesign || !selectedVariant) {
      toast.error("No data available to generate summary.");
      return;
    }
    const summaryText = `
Smart Architecture Design Summary
=================================
Project Details:
- Building Type: ${requirements.buildingType}
- Location: ${requirements.city}, ${requirements.country}
- Chosen Style: ${requirements.style} (Model Style: ${generatedDesign.summary.style})
- Plot Size: ${requirements.plotSize} sq ft
- Dimensions: ${requirements.length} × ${requirements.breadth} ft
- Floors: ${requirements.floors}
- Budget: $${requirements.budget.toLocaleString()}

Selected Variant: ${selectedVariant.name}
- Layout Type: ${selectedVariant.layout}
- Description: ${selectedVariant.description}
- Benefits: ${selectedVariant.benefits.join(', ')}

Room Layout (${selectedVariant.rooms.length} rooms):
${selectedVariant.rooms.map(room =>
  `- ${room.name}: ${room.length_ft} × ${room.breadth_ft} ft`
).join('\n')}

Key Features from 3D Model:
${generatedDesign.summary.features.map(extra => `- ${extra}`).join('\n')}
${requirements.extras.length > 0 ? `\nUser Requested Extras:\n${requirements.extras.map(extra => `- ${extra}`).join('\n')}` : ''}

Total Area (selected variant): ${generatedDesign.summary.totalArea} sq ft
Estimated Cost: $${generatedDesign.summary.estimatedCost.toLocaleString()}
    `;
    const blob = new Blob([summaryText.trim()], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.download = 'smart-project-summary.txt';
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    toast.success('Project summary download started.');
  }, [requirements, generatedDesign, selectedVariant]);

  return {
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
  };
};
