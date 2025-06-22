import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountryDropdown } from "./CountryDropdown";
import { DesignRequirements } from "@/pages/Design";
import { Building2, DollarSign, Home, Maximize, Users, Palette } from "lucide-react";
// Removed: import { BuildingTypeImageGallery } from "./BuildingTypeImageGallery";

interface RequirementsFormProps {
  onSubmit: (data: DesignRequirements) => void;
  preSelectedStyle?: string | null;
}

export const RequirementsForm = ({ onSubmit, preSelectedStyle }: RequirementsFormProps) => {
  const [formData, setFormData] = useState<DesignRequirements>({
    buildingType: "residential",
    country: "",
    city: "",
    budget: 100000,
    plotSize: 2000,
    length: 50,
    breadth: 40,
    floors: 1,
    rooms: [],
    extras: [],
    style: preSelectedStyle || "modern",
    customRooms: [],
    colorScheme: "warm-neutrals",
    interiorPreference: "open-living",
    exteriorElements: []
  });

  const roomOptions = [
    "Living Room",
    "Kitchen",
    "Master Bedroom",
    "Bedroom 2",
    "Bedroom 3",
    "Bathroom",
    "Office",
    "Dining Room",
    "Balcony",
    "Store Room",
    "Pooja Room",
    "Study Room"
  ];

  const customRoomOptions = [
    "Home Theater",
    "Gym",
    "Office Space",
    "Library",
    "Workshop",
    "Music Room",
    "Game Room",
    "Wine Cellar",
    "Spa Room"
  ];

  const exteriorOptions = [
    "Terrace Garden",
    "Parking",
    "Front Lawn",
    "Swimming Pool",
    "Outdoor Kitchen",
    "Gazebo",
    "Fountain"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "rooms" | "customRooms" | "exteriorElements"
  ) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, [type]: [...prev[type], value] };
      } else {
        return { ...prev, [type]: prev[type].filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Building Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Building Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="buildingType">Building Type</Label>
              <Select
                value={formData.buildingType}
                onValueChange={(value) => handleSelectChange("buildingType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select building type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <CountryDropdown
                value={formData.country}
                onChange={(value) => handleSelectChange("country", value)}
              />
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
              />
            </div>
          </div>
          {/* REMOVED: <BuildingTypeImageGallery buildingType={formData.buildingType} /> */}
        </CardContent>
      </Card>

      {/* Budget & Size Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Budget &amp; Plot Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">Budget ($)</Label>
              <Input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="Enter budget"
              />
            </div>

            <div>
              <Label htmlFor="plotSize">Plot Size (sq ft)</Label>
              <Input
                type="number"
                id="plotSize"
                name="plotSize"
                value={formData.plotSize}
                onChange={handleInputChange}
                placeholder="Enter plot size"
              />
            </div>

            <div>
              <Label htmlFor="length">Length (ft)</Label>
              <Input
                type="number"
                id="length"
                name="length"
                value={formData.length}
                onChange={handleInputChange}
                placeholder="Enter length"
              />
            </div>

            <div>
              <Label htmlFor="breadth">Width (ft)</Label>
              <Input
                type="number"
                id="breadth"
                name="breadth"
                value={formData.breadth}
                onChange={handleInputChange}
                placeholder="Enter width"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Layout Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="floors">Number of Floors</Label>
            <Input
              type="number"
              id="floors"
              name="floors"
              value={formData.floors}
              onChange={handleInputChange}
              placeholder="Enter number of floors"
            />
          </div>

          <div className="space-y-2">
            <Label>Standard Rooms</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {roomOptions.map(room => (
                <div key={room} className="flex items-center space-x-2">
                  <Checkbox
                    id={`room-${room}`}
                    value={room}
                    checked={formData.rooms.includes(room)}
                    onCheckedChange={(checked) => {
                      const event = { target: { value: room, checked } } as any;
                      handleCheckboxChange(event, "rooms");
                    }}
                  />
                  <Label htmlFor={`room-${room}`}>{room}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Custom/Special Rooms</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {customRoomOptions.map(room => (
                <div key={room} className="flex items-center space-x-2">
                  <Checkbox
                    id={`custom-${room}`}
                    value={room}
                    checked={formData.customRooms?.includes(room)}
                    onCheckedChange={(checked) => {
                      const event = { target: { value: room, checked } } as any;
                      handleCheckboxChange(event, "customRooms");
                    }}
                  />
                  <Label htmlFor={`custom-${room}`}>{room}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Design Preferences Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Design Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="style">Architectural Style</Label>
              <Select 
                value={formData.style} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, style: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select architectural style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="traditional">Traditional</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="scandinavian">Scandinavian</SelectItem>
                  <SelectItem value="contemporary">Contemporary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="colorScheme">Color Scheme</Label>
              <Select 
                value={formData.colorScheme} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, colorScheme: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select color scheme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="warm-neutrals">Warm Neutrals</SelectItem>
                  <SelectItem value="cool-blues">Cool Blues</SelectItem>
                  <SelectItem value="earth-tones">Earth Tones</SelectItem>
                  <SelectItem value="monochrome">Monochrome</SelectItem>
                  <SelectItem value="vibrant">Vibrant Colors</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="interiorPreference">Interior Layout</Label>
              <Select 
                value={formData.interiorPreference} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, interiorPreference: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select interior preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open-living">Open Living</SelectItem>
                  <SelectItem value="closed-kitchen">Closed Kitchen</SelectItem>
                  <SelectItem value="natural-light">Natural Light Focus</SelectItem>
                  <SelectItem value="privacy-focused">Privacy Focused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Exterior Elements</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {exteriorOptions.map(element => (
                <div key={element} className="flex items-center space-x-2">
                  <Checkbox
                    id={`exterior-${element}`}
                    value={element}
                    checked={formData.exteriorElements?.includes(element)}
                    onCheckedChange={(checked) => {
                      const event = { target: { value: element, checked } } as any;
                      handleCheckboxChange(event, "exteriorElements");
                    }}
                  />
                  <Label htmlFor={`exterior-${element}`}>{element}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        Generate AI Design
      </Button>
    </form>
  );
};
