
import { Building, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DesignPageHeaderProps {
  selectedCategory?: string | null;
}

export const DesignPageHeader = ({ selectedCategory }: DesignPageHeaderProps) => {
  return (
    <div className="relative text-center mb-8 pt-16 sm:pt-4">
      <div className="absolute top-4 left-0">
        <Button asChild variant="outline">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>
      </div>
      <div className="flex items-center justify-center mb-4">
        <Building className="h-12 w-12 text-primary mr-4" />
        <h1 className="text-4xl font-bold text-primary">Smart AI Architecture Designer</h1>
      </div>
      <p className="text-lg text-muted-foreground">
        Custom floor plans, intelligent room layouts, and adaptive 3D models
        {selectedCategory && (
          <span className="block text-sm text-primary mt-1">
            Selected Style: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </span>
        )}
      </p>
    </div>
  );
};
