import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stats } from '@react-three/drei';
import { GltfModelPart } from './GltfModelPart';
import type { ModelPart } from '@/hooks/useFloorPlanBuilder'; // Using type import
import ModelPartErrorBoundary from './ModelPartErrorBoundary'; // Import the new error boundary

interface ComposableModelViewerProps {
  modelParts: ModelPart[];
}

export const ComposableModelViewer = ({ modelParts }: ComposableModelViewerProps) => {
  if (!modelParts || modelParts.length === 0) {
    return (
      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No model parts to display.</p>
      </div>
    );
  }

  return (
    <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-sky-100 via-gray-50 to-indigo-100 rounded-lg overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [15, 15, 25], fov: 50, near: 0.1, far: 1000 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <Environment preset="sunset" background blur={0.5} />
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[10, 15, 10]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
          {modelParts.map((part) => (
            <ModelPartErrorBoundary key={part.id} partUrl={part.url} position={part.position}>
              <GltfModelPart
                url={part.url}
                position={part.position}
                // You can add rotation and scale here if defined in ModelPart
              />
            </ModelPartErrorBoundary>
          ))}

          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={100}
          />
          <Stats />
        </Suspense>
      </Canvas>
    </div>
  );
};
