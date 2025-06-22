
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DesignRequirements } from "@/pages/Design";

interface GeneratingProgressProps {
  requirements: DesignRequirements;
}

const progressSteps = [
  { text: "Analyzing your requirements", duration: 1000 },
  { text: "Designing floor plan layout", duration: 800 },
  { text: "Generating 3D model", duration: 700 },
  { text: "Optimizing room dimensions", duration: 500 }
];

export const GeneratingProgress = ({ requirements }: GeneratingProgressProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    let stepTimer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;
    let dotsTimer: NodeJS.Timeout;

    const startStep = (stepIndex: number) => {
      if (stepIndex >= progressSteps.length) return;
      
      setCurrentStep(stepIndex);
      const stepDuration = progressSteps[stepIndex].duration;
      const progressIncrement = 100 / progressSteps.length;
      
      let stepProgress = 0;
      progressTimer = setInterval(() => {
        stepProgress += 2;
        const totalProgress = (stepIndex * progressIncrement) + (stepProgress * progressIncrement / 100);
        setProgress(Math.min(totalProgress, 100));
        
        if (stepProgress >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => startStep(stepIndex + 1), 100);
        }
      }, stepDuration / 50);
    };

    // Start animation dots
    dotsTimer = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);

    startStep(0);

    return () => {
      clearTimeout(stepTimer);
      clearInterval(progressTimer);
      clearInterval(dotsTimer);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">🤖 AI is Designing Your Architecture</CardTitle>
          <p className="text-muted-foreground">
            Creating a {requirements.style.toLowerCase()} {requirements.buildingType.toLowerCase()} 
            for your {requirements.plotSize} sq ft plot
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-pulse">🏗️</div>
            <h3 className="text-lg font-medium mb-2">
              {progressSteps[currentStep]?.text}{dots}
            </h3>
          </div>
          
          <div className="space-y-2">
            <Progress value={progress} className="h-3" />
            <p className="text-center text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p><strong>Building Type:</strong> {requirements.buildingType}</p>
              <p><strong>Location:</strong> {requirements.city}, {requirements.country}</p>
              <p><strong>Style:</strong> {requirements.style}</p>
            </div>
            <div className="space-y-2">
              <p><strong>Plot Size:</strong> {requirements.plotSize} sq ft</p>
              <p><strong>Dimensions:</strong> {requirements.length} × {requirements.breadth} ft</p>
              <p><strong>Floors:</strong> {requirements.floors}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
