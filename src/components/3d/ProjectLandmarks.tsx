import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { featuredProjects } from '../../data/projects';
import { ProjectLandmark } from '../../types';

interface ProjectLandmarksProps {
  onSelectProject: (project: ProjectLandmark) => void;
  activeProjectId?: string;
}

export const ProjectLandmarks: React.FC<ProjectLandmarksProps> = ({
  onSelectProject,
  activeProjectId
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
          1. BAYORA: AI SECURITY CITADEL [-45, 0, -35]
          Triangular fortress, cryptographic rings, crimson security accents
          ======================================================== */}
      <group
        position={[-45, 0, -35]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(getProject('bayora'));
        }}
      >
        {/* Base Foundation */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[14, 16, 3, 3]} />
          <meshStandardMaterial color="#0b0f19" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Central Monolith Spire */}
        <mesh position={[0, 14, 0]} castShadow>
          <cylinderGeometry args={[4, 9, 24, 3]} />
          <meshStandardMaterial
            color="#090d16"
            roughness={0.15}
            metalness={0.9}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Red Security Energy Core */}
        <mesh position={[0, 14, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 25, 8]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>

        {/* Floating Ed25519 Cryptographic Proof Rings */}
        <group ref={bayoraRingsRef} position={[0, 27, 0]}>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[5.2, 0.15, 16, 64]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <mesh rotation={[-Math.PI / 4, 0, 0]}>
            <torusGeometry args={[4.2, 0.12, 16, 64]} />
            <meshBasicMaterial color="#f87171" />
          </mesh>
        </group>

        {/* Base Glowing Ring */}
        <mesh position={[0, 3.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[11, 11.5, 32]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>

        {/* Project Beacon Light */}
        <pointLight position={[0, 28, 0]} color="#ef4444" intensity={2.5} distance={30} />
      </group>

      {/* ========================================================
          2. EUROGRIP USTAAD NETWORK: AUTOMOTIVE HUB [45, 0, -35]
          Dynamic sweeping wings, Fitment Passport motif, electric-cyan
          ======================================================== */}
      <group
        position={[45, 0, -35]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(getProject('ustaad'));
        }}
      >
        {/* Tiered Circular Foundation */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[15, 16, 2.4, 32]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Curved Architectural Aero Wing Pavilion */}
        <mesh position={[0, 10, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <boxGeometry args={[18, 16, 4]} />
          <meshStandardMaterial
            color="#0b1120"
            metalness={0.92}
            roughness={0.12}
          />
        </mesh>
        <mesh position={[0, 10, 0]} rotation={[0, -Math.PI / 4, 0]} castShadow>
          <boxGeometry args={[18, 16, 4]} />
          <meshStandardMaterial
            color="#0b1120"
            metalness={0.92}
            roughness={0.12}
          />
        </mesh>

        {/* Holographic Fitment Passport Hexagon Center */}
        <group ref={ustaadWheelRef} position={[0, 22, 0]}>
          <mesh>
            <torusGeometry args={[4.8, 0.16, 16, 6]} />
            <meshBasicMaterial color="#00d2ff" />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[2.2, 2.2, 0.4, 6]} />
            <meshStandardMaterial color="#0369a1" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        {/* Cyan Base Ring */}
        <mesh position={[0, 2.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[13.5, 14.2, 32]} />
          <meshBasicMaterial color="#00d2ff" />
        </mesh>

        <pointLight position={[0, 23, 0]} color="#00d2ff" intensity={2.5} distance={30} />
      </group>

      {/* ========================================================
          3. PAYPAL RESOLVE: FINTECH TOWER [-45, 0, 45]
          Dual-column financial tower (Node.js authoritative + FastAPI prototype)
          ======================================================== */}
      <group
        position={[-45, 0, 45]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(getProject('paypal-resolve'));
        }}
      >
        {/* Main Base */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[20, 2.4, 16]} />
          <meshStandardMaterial color="#0b1120" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Column 1: Authoritative Node.js Server (Taller, primary) */}
        <mesh position={[-4, 15, 0]} castShadow>
          <boxGeometry args={[6, 28, 8]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.92}
            roughness={0.15}
          />
        </mesh>

        {/* Column 2: FastAPI Prototype Microservice (Reference Column) */}
        <mesh position={[4, 12, 0]} castShadow>
          <boxGeometry args={[5, 22, 7]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.88}
            roughness={0.2}
          />
        </mesh>

        {/* Connecting FinTech Skybridge at mid-height */}
        <mesh position={[0, 16, 0]}>
          <boxGeometry args={[10, 2.2, 5]} />
          <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Floating Transaction Reconciliation Beam */}
        <group ref={paypalBeaconsRef} position={[0, 18, 0]}>
          <mesh>
            <sphereGeometry args={[1.6, 24, 24]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[3.2, 0.1, 16, 32]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>

        {/* Gold Base Glow */}
        <mesh position={[0, 2.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[18.5, 14.5]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>

        <pointLight position={[0, 22, 0]} color="#f59e0b" intensity={2.5} distance={30} />
      </group>

      {/* ========================================================
          4. WEBGUARD AI: SURVEILLANCE OBSERVATORY [45, 0, 45]
          Geodesic dome, autonomous browser radar dish, royal-purple
          ======================================================== */}
      <group
        position={[45, 0, 45]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(getProject('webguard-ai'));
        }}
      >
        {/* Foundation */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[14, 15, 2.4, 32]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Geodesic Surveillance Dome */}
        <mesh position={[0, 7.5, 0]} castShadow>
          <sphereGeometry args={[8.5, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#090d16"
            metalness={0.95}
            roughness={0.1}
            wireframe={false}
          />
        </mesh>

        {/* Rotating TinyFish Browser Agent Radar Mast */}
        <group ref={webguardDishRef} position={[0, 16.5, 0]}>
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0.2, 0.3, 4, 8]} />
            <meshStandardMaterial color="#475569" metalness={0.9} />
          </mesh>
          {/* Radar parabolic dish */}
          <mesh position={[0, 3.8, 1.2]} rotation={[Math.PI / 4, 0, 0]}>
            <cylinderGeometry args={[3.2, 0.4, 0.6, 16]} />
            <meshStandardMaterial color="#1e1b4b" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 3.8, 1.6]} rotation={[Math.PI / 4, 0, 0]}>
            <sphereGeometry args={[0.4, 12, 12]} />
            <meshBasicMaterial color="#8b5cf6" />
          </mesh>
        </group>

        {/* Royal Purple Base Ring */}
        <mesh position={[0, 2.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[12.5, 13.2, 32]} />
          <meshBasicMaterial color="#8b5cf6" />
        </mesh>

        <pointLight position={[0, 22, 0]} color="#8b5cf6" intensity={2.5} distance={30} />
      </group>
    </group>
  );
};
