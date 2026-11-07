import React from 'react';
import { personalProfile } from '../../data/profile';

interface EducationBoulevardProps {
  onOpenEducationModal?: () => void;
}

export const EducationBoulevard: React.FC<EducationBoulevardProps> = ({ onOpenEducationModal }) => {
  const { education } = personalProfile;

  return (
    <group
      name="EducationBoulevard"
      position={[-35, 0, -15]}
      onClick={(e) => {
        e.stopPropagation();
        onOpenEducationModal?.();
      }}
    >
      {/* Foundation Platform */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[16, 1.6, 16]} />
        <meshStandardMaterial color="#0b1120" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Main Academic Institute Tower (Modern Glass Cube & Columns) */}
      <mesh position={[0, 9, 0]} castShadow>
        <boxGeometry args={[12, 16, 12]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Illuminated Golden Academic Crown */}
      <mesh position={[0, 17.5, 0]}>
        <boxGeometry args={[13, 1, 13]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>

      {/* Floating Holographic Degree Crest */}
      <group position={[0, 20.5, 0]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[2.5, 2.5, 0.4]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[1.8, 1.8, 0.45]} />
          <meshStandardMaterial color="#0284c7" metalness={0.9} />
        </mesh>
      </group>

      {/* Light Accent */}
      <pointLight position={[0, 21, 0]} color="#38bdf8" intensity={2.0} distance={20} />
      <pointLight position={[0, 3, 0]} color="#f59e0b" intensity={1.5} distance={15} />
    </group>
  );
};
