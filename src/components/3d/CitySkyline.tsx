import React, { useMemo } from 'react';
import * as THREE from 'three';

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

    // Outer skyline ring (Dubai-like futuristic towers)
    const configs: Array<{ x: number; z: number; height: number; type: BuildingSpec['type']; color: string; accent: string }> = [
      // Far North-East Quadrant
      { x: 30, z: -75, height: 55, type: 'sail', color: '#0f172a', accent: '#00d2ff' },
      { x: 50, z: -70, height: 75, type: 'stepped', color: '#090d16', accent: '#8b5cf6' },
      { x: 75, z: -55, height: 60, type: 'tapered', color: '#131b2e', accent: '#f59e0b' },
      { x: 70, z: -80, height: 85, type: 'tower', color: '#0b1120', accent: '#00d2ff' },

      // Far North-West Quadrant
      { x: -30, z: -75, height: 65, type: 'tapered', color: '#090d16', accent: '#8b5cf6' },
      { x: -55, z: -70, height: 80, type: 'tower', color: '#0f172a', accent: '#00d2ff' },
      { x: -75, z: -55, height: 50, type: 'sail', color: '#131b2e', accent: '#f59e0b' },
      { x: -70, z: -80, height: 90, type: 'stepped', color: '#0b1120', accent: '#8b5cf6' },

      // Far South-East Quadrant
      { x: 30, z: 75, height: 50, type: 'stepped', color: '#131b2e', accent: '#f59e0b' },
      { x: 55, z: 70, height: 70, type: 'sail', color: '#0f172a', accent: '#00d2ff' },
      { x: 75, z: 55, height: 62, type: 'tower', color: '#0b1120', accent: '#8b5cf6' },
      { x: 70, z: 80, height: 82, type: 'tapered', color: '#090d16', accent: '#00d2ff' },

      // Far South-West Quadrant
      { x: -30, z: 75, height: 58, type: 'tower', color: '#0b1120', accent: '#00d2ff' },
      { x: -55, z: 70, height: 68, type: 'tapered', color: '#131b2e', accent: '#f59e0b' },
      { x: -75, z: 55, height: 88, type: 'stepped', color: '#090d16', accent: '#8b5cf6' },
      { x: -70, z: 80, height: 78, type: 'sail', color: '#0f172a', accent: '#00d2ff' },

      // Outer Perimeter Skyscraper Ring (Distant background depth)
      { x: 95, z: 0, height: 95, type: 'stepped', color: '#090d16', accent: '#00d2ff' },
      { x: -95, z: 0, height: 100, type: 'stepped', color: '#090d16', accent: '#8b5cf6' },
      { x: 0, z: -95, height: 110, type: 'tapered', color: '#090d16', accent: '#00d2ff' },
      { x: 0, z: 95, height: 90, type: 'sail', color: '#090d16', accent: '#f59e0b' },
      { x: 95, z: 95, height: 80, type: 'tower', color: '#090d16', accent: '#00d2ff' },
      { x: -95, z: 95, height: 85, type: 'tower', color: '#090d16', accent: '#8b5cf6' },
      { x: 95, z: -95, height: 90, type: 'tower', color: '#090d16', accent: '#f59e0b' },
      { x: -95, z: -95, height: 92, type: 'tower', color: '#090d16', accent: '#00d2ff' }
    ];

    configs.forEach(cfg => {
      list.push({
        position: [cfg.x, cfg.height / 2, cfg.z],
        size: [10 + (cfg.height % 6), cfg.height, 10 + (cfg.height % 5)],
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
          {/* Main Tower Body */}
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
              roughness={0.15}
              metalness={0.88}
              envMapIntensity={1.2}
            />
          </mesh>

          {/* Stepped crown tier for taller towers */}
          {b.type === 'stepped' && (
            <mesh position={[0, b.size[1] / 2 + 5, 0]}>
              <boxGeometry args={[b.size[0] * 0.65, 10, b.size[2] * 0.65]} />
              <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
            </mesh>
          )}

          {/* Vertical Architectural Neon Trim (Dubai Luxury lighting accent) */}
          {b.accentStrip && (
            <>
              <mesh position={[b.size[0] / 2 + 0.05, 0, 0]}>
                <boxGeometry args={[0.08, b.size[1] * 0.95, 0.4]} />
                <meshBasicMaterial color={b.accentStrip} />
              </mesh>
              <mesh position={[-b.size[0] / 2 - 0.05, 0, 0]}>
                <boxGeometry args={[0.08, b.size[1] * 0.95, 0.4]} />
                <meshBasicMaterial color={b.accentStrip} />
              </mesh>
            </>
          )}

          {/* Rooftop Antenna Spire with Beacon Light */}
          {b.hasSpire && (
            <group position={[0, b.size[1] / 2 + (b.type === 'stepped' ? 10 : 0), 0]}>
              <mesh position={[0, 4, 0]}>
                <cylinderGeometry args={[0.08, 0.25, 8, 8]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.95} />
              </mesh>
              <mesh position={[0, 8.2, 0]}>
                <sphereGeometry args={[0.25, 12, 12]} />
                <meshBasicMaterial color="#ef4444" />
              </mesh>
            </group>
          )}
        </group>
      ))}

      {/* Modern Skybridge Connecting Two Eastern Towers */}
      <mesh position={[50, 42, -70]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[26, 4, 3.5]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[50, 42, -70]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[26.2, 0.2, 3.7]} />
        <meshBasicMaterial color="#00d2ff" />
      </mesh>
    </group>
  );
};
