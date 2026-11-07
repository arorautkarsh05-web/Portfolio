import React, { useMemo } from 'react';

export const RoadNetwork: React.FC = () => {
  // Generate palm trees along the boulevards
  const palmPositions = useMemo(() => {
    const list: [number, number, number][] = [];
    for (let z = -90; z <= 90; z += 18) {
      if (Math.abs(z) > 12) {
        list.push([-14, 0, z]);
        list.push([14, 0, z]);
        list.push([-70, 0, z]);
        list.push([70, 0, z]);
      }
    }
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

  // Modern street lamp coordinates
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
      {/* Expansive Metropolitan Ground: Crisp Modern Dubai Limestone & Granite Pavement */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[650, 650]} />
        <meshStandardMaterial
          color="#cbd5e1"
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Coastal Dubai Marina Waterfront (Northern Horizon Basin) */}
      <mesh position={[0, -0.2, -180]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[650, 160]} />
        <meshStandardMaterial
          color="#0284c7"
          roughness={0.15}
          metalness={0.8}
        />
      </mesh>
      {/* Marina Boardwalk Promenade */}
      <mesh position={[0, 0.08, -100]} receiveShadow>
        <boxGeometry args={[650, 0.25, 6]} />
        <meshStandardMaterial color="#d97706" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Central Grand Plaza Roundabout - Marble & Gold Rings */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[13, 64]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[12.4, 13, 64]} />
        <meshBasicMaterial color="#d97706" />
      </mesh>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.8, 5.2, 64]} />
        <meshBasicMaterial color="#0284c7" />
      </mesh>

      {/* Primary North-South Boulevard (Modern Smooth Asphalt) */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 240]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Primary East-West Boulevard (Modern Smooth Asphalt) */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[240, 18]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* District Ring Roads */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[52, 66, 64]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Crisp White & Gold Road Markings */}
      {[-80, -60, -40, -20, 20, 40, 60, 80].map((pos, idx) => (
        <React.Fragment key={idx}>
          {/* North-South Dash */}
          <mesh position={[0, 0.025, pos]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.35, 8]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
          {/* East-West Dash */}
          <mesh position={[pos, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[8, 0.35]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </React.Fragment>
      ))}

      {/* Sidewalk Pedestrian Curbs (Crisp Light Travertine) */}
      <mesh position={[-9.2, 0.1, 0]}>
        <boxGeometry args={[0.4, 0.2, 240]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
      </mesh>
      <mesh position={[9.2, 0.1, 0]}>
        <boxGeometry args={[0.4, 0.2, 240]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.1, -9.2]}>
        <boxGeometry args={[240, 0.2, 0.4]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.1, 9.2]}>
        <boxGeometry args={[240, 0.2, 0.4]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
      </mesh>

      {/* Modern Sleek Silver Streetlights */}
      {lampPositions.map((pos, idx) => (
        <group key={`lamp-${idx}`} position={pos}>
          {/* Mast */}
          <mesh position={[0, 2.8, 0]}>
            <cylinderGeometry args={[0.1, 0.14, 5.6, 8]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Overhanging Arm */}
          <mesh position={[pos[0] > 0 ? -0.5 : 0.5, 5.4, 0]} rotation={[0, 0, pos[0] > 0 ? 0.3 : -0.3]}>
            <cylinderGeometry args={[0.07, 0.07, 1.4, 8]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* LED Fixture */}
          <mesh position={[pos[0] > 0 ? -0.9 : 0.9, 5.3, 0]}>
            <boxGeometry args={[0.45, 0.12, 0.3]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <pointLight
            position={[pos[0] > 0 ? -0.9 : 0.9, 5.0, 0]}
            color="#fffbeb"
            intensity={0.8}
            distance={10}
            decay={1.8}
          />
        </group>
      ))}

      {/* Vibrant Lush Palm Trees */}
      {palmPositions.map((pos, idx) => (
        <group key={`palm-${idx}`} position={pos}>
          {/* Trunk */}
          <mesh position={[0, 2.4, 0]} rotation={[0.03, Math.sin(idx) * 0.5, 0.02]} castShadow>
            <cylinderGeometry args={[0.2, 0.35, 4.8, 7]} />
            <meshStandardMaterial color="#78350f" roughness={0.8} />
          </mesh>
          {/* Palm Fronds Canopy */}
          {[0, 60, 120, 180, 240, 300].map((deg, fIdx) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <mesh
                key={fIdx}
                position={[Math.cos(rad) * 0.9, 4.7, Math.sin(rad) * 0.9]}
                rotation={[0.35, rad, 0.5]}
                castShadow
              >
                <boxGeometry args={[2.0, 0.05, 0.55]} />
                <meshStandardMaterial color="#15803d" roughness={0.4} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
};
