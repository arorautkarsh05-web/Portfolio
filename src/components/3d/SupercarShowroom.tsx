import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { ExoticHypercar } from './ExoticHypercar';

interface SupercarShowroomProps {
  onTriggerIgnition?: () => void;
}

export const SupercarShowroom: React.FC<SupercarShowroomProps> = ({ onTriggerIgnition }) => {
  const turntableRef = useRef<THREE.Group>(null);
  const interiorLightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (turntableRef.current) {
      turntableRef.current.rotation.y += delta * 0.35;
    }
    if (interiorLightRef.current) {
      interiorLightRef.current.intensity = 3.2 + Math.sin(state.clock.elapsedTime * 2.0) * 0.8;
    }
  });

  return (
    <group
      name="SupercarShowroom"
      position={[26, 0, 18]}
      rotation={[0, -Math.PI / 4, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onTriggerIgnition?.();
      }}
    >
      {/* Showroom Foundation (Italian Carrara Marble & Brushed Titanium) */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[22, 1.0, 18]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.15} metalness={0.7} />
      </mesh>
      {/* Perimeter Gold Accent Strip */}
      <mesh position={[0, 1.02, 0]}>
        <boxGeometry args={[22.2, 0.05, 18.2]} />
        <meshBasicMaterial color="#d97706" />
      </mesh>

      {/* Floor Mirror Reflection Surface */}
      <mesh position={[0, 1.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 16]} />
        <meshStandardMaterial color="#09090b" roughness={0.05} metalness={0.95} />
      </mesh>

      {/* Cylindrical Glass Showroom Pavilion */}
      <mesh position={[0, 4.5, 0]} castShadow>
        <cylinderGeometry args={[8.5, 8.5, 7.0, 32, 1, true]} />
        <meshStandardMaterial
          color="#0284c7"
          metalness={0.95}
          roughness={0.05}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Aerodynamic Floating Carbon-Fiber Roof Wing */}
      <mesh position={[0, 8.3, 0]} castShadow>
        <cylinderGeometry args={[9.2, 8.8, 0.6, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Roof Edge Neon Gold Ring */}
      <mesh position={[0, 8.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[8.9, 9.2, 48]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>

      {/* Rotating Supercar Turntable Platform */}
      <group ref={turntableRef} position={[0, 1.15, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[4.2, 4.5, 0.25, 32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.8, 4.1, 32]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Flagship Exotic Track Hypercar on Display (Distinct from Road GT Coupe) */}
        <ExoticHypercar
          color="#0284c7"
          accentColor="#0f172a"
          isHeadlightsOn={true}
          position={[0, 0.14, 0]}
          rotation={[0, Math.PI, 0]}
        />
      </group>

      {/* Floating Architectural Marquee Sign */}
      <Float speed={2} rotationIntensity={0.04} floatIntensity={0.12}>
        <group position={[0, 10.2, 6]}>
          <mesh>
            <boxGeometry args={[12, 1.4, 0.2]} />
            <meshStandardMaterial color="#020617" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.11]}>
            <planeGeometry args={[11.6, 1.1]} />
            <meshBasicMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, 0.55, 0.12]}>
            <boxGeometry args={[11.6, 0.04, 0.02]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>
      </Float>

      {/* Interior Showcase Spotlighting */}
      <pointLight ref={interiorLightRef} position={[0, 7.5, 0]} color="#ffffff" intensity={3.5} distance={22} />
      <spotLight
        position={[0, 8.0, 0]}
        target-position={[0, 1.2, 0]}
        intensity={5.0}
        angle={0.65}
        penumbra={0.4}
        color="#fff7ed"
      />
    </group>
  );
};

