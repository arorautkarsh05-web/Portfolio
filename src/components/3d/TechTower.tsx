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
      spireGlowRef.current.intensity = 2.5 + Math.sin(state.clock.elapsedTime * 3) * 0.8;
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
      {/* Monolithic Multi-tiered Foundation (Travertine & Gold) */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[12, 14, 3, 8]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.7} />
      </mesh>

      {/* Main 60-meter Tower Body (Crystalline Glass & Polished Steel) */}
      <mesh position={[0, 24, 0]} castShadow>
        <cylinderGeometry args={[6, 10, 45, 6]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.1}
          metalness={0.85}
          envMapIntensity={2.0}
        />
      </mesh>

      {/* 7 Illuminated Floor Tiers representing the 7 Skill Categories */}
      {skillsData.map((_, idx) => (
        <mesh key={idx} position={[0, 5 + idx * 5.8, 0]}>
          <cylinderGeometry args={[9.5 - idx * 0.5, 9.5 - idx * 0.5, 0.4, 6]} />
          <meshBasicMaterial color={idx % 2 === 0 ? "#0284c7" : "#d97706"} />
        </mesh>
      ))}

      {/* Rotating Data Orbit Ring at mid-height */}
      <group ref={ringsRef} position={[0, 32, 0]}>
        <mesh rotation={[Math.PI / 6, 0, 0]}>
          <torusGeometry args={[11, 0.2, 16, 64]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
        <mesh rotation={[-Math.PI / 6, 0, 0]}>
          <torusGeometry args={[9.5, 0.16, 16, 64]} />
          <meshBasicMaterial color="#d97706" />
        </mesh>
      </group>

      {/* Spire Pinnacle */}
      <mesh position={[0, 52, 0]}>
        <cylinderGeometry args={[0.15, 1.2, 12, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.95} />
      </mesh>

      {/* Vertical Golden-Hour Skybeam */}
      <mesh position={[0, 75, 0]}>
        <cylinderGeometry args={[0.4, 0.9, 38, 16]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.45} />
      </mesh>

      {/* High-Altitude Beacon Light */}
      <pointLight
        ref={spireGlowRef}
        position={[0, 58, 0]}
        color="#0284c7"
        intensity={3.5}
        distance={60}
      />
    </group>
  );
};
