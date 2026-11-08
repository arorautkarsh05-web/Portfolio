import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface CityGatewayProps {
  onTriggerCityReveal?: () => void;
}

export const CityGateway: React.FC<CityGatewayProps> = ({ onTriggerCityReveal }) => {
  const portalGlowRef = useRef<THREE.PointLight>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (portalGlowRef.current) {
      portalGlowRef.current.intensity = 3.5 + Math.sin(state.clock.elapsedTime * 2.5) * 1.0;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <group
      name="CityGateway"
      position={[-64, 0, 52]}
      rotation={[0, Math.PI / 4, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onTriggerCityReveal?.();
      }}
    >
      {/* Foundation Travertine Plaza */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[26, 0.8, 16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.6} />
      </mesh>
      {/* Gold Perimeter Rim */}
      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[26.2, 0.05, 16.2]} />
        <meshBasicMaterial color="#d97706" />
      </mesh>

      {/* Twin Monumental Marble & Glass Pylons */}
      {[-8, 8].map((x, i) => (
        <group key={`pylon-${i}`} position={[x, 0, 0]}>
          {/* Main Tower Column */}
          <mesh position={[0, 10, 0]} castShadow>
            <boxGeometry args={[3.8, 20, 3.8]} />
            <meshStandardMaterial color="#09090b" roughness={0.15} metalness={0.9} />
          </mesh>
          {/* Glass Facade Inset */}
          <mesh position={[0, 10, 1.95]}>
            <planeGeometry args={[2.8, 18]} />
            <meshStandardMaterial color="#0284c7" metalness={0.95} roughness={0.05} transparent opacity={0.65} />
          </mesh>
          {/* Vertical Neon Light Ribbon */}
          <mesh position={[0, 10, 2.0]}>
            <boxGeometry args={[0.15, 18, 0.05]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          {/* Crown Light Spire */}
          <mesh position={[0, 21.5, 0]}>
            <cylinderGeometry args={[0.08, 0.25, 3.5, 8]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.95} />
          </mesh>
        </group>
      ))}

      {/* Grand Overhead Cantilever Arch Bridge */}
      <mesh position={[0, 18.5, 0]} castShadow>
        <boxGeometry args={[20, 2.5, 4.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 17.2, 0]}>
        <boxGeometry args={[19.8, 0.15, 4.3]} />
        <meshBasicMaterial color="#d97706" />
      </mesh>

      {/* Floating UTKARSH CITY 3D Marquee Signage */}
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.15}>
        <group position={[0, 21.5, 0]}>
          <mesh>
            <boxGeometry args={[14, 2.0, 0.4]} />
            <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.95} />
          </mesh>
          {/* Glowing Front Face */}
          <mesh position={[0, 0, 0.22]}>
            <planeGeometry args={[13.6, 1.7]} />
            <meshBasicMaterial color="#0f172a" />
          </mesh>
          {/* Neon Lettering Border */}
          <mesh position={[0, 0, 0.23]}>
            <ringGeometry args={[2.5, 2.65, 32]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>
      </Float>

      {/* Central Rotating Gateway Hologram Portal */}
      <group ref={ringRef} position={[0, 9.5, 0]}>
        <mesh>
          <torusGeometry args={[5.2, 0.15, 16, 64]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[4.6, 0.12, 16, 64]} />
          <meshBasicMaterial color="#d97706" />
        </mesh>
      </group>

      {/* Ground Reflecting Water Pool */}
      <mesh position={[0, 0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[11, 7]} />
        <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Portal Illumination */}
      <pointLight ref={portalGlowRef} position={[0, 12, 0]} color="#38bdf8" intensity={3.5} distance={28} />
    </group>
  );
};
