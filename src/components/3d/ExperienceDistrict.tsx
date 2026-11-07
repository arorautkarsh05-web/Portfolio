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
      {/* Platform */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[20, 1.6, 14]} />
        <meshStandardMaterial color="#0b1120" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Elevated Glass Skybridge Spine */}
      <mesh position={[0, 4.5, 0]} castShadow>
        <boxGeometry args={[18, 0.4, 6]} />
        <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.1} transparent opacity={0.6} />
      </mesh>

      {/* 3 Career Terminal Columns */}
      {internshipExperiences.map((exp, idx) => {
        const xOffset = -5 + idx * 5;
        return (
          <group key={exp.id} position={[xOffset, 1.6, 0]}>
            {/* Supporting Pylon */}
            <mesh position={[0, 2, 0]} castShadow>
              <cylinderGeometry args={[0.6, 0.8, 4, 16]} />
              <meshStandardMaterial color="#1e293b" metalness={0.8} />
            </mesh>
            {/* Holographic Station Billboard */}
            <mesh position={[0, 4.8, 0]}>
              <boxGeometry args={[3.2, 1.8, 0.15]} />
              <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.2} />
            </mesh>
            {/* Glowing Amber/Cyan Accent Rim */}
            <mesh position={[0, 4.8, 0.09]}>
              <planeGeometry args={[3.0, 1.6]} />
              <meshBasicMaterial color={idx === 1 ? "#f59e0b" : "#00d2ff"} transparent opacity={0.2} />
            </mesh>
            <mesh position={[0, 3.9, 0.1]}>
              <boxGeometry args={[3.1, 0.06, 0.05]} />
              <meshBasicMaterial color={idx === 1 ? "#f59e0b" : "#00d2ff"} />
            </mesh>
          </group>
        );
      })}

      {/* Neon Pathway Lights */}
      <mesh position={[0, 1.65, 5]}>
        <boxGeometry args={[18, 0.1, 0.2]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
      <mesh position={[0, 1.65, -5]}>
        <boxGeometry args={[18, 0.1, 0.2]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      <pointLight position={[0, 6, 0]} color="#00d2ff" intensity={2.0} distance={18} />
    </group>
  );
};
