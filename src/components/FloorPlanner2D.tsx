
import type { ModelPart } from '@/hooks/useFloorPlanBuilder'; // Using type import

interface FloorPlanner2DProps {
  modelParts: ModelPart[];
}

// Basic dimensions for room representation in SVG
const ROOM_SIZE = 40; // SVG units for width/height
const SVG_SCALE = 10; // Scale factor for positioning

export const FloorPlanner2D = ({ modelParts }: FloorPlanner2DProps) => {
  if (!modelParts || modelParts.length === 0) {
    return (
      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No parts for 2D plan.</p>
      </div>
    );
  }

  // Calculate viewBox to fit all elements
  let minX = 0, maxX = 0, minZ = 0, maxZ = 0;
  modelParts.forEach(part => {
    const x = part.position[0];
    const z = part.position[2]; // Using Z for SVG Y
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (z < minZ) minZ = z;
    if (z > maxZ) maxZ = z;
  });

  const viewBoxWidth = (maxX - minX + 5) * SVG_SCALE + ROOM_SIZE; // Add padding
  const viewBoxHeight = (maxZ - minZ + 5) * SVG_SCALE + ROOM_SIZE; // Add padding
  const viewBoxX = minX * SVG_SCALE - (ROOM_SIZE / 2);
  const viewBoxZ = minZ * SVG_SCALE - (ROOM_SIZE / 2);


  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <h3 className="text-lg font-semibold mb-2 text-center">2D Layout Plan (SVG)</h3>
      <svg 
        width="100%" 
        height="400" 
        viewBox={`${viewBoxX} ${viewBoxZ} ${viewBoxWidth} ${viewBoxHeight}`}
        className="border rounded"
      >
        <g>
          {modelParts.map((part) => {
            // Adjust position for SVG coordinate system (Y is often inverted)
            // Here, we use X and Z from 3D space for X and Y in SVG
            const svgX = part.position[0] * SVG_SCALE;
            const svgY = part.position[2] * SVG_SCALE; // Using Z from 3D for Y in 2D

            let color = "lightblue";
            if (part.type === 'bedroom') color = 'lightcoral';
            if (part.type === 'kitchen') color = 'lightgreen';
            if (part.type === 'bathroom') color = 'lightgoldenrodyellow';
            if (part.type === 'livingroom') color = 'lightpink';
            if (part.type === 'parking') color = 'lightgray';


            return (
              <g key={part.id} transform={`translate(${svgX}, ${svgY})`}>
                <rect
                  width={ROOM_SIZE}
                  height={ROOM_SIZE}
                  fill={color}
                  stroke="black"
                  strokeWidth="1"
                />
                <text
                  x={ROOM_SIZE / 2}
                  y={ROOM_SIZE / 2}
                  fontSize="10"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill="black"
                >
                  {part.type}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
