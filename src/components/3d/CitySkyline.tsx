import React, { useMemo } from 'react';

interface BuildingSpec {
  position: [number, number, number];
  size: [number, number, number];
  glassColor: string;
  hasSpire?: boolean;
  accentStrip?: string;
  rotationY?: number;
  type: 'tower' | 'tapered' | 'stepped' | 'sail';
}

export const CitySkyline: React.FC = () => {
  const buildings = useMemo<BuildingSpec[]>(() => {
    const list: BuildingSpec[] = [];

    // Dubai Luxury Glass Towers (Reflective Silvers, Azure Glass, Champagne Gold, White Frameworks)
    const configs: Array<{ x: number; z: number; height: number; type: BuildingSpec['type']; color: string; accent: string }> = [
      // North-East Quadrant
      { x: 30, z: -75, height: 60, type: 'sail', color: '#93c5fd', accent: '#0284c7' },
      { x: 50, z: -70, height: 80, type: 'stepped', color: '#e2e8f0', accent: '#d97706' },
      { x: 75, z: -55, height: 65, type: 'tapered', color: '#bae6fd', accent: '#3b82f6' },
      { x: 70, z: -80, height: 90, type: 'tower', color: '#cbd5e1', accent: '#0ea5e9' },

      // North-West Quadrant
      { x: -30, z: -75, height: 70, type: 'tapered', color: '#e2e8f0', accent: '#8b5cf6' },
      { x: -55, z: -70, height: 85, type: 'tower', color: '#bae6fd', accent: '#0284c7' },
      { x: -75, z: -55, height: 55, type: 'sail', color: '#fef08a', accent: '#d97706' },
      { x: -70, z: -80, height: 95, type: 'stepped', color: '#cbd5e1', accent: '#3b82f6' },

      // South-East Quadrant
      { x: 30, z: 75, height: 55, type: 'stepped', color: '#bae6fd', accent: '#d97706' },
      { x: 55, z: 70, height: 75, type: 'sail', color: '#e2e8f0', accent: '#0ea5e9' },
      { x: 75, z: 55, height: 65, type: 'tower', color: '#93c5fd', accent: '#8b5cf6' },
      { x: 70, z: 80, height: 88, type: 'tapered', color: '#cbd5e1', accent: '#0284c7' },

      // South-West Quadrant
      { x: -30, z: 75, height: 62, type: 'tower', color: '#cbd5e1', accent: '#0284c7' },
      { x: -55, z: 70, height: 72, type: 'tapered', color: '#e2e8f0', accent: '#d97706' },
      { x: -75, z: 55, height: 92, type: 'stepped', color: '#bae6fd', accent: '#8b5cf6' },
      { x: -70, z: 80, height: 82, type: 'sail', color: '#93c5fd', accent: '#0ea5e9' },

      // Outer Perimeter Skyscraper Ring
      { x: 95, z: 0, height: 100, type: 'stepped', color: '#e2e8f0', accent: '#0284c7' },
      { x: -95, z: 0, height: 105, type: 'stepped', color: '#cbd5e1', accent: '#8b5cf6' },
      { x: 0, z: -95, height: 115, type: 'tapered', color: '#bae6fd', accent: '#0ea5e9' },
      { x: 0, z: 95, height: 95, type: 'sail', color: '#e2e8f0', accent: '#d97706' },
      { x: 95, z: 95, height: 85, type: 'tower', color: '#93c5fd', accent: '#0284c7' },
      { x: -95, z: 95, height: 90, type: 'tower', color: '#e2e8f0', accent: '#8b5cf6' },
      { x: 95, z: -95, height: 95, type: 'tower', color: '#cbd5e1', accent: '#d97706' },
      { x: -95, z: -95, height: 98, type: 'tower', color: '#bae6fd', accent: '#0284c7' }
    ];

    configs.forEach(cfg => {
      list.push({
        position: [cfg.x, cfg.height / 2, cfg.z],
        size: [11 + (cfg.height % 6), cfg.height, 11 + (cfg.height % 5)],
        glassColor: cfg.color,
        hasSpire: cfg.height > 65,
        accentStrip: cfg.accent,
        rotationY: (cfg.x * cfg.z) % 1.5,
        type: cfg.type
      });
    });

    return list;
  }, []);

  return (
    <group name="CitySkyline">
      {buildings.map((b, idx) => (
        <group key={`bldg-${idx}`} position={b.position} rotation={[0, b.rotationY || 0, 0]}>
          {/* Main Tower Body - Reflective Crystalline Glass */}
          <mesh castShadow receiveShadow>
            {b.type === 'tapered' ? (
              <cylinderGeometry args={[b.size[0] * 0.35, b.size[0] * 0.5, b.size[1], 8]} />
            ) : b.type === 'sail' ? (
              <cylinderGeometry args={[b.size[0] * 0.2, b.size[0] * 0.6, b.size[1], 4]} />
            ) : (
              <boxGeometry args={[b.size[0], b.size[1], b.size[2]]} />
            )}
            <meshStandardMaterial
              color={b.glassColor}
              roughness={0.1}
              metalness={0.7}
              envMapIntensity={2.0}
            />
          </mesh>

          {/* Stepped Crown Tier */}
          {b.type === 'stepped' && (
            <mesh position={[0, b.size[1] / 2 + 5, 0]} castShadow>
              <boxGeometry args={[b.size[0] * 0.65, 10, b.size[2] * 0.65]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.8} roughness={0.2} />
            </mesh>
          )}

          {/* Golden / Cyan Architectural Neon Accent Strips */}
          {b.accentStrip && (
            <>
              <mesh position={[b.size[0] / 2 + 0.05, 0, 0]}>
                <boxGeometry args={[0.1, b.size[1] * 0.95, 0.5]} />
                <meshBasicMaterial color={b.accentStrip} />
              </mesh>
              <mesh position={[-b.size[0] / 2 - 0.05, 0, 0]}>
                <boxGeometry args={[0.1, b.size[1] * 0.95, 0.5]} />
                <meshBasicMaterial color={b.accentStrip} />
              </mesh>
            </>
          )}

          {/* Rooftop Antenna Spire */}
          {b.hasSpire && (
            <group position={[0, b.size[1] / 2 + (b.type === 'stepped' ? 10 : 0), 0]}>
              <mesh position={[0, 4.5, 0]}>
                <cylinderGeometry args={[0.1, 0.3, 9, 8]} />
                <meshStandardMaterial color="#ffffff" metalness={0.95} />
              </mesh>
              <mesh position={[0, 9.2, 0]}>
                <sphereGeometry args={[0.3, 12, 12]} />
                <meshBasicMaterial color="#ef4444" />
              </mesh>
            </group>
          )}
        </group>
      ))}

      {/* Modern Skybridge Connecting Two Eastern Towers */}
      <mesh position={[50, 42, -70]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[26, 4, 3.5]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.7} />
      </mesh>
      <mesh position={[50, 42, -70]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[26.2, 0.25, 3.7]} />
        <meshBasicMaterial color="#0284c7" />
      </mesh>
    </group>
  );
};
