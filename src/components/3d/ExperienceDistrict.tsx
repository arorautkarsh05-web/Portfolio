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
      position={[-56, 0, 66]}
      rotation={[0, Math.PI / 4, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onOpenExperienceModal?.();
      }}
    >
      {/* Foundation Platform (Travertine & Gold Rim) */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[26, 1.6, 18]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.2} metalness={0.6} />
      </mesh>
      <mesh position={[0, 1.62, 0]}>
        <boxGeometry args={[26.2, 0.05, 18.2]} />
        <meshBasicMaterial color="#d97706" />
      </mesh>

      {/* Corporate Glass Atrium Spine */}
      <mesh position={[0, 6.0, 0]} castShadow>
        <boxGeometry args={[24, 0.6, 8]} />
        <meshStandardMaterial color="#0284c7" metalness={0.92} roughness={0.08} transparent opacity={0.65} />
      </mesh>

      {/* 3 Identifiable Corporate Office Structures for the 3 Internships */}
      {internshipExperiences.map((exp, idx) => {
        const xOffset = -7.5 + idx * 7.5;
        const towerHeight = 12 + (idx % 2) * 3;
        const isAccent = idx === 1;

        return (
          <group key={exp.id} position={[xOffset, 1.6, 0]}>
            {/* Corporate Glass Tower Body */}
            <mesh position={[0, towerHeight / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[5.8, towerHeight, 6.2]} />
              <meshStandardMaterial
                color={isAccent ? '#bae6fd' : '#e2e8f0'}
                roughness={0.12}
                metalness={0.8}
                envMapIntensity={2.0}
              />
            </mesh>

            {/* Neon Corporate Accent Strip */}
            <mesh position={[0, towerHeight / 2, 3.15]}>
              <boxGeometry args={[0.15, towerHeight * 0.9, 0.05]} />
              <meshBasicMaterial color={isAccent ? '#fbbf24' : '#38bdf8'} />
            </mesh>

            {/* Corporate Entrance Canopy */}
            <mesh position={[0, 3.2, 3.6]} castShadow>
              <boxGeometry args={[4.5, 0.25, 2.0]} />
              <meshStandardMaterial color="#09090b" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Company Signage Billboard on Tower Crown */}
            <mesh position={[0, towerHeight + 1.2, 0]}>
              <boxGeometry args={[5.2, 1.6, 0.3]} />
              <meshStandardMaterial color="#020617" roughness={0.2} metalness={0.95} />
            </mesh>
            <mesh position={[0, towerHeight + 1.2, 0.18]}>
              <planeGeometry args={[4.8, 1.2]} />
              <meshBasicMaterial color={isAccent ? '#d97706' : '#0284c7'} transparent opacity={0.4} />
            </mesh>

            {/* Terminal Hologram Console at Ground Plaza */}
            <mesh position={[0, 1.8, 4.0]} castShadow>
              <boxGeometry args={[2.8, 1.6, 0.15]} />
              <meshStandardMaterial color="#09090b" metalness={0.9} />
            </mesh>
            <mesh position={[0, 1.8, 4.09]}>
              <planeGeometry args={[2.6, 1.4]} />
              <meshBasicMaterial color={isAccent ? '#fbbf24' : '#38bdf8'} transparent opacity={0.35} />
            </mesh>
          </group>
        );
      })}

      {/* Floating Architectural Marquee */}
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.15}>
        <group position={[0, 10.5, 9.5]}>
          <mesh>
            <boxGeometry args={[14, 1.6, 0.2]} />
            <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.11]}>
            <planeGeometry args={[13.6, 1.3]} />
            <meshBasicMaterial color="#0284c7" transparent opacity={0.3} />
          </mesh>
          <mesh position={[0, 0.75, 0.12]}>
            <boxGeometry args={[13.6, 0.05, 0.02]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>
      </Float>

      {/* District Lighting */}
      <pointLight position={[0, 8.5, 4]} color="#38bdf8" intensity={3.5} distance={30} />
    </group>
  );
};
