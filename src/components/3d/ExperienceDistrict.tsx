import React from 'react';
import { Float } from '@react-three/drei';
import { internshipExperiences } from '../../data/experience';

interface ExperienceDistrictProps {
  onOpenExperienceModal?: () => void;
}

export const ExperienceDistrict: React.FC<ExperienceDistrictProps> = ({ onOpenExperienceModal }) => {
  return (
    <group
      name="ExperienceDistrict"
      position={[-30, 0, 35]}
      onClick={(e) => {
        e.stopPropagation();
        onOpenExperienceModal?.();
      }}
    >
      {/* Foundation Platform (Travertine & Gold Rim) */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[22, 1.6, 16]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.2} metalness={0.6} />
      </mesh>
      <mesh position={[0, 1.62, 0]}>
        <boxGeometry args={[22.2, 0.05, 16.2]} />
        <meshBasicMaterial color="#d97706" />
      </mesh>

      {/* Elevated Crystalline Glass Skybridge Spine */}
      <mesh position={[0, 5.0, 0]} castShadow>
        <boxGeometry args={[20, 0.5, 6]} />
        <meshStandardMaterial color="#0284c7" metalness={0.92} roughness={0.08} transparent opacity={0.65} />
      </mesh>
      {/* Skybridge Handrails */}
      <mesh position={[0, 5.8, 2.9]}>
        <boxGeometry args={[20, 1.1, 0.1]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.9} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 5.8, -2.9]}>
        <boxGeometry args={[20, 1.1, 0.1]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.9} transparent opacity={0.5} />
      </mesh>

      {/* 3 Career Terminal Columns for the 3 Internships */}
      {internshipExperiences.map((exp, idx) => {
        const xOffset = -6 + idx * 6;
        const isAccent = idx === 1;
        return (
          <group key={exp.id} position={[xOffset, 1.6, 0]}>
            {/* Polished Chrome Supporting Pylon */}
            <mesh position={[0, 2.2, 0]} castShadow>
              <cylinderGeometry args={[0.55, 0.75, 4.4, 16]} />
              <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.1} />
            </mesh>
            {/* Holographic Station Terminal Console */}
            <mesh position={[0, 5.2, 0]} castShadow>
              <boxGeometry args={[3.8, 2.2, 0.18]} />
              <meshStandardMaterial color="#09090b" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Glowing Station Accent Screen */}
            <mesh position={[0, 5.2, 0.1]}>
              <planeGeometry args={[3.6, 2.0]} />
              <meshBasicMaterial color={isAccent ? "#d97706" : "#0284c7"} transparent opacity={0.35} />
            </mesh>
            {/* Illuminated Bottom Status Bar */}
            <mesh position={[0, 4.15, 0.12]}>
              <boxGeometry args={[3.6, 0.08, 0.04]} />
              <meshBasicMaterial color={isAccent ? "#fbbf24" : "#38bdf8"} />
            </mesh>
          </group>
        );
      })}

      {/* Floating Architectural Marquee */}
      <Float speed={2} rotationIntensity={0.06} floatIntensity={0.15}>
        <group position={[0, 7.8, 8.5]}>
          <mesh>
            <boxGeometry args={[8.5, 1.3, 0.15]} />
            <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.09]}>
            <planeGeometry args={[8.3, 1.1]} />
            <meshBasicMaterial color="#0284c7" transparent opacity={0.3} />
          </mesh>
          <mesh position={[0, 0.6, 0.1]}>
            <boxGeometry args={[8.4, 0.04, 0.02]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>
      </Float>

      {/* Pathway Underglow Lights */}
      <pointLight position={[0, 6.5, 0]} color="#0284c7" intensity={3.5} distance={25} />
    </group>
  );
};
