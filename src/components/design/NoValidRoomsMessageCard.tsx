
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";

interface NoValidRoomsMessageCardProps {
  onStartOver: () => void;
}

export const NoValidRoomsMessageCard = ({ onStartOver }: NoValidRoomsMessageCardProps) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl text-destructive">No Valid Rooms for Floor Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          It seems none of the rooms you selected could be mapped to our standard room definitions for floor planning,
          or the selected variant resulted in an empty plan.
          Please try selecting more common room types or ensure your custom rooms have standard equivalents if you expect them in the 2D plan.
        </p>
        <Button variant="outline" onClick={onStartOver}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Start Over and Adjust Selections
        </Button>
      </CardContent>
    </Card>
  );
};
