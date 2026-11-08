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
  const fountainRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (crestRef.current) {
      crestRef.current.rotation.y += delta * 0.6;
    }
    if (fountainRef.current) {
      fountainRef.current.rotation.y += delta * 0.3;
    }
    if (beaconRef.current) {
      beaconRef.current.intensity = 2.8 + Math.sin(state.clock.elapsedTime * 3) * 0.8;
    }
  });

  return (
    <group
      name="EducationBoulevard"
      position={[-82, 0, -6]}
      rotation={[0, Math.PI / 2, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onOpenEducationModal?.();
      }}
    >
      {/* ========================================================
          1. ACADEMIC CAMPUS FOUNDATION & WATER FEATURE
          White travertine podium, stepped terrace & reflecting pool
          ======================================================== */}
      {/* Ground Foundation Pedestal */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[26, 0.8, 22]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Gold Perimeter Rim */}
      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[26.2, 0.05, 22.2]} />
        <meshBasicMaterial color="#d97706" />
      </mesh>

      {/* Reflecting Pool Basin */}
      <mesh position={[0, 0.85, 7.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 4.5]} />
        <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Pool Coping Rim */}
      <mesh position={[0, 0.88, 7.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6.8, 7.2, 4]} />
        <meshBasicMaterial color="#d97706" />
      </mesh>

      {/* Decorative Fountain Jets */}
      <group ref={fountainRef} position={[0, 1.2, 7.5]}>
        {[-3, 0, 3].map((x, i) => (
          <mesh key={`jet-${i}`} position={[x, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.25, 0.8, 8]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* Campus Landscaping: Cypress Trees & Stone Planters */}
      {[-10, 10].map((x, i) => (
        <group key={`landscaping-${i}`} position={[x, 0.8, 7.5]}>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[1.2, 1.4, 0.8, 12]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.5} roughness={0.3} />
          </mesh>
          <mesh position={[0, 2.5, 0]}>
            <coneGeometry args={[0.9, 3.8, 8]} />
            <meshStandardMaterial color="#15803d" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ========================================================
          2. MAIN ACADEMIC COMPLEX: CRYSTALLINE ROTUNDA & WINGS
          ======================================================== */}
      {/* Central Glass Rotunda / Library Atrium */}
      <mesh position={[0, 6.5, -1]} castShadow>
        <cylinderGeometry args={[5.5, 6.0, 11, 32]} />
        <meshStandardMaterial color="#0284c7" metalness={0.92} roughness={0.06} transparent opacity={0.45} />
      </mesh>

      {/* Interior Multi-tier Floors & Research Mezzanines */}
      {[-2.5, 0.5, 3.5].map((y, i) => (
        <group key={`rotunda-floor-${i}`} position={[0, 6.5 + y, -1]}>
          <mesh>
            <cylinderGeometry args={[5.2, 5.2, 0.2, 32]} />
            <meshStandardMaterial color="#f1f5f9" metalness={0.7} />
          </mesh>
          {/* Warm Interior Mezzanine Lighting Ring */}
          <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[4.6, 5.0, 24]} />
            <meshBasicMaterial color="#fde047" />
          </mesh>
        </group>
      ))}

      {/* Left Academic Wing (B.Tech ECE Labs & Advanced Electronics) */}
      <mesh position={[-8.5, 5.5, -2]} castShadow receiveShadow>
        <boxGeometry args={[8, 9, 13]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Left Wing Ribbon Windows */}
      {[2.5, 5.5, 8.0].map((y, i) => (
        <mesh key={`left-win-${i}`} position={[-8.5, y, 4.55]}>
          <boxGeometry args={[7.2, 1.4, 0.1]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
      ))}

      {/* Right Academic Wing (Innovation & Research Hub) */}
      <mesh position={[8.5, 5.5, -2]} castShadow receiveShadow>
        <boxGeometry args={[8, 9, 13]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Right Wing Ribbon Windows */}
      {[2.5, 5.5, 8.0].map((y, i) => (
        <mesh key={`right-win-${i}`} position={[8.5, y, 4.55]}>
          <boxGeometry args={[7.2, 1.4, 0.1]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
      ))}

      {/* ========================================================
          3. ARCHITECTURAL ENTRANCE COLONNADE & ROTUNDA PORTAL
          Grand curved peristyle, marble columns & illuminated academic portal
          ======================================================== */}
      {/* Curved Architectural Entry Canopy (Seamlessly Hugging Rotunda) */}
      <mesh position={[0, 4.2, 3.8]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[8.5, 0.25, 2.2]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Canopy Gold Fascia Trim */}
      <mesh position={[0, 4.33, 4.88]}>
        <boxGeometry args={[8.55, 0.08, 0.1]} />
        <meshBasicMaterial color="#d97706" />
      </mesh>
      <mesh position={[0, 4.08, 4.88]}>
        <boxGeometry args={[8.55, 0.08, 0.1]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Classical Modernist Portico Columns (White Marble & Gold Bases) */}
      {[-3.6, -1.2, 1.2, 3.6].map((x, i) => (
        <group key={`column-${i}`} position={[x, 0, 4.6]}>
          {/* Base Plinth */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.3, 0.35, 0.4, 16]} />
            <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Fluted Marble Column Shaft */}
          <mesh position={[0, 2.2, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.24, 3.6, 20]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.3} roughness={0.2} />
          </mesh>
          {/* Column Capital */}
          <mesh position={[0, 4.05, 0]}>
            <cylinderGeometry args={[0.32, 0.24, 0.2, 16]} />
            <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Recessed Grand Crystal Entrance Doors */}
      <mesh position={[0, 2.1, 3.2]}>
        <boxGeometry args={[4.8, 3.8, 0.15]} />
        <meshStandardMaterial color="#0284c7" metalness={0.95} roughness={0.05} transparent opacity={0.7} />
      </mesh>
      {/* Door Frame Gold Accent */}
      <mesh position={[0, 2.1, 3.3]}>
        <ringGeometry args={[1.8, 1.9, 4]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>

      {/* Warm Golden Interior Lobby Light */}
      <pointLight position={[0, 2.2, 2.5]} color="#fde047" intensity={3.0} distance={12} />

      {/* Integrated Architectural University Signage Band */}
      <group position={[0, 5.0, 4.0]}>
        {/* Sleek Modern Backplate */}
        <mesh castShadow>
          <boxGeometry args={[7.6, 0.8, 0.2]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Glowing Azure Inset Plate */}
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[7.4, 0.65]} />
          <meshStandardMaterial color="#0369a1" emissive="#0284c7" emissiveIntensity={0.6} roughness={0.1} />
        </mesh>
        {/* Gold Border Trim Top & Bottom */}
        <mesh position={[0, 0.38, 0.12]}>
          <boxGeometry args={[7.5, 0.04, 0.02]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
        <mesh position={[0, -0.38, 0.12]}>
          <boxGeometry args={[7.5, 0.04, 0.02]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        {/* University Emblem Accent */}
        <mesh position={[0, 0, 0.13]}>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 8]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
      </group>

      {/* ========================================================
          4. ILLUMINATED GOLDEN ACADEMIC DOME & DEGREE CREST
          ======================================================== */}
      {/* Gold Crown Cornice */}
      <mesh position={[0, 12.2, -1]}>
        <cylinderGeometry args={[6.2, 6.0, 0.8, 32]} />
        <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Floating Holographic Degree Crest (B.Tech ECE) */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.25}>
        <group ref={crestRef} position={[0, 15.5, -1]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[2.8, 2.8, 0.3]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[2.2, 2.2, 0.35]} />
            <meshStandardMaterial color="#ffffff" metalness={0.95} />
          </mesh>
          {/* Golden Central Star / Electronics Circuit Emblem */}
          <mesh position={[0, 0, 0.2]}>
            <cylinderGeometry args={[0.6, 0.6, 0.1, 8]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>
      </Float>

      {/* Roof Beacon & Campus Illumination */}
      <pointLight ref={beaconRef} position={[0, 16.5, -1]} color="#38bdf8" intensity={3.5} distance={30} />
      <pointLight position={[0, 3.8, 5]} color="#38bdf8" intensity={2.0} distance={15} />
    </group>
  );
};
