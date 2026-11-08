import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { skillsData } from '../../data/skills';

interface TechTowerProps {
  onOpenSkillsModal?: () => void;
}

export const TechTower: React.FC<TechTowerProps> = ({ onOpenSkillsModal }) => {
  const ringsRef = useRef<THREE.Group>(null);
  const spireGlowRef = useRef<THREE.PointLight>(null);
  const beaconFinsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.y += delta * 0.45;
    }
    if (beaconFinsRef.current) {
      beaconFinsRef.current.rotation.y -= delta * 0.25;
    }
    if (spireGlowRef.current) {
      spireGlowRef.current.intensity = 3.5 + Math.sin(state.clock.elapsedTime * 3.5) * 1.2;
    }
  });

  return (
    <group
      name="TechTower"
      position={[0, 0, -78]}
      onClick={(e) => {
        e.stopPropagation();
        onOpenSkillsModal?.();
      }}
    >
      {/* ========================================================
          1. GRAND PODIUM & REFLECTING WATER PLAZA
          Dubai luxury limestone, tiered cantilever steps & water basin
          ======================================================== */}
      {/* Water Reflection Basin */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[14, 22, 48]} />
        <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Basin Perimeter Gold Rim */}
      <mesh position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[21.6, 22.2, 48]} />
        <meshBasicMaterial color="#d97706" />
      </mesh>

      {/* Tiered Travertine & Granite Pedestal */}
      <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[13.5, 15.5, 2.0, 12]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, 2.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[11.5, 13.5, 1.2, 12]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Grand Entrance Canopy (Cantilevered Glass & Black Steel) */}
      <mesh position={[0, 4.2, 11]} castShadow>
        <boxGeometry args={[10, 0.35, 6]} />
        <meshStandardMaterial color="#09090b" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 4.0, 11]}>
        <boxGeometry args={[9.6, 0.1, 5.6]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
      </mesh>
      {/* Entrance Glass Revolving Doors / Lobby Atrium */}
      <mesh position={[0, 3.2, 9]} castShadow>
        <boxGeometry args={[8, 3.2, 3]} />
        <meshStandardMaterial color="#0284c7" metalness={0.95} roughness={0.05} transparent opacity={0.6} />
      </mesh>

      {/* ========================================================
          2. ICONIC 65-METER CRYSTALLINE SKYSCRAPER SHAFT
          Slender faceted glass tower with external diagrid structural ribs
          ======================================================== */}
      {/* Central Glass Core */}
      <mesh position={[0, 28, 0]} castShadow>
        <cylinderGeometry args={[5.2, 9.8, 52, 8]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.08}
          metalness={0.88}
          envMapIntensity={3.0}
        />
      </mesh>

      {/* White Structural Exoskeleton Vertical Columns (8-sided) */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i * Math.PI * 2) / 8;
        const rTop = 5.4;
        const rBottom = 10.0;
        return (
          <group key={`column-${i}`}>
            <mesh
              position={[Math.cos(angle) * ((rTop + rBottom) / 2), 28, Math.sin(angle) * ((rTop + rBottom) / 2)]}
              rotation={[0, -angle, (rBottom - rTop) / 52]}
            >
              <boxGeometry args={[0.35, 52, 0.4]} />
              <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.15} />
            </mesh>
          </group>
        );
      })}

      {/* 7 Illuminated Floor Cantilever Decks (7 Skill Domains) */}
      {skillsData.map((skill, idx) => {
        const yPos = 7 + idx * 6.5;
        const rad = 9.2 - idx * 0.55;
        const isAccent = idx % 2 === 0;
        return (
          <group key={`floor-${idx}`} position={[0, yPos, 0]}>
            {/* Extended Glass Sky-Garden Balcony */}
            <mesh castShadow>
              <cylinderGeometry args={[rad, rad + 0.3, 0.6, 8]} />
              <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Perimeter Illuminated Neon LED Edge */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[rad + 0.1, rad + 0.1, 0.15, 8]} />
              <meshBasicMaterial color={isAccent ? "#0284c7" : "#d97706"} />
            </mesh>
          </group>
        );
      })}

      {/* ========================================================
          3. ROTATING HOLOGRAPHIC DATA ORBIT RINGS
          ======================================================== */}
      <group ref={ringsRef} position={[0, 38, 0]}>
        <mesh rotation={[Math.PI / 5, 0, 0]}>
          <torusGeometry args={[11.5, 0.18, 16, 64]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
        <mesh rotation={[-Math.PI / 5, 0, 0]}>
          <torusGeometry args={[10.2, 0.14, 16, 64]} />
          <meshBasicMaterial color="#d97706" />
        </mesh>
      </group>

      {/* ========================================================
          4. TOWER CROWN & OBSERVATION LEVEL
          Cantilevered glass sky-deck with 360-degree panoramic glass
          ======================================================== */}
      <mesh position={[0, 54, 0]} castShadow>
        <cylinderGeometry args={[6.8, 4.8, 3.5, 12]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0, 54, 0]}>
        <cylinderGeometry args={[6.9, 4.9, 1.8, 12]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.95} roughness={0.05} transparent opacity={0.5} />
      </mesh>

      {/* Spire Base Crown Collar */}
      <mesh position={[0, 56.5, 0]}>
        <cylinderGeometry args={[2.5, 4.5, 2.2, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* ========================================================
          5. DUAL-STAGE ARCHITECTURAL SPIRE PINNACLE
          Polished stainless steel needle with FAA warning beacons
          ======================================================== */}
      <mesh position={[0, 64, 0]}>
        <cylinderGeometry args={[0.2, 1.4, 15, 8]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.98} roughness={0.05} />
      </mesh>
      <mesh position={[0, 72, 0]}>
        <cylinderGeometry args={[0.05, 0.2, 7, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.98} />
      </mesh>

      {/* High-Altitude Aircraft Warning Beacons */}
      <mesh position={[0, 65, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      <mesh position={[0, 75.5, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Vertical Golden-Hour Skybeam Laser */}
      <mesh position={[0, 95, 0]}>
        <cylinderGeometry args={[0.3, 0.8, 40, 16]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
      </mesh>

      {/* High-Altitude Beacon Point Light */}
      <pointLight
        ref={spireGlowRef}
        position={[0, 75, 0]}
        color="#38bdf8"
        intensity={4.5}
        distance={80}
      />

      {/* Ground Plaza Architectural Signboard */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <group position={[0, 6.5, 13]}>
          <mesh>
            <boxGeometry args={[7.5, 1.2, 0.15]} />
            <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.09]}>
            <planeGeometry args={[7.3, 1.0]} />
            <meshBasicMaterial color="#0284c7" transparent opacity={0.25} />
          </mesh>
          {/* Glowing Border Frame */}
          <mesh position={[0, 0.58, 0.1]}>
            <boxGeometry args={[7.4, 0.05, 0.02]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[0, -0.58, 0.1]}>
            <boxGeometry args={[7.4, 0.05, 0.02]} />
            <meshBasicMaterial color="#d97706" />
          </mesh>
        </group>
      </Float>

      {/* Interactive Pedestal Beacon Light */}
      <pointLight position={[0, 5, 13]} color="#0284c7" intensity={3.5} distance={25} />
    </group>
  );
};
