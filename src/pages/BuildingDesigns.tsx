
import { useParams, Link } from 'react-router-dom';
import { BuildingTypeImageGallery } from '@/components/BuildingTypeImageGallery';
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';

const BuildingDesigns = () => {
  const { buildingType } = useParams<{ buildingType: string }>();

  if (!buildingType) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Building Type Not Specified</h1>
        <p className="text-muted-foreground mb-4">We can't show designs without knowing the building type.</p>
        <Button asChild>
          <Link to="/design">
            <LayoutGrid className="mr-2 h-4 w-4" /> Go Back to Design Page
          </Link>
        </Button>
      </div>
    );
  }

  const formattedBuildingType = buildingType.charAt(0).toUpperCase() + buildingType.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <header className="py-4 bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <h1 className="text-2xl font-bold text-primary">Inspirational Designs: <span className="text-gray-700">{formattedBuildingType}</span></h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <BuildingTypeImageGallery buildingType={buildingType} />
      </main>
    </div>
  );
};

export default BuildingDesigns;
