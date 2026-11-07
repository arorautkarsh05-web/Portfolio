import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { VehicleState } from '../../hooks/useVehicleControls';

interface CharacterAndCarProps {
  vehicleState: VehicleState;
  onCharacterClick?: () => void;
  isDrivingMode?: boolean;
}

export const CharacterAndCar: React.FC<CharacterAndCarProps> = ({
  vehicleState,
  onCharacterClick,
  isDrivingMode = false
}) => {
  const carGroupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);
  const underglowRef = useRef<THREE.PointLight>(null);
  const hologramRingRef = useRef<THREE.Group>(null);

  // Load the authentic user photo for the holographic pedestal
  const userPhotoTexture = useTexture('/utkarsh_arora.jpeg');

  useFrame((state, delta) => {
    // Update car transform based on vehicle physics state
    if (carGroupRef.current) {
      carGroupRef.current.position.set(
        vehicleState.position[0],
        vehicleState.position[1],
        vehicleState.position[2]
      );
      carGroupRef.current.rotation.y = vehicleState.rotationY;
    }

    // Wheel spin when car has speed
    wheelsRef.current.forEach(w => {
      if (w) {
        w.rotation.x += (vehicleState.speed * delta * 2.8);
      }
    });

    // Front wheels steering angle
    if (wheelsRef.current[0] && wheelsRef.current[1]) {
      wheelsRef.current[0].rotation.y = vehicleState.steering;
      wheelsRef.current[1].rotation.y = vehicleState.steering;
    }

    // Subtle idle suspension bob
    if (carGroupRef.current && vehicleState.speed === 0) {
      carGroupRef.current.position.y = 0.45 + Math.sin(state.clock.elapsedTime * 2.5) * 0.008;
    }

    // Holographic ring rotation
    if (hologramRingRef.current) {
      hologramRingRef.current.rotation.y += delta * 0.8;
    }

    // Underglow gentle pulse
    if (underglowRef.current) {
      underglowRef.current.intensity = 2.2 + Math.sin(state.clock.elapsedTime * 4) * 0.5;
    }
  });

  return (
    <group name="CharacterAndCarSystem">
      {/* ========================================================
          LUXURY SPORTS CAR (Dubai-Inspired Pearlescent Gold Supercar)
          Sleek aerodynamic wide-body stance with low-slung GT profile
          ======================================================== */}
      <group ref={carGroupRef} position={vehicleState.position}>
        {/* Main Low-Slung Chassis - Pearlescent Sunburst Gold */}
        <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.34, 4.6]} />
          <meshStandardMaterial
            color="#f59e0b"
            metalness={0.92}
            roughness={0.14}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* Aggressive Front Nose & Hood */}
        <mesh position={[0, 0.28, 2.0]} rotation={[-0.14, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.1, 0.24, 1.4]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.92} roughness={0.14} />
        </mesh>

        {/* Carbon-Fiber Front Splitter */}
        <mesh position={[0, 0.1, 2.65]}>
          <boxGeometry args={[2.26, 0.05, 0.45]} />
          <meshStandardMaterial color="#020617" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* Aerodynamic Cockpit & Curved Tinted Glass Canopy */}
        <mesh position={[0, 0.65, -0.2]} castShadow>
          <boxGeometry args={[1.65, 0.38, 2.3]} />
          <meshStandardMaterial
            color="#0284c7"
            roughness={0.05}
            metalness={0.9}
          />
        </mesh>

        {/* Rear Engine Cover & Slats */}
        <mesh position={[0, 0.48, -1.6]} rotation={[0.08, 0, 0]} castShadow>
          <boxGeometry args={[1.9, 0.24, 1.5]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.92} roughness={0.14} />
        </mesh>

        {/* Rear Aerodynamic GT Wing */}
        <mesh position={[0, 0.82, -2.25]} castShadow>
          <boxGeometry args={[2.2, 0.04, 0.42]} />
          <meshStandardMaterial color="#020617" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[-0.75, 0.65, -2.25]}>
          <boxGeometry args={[0.04, 0.3, 0.15]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
        <mesh position={[0.75, 0.65, -2.25]}>
          <boxGeometry args={[0.04, 0.3, 0.15]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>

        {/* Rear Carbon Aero Diffuser */}
        <mesh position={[0, 0.15, -2.32]}>
          <boxGeometry args={[2.0, 0.15, 0.3]} />
          <meshStandardMaterial color="#020617" roughness={0.5} />
        </mesh>

        {/* Brilliant LED Headlights */}
        <mesh position={[-0.82, 0.36, 2.58]}>
          <boxGeometry args={[0.36, 0.08, 0.08]} />
          <meshBasicMaterial color={vehicleState.isHeadlightsOn ? "#ffffff" : "#64748b"} />
        </mesh>
        <mesh position={[0.82, 0.36, 2.58]}>
          <boxGeometry args={[0.36, 0.08, 0.08]} />
          <meshBasicMaterial color={vehicleState.isHeadlightsOn ? "#ffffff" : "#64748b"} />
        </mesh>

        {/* Forward Headlight Volumetric Beams */}
        {vehicleState.isHeadlightsOn && (
          <>
            <spotLight
              position={[-0.82, 0.45, 2.6]}
              target-position={[-0.82, 0, 22]}
              angle={0.5}
              penumbra={0.4}
              intensity={5.0}
              distance={40}
              color="#ffffff"
              castShadow
            />
            <spotLight
              position={[0.82, 0.45, 2.6]}
              target-position={[0.82, 0, 22]}
              angle={0.5}
              penumbra={0.4}
              intensity={5.0}
              distance={40}
              color="#ffffff"
            />
          </>
        )}

        {/* Sleek Rear Continuous Red LED Neon Taillight Bar */}
        <mesh position={[0, 0.44, -2.36]}>
          <boxGeometry args={[2.05, 0.06, 0.06]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>

        {/* Quad Chrome Exhaust Tips */}
        {[-0.55, -0.35, 0.35, 0.55].map((x, i) => (
          <mesh key={i} position={[x, 0.18, -2.36]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.22, 16]} />
            <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.1} />
          </mesh>
        ))}

        {/* Cyan Neon Underglow */}
        <pointLight
          ref={underglowRef}
          position={[0, 0.1, 0]}
          color="#00d2ff"
          intensity={2.5}
          distance={8}
          decay={1.8}
        />

        {/* 4 Wheels (Gleaming Chrome Rims, Red Calipers, Black Tires) */}
        {/* Front Left */}
        <group
          position={[-1.15, 0.35, 1.5]}
          ref={el => { if (el) wheelsRef.current[0] = el; }}
        >
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.32, 24]} />
            <meshStandardMaterial color="#1e293b" roughness={0.7} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.33, 12]} />
            <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>

        {/* Front Right */}
        <group
          position={[1.15, 0.35, 1.5]}
          ref={el => { if (el) wheelsRef.current[1] = el; }}
        >
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.32, 24]} />
            <meshStandardMaterial color="#1e293b" roughness={0.7} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.33, 12]} />
            <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>

        {/* Rear Left */}
        <group
          position={[-1.15, 0.35, -1.5]}
          ref={el => { if (el) wheelsRef.current[2] = el; }}
        >
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.38, 24]} />
            <meshStandardMaterial color="#1e293b" roughness={0.7} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.27, 0.27, 0.39, 12]} />
            <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>

        {/* Rear Right */}
        <group
          position={[1.15, 0.35, -1.5]}
          ref={el => { if (el) wheelsRef.current[3] = el; }}
        >
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.38, 24]} />
            <meshStandardMaterial color="#1e293b" roughness={0.7} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.27, 0.27, 0.39, 12]} />
            <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          PERSONAL CHARACTER: UTKARSH ARORA
          Clear contrast, tailored charcoal suit, white shirt, spectacles
          ======================================================== */}
      {!isDrivingMode && (
        <group
          position={[2.4, 0, 0.4]}
          rotation={[0, -Math.PI / 6, 0]}
          onClick={onCharacterClick}
        >
          {/* Luminous Ground Aura Circle */}
          <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.2, 1.45, 32]} />
            <meshBasicMaterial color="#0284c7" transparent opacity={0.8} />
          </mesh>

          {/* Polished Formal Shoes */}
          <mesh position={[-0.18, 0.08, 0.02]} castShadow>
            <boxGeometry args={[0.16, 0.12, 0.32]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0.18, 0.08, 0.02]} castShadow>
            <boxGeometry args={[0.16, 0.12, 0.32]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>

          {/* Charcoal-Grey Formal Trousers */}
          <mesh position={[-0.18, 0.52, 0]} castShadow>
            <cylinderGeometry args={[0.11, 0.12, 0.78, 12]} />
            <meshStandardMaterial color="#334155" roughness={0.6} />
          </mesh>
          <mesh position={[0.18, 0.52, 0]} castShadow>
            <cylinderGeometry args={[0.11, 0.12, 0.78, 12]} />
            <meshStandardMaterial color="#334155" roughness={0.6} />
          </mesh>

          {/* Charcoal-Grey Suit Jacket */}
          <mesh position={[0, 1.25, 0]} castShadow>
            <boxGeometry args={[0.54, 0.68, 0.28]} />
            <meshStandardMaterial color="#334155" roughness={0.6} />
          </mesh>

          {/* Crisp White Shirt */}
          <mesh position={[0, 1.34, 0.13]}>
            <boxGeometry args={[0.2, 0.38, 0.04]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>

          {/* Dark Navy Silk Tie */}
          <mesh position={[0, 1.3, 0.14]}>
            <boxGeometry args={[0.06, 0.32, 0.03]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.3} />
          </mesh>

          {/* Lapels */}
          <mesh position={[-0.13, 1.34, 0.14]} rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.08, 0.4, 0.02]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
          <mesh position={[0.13, 1.34, 0.14]} rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.08, 0.4, 0.02]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>

          {/* Arms */}
          <mesh position={[-0.34, 1.18, 0]} rotation={[0, 0, 0.12]} castShadow>
            <cylinderGeometry args={[0.08, 0.09, 0.62, 12]} />
            <meshStandardMaterial color="#334155" roughness={0.6} />
          </mesh>
          <mesh position={[0.34, 1.18, 0]} rotation={[0, 0, -0.12]} castShadow>
            <cylinderGeometry args={[0.08, 0.09, 0.62, 12]} />
            <meshStandardMaterial color="#334155" roughness={0.6} />
          </mesh>

          {/* Hands */}
          <mesh position={[-0.38, 0.82, 0]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color="#d4a373" roughness={0.5} />
          </mesh>
          <mesh position={[0.38, 0.82, 0]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color="#d4a373" roughness={0.5} />
          </mesh>

          {/* Head & Neck */}
          <mesh position={[0, 1.66, 0]}>
            <cylinderGeometry args={[0.07, 0.08, 0.14, 12]} />
            <meshStandardMaterial color="#d4a373" roughness={0.5} />
          </mesh>
          <mesh position={[0, 1.82, 0]} castShadow>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color="#d4a373" roughness={0.5} />
          </mesh>

          {/* Hair */}
          <mesh position={[0, 1.9, -0.02]}>
            <sphereGeometry args={[0.145, 16, 12]} />
            <meshStandardMaterial color="#0f172a" roughness={0.8} />
          </mesh>

          {/* Black Eyeglasses */}
          <mesh position={[0, 1.84, 0.13]}>
            <boxGeometry args={[0.22, 0.05, 0.04]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* ========================================================
              LUMINOUS BIOMETRIC HOLOGRAM DISPLAY PEDESTAL
              Prominently displays Utkarsh's authentic photograph
              ======================================================== */}
          <group position={[1.5, 1.5, 0]}>
            {/* White Acrylic & Silver Frame */}
            <mesh castShadow>
              <boxGeometry args={[1.5, 1.85, 0.06]} />
              <meshStandardMaterial
                color="#ffffff"
                metalness={0.7}
                roughness={0.1}
              />
            </mesh>

            {/* Glowing Cyan Frame Bezel */}
            <mesh position={[0, 0, 0.035]}>
              <ringGeometry args={[0.7, 0.76, 32]} />
              <meshBasicMaterial color="#0284c7" />
            </mesh>

            {/* Authentic Reference Photograph */}
            <mesh position={[0, 0.12, 0.04]}>
              <planeGeometry args={[1.25, 1.25]} />
              <meshBasicMaterial map={userPhotoTexture} />
            </mesh>

            {/* Status Plate Under Photo */}
            <mesh position={[0, -0.65, 0.04]}>
              <planeGeometry args={[1.3, 0.25]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} />
            </mesh>

            {/* Floating Holographic Ring */}
            <group ref={hologramRingRef} position={[0, 0, 0.1]}>
              <mesh rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[0.92, 0.015, 8, 48]} />
                <meshBasicMaterial color="#0284c7" />
              </mesh>
            </group>

            {/* Glow Light */}
            <pointLight position={[0, 0, 0.5]} color="#bae6fd" intensity={2.0} distance={5} />
          </group>
        </group>
      )}
    </group>
  );
};
