
import { Image } from '@react-three/drei';
import * as THREE from 'three';

interface FallbackImagePlaneProps {
  position: [number, number, number];
}

const FALLBACK_IMAGE_URL = 'https://images.unsplash.com/photo-1487958449943-2429e8be8625';

export const FallbackImagePlane = ({ position }: FallbackImagePlaneProps) => {
  // Center the image plane and lift it slightly so it doesn't clip the ground
  const adjustedPosition: [number, number, number] = [position[0], 2.5, position[2]];

  return (
    <Image
      url={FALLBACK_IMAGE_URL}
      position={adjustedPosition}
      scale={[5, 5]} // FIX: Use a [width, height] array for scale
    >
      <meshStandardMaterial
        side={THREE.DoubleSide}
        transparent
        opacity={0.9}
      />
    </Image>
  );
};
