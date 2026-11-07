import React from 'react';
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
      {/* Platform (White Stone & Azure Glass) */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[20, 1.6, 14]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Elevated Glass Skybridge Spine */}
      <mesh position={[0, 4.5, 0]} castShadow>
        <boxGeometry args={[18, 0.4, 6]} />
        <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.1} transparent opacity={0.7} />
      </mesh>

      {/* 3 Career Terminal Columns */}
      {internshipExperiences.map((exp, idx) => {
        const xOffset = -5 + idx * 5;
        return (
          <group key={exp.id} position={[xOffset, 1.6, 0]}>
            {/* Supporting Pylon */}
            <mesh position={[0, 2, 0]} castShadow>
              <cylinderGeometry args={[0.6, 0.8, 4, 16]} />
              <meshStandardMaterial color="#ffffff" metalness={0.8} />
            </mesh>
            {/* Holographic Station Billboard */}
            <mesh position={[0, 4.8, 0]}>
              <boxGeometry args={[3.2, 1.8, 0.15]} />
              <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Glowing Accent Rim */}
            <mesh position={[0, 4.8, 0.09]}>
              <planeGeometry args={[3.0, 1.6]} />
              <meshBasicMaterial color={idx === 1 ? "#d97706" : "#0284c7"} transparent opacity={0.3} />
            </mesh>
            <mesh position={[0, 3.9, 0.1]}>
              <boxGeometry args={[3.1, 0.08, 0.05]} />
              <meshBasicMaterial color={idx === 1 ? "#f59e0b" : "#0284c7"} />
            </mesh>
          </group>
        );
      })}

      {/* Neon Pathway Lights */}
      <mesh position={[0, 1.65, 5]}>
        <boxGeometry args={[18, 0.1, 0.25]} />
        <meshBasicMaterial color="#0284c7" />
      </mesh>
      <mesh position={[0, 1.65, -5]}>
        <boxGeometry args={[18, 0.1, 0.25]} />
        <meshBasicMaterial color="#0284c7" />
      </mesh>

      <pointLight position={[0, 6, 0]} color="#0284c7" intensity={3.0} distance={22} />
    </group>
  );
};
