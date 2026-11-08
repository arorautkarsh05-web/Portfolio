import React, { useMemo } from 'react';
import * as THREE from 'three';

export const RoadNetwork: React.FC = () => {
  // Ellipse geometric parameters
  const A = 48.0; // semi-major radius along X
  const B = 38.0; // semi-minor radius along Z
  const roadWidth = 12.0;
  const segments = 128;

  // 1. High-Precision Aerodynamic Elliptical Asphalt Ribbon
  const ellipseRoadGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    const halfW = roadWidth / 2;

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const xc = A * Math.sin(theta);
      const zc = B * Math.cos(theta);

      // Tangent vector is (A*cos(theta), -B*sin(theta))
      // Outward normal in XZ plane is (B*sin(theta), A*cos(theta))
      let nx = B * Math.sin(theta);
      let nz = A * Math.cos(theta);
      const len = Math.hypot(nx, nz) || 1;
      nx /= len;
      nz /= len;

      // Outer road vertex (height y = 0.02)
      positions.push(xc + nx * halfW, 0.02, zc + nz * halfW);
      uvs.push(1, i / segments);

      // Inner road vertex (height y = 0.02)
      positions.push(xc - nx * halfW, 0.02, zc - nz * halfW);
      uvs.push(0, i / segments);

      if (i < segments) {
        const p1 = i * 2;
        const p2 = i * 2 + 1;
        const p3 = (i + 1) * 2;
        const p4 = (i + 1) * 2 + 1;

        indices.push(p1, p2, p3);
        indices.push(p2, p4, p3);
      }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [A, B, roadWidth, segments]);

  // 2. Outer Electric Azure Glowing Curb Ribbon
  const outerCurbGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const indices: number[] = [];
    const curbW = 0.45;
    const halfW = roadWidth / 2;

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const xc = A * Math.sin(theta);
      const zc = B * Math.cos(theta);

      let nx = B * Math.sin(theta);
      let nz = A * Math.cos(theta);
      const len = Math.hypot(nx, nz) || 1;
      nx /= len;
      nz /= len;

      positions.push(xc + nx * (halfW + curbW), 0.05, zc + nz * (halfW + curbW));
      positions.push(xc + nx * halfW, 0.05, zc + nz * halfW);

      if (i < segments) {
        const p1 = i * 2;
        const p2 = i * 2 + 1;
        const p3 = (i + 1) * 2;
        const p4 = (i + 1) * 2 + 1;
        indices.push(p1, p2, p3);
        indices.push(p2, p4, p3);
      }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [A, B, roadWidth, segments]);

  // 3. Inner Sunset Gold Glowing Curb Ribbon
  const innerCurbGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const indices: number[] = [];
    const curbW = 0.45;
    const halfW = roadWidth / 2;

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const xc = A * Math.sin(theta);
      const zc = B * Math.cos(theta);

      let nx = B * Math.sin(theta);
      let nz = A * Math.cos(theta);
      const len = Math.hypot(nx, nz) || 1;
      nx /= len;
      nz /= len;

      positions.push(xc - nx * halfW, 0.05, zc - nz * halfW);
      positions.push(xc - nx * (halfW + curbW), 0.05, zc - nz * (halfW + curbW));

      if (i < segments) {
        const p1 = i * 2;
        const p2 = i * 2 + 1;
        const p3 = (i + 1) * 2;
        const p4 = (i + 1) * 2 + 1;
        indices.push(p1, p2, p3);
        indices.push(p2, p4, p3);
      }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [A, B, roadWidth, segments]);

  // 4. Dashed Yellow Highway Centerline Markers along the Ellipse
  const centerlineDashes = useMemo(() => {
    const list: Array<{ pos: [number, number, number]; rotY: number }> = [];
    const dashCount = 56;
    for (let i = 0; i < dashCount; i++) {
      const theta = (i / dashCount) * Math.PI * 2;
      const xc = A * Math.sin(theta);
      const zc = B * Math.cos(theta);

      // Tangent vector
      const tx = A * Math.cos(theta);
      const tz = -B * Math.sin(theta);
      const rotY = Math.atan2(tx, tz);

      list.push({
        pos: [xc, 0.035, zc],
        rotY
      });
    }
    return list;
  }, [A, B]);

  // 5. Palm Trees positioned along the inner and outer perimeter of the Ellipse
  const palmPositions = useMemo(() => {
    const list: [number, number, number][] = [];
    const count = 28;

    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const xc = A * Math.sin(theta);
      const zc = B * Math.cos(theta);

      let nx = B * Math.sin(theta);
      let nz = A * Math.cos(theta);
      const len = Math.hypot(nx, nz) || 1;
      nx /= len;
      nz /= len;

      // Outer palm row (8.5m outside road edge)
      list.push([xc + nx * (roadWidth / 2 + 8.5), 0, zc + nz * (roadWidth / 2 + 8.5)]);

      // Inner palm row (7.5m inside road edge)
      if (Math.hypot(xc, zc) > 20) {
        list.push([xc - nx * (roadWidth / 2 + 7.5), 0, zc - nz * (roadWidth / 2 + 7.5)]);
      }
    }

    // Palms along Central West Boulevard
    for (let x = -6; x >= -36; x -= 9) {
      list.push([x, 0, -8]);
      list.push([x, 0, 8]);
    }
    return list;
  }, [A, B, roadWidth]);

  // 6. Modern Sleek Silver Streetlights along the Outer Elliptical Curve
  const lampPositions = useMemo(() => {
    const list: Array<{ pos: [number, number, number]; rotY: number }> = [];
    const count = 22;

    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const xc = A * Math.sin(theta);
      const zc = B * Math.cos(theta);

      let nx = B * Math.sin(theta);
      let nz = A * Math.cos(theta);
      const len = Math.hypot(nx, nz) || 1;
      nx /= len;
      nz /= len;

      const px = xc + nx * (roadWidth / 2 + 2.2);
      const pz = zc + nz * (roadWidth / 2 + 2.2);

      // Facing inward toward the track
      const rotY = Math.atan2(-nx, -nz);

      list.push({ pos: [px, 0, pz], rotY });
    }
    return list;
  }, [A, B, roadWidth]);

  return (
    <group name="RoadNetwork">
      {/* Expansive Metropolitan Ground: Crisp Modern Dubai Limestone Pavement */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[650, 650]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Coastal Dubai Marina Waterfront (Northern Horizon Basin) */}
      <mesh position={[0, -0.2, -180]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[650, 160]} />
        <meshStandardMaterial color="#0284c7" roughness={0.15} metalness={0.8} />
      </mesh>
      {/* Marina Boardwalk Promenade */}
      <mesh position={[0, 0.08, -100]} receiveShadow>
        <boxGeometry args={[650, 0.25, 6]} />
        <meshStandardMaterial color="#d97706" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* ========================================================
          AERODYNAMIC GRAND ELLIPTICAL BOULEVARD TRACK
          High-performance PBR asphalt, glowing neon curbs & dashed highway
          ======================================================== */}
      <mesh geometry={ellipseRoadGeometry} receiveShadow>
        <meshStandardMaterial
          color="#1e293b" // Deep charcoal PBR asphalt
          roughness={0.35}
          metalness={0.35}
        />
      </mesh>

      {/* Outer Neon Azure Curb Rim */}
      <mesh geometry={outerCurbGeometry}>
        <meshBasicMaterial color="#0284c7" />
      </mesh>

      {/* Inner Neon Sunset Gold Curb Rim */}
      <mesh geometry={innerCurbGeometry}>
        <meshBasicMaterial color="#d97706" />
      </mesh>

      {/* Elliptical Centerline Dashes */}
      {centerlineDashes.map((dash, idx) => (
        <mesh
          key={`ellipse-dash-${idx}`}
          position={dash.pos}
          rotation={[-Math.PI / 2, 0, dash.rotY]}
        >
          <planeGeometry args={[0.35, 4.2]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
      ))}

      {/* ========================================================
          CENTRAL GRAND PLAZA & CONNECTING ARTERIAL BOULEVARDS
          ======================================================== */}
      {/* Central Grand Plaza Roundabout */}
      <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[14, 64]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[13.4, 14, 64]} />
        <meshBasicMaterial color="#d97706" />
      </mesh>
      <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.8, 5.2, 64]} />
        <meshBasicMaterial color="#0284c7" />
      </mesh>

      {/* Central West Connector Boulevard (Car takes this out to the Ellipse!) */}
      <mesh position={[-24, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[48, 12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.35} />
      </mesh>
      {/* Central West Dashes */}
      {[-8, -16, -24, -32, -40].map((x, idx) => (
        <mesh key={`west-dash-${idx}`} position={[x, 0.035, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.35, 4.5]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
      ))}

      {/* Central North Connector Boulevard (Towards Tech Tower apex) */}
      <mesh position={[0, 0.02, -19]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 38]} />
        <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.35} />
      </mesh>
      {/* Central North Dashes */}
      {[-8, -16, -24, -32].map((z, idx) => (
        <mesh key={`north-dash-${idx}`} position={[0, 0.035, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.35, 4.5]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
      ))}

      {/* Central East Connector Boulevard */}
      <mesh position={[24, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[48, 12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.35} />
      </mesh>

      {/* Central South Connector Boulevard */}
      <mesh position={[0, 0.02, 19]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 38]} />
        <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.35} />
      </mesh>

      {/* ========================================================
          PALM TREES & ARCHITECTURAL STREETLIGHTS
          ======================================================== */}
      {/* Modern Sleek Silver Streetlights */}
      {lampPositions.map((lamp, idx) => (
        <group key={`lamp-${idx}`} position={lamp.pos} rotation={[0, lamp.rotY, 0]}>
          {/* Mast */}
          <mesh position={[0, 2.8, 0]}>
            <cylinderGeometry args={[0.1, 0.14, 5.6, 8]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Overhanging Arm pointing toward the track */}
          <mesh position={[0, 5.4, 0.5]} rotation={[0.3, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 1.4, 8]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* LED Fixture */}
          <mesh position={[0, 5.3, 0.9]}>
            <boxGeometry args={[0.3, 0.12, 0.45]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <pointLight
            position={[0, 5.0, 0.9]}
            color="#fffbeb"
            intensity={0.7}
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
