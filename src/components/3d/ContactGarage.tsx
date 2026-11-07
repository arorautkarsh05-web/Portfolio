import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ContactGarageProps {
  onOpenContactModal?: () => void;
}

export const ContactGarage: React.FC<ContactGarageProps> = ({ onOpenContactModal }) => {
  const signalRingRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (signalRingRef.current) {
      signalRingRef.current.rotation.y += delta * 0.7;
    }
  });

  return (
    <group
      name="ContactGarage"
      position={[30, 0, 35]}
      onClick={(e) => {
        e.stopPropagation();
        onOpenContactModal?.();
      }}
    >
      {/* Showroom Polished Platform (Crisp White Marble & Platinum) */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[18, 1.6, 16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.15} metalness={0.7} />
      </mesh>

      {/* Showroom Glass Canopy Arch */}
      <mesh position={[0, 6, 0]} castShadow>
        <boxGeometry args={[16, 8, 14]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.05}
          metalness={0.9}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Glowing Neon Perimeter Frame */}
      <mesh position={[0, 10.1, 0]}>
        <boxGeometry args={[16.2, 0.25, 14.2]} />
        <meshBasicMaterial color="#0284c7" />
      </mesh>

      {/* Central Terminal Console */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <cylinderGeometry args={[2.5, 3.2, 2.0, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Rotating Communication Signal Ring */}
      <group ref={signalRingRef} position={[0, 4.5, 0]}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.8, 0.12, 16, 48]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
        <mesh rotation={[-Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.2, 0.1, 16, 48]} />
          <meshBasicMaterial color="#d97706" />
        </mesh>
      </group>

      <pointLight position={[0, 5, 0]} color="#0284c7" intensity={3.0} distance={20} />
    </group>
  );
};
