import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface EducationBoulevardProps {
  onOpenEducationModal?: () => void;
}

export const EducationBoulevard: React.FC<EducationBoulevardProps> = ({ onOpenEducationModal }) => {
  const crestRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (crestRef.current) {
      crestRef.current.rotation.y += delta * 0.6;
    }
    if (beaconRef.current) {
      beaconRef.current.intensity = 2.8 + Math.sin(state.clock.elapsedTime * 3) * 0.8;
    }
  });

  return (
    <group
      name="EducationBoulevard"
      position={[-35, 0, -15]}
      onClick={(e) => {
        e.stopPropagation();
        onOpenEducationModal?.();
      }}
    >
      {/* ========================================================
          1. ACADEMIC CAMPUS FOUNDATION & WATER FEATURE
          White travertine steps, reflecting pool, and perimeter lighting
          ======================================================== */}
      {/* Foundation Pedestal */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[22, 1.0, 20]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.25} metalness={0.4} />
      </mesh>

      {/* Reflecting Pool Basin */}
      <mesh position={[0, 0.55, 7.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 3]} />
        <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Pool Gold Border */}
      <mesh position={[0, 0.58, 7.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6.8, 7.0, 4]} />
        <meshBasicMaterial color="#d97706" />
      </mesh>

      {/* ========================================================
          2. MAIN CURVED ACADEMIC INSTITUTE COMPLEX
          Crystalline glass library atrium, white limestone wings & colonnade
          ======================================================== */}
      {/* Central Glass Rotunda / Atrium */}
      <mesh position={[0, 6.5, -1]} castShadow>
        <cylinderGeometry args={[5.5, 6.0, 11, 24]} />
        <meshStandardMaterial color="#0284c7" metalness={0.92} roughness={0.06} transparent opacity={0.4} />
      </mesh>
      {/* Interior Multi-tier Floors inside Glass Atrium */}
      {[-2, 1, 4].map((y, i) => (
        <mesh key={`rotunda-floor-${i}`} position={[0, 6.5 + y, -1]}>
          <cylinderGeometry args={[5.2, 5.2, 0.2, 24]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} />
        </mesh>
      ))}

      {/* Left Academic Wing (B.Tech ECE Labs) */}
      <mesh position={[-7.5, 5.5, -2]} castShadow>
        <boxGeometry args={[7, 9, 12]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Left Wing Ribbon Windows */}
      {[2, 4.5, 7].map((y, i) => (
        <mesh key={`left-win-${i}`} position={[-7.5, y, 4.05]}>
          <boxGeometry args={[6.2, 1.2, 0.1]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
      ))}

      {/* Right Academic Wing (Innovation & Engineering Wing) */}
      <mesh position={[7.5, 5.5, -2]} castShadow>
        <boxGeometry args={[7, 9, 12]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Right Wing Ribbon Windows */}
      {[2, 4.5, 7].map((y, i) => (
        <mesh key={`right-win-${i}`} position={[7.5, y, 4.05]}>
          <boxGeometry args={[6.2, 1.2, 0.1]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
      ))}

      {/* Modern Cantilever Entrance Canopy */}
      <mesh position={[0, 4.0, 5]} castShadow>
        <boxGeometry args={[8, 0.35, 5]} />
        <meshStandardMaterial color="#09090b" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Entrance Columns */}
      <mesh position={[-3.6, 2.0, 6.5]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 3.8, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} />
      </mesh>
      <mesh position={[3.6, 2.0, 6.5]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 3.8, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} />
      </mesh>

      {/* ========================================================
          3. ILLUMINATED GOLDEN ACADEMIC CROWN & CREST
          ======================================================== */}
      {/* Gold Crown Cornice */}
      <mesh position={[0, 12.2, -1]}>
        <cylinderGeometry args={[6.2, 6.0, 0.8, 24]} />
        <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Floating Holographic Degree Crest */}
      <group ref={crestRef} position={[0, 15.5, -1]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[2.8, 2.8, 0.3]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[2.2, 2.2, 0.35]} />
          <meshStandardMaterial color="#ffffff" metalness={0.95} />
        </mesh>
        {/* Golden Central Star / ECE Emblem */}
        <mesh position={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 8]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
      </group>

      {/* Floating Architectural Campus Signboard */}
      <Float speed={2} rotationIntensity={0.08} floatIntensity={0.2}>
        <group position={[0, 6.2, 6.8]}>
          <mesh>
            <boxGeometry args={[8.2, 1.3, 0.15]} />
            <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.09]}>
            <planeGeometry args={[8.0, 1.1]} />
            <meshBasicMaterial color="#0284c7" transparent opacity={0.3} />
          </mesh>
          <mesh position={[0, 0.62, 0.1]}>
            <boxGeometry args={[8.1, 0.04, 0.02]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>
      </Float>

      <pointLight ref={beaconRef} position={[0, 16, -1]} color="#38bdf8" intensity={3.5} distance={30} />
      <pointLight position={[0, 3.5, 6]} color="#fbbf24" intensity={2.5} distance={18} />
    </group>
  );
};
