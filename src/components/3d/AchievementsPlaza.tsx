import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { certificationsData } from '../../data/achievements';

interface AchievementsPlazaProps {
  onOpenAchievementsModal?: () => void;
}

export const AchievementsPlaza: React.FC<AchievementsPlazaProps> = ({ onOpenAchievementsModal }) => {
  const centralGemRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (centralGemRef.current) {
      centralGemRef.current.rotation.y += delta * 0.8;
      centralGemRef.current.position.y = 4.2 + Math.sin(state.clock.elapsedTime * 2) * 0.25;
    }
  });

  return (
    <group
      name="AchievementsPlaza"
      position={[0, 0, 74]}
      onClick={(e) => {
        e.stopPropagation();
        onOpenAchievementsModal?.();
      }}
    >
      {/* Tiered Circular Plaza Podium (White Marble & Platinum) */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[14, 15, 1.2, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Gold Inlaid Circular Ring */}
      <mesh position={[0, 1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[11, 11.5, 32]} />
        <meshBasicMaterial color="#d97706" />
      </mesh>

      {/* 5 Surrounding Pedestals for the Certifications */}
      {certificationsData.map((_, idx) => {
        const angle = (idx * Math.PI * 2) / certificationsData.length;
        const x = Math.cos(angle) * 8.5;
        const z = Math.sin(angle) * 8.5;
        return (
          <group key={idx} position={[x, 1.2, z]}>
            {/* Pedestal Pillar */}
            <mesh position={[0, 1.2, 0]} castShadow>
              <cylinderGeometry args={[0.9, 1.1, 2.4, 16]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Floating Glass Plate */}
            <mesh position={[0, 2.7, 0]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[1.6, 1.2, 0.12]} />
              <meshStandardMaterial
                color="#0284c7"
                metalness={0.9}
                roughness={0.1}
                transparent
                opacity={0.85}
              />
            </mesh>
            {/* Glowing Edge */}
            <mesh position={[0, 2.7, 0]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[1.64, 0.05, 0.14]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
            <pointLight position={[0, 3, 0]} color="#38bdf8" intensity={1.5} distance={8} />
          </group>
        );
      })}

      {/* Central Floating Golden Achievement Seal */}
      <group ref={centralGemRef} position={[0, 4.2, 0]}>
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <octahedronGeometry args={[1.6, 0]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <octahedronGeometry args={[1.7, 0]} />
          <meshBasicMaterial color="#fbbf24" wireframe />
        </mesh>
      </group>

      <pointLight position={[0, 5, 0]} color="#f59e0b" intensity={3.0} distance={20} />
    </group>
  );
};
