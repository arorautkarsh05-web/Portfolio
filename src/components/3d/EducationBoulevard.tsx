import React from 'react';

interface EducationBoulevardProps {
  onOpenEducationModal?: () => void;
}

export const EducationBoulevard: React.FC<EducationBoulevardProps> = ({ onOpenEducationModal }) => {
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
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Main Academic Institute Tower (Crisp White & Azure Glass) */}
      <mesh position={[0, 9, 0]} castShadow>
        <boxGeometry args={[12, 16, 12]} />
        <meshStandardMaterial
          color="#f8fafc"
          metalness={0.8}
          roughness={0.1}
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
          <meshBasicMaterial color="#0284c7" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[1.8, 1.8, 0.45]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} />
        </mesh>
      </group>

      <pointLight position={[0, 21, 0]} color="#0284c7" intensity={3.0} distance={25} />
      <pointLight position={[0, 3, 0]} color="#f59e0b" intensity={2.0} distance={20} />
    </group>
  );
};
