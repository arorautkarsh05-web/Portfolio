import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ContactGarageProps {
  onOpenContactModal?: () => void;
}

export const ContactGarage: React.FC<ContactGarageProps> = ({ onOpenContactModal }) => {
  const signalRingRef = useRef<THREE.Group>(null);
  const turntableRef = useRef<THREE.Group>(null);
  const ceilingGridRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (signalRingRef.current) {
      signalRingRef.current.rotation.y += delta * 0.7;
    }
    if (turntableRef.current) {
      turntableRef.current.rotation.y += delta * 0.2;
    }
    if (ceilingGridRef.current) {
      ceilingGridRef.current.intensity = 3.2 + Math.sin(state.clock.elapsedTime * 2.5) * 0.6;
    }
  });

  return (
    <group
      name="ContactGarage"
      position={[28, 0, 42]}
      onClick={(e) => {
        e.stopPropagation();
        onOpenContactModal?.();
      }}
    >
      {/* ========================================================
          1. SHOWROOM GRANITE FOUNDATION & APPROACH RUNWAY
          ======================================================== */}
      {/* Main Ground Slab - Polished Charcoal Granite */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[22, 0.8, 20]} />
        <meshStandardMaterial color="#0f172a" roughness={0.15} metalness={0.7} />
      </mesh>

      {/* Runway Approach Strip with Inset Cyan LED Runway Markers */}
      <mesh position={[0, 0.42, 11]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.5} />
      </mesh>
      {[-2.8, -1.4, 1.4, 2.8].map((x, i) => (
        <mesh key={`runway-led-${i}`} position={[x, 0.44, 11]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.2, 3.5]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      ))}

      {/* ========================================================
          2. ROTATING TURNTABLE DISPLAY STAGE
          Polished Obsidian Stage with Gold Outer Bezel
          ======================================================== */}
      <group ref={turntableRef} position={[0, 0.85, -1]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[6.2, 6.4, 0.15, 48]} />
          <meshStandardMaterial color="#020617" roughness={0.05} metalness={0.95} />
        </mesh>
        <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[5.9, 6.1, 48]} />
          <meshBasicMaterial color="#d97706" />
        </mesh>
        <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.2, 3.3, 48]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
      </group>

      {/* ========================================================
          3. LUXURY SHOWROOM GLASS PAVILION
          Cantilevered black structural steel columns & curtain glass
          ======================================================== */}
      {/* 4 Corner Structural Steel Pylons */}
      {[
        [-9.8, -8.8],
        [9.8, -8.8],
        [-9.8, 8.8],
        [9.8, 8.8]
      ].map(([x, z], idx) => (
        <mesh key={`pylon-${idx}`} position={[x, 4.5, z]} castShadow>
          <boxGeometry args={[0.8, 8, 0.8]} />
          <meshStandardMaterial color="#09090b" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Panoramic Clear Glass Enclosure (Back & Side Walls) */}
      <mesh position={[0, 4.5, -8.8]}>
        <boxGeometry args={[19, 7.8, 0.15]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.05} metalness={0.95} transparent opacity={0.3} />
      </mesh>
      <mesh position={[-9.8, 4.5, 0]}>
        <boxGeometry args={[0.15, 7.8, 17.5]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.05} metalness={0.95} transparent opacity={0.3} />
      </mesh>
      <mesh position={[9.8, 4.5, 0]}>
        <boxGeometry args={[0.15, 7.8, 17.5]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.05} metalness={0.95} transparent opacity={0.3} />
      </mesh>

      {/* ========================================================
          4. CANTILEVERED ROOF & SUPERCAR HONEYCOMB CEILING LIGHTS
          ======================================================== */}
      {/* Heavy Cantilever Roof Fascia */}
      <mesh position={[0, 8.6, 0]} castShadow>
        <boxGeometry args={[22.5, 0.6, 20.5]} />
        <meshStandardMaterial color="#09090b" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Golden Roof Border Line */}
      <mesh position={[0, 8.92, 0]}>
        <boxGeometry args={[22.6, 0.06, 20.6]} />
        <meshBasicMaterial color="#d97706" />
      </mesh>

      {/* Signature Supercar Showroom Hexagonal LED Grid on Ceiling */}
      {[-6, 0, 6].map((gx, i) =>
        [-4, 0, 4].map((gz, j) => (
          <mesh key={`hex-light-${i}-${j}`} position={[gx, 8.25, gz]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.5, 1.62, 6]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))
      )}

      {/* ========================================================
          5. INTERIOR VIP EXECUTIVE TERMINAL DESK & HOLOGRAPHIC STELES
          ======================================================== */}
      <mesh position={[0, 1.8, -5]} castShadow>
        <boxGeometry args={[4.5, 1.4, 1.2]} />
        <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Glowing Executive Desk Surface */}
      <mesh position={[0, 2.52, -5]}>
        <boxGeometry args={[4.6, 0.05, 1.3]} />
        <meshBasicMaterial color="#0284c7" />
      </mesh>

      {/* Floating Hologram Signal Rings above desk */}
      <group ref={signalRingRef} position={[0, 4.2, -5]}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.8, 0.08, 16, 48]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh rotation={[-Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.4, 0.06, 16, 48]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
      </group>

      {/* Rooftop Illuminated Billboard Sign: "EXECUTIVE GARAGE // CONTACT" */}
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.15}>
        <group position={[0, 10.6, 8.5]}>
          <mesh>
            <boxGeometry args={[8.5, 1.4, 0.2]} />
            <meshStandardMaterial color="#09090b" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.12]}>
            <planeGeometry args={[8.2, 1.1]} />
            <meshBasicMaterial color="#0284c7" transparent opacity={0.3} />
          </mesh>
          <mesh position={[0, 0.68, 0.13]}>
            <boxGeometry args={[8.4, 0.04, 0.02]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>
      </Float>

      {/* Interior Warm Downlight & Ambient Illumination */}
      <pointLight ref={ceilingGridRef} position={[0, 7.8, 0]} color="#ffffff" intensity={3.5} distance={25} />
      <pointLight position={[0, 3.5, -5]} color="#0284c7" intensity={2.5} distance={15} />
    </group>
  );
};
