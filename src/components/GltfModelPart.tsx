
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface GltfModelPartProps {
  url: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

export const GltfModelPart = ({ url, position, rotation = [0,0,0], scale = [1,1,1] }: GltfModelPartProps) => {
  const { scene } = useGLTF(url);
  
  // It's good practice to clone the scene if you reuse the same GLTF multiple times
  // or if you want to ensure manipulations don't affect other instances.
  const clonedScene = scene.clone();

  // Apply transformations
  clonedScene.position.set(...position);
  clonedScene.rotation.set(...rotation.map(r => THREE.MathUtils.degToRad(r)) as [number, number, number]);
  clonedScene.scale.set(...scale);
  
  // Ensure shadows are cast and received if needed
  clonedScene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive object={clonedScene} />;
};

// Preload GLTFs for better performance if you know which ones will be used
// useGLTF.preload('/assets/models/parts/bedroom.glb');
// useGLTF.preload('/assets/models/parts/kitchen.glb');
// ... etc.
