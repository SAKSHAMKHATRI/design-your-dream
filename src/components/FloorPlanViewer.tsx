
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Room {
  name: string;
  length_ft: number;
  breadth_ft: number;
  position: [number, number];
}

interface FloorPlanViewerProps {
  rooms: Room[];
}

export const FloorPlanViewer = ({ rooms }: FloorPlanViewerProps) => {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // Calculate scale based on maximum dimensions
  const maxX = Math.max(...rooms.map(room => room.position[0] + room.length_ft));
  const maxY = Math.max(...rooms.map(room => room.position[1] + room.breadth_ft));
  const scale = Math.min(500 / maxX, 400 / maxY);

  const colors = [
    '#e3f2fd', '#f3e5f5', '#e8f5e8', '#fff3e0', '#fce4ec',
    '#e0f2f1', '#f9fbe7', '#fff8e1', '#f1f8e9', '#e8eaf6'
  ];

  return (
    <div className="space-y-4">
      <div id="floor-plan-canvas" className="bg-white p-6 rounded-lg border">
        <div className="flex justify-center">
          <svg
            width={maxX * scale + 40}
            height={maxY * scale + 40}
            className="border border-gray-200 rounded"
          >
            {/* Grid lines */}
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
                    opacity: hoveredRoom === room.name || selectedRoom === room.name ? 0.8 : 0.6,
                    filter: hoveredRoom === room.name ? 'brightness(1.1)' : 'none'
                  }}
                  onMouseEnter={() => setHoveredRoom(room.name)}
                  onMouseLeave={() => setHoveredRoom(null)}
                  onClick={() => setSelectedRoom(selectedRoom === room.name ? null : room.name)}
                />
                
                {/* Room name */}
                <text
                  x={room.position[0] * scale + 20 + (room.length_ft * scale) / 2}
                  y={room.position[1] * scale + 20 + (room.breadth_ft * scale) / 2 - 5}
                  textAnchor="middle"
                  fontSize="12"
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
                  fontSize="10"
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

      {/* Room details */}
      {selectedRoom && (
        <Card className="animate-fade-in">
          <CardContent className="pt-4">
            {(() => {
              const room = rooms.find(r => r.name === selectedRoom);
              if (!room) return null;
              
              const area = room.length_ft * room.breadth_ft;
              return (
                <div>
                  <h3 className="font-semibold text-lg mb-2">{room.name}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Dimensions</p>
                      <p className="font-medium">{room.length_ft}' × {room.breadth_ft}'</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Area</p>
                      <p className="font-medium">{area} sq ft</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      <div className="text-xs text-muted-foreground text-center">
        Click on any room to view details • Hover to highlight
      </div>
    </div>
  );
};
