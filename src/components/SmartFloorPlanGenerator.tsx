import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Using shadcn/ui Button
import type { Room, BaseRoom } from "@/types/floorPlan"; // Import types
import { 
  baseRooms, 
  getOptimizedLayout, 
  getCompactLayout, 
  getOpenLivingLayout 
} from "@/lib/floorPlanUtils"; // Import utils

// The interfaces (Room, BaseRoom, FloorPlanVariant, FloorPlan) and 
// generateSmartFloorPlan function along with its helper layout functions (getOptimizedLayout, etc.)
// and baseRooms data have been moved to src/types/floorPlan.ts and src/lib/floorPlanUtils.ts respectively.

const SmartFloorPlanGenerator: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(() => getOptimizedLayout(baseRooms));

  const handleSetLayout = (layoutFn: (r: BaseRoom[]) => Room[]) => {
    setRooms(layoutFn(baseRooms));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Smart Floor Plan Visualizer</h2>
      
      <div className="flex justify-center gap-4 mb-6">
        <Button onClick={() => handleSetLayout(getOptimizedLayout)}>Optimized Layout</Button>
        <Button onClick={() => handleSetLayout(getCompactLayout)}>Compact Design</Button>
        <Button onClick={() => handleSetLayout(getOpenLivingLayout)}>Open Living</Button>
      </div>

      <h3 className="text-xl font-semibold mb-2">Room Details:</h3>
      <ul className="space-y-2">
        {rooms.map((room, index) => (
          <li key={index} className="p-3 border rounded-md shadow-sm bg-gray-50">
            <strong className="text-primary">{room.name}</strong>
            <div className="text-sm text-muted-foreground">
              <span>Dimensions: {room.length_ft}ft x {room.breadth_ft}ft</span>
              <span className="mx-2">|</span>
              <span>Type: {room.type}</span>
              <span className="mx-2">|</span>
              <span>Position: ({room.position[0]}, {room.position[1]})</span>
            </div>
          </li>
        ))}
      </ul>
      
      <div className="mt-8 p-4 border rounded-lg bg-slate-100 min-h-[400px] relative overflow-auto">
        <h4 className="text-lg font-semibold mb-4">Visual Layout (Simplified)</h4>
        <div style={{ position: 'relative', width: '100%', height: '100%'}}>
          {rooms.map((room, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: `${room.position[0] * 3}px`,
                top: `${room.position[1] * 3}px`,
                width: `${room.length_ft * 3}px`,
                height: `${room.breadth_ft * 3}px`,
                border: '1px solid #007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                overflow: 'hidden',
                padding: '2px',
              }}
              title={`${room.name} (${room.length_ft}x${room.breadth_ft}) at (${room.position[0]},${room.position[1]})`}
            >
              <span className="truncate font-semibold">{room.name}</span>
              <span className="truncate text-xs">{room.length_ft}x{room.breadth_ft}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartFloorPlanGenerator;
