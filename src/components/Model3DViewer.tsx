import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box, Environment } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Maximize, Download, RotateCcw } from "lucide-react";
import * as THREE from "three";
import { BuildingTypeImageGallery } from "./BuildingTypeImageGallery";

interface Model3DViewerProps {
  modelUrl: string;
  buildingType: string;
}

// Dynamic house model based on URL/type
const DynamicHouseModel = ({ modelType }: { modelType: string }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // meshRef.current.rotation.y = state.clock.elapsedTime * 0.1; // Rotation currently disabled
    }
  });

  // Determine house style based on modelType with proper defaults
  const getHouseStyle = () => {
    const baseStyle = { 
      color: '#e8e8e8', 
      roofColor: '#8B4513', 
      hasPool: false, 
      isLarger: false 
    };

    if (modelType.toLowerCase().includes('luxury')) {
      return { ...baseStyle, color: '#f5f5dc', roofColor: '#8B4513', hasPool: true, isLarger: true }; // Luxury implies larger too
    } else if (modelType.toLowerCase().includes('modern')) {
      return { ...baseStyle, color: '#e8e8e8', roofColor: '#2c3e50', hasPool: false };
    } else if (modelType.toLowerCase().includes('3bhk')) {
      return { ...baseStyle, color: '#f0f0f0', roofColor: '#654321', hasPool: false, isLarger: true };
    }
    // For default or unknown types, ensure style definition matches expectations
    // If modelType could be "default-studio" or similar, ensure that doesn't break logic
    return baseStyle;
  };

  const style = getHouseStyle();
  
  // Define dimensions with proper fallbacks
  const houseArgs: [number, number, number] = style.isLarger ? [5, 2.5, 4] : [4, 2, 3];
  // ConeGeometry args: radius, height, radialSegments. radialSegments should be >= 3.
  const roofRadialSegments = 32; // Using a common value for smoother cone
  const roofArgs: [number, number, number] = style.isLarger ? [3.5, 2, roofRadialSegments] : [3, 1.5, roofRadialSegments];
  const houseY = style.isLarger ? houseArgs[1] / 2 : houseArgs[1] / 2; // Center roof based on house height
  const doorZ = style.isLarger ? houseArgs[2] / 2 + 0.05 : houseArgs[2] / 2 + 0.05; // Position door on the surface
  const windowZ = doorZ; // Align windows with door depth

  const gardenArgs: [number, number, number] = style.isLarger ? [10, 0.1, 10] : [8, 0.1, 8];

  return (
    <group ref={meshRef}>
      {/* Main house structure */}
      <Box args={houseArgs} position={[0, houseArgs[1]/2 -1.1, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={style.color} metalness={0.3} roughness={0.6} />
      </Box>
      
      {/* Roof */}
      <mesh position={[0, houseArgs[1] - 1.1 + roofArgs[1]/2, 0]} castShadow>
        <coneGeometry args={roofArgs} />
        <meshStandardMaterial color={style.roofColor} metalness={0.2} roughness={0.7} />
      </mesh>
      
      {/* Door */}
      <Box args={[0.6, 1.2, 0.1]} position={[0, (1.2/2) -1.1 - (houseArgs[1]/2 - 1.2/2), doorZ]} castShadow>
        <meshStandardMaterial color="#654321" metalness={0.1} roughness={0.8} />
      </Box>
      
      {/* Windows */}
      <Box args={[0.8, 0.6, 0.1]} position={[-1.2, 0.2 -1.1, windowZ]} castShadow>
        <meshStandardMaterial color="#87CEEB" emissive="#333" transparent opacity={0.7} roughness={0.2} />
      </Box>
      <Box args={[0.8, 0.6, 0.1]} position={[1.2, 0.2 -1.1, windowZ]} castShadow>
        <meshStandardMaterial color="#87CEEB" emissive="#333" transparent opacity={0.7} roughness={0.2} />
      </Box>
      
      {style.isLarger && (
        <>
          <Box args={[0.6, 0.6, 0.1]} position={[-houseArgs[0]/2 + 0.5, 0.2 -1.1, windowZ]} castShadow>
            <meshStandardMaterial color="#87CEEB" emissive="#333" transparent opacity={0.7} roughness={0.2}/>
          </Box>
          <Box args={[0.6, 0.6, 0.1]} position={[houseArgs[0]/2 - 0.5, 0.2 -1.1, windowZ]} castShadow>
            <meshStandardMaterial color="#87CEEB" emissive="#333" transparent opacity={0.7} roughness={0.2}/>
          </Box>
        </>
      )}

      {style.hasPool && (
        <Box args={[3, 0.2, 2]} position={[0, -1.2 + 0.1, -houseArgs[2]/2 - 1.5]} receiveShadow>
          <meshStandardMaterial color="#0077be" transparent opacity={0.6} roughness={0.1} metalness={0.4}/>
        </Box>
      )}
      
      {/* Garden base */}
      <Box args={gardenArgs} position={[0, -1.1, 0]} receiveShadow>
        <meshStandardMaterial color="#556B2F" roughness={0.9} metalness={0.1}/>
      </Box>
    </group>
  );
};

export const Model3DViewer = ({ modelUrl, buildingType }: Model3DViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modelType, setModelType] = useState('default');
  const canvasRef = useRef<HTMLDivElement>(null);
  const orbitControlsRef = useRef<any>(null); // Ref for OrbitControls

  useEffect(() => {
    let derivedModelType = 'default';
    if (modelUrl) {
      const urlParts = modelUrl.split('/');
      const filename = urlParts[urlParts.length - 1];
      if (filename && filename !== '.glb') { // Check if filename is not just ".glb"
        derivedModelType = filename.replace('.glb', '');
      }
    }
    setModelType(derivedModelType);
  }, [modelUrl]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && canvasRef.current) {
      canvasRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(err => console.error("Fullscreen request failed:", err));
    } else if (document.fullscreenElement) {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(err => console.error("Exit fullscreen request failed:", err));
    }
  };
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);


  const downloadModel = () => {
    if (!modelUrl || modelUrl === '#') {
      console.error("No valid model URL to download.");
      // Potentially show a toast message to the user
      return;
    }
    const link = document.createElement('a');
    link.download = `${modelType}-house-model.glb`; // Use current modelType for filename
    link.href = modelUrl;
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Clean up
  };

  const resetView = () => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset();
    }
    console.log('Resetting view for model:', modelType);
  };

  if (!modelUrl) {
    return (
      <div className="h-96 bg-gray-100 rounded-lg flex flex-col items-center justify-center p-4 text-center">
        <p className="text-gray-500 mb-4">
          No 3D model is available for this option yet. <br/>
          In the meantime, here are some inspirational images for a '{buildingType}' building:
        </p>
        <div className="w-full max-w-2xl">
          <BuildingTypeImageGallery buildingType={buildingType} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div 
        ref={canvasRef}
        className={`relative bg-gradient-to-br from-sky-200 via-blue-50 to-indigo-100 rounded-lg overflow-hidden ${
          isFullscreen ? 'fixed inset-0 z-50' : 'h-96 md:h-[500px]' 
        }`}
        style={{ touchAction: 'none' }} // Useful for touch interactions on OrbitControls
      >
        <Canvas
          shadows // Enable shadows
          camera={{ position: [8, 6, 10], fov: 50, near: 0.1, far: 1000 }}
          className="w-full h-full"
          onCreated={({ gl }) => {
            gl.setClearColor(0xffffff, 0); // Transparent background for canvas if needed over gradient
          }}
        >
          <Suspense fallback={null}>
            {/* Changed preset from "city" to "sunset" */}
            <Environment preset="sunset" background blur={0.5} />
            <ambientLight intensity={0.7} /> 
            <directionalLight 
              position={[10, 15, 10]} 
              intensity={1.5} 
              castShadow 
              shadow-mapSize-width={2048} // Higher res shadows
              shadow-mapSize-height={2048}
              shadow-camera-far={50}
              shadow-camera-left={-15}
              shadow-camera-right={15}
              shadow-camera-top={15}
              shadow-camera-bottom={-15}
            />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />

            <DynamicHouseModel key={modelType} modelType={modelType} />
            
            <OrbitControls
              ref={orbitControlsRef}
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={30} // Increased max distance
              target={[0, 1, 0]} // Adjust target to center of the house typically
            />
          </Suspense>
        </Canvas>
        
        <div className="absolute top-2 right-2 md:top-4 md:right-4 flex flex-col md:flex-row gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={resetView}
            className="bg-white/70 hover:bg-white/90 backdrop-blur-sm rounded-full"
            aria-label="Reset View"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={downloadModel}
            className="bg-white/70 hover:bg-white/90 backdrop-blur-sm rounded-full"
            aria-label="Download Model"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleFullscreen}
            className="bg-white/70 hover:bg-white/90 backdrop-blur-sm rounded-full"
            aria-label="Toggle Fullscreen"
          >
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-xs text-muted-foreground text-center space-y-1 px-2">
        <p>🖱️ Drag to rotate • 휠 Scroll to zoom • 🤚 Right-click & drag to pan</p>
        <p>Model: <span className="font-semibold">{modelType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span></p>
      </div>
    </div>
  );
};
