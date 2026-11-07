import React, { useMemo } from 'react';
import * as THREE from 'three';

export const RoadNetwork: React.FC = () => {
  // Generate palm trees along the boulevards
  const palmPositions = useMemo(() => {
    const list: [number, number, number][] = [];
    // North-South avenue medians and curbs
    for (let z = -90; z <= 90; z += 18) {
      if (Math.abs(z) > 12) {
        list.push([-14, 0, z]);
        list.push([14, 0, z]);
        list.push([-70, 0, z]);
        list.push([70, 0, z]);
      }
    }
    // East-West avenue medians and curbs
    for (let x = -90; x <= 90; x += 18) {
      if (Math.abs(x) > 12) {
        list.push([x, 0, -14]);
        list.push([x, 0, 14]);
        list.push([x, 0, -70]);
        list.push([x, 0, 70]);
      }
    }
    return list;
  }, []);

  // Street lamp coordinates
  const lampPositions = useMemo(() => {
    const list: [number, number, number][] = [];
    for (let z = -80; z <= 80; z += 24) {
      if (Math.abs(z) > 10) {
        list.push([-11, 0, z]);
        list.push([11, 0, z]);
      }
    }
    for (let x = -80; x <= 80; x += 24) {
      if (Math.abs(x) > 10) {
        list.push([x, 0, -11]);
        list.push([x, 0, 11]);
      }
    }
    return list;
  }, []);

  return (
    <group name="RoadNetwork">
      {/* Ground Water / Coastal Waterfront Reflection Plane (Dubai Marina feel) */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <planeGeometry args={[320, 320]} />
        <meshStandardMaterial
          color="#06060c"
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Main Metropolitan Ground & District Tiles */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[260, 260]} />
        <meshStandardMaterial
          color="#0e0e17"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Central Plaza Roundabout - Marble & Bronze concentric rings */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[12, 64]} />
        <meshStandardMaterial
          color="#151522"
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[11.6, 12, 64]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.8, 5.0, 64]} />
        <meshBasicMaterial color="#00d2ff" />
      </mesh>

      {/* Primary North-South Boulevard (Asphalt) */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 240]} />
        <meshStandardMaterial
          color="#12121a"
          roughness={0.5}
          metalness={0.35}
        />
      </mesh>

      {/* Primary East-West Boulevard (Asphalt) */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[240, 18]} />
        <meshStandardMaterial
          color="#12121a"
          roughness={0.5}
          metalness={0.35}
        />
      </mesh>

      {/* Secondary Ring Roads for Districts */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[52, 66, 64]} />
        <meshStandardMaterial
          color="#12121a"
          roughness={0.5}
          metalness={0.35}
        />
      </mesh>

      {/* Dashed Golden & Cyan Road Lane Dividers */}
      {[-80, -60, -40, -20, 20, 40, 60, 80].map((pos, idx) => (
        <React.Fragment key={idx}>
          {/* North-South Dash */}
          <mesh position={[0, 0.025, pos]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.3, 8]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
          {/* East-West Dash */}
          <mesh position={[pos, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[8, 0.3]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
        </React.Fragment>
      ))}

      {/* Modern Curved Streetlights */}
      {lampPositions.map((pos, idx) => (
        <group key={`lamp-${idx}`} position={pos}>
          {/* Mast */}
          <mesh position={[0, 2.5, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 5, 8]} />
            <meshStandardMaterial color="#2d3748" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Overhanging Arm */}
          <mesh position={[pos[0] > 0 ? -0.4 : 0.4, 4.9, 0]} rotation={[0, 0, pos[0] > 0 ? 0.3 : -0.3]}>
            <cylinderGeometry args={[0.06, 0.06, 1.2, 8]} />
            <meshStandardMaterial color="#2d3748" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* LED Fixture */}
          <mesh position={[pos[0] > 0 ? -0.8 : 0.8, 4.8, 0]}>
            <boxGeometry args={[0.4, 0.1, 0.25]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          {/* Soft Ground Warm Glow */}
          <pointLight
            position={[pos[0] > 0 ? -0.8 : 0.8, 4.5, 0]}
            color="#ffedd5"
            intensity={0.4}
            distance={8}
            decay={2}
          />
        </group>
      ))}

      {/* Dubai-Inspired Palm Trees */}
      {palmPositions.map((pos, idx) => (
        <group key={`palm-${idx}`} position={pos}>
          {/* Trunk */}
          <mesh position={[0, 2.2, 0]} rotation={[0.04, Math.sin(idx) * 0.5, 0.02]}>
            <cylinderGeometry args={[0.18, 0.32, 4.4, 7]} />
            <meshStandardMaterial color="#422006" roughness={0.9} />
          </mesh>
          {/* Palm Fronds Canopy */}
          {[0, 60, 120, 180, 240, 300].map((deg, fIdx) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <mesh
                key={fIdx}
                position={[Math.cos(rad) * 0.8, 4.3, Math.sin(rad) * 0.8]}
                rotation={[0.4, rad, 0.5]}
              >
                <boxGeometry args={[1.8, 0.04, 0.5]} />
                <meshStandardMaterial color="#14532d" roughness={0.6} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
};
