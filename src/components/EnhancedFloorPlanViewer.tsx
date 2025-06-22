import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FloorPlan, FloorPlanVariant } from "@/types/floorPlan"; // Updated import path

interface EnhancedFloorPlanViewerProps {
  floorPlan: FloorPlan;
  onVariantSelect?: (variant: FloorPlanVariant) => void;
}

export const EnhancedFloorPlanViewer = ({ floorPlan, onVariantSelect }: EnhancedFloorPlanViewerProps) => {
  const [selectedVariant, setSelectedVariant] = useState<FloorPlanVariant>(floorPlan.variants[0]);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const rooms = selectedVariant.rooms;

  // Calculate canvas dimensions
  const maxX = Math.max(...rooms.map(room => room.position[0] + room.length_ft), 0); // Added 0 for empty rooms
  const maxY = Math.max(...rooms.map(room => room.position[1] + room.breadth_ft), 0); // Added 0 for empty rooms
  const baseScale = Math.min(600 / (maxX || 1), 450 / (maxY || 1)); // Avoid division by zero
  const scale = rooms.length > 0 ? baseScale : 10; // Default scale if no rooms


  const colors = [
    '#e3f2fd', '#f3e5f5', '#e8f5e8', '#fff3e0', '#fce4ec',
    '#e0f2f1', '#f9fbe7', '#fff8e1', '#f1f8e9', '#e8eaf6'
  ];

  const handleVariantChange = (variant: FloorPlanVariant) => {
    setSelectedVariant(variant);
    onVariantSelect?.(variant);
  };

  return (
    <div className="space-y-6">
      {/* Variant Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {floorPlan.variants.map((variant, index) => (
          <Card 
            key={variant.name}
            className={`cursor-pointer transition-all ${
              selectedVariant.name === variant.name 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:shadow-md'
            }`}
            onClick={() => handleVariantChange(variant)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{variant.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs text-muted-foreground">{variant.description}</p>
              <div className="flex flex-wrap gap-1">
                {variant.benefits.slice(0, 2).map((benefit, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {benefit}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Floor Plan Display */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{selectedVariant.name} - Floor Plan</CardTitle>
            <Badge variant="outline">{selectedVariant.layout}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div id="floor-plan-canvas" className="bg-white p-6 rounded-lg border">
            <div className="flex justify-center">
              <svg
                width={Math.max(maxX * scale + 40, 200)} // Ensure minimum width
                height={Math.max(maxY * scale + 40, 200)} // Ensure minimum height
                className="border border-gray-200 rounded"
              >
                {/* Grid pattern */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Room rectangles */}
                {rooms.map((room, index) => (
                  <g key={room.name}>
                    <rect
                      x={room.position[0] * scale + 20}
                      y={room.position[1] * scale + 20}
                      width={room.length_ft * scale}
                      height={room.breadth_ft * scale}
                      fill={colors[index % colors.length]}
                      stroke="#666"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-200"
                      style={{
                        opacity: hoveredRoom === room.name ? 0.9 : 0.7,
                        filter: hoveredRoom === room.name ? 'brightness(1.1)' : 'none'
                      }}
                      onMouseEnter={() => setHoveredRoom(room.name)}
                      onMouseLeave={() => setHoveredRoom(null)}
                    />
                    
                    {/* Room label */}
                    <text
                      x={room.position[0] * scale + 20 + (room.length_ft * scale) / 2}
                      y={room.position[1] * scale + 20 + (room.breadth_ft * scale) / 2 - 5}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="bold"
                      fill="#333"
                      className="pointer-events-none"
                    >
                      {room.name}
                    </text>
                    
                    {/* Room dimensions */}
                    <text
                      x={room.position[0] * scale + 20 + (room.length_ft * scale) / 2}
                      y={room.position[1] * scale + 20 + (room.breadth_ft * scale) / 2 + 10}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#666"
                      className="pointer-events-none"
                    >
                      {room.length_ft}' × {room.breadth_ft}'
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Room Statistics */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium">Total Rooms</p>
              <p className="text-muted-foreground">{rooms.length}</p>
            </div>
            <div>
              <p className="font-medium">Built Area</p>
              <p className="text-muted-foreground">
                {rooms.reduce((sum, room) => sum + (room.length_ft * room.breadth_ft), 0)} sq ft
              </p>
            </div>
            <div>
              <p className="font-medium">Layout Type</p>
              <p className="text-muted-foreground capitalize">{selectedVariant.layout}</p>
            </div>
            <div>
              <p className="font-medium">Efficiency</p>
              <p className="text-muted-foreground">
                { Math.round((rooms.reduce((sum, room) => sum + (room.length_ft * room.breadth_ft), 0) / ( (maxX * maxY) || 1) ) * 100)}%
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-4">
            <p className="font-medium text-sm mb-2">Design Benefits:</p>
            <div className="flex flex-wrap gap-2">
              {selectedVariant.benefits.map((benefit, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
