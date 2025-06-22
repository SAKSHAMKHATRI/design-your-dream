
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";
import { Home, Building2, Minimize2, Crown } from "lucide-react";

interface DesignCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

const categories: DesignCategory[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean lines, open spaces, and contemporary aesthetics",
    icon: <Building2 className="h-8 w-8" />,
    gradient: "from-blue-500 to-purple-600"
  },
  {
    id: "traditional",
    name: "Traditional",
    description: "Classic designs with timeless architectural elements",
    icon: <Home className="h-8 w-8" />,
    gradient: "from-amber-500 to-orange-600"
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Simple, functional designs with maximum impact",
    icon: <Minimize2 className="h-8 w-8" />,
    gradient: "from-gray-500 to-slate-600"
  },
  {
    id: "luxury",
    name: "Luxury",
    description: "Premium materials and sophisticated architectural details",
    icon: <Crown className="h-8 w-8" />,
    gradient: "from-yellow-500 to-amber-600"
  }
];

export const DesignCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    navigate(`/design?category=${categoryId}`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">Choose Your Style</h2>
        <p className="text-lg text-muted-foreground">
          Select a design category to get started with your architectural project
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card 
            key={category.id}
            className="cursor-pointer hover-scale animate-fade-in group hover:shadow-lg transition-all duration-300"
            onClick={() => handleCategoryClick(category.id)}
          >
            <CardHeader className="text-center">
              <div className={`mx-auto p-4 rounded-full bg-gradient-to-r ${category.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {category.icon}
              </div>
              <CardTitle className="text-xl">{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                {category.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
