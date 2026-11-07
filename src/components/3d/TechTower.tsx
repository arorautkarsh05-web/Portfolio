import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { skillsData } from '../../data/skills';

interface TechTowerProps {
  onOpenSkillsModal?: () => void;
}

export const TechTower: React.FC<TechTowerProps> = ({ onOpenSkillsModal }) => {
  const ringsRef = useRef<THREE.Group>(null);
  const spireGlowRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.y += delta * 0.5;
    }
    if (spireGlowRef.current) {
      spireGlowRef.current.intensity = 2.0 + Math.sin(state.clock.elapsedTime * 3) * 0.6;
    }
  });

  return (
    <group
      name="TechTower"
      position={[0, 0, -45]}
      onClick={(e) => {
        e.stopPropagation();
        onOpenSkillsModal?.();
      }}
    >
      {/* Monolithic Multi-tiered Foundation */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[12, 14, 3, 8]} />
        <meshStandardMaterial color="#0b0f19" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Main 60-meter Tower Body (Tapered hexagonal skyscraper) */}
      <mesh position={[0, 24, 0]} castShadow>
        <cylinderGeometry args={[6, 10, 45, 6]} />
        <meshStandardMaterial
          color="#090d16"
          roughness={0.12}
          metalness={0.92}
          envMapIntensity={2.0}
        />
      </mesh>

      {/* 7 Illuminated Floor Tiers representing the 7 Skill Categories */}
      {skillsData.map((_, idx) => (
        <mesh key={idx} position={[0, 5 + idx * 5.8, 0]}>
          <cylinderGeometry args={[9.5 - idx * 0.5, 9.5 - idx * 0.5, 0.35, 6]} />
          <meshBasicMaterial color={idx % 2 === 0 ? "#00d2ff" : "#8b5cf6"} />
        </mesh>
      ))}

      {/* Rotating Data Orbit Ring at mid-height */}
      <group ref={ringsRef} position={[0, 32, 0]}>
        <mesh rotation={[Math.PI / 6, 0, 0]}>
          <torusGeometry args={[11, 0.15, 16, 64]} />
          <meshBasicMaterial color="#00d2ff" />
        </mesh>
        <mesh rotation={[-Math.PI / 6, 0, 0]}>
          <torusGeometry args={[9.5, 0.12, 16, 64]} />
          <meshBasicMaterial color="#8b5cf6" />
        </mesh>
      </group>

      {/* Spire Pinnacle */}
      <mesh position={[0, 52, 0]}>
        <cylinderGeometry args={[0.15, 1.2, 12, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
      </mesh>

      {/* Vertical Golden-Hour Skybeam */}
      <mesh position={[0, 75, 0]}>
        <cylinderGeometry args={[0.3, 0.8, 38, 16]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
      </mesh>

      {/* High-Altitude Beacon Light */}
      <pointLight
        ref={spireGlowRef}
        position={[0, 58, 0]}
        color="#00d2ff"
        intensity={2.5}
        distance={50}
      />
    </group>
  );
};
