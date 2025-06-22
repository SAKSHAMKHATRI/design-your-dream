
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";
import { ArrowRight, Palette } from "lucide-react";

export const StartDesigningButton = () => {
  const navigate = useNavigate();

  const handleStartDesigning = () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    navigate('/design');
  };

  return (
    <div className="text-center space-y-4">
      <Button 
        size="lg" 
        className="text-lg px-12 py-6 hover-scale bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
        onClick={handleStartDesigning}
      >
        <Palette className="mr-3 h-6 w-6" />
        Start Designing
        <ArrowRight className="ml-3 h-5 w-5" />
      </Button>
      <p className="text-sm text-muted-foreground">
        {!isAuthenticated() && "You'll need to log in to start designing"}
      </p>
    </div>
  );
};
