import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { featuredProjects } from '../../data/projects';
import { ProjectLandmark } from '../../types';

interface ProjectLandmarksProps {
  onSelectProject: (project: ProjectLandmark) => void;
  activeProjectId?: string;
}

export const ProjectLandmarks: React.FC<ProjectLandmarksProps> = ({
  onSelectProject,
}) => {
  const bayoraRingsRef = useRef<THREE.Group>(null);
  const ustaadWheelRef = useRef<THREE.Group>(null);
  const paypalBeaconsRef = useRef<THREE.Group>(null);
  const webguardDishRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Bayora cryptographic rings rotation
    if (bayoraRingsRef.current) {
      bayoraRingsRef.current.rotation.y += delta * 0.9;
      bayoraRingsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }

    // Ustaad dynamic mobility wheel rotation
    if (ustaadWheelRef.current) {
      ustaadWheelRef.current.rotation.z += delta * 0.7;
    }

    // PayPal Resolve reconciliation beam oscillation
    if (paypalBeaconsRef.current) {
      paypalBeaconsRef.current.position.y = 18 + Math.sin(state.clock.elapsedTime * 2.0) * 1.5;
    }

    // WebGuard AI radar surveillance sweep
    if (webguardDishRef.current) {
      webguardDishRef.current.rotation.y += delta * 1.4;
    }
  });

  const getProject = (id: string) => featuredProjects.find(p => p.id === id)!;

  return (
    <group name="ProjectLandmarks">
      {/* ========================================================
          1. BAYORA: AI SECURITY CITADEL [-58, 0, -66]
          Triangular cybersecurity fortress with black titanium blast-shields,
          glowing red cryptographic hash chains & Ed25519 proof rings
          ======================================================== */}
      <group
        position={[-58, 0, -66]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(getProject('bayora'));
        }}
      >
        {/* Base Foundation (Bright Travertine Stone) */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[14, 16, 3, 3]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.6} />
        </mesh>

        {/* Outer Titanium Security Bastions (3 corners) */}
        {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, i) => (
          <mesh
            key={`bayora-bastion-${i}`}
            position={[Math.cos(angle) * 12, 4, Math.sin(angle) * 12]}
            castShadow
          >
            <boxGeometry args={[3.5, 6, 3.5]} />
            <meshStandardMaterial color="#09090b" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}

        {/* Central Monolith Spire - Gleaming White & Glass */}
        <mesh position={[0, 16, 0]} castShadow>
          <cylinderGeometry args={[4, 9, 28, 3]} />
          <meshStandardMaterial
            color="#f8fafc"
            roughness={0.1}
            metalness={0.8}
            envMapIntensity={2.0}
          />
        </mesh>

        {/* Vibrant Crimson Security Energy Core */}
        <mesh position={[0, 16, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 29, 8]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>

        {/* Floating Ed25519 Cryptographic Proof Rings */}
        <group ref={bayoraRingsRef} position={[0, 31, 0]}>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[5.2, 0.18, 16, 64]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <mesh rotation={[-Math.PI / 4, 0, 0]}>
            <torusGeometry args={[4.2, 0.15, 16, 64]} />
            <meshBasicMaterial color="#f87171" />
          </mesh>
        </group>

        {/* Radiant Red Base Ring */}
        <mesh position={[0, 3.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[11, 11.6, 32]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>

        {/* Architectural Landmark Marquee */}
        <Float speed={2} rotationIntensity={0.06} floatIntensity={0.15}>
          <group position={[0, 7.5, 11.5]}>
            <mesh>
              <boxGeometry args={[7.2, 1.3, 0.15]} />
              <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.09]}>
              <planeGeometry args={[7.0, 1.1]} />
              <meshBasicMaterial color="#ef4444" transparent opacity={0.3} />
            </mesh>
            <mesh position={[0, 0.6, 0.1]}>
              <boxGeometry args={[7.1, 0.04, 0.02]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          </group>
        </Float>

        <pointLight position={[0, 32, 0]} color="#ef4444" intensity={4.0} distance={40} />
      </group>

      {/* ========================================================
          2. EUROGRIP USTAAD NETWORK [58, 0, -66]
          Dynamic mobility pavilion with gold & carbon tire-tread kinetic rings,
          elevated vehicle dyno platform, and illuminated Ustaad branding
          ======================================================== */}
      <group
        position={[58, 0, -66]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(getProject('ustaad'));
        }}
      >
        {/* Octagonal Foundation (Travertine & Gold) */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[14, 16, 3, 8]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.6} />
        </mesh>

        {/* Automotive Dyno Stage */}
        <mesh position={[0, 3.1, 0]} receiveShadow>
          <cylinderGeometry args={[10, 10.5, 0.4, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Central Kinetic Wheel Tower */}
        <group ref={ustaadWheelRef} position={[0, 15, 0]}>
          {/* Outer Tire Tread Carbon Ring */}
          <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[8.5, 1.2, 16, 32]} />
            <meshStandardMaterial color="#09090b" roughness={0.4} metalness={0.7} />
          </mesh>
          {/* Gold Alloy Wheel Rim */}
          <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[7.2, 0.35, 16, 32]} />
            <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* 6 Wheel Spokes */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <mesh key={`spoke-${i}`} rotation={[0, 0, (i * Math.PI) / 3]}>
              <boxGeometry args={[0.5, 14.5, 0.4]} />
              <meshStandardMaterial color="#d97706" metalness={0.9} />
            </mesh>
          ))}
          {/* Hub Core */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[2.5, 2.5, 1.5, 16]} />
            <meshStandardMaterial color="#0284c7" metalness={0.9} />
          </mesh>
        </group>

        {/* Radiant Cyan Base Ring */}
        <mesh position={[0, 3.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[9.5, 10, 32]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>

        {/* Architectural Landmark Marquee */}
        <Float speed={2} rotationIntensity={0.06} floatIntensity={0.15}>
          <group position={[0, 7.5, 11.5]}>
            <mesh>
              <boxGeometry args={[7.5, 1.3, 0.15]} />
              <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.09]}>
              <planeGeometry args={[7.3, 1.1]} />
              <meshBasicMaterial color="#d97706" transparent opacity={0.3} />
            </mesh>
            <mesh position={[0, 0.6, 0.1]}>
              <boxGeometry args={[7.4, 0.04, 0.02]} />
              <meshBasicMaterial color="#fbbf24" />
            </mesh>
          </group>
        </Float>

        <pointLight position={[0, 15, 0]} color="#d97706" intensity={4.0} distance={35} />
      </group>

      {/* ========================================================
          3. PAYPAL RESOLVE [22, 0, -12]
          Twin curved crystalline glass towers with an illuminated
          skybridge & golden transaction light streams
          ======================================================== */}
      <group
        position={[22, 0, -12]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(getProject('paypal-resolve'));
        }}
      >
        {/* Base Foundation (Bright Travertine Stone) */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[26, 3, 20]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.6} />
        </mesh>

        {/* Left Curved Glass Tower (Reconciliation Engine) */}
        <mesh position={[-6.5, 14, 0]} castShadow>
          <boxGeometry args={[6.5, 24, 9]} />
          <meshStandardMaterial
            color="#f8fafc"
            roughness={0.1}
            metalness={0.85}
            envMapIntensity={2.0}
          />
        </mesh>

        {/* Right Curved Glass Tower (Dispute Resolution Engine) */}
        <mesh position={[6.5, 14, 0]} castShadow>
          <boxGeometry args={[6.5, 24, 9]} />
          <meshStandardMaterial
            color="#f8fafc"
            roughness={0.1}
            metalness={0.85}
            envMapIntensity={2.0}
          />
        </mesh>

        {/* Illuminated Connecting Skybridge (Harmonization / Settlement) */}
        <mesh position={[0, 18, 0]} castShadow>
          <boxGeometry args={[8.5, 3.5, 5]} />
          <meshStandardMaterial
            color="#0284c7"
            metalness={0.9}
            roughness={0.05}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Flowing Transaction Beacons in Skybridge */}
        <group ref={paypalBeaconsRef}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1.2, 16, 16]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>

        {/* Emerald & Cyan Vertical Accent Strips */}
        <mesh position={[-9.8, 14, 4.55]}>
          <boxGeometry args={[0.3, 24, 0.05]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        <mesh position={[9.8, 14, 4.55]}>
          <boxGeometry args={[0.3, 24, 0.05]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>

        {/* Architectural Landmark Marquee */}
        <Float speed={2} rotationIntensity={0.06} floatIntensity={0.15}>
          <group position={[0, 7.5, 11]}>
            <mesh>
              <boxGeometry args={[7.8, 1.3, 0.15]} />
              <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.09]}>
              <planeGeometry args={[7.6, 1.1]} />
              <meshBasicMaterial color="#10b981" transparent opacity={0.3} />
            </mesh>
            <mesh position={[0, 0.6, 0.1]}>
              <boxGeometry args={[7.7, 0.04, 0.02]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
          </group>
        </Float>

        <pointLight position={[0, 18, 0]} color="#fbbf24" intensity={3.8} distance={35} />
      </group>

      {/* ========================================================
          4. WEBGUARD AI [82, 0, 6]
          Cylindrical observatory tower with sweeping radar telemetry dish,
          pulsing green network health rings & WebGuard title beacon
          ======================================================== */}
      <group
        position={[82, 0, 6]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(getProject('webguard-ai'));
        }}
      >
        {/* Base Foundation (Bright Travertine Stone) */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[14, 16, 3, 16]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.6} />
        </mesh>

        {/* Observatory Main Tower Body */}
        <mesh position={[0, 13, 0]} castShadow>
          <cylinderGeometry args={[8, 9.5, 21, 16]} />
          <meshStandardMaterial
            color="#f8fafc"
            roughness={0.1}
            metalness={0.8}
            envMapIntensity={2.0}
          />
        </mesh>

        {/* Rotating Telemetry Radar Dish Array */}
        <group ref={webguardDishRef} position={[0, 25, 0]}>
          {/* Main Parabolic Dish */}
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <cylinderGeometry args={[4.8, 0.8, 1.8, 16, 1, true]} />
            <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.1} side={THREE.DoubleSide} />
          </mesh>
          {/* Dish Sub-reflector Feed */}
          <mesh position={[0, 1.8, 1.8]}>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
          {/* Radar Axis */}
          <mesh>
            <cylinderGeometry args={[0.4, 0.4, 4, 8]} />
            <meshStandardMaterial color="#09090b" metalness={0.9} />
          </mesh>
        </group>

        {/* Pulsing Green/Cyan System Health Ring */}
        <mesh position={[0, 3.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[11, 11.6, 32]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>

        {/* Architectural Landmark Marquee */}
        <Float speed={2} rotationIntensity={0.06} floatIntensity={0.15}>
          <group position={[0, 7.5, 11.5]}>
            <mesh>
              <boxGeometry args={[7.5, 1.3, 0.15]} />
              <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.09]}>
              <planeGeometry args={[7.3, 1.1]} />
              <meshBasicMaterial color="#10b981" transparent opacity={0.3} />
            </mesh>
            <mesh position={[0, 0.6, 0.1]}>
              <boxGeometry args={[7.4, 0.04, 0.02]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
          </group>
        </Float>

        <pointLight position={[0, 26, 0]} color="#10b981" intensity={4.0} distance={35} />
      </group>
    </group>
  );
};
