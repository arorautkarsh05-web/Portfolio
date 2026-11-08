import React, { useMemo } from 'react';
import * as THREE from 'three';
import { ELLIPSE_CONFIG } from '../../data/ellipseConfig';

export const RoadNetwork: React.FC = () => {
  const { radiusX: A, radiusZ: B, roadWidth, segments, curbWidth } = ELLIPSE_CONFIG;

  // 1. High-Precision Aerodynamic 3D Elliptical Asphalt Ribbon
  const ellipseRoadGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    const halfW = roadWidth / 2;

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const xc = A * Math.cos(theta);
      const zc = B * Math.sin(theta);

      // Outward normal in XZ plane
      let nx = B * Math.cos(theta);
      let nz = A * Math.sin(theta);
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
    const halfW = roadWidth / 2;

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const xc = A * Math.cos(theta);
      const zc = B * Math.sin(theta);

      let nx = B * Math.cos(theta);
      let nz = A * Math.sin(theta);
      const len = Math.hypot(nx, nz) || 1;
      nx /= len;
      nz /= len;

      positions.push(xc + nx * (halfW + curbWidth), 0.06, zc + nz * (halfW + curbWidth));
      positions.push(xc + nx * halfW, 0.06, zc + nz * halfW);

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
  }, [A, B, roadWidth, segments, curbWidth]);

  // 3. Inner Sunset Gold Glowing Curb Ribbon
  const innerCurbGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const indices: number[] = [];
    const halfW = roadWidth / 2;

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const xc = A * Math.cos(theta);
      const zc = B * Math.sin(theta);

      let nx = B * Math.cos(theta);
      let nz = A * Math.sin(theta);
      const len = Math.hypot(nx, nz) || 1;
      nx /= len;
      nz /= len;

      positions.push(xc - nx * halfW, 0.06, zc - nz * halfW);
      positions.push(xc - nx * (halfW + curbWidth), 0.06, zc - nz * (halfW + curbWidth));

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
  }, [A, B, roadWidth, segments, curbWidth]);

  // 4. Centerline Highway Dashes along the Ellipse
  const centerlineDashes = useMemo(() => {
    const list: Array<{ pos: [number, number, number]; rotY: number }> = [];
    const dashCount = 64;
    for (let i = 0; i < dashCount; i++) {
      const theta = (i / dashCount) * Math.PI * 2;
      const xc = A * Math.cos(theta);
      const zc = B * Math.sin(theta);

      // Tangent vector: (-A * sin(theta), B * cos(theta))
      const tx = -A * Math.sin(theta);
      const tz = B * Math.cos(theta);
      const rotY = Math.atan2(tx, tz);

      list.push({
        pos: [xc, 0.035, zc],
        rotY
      });
    }
    return list;
  }, [A, B]);

  // 5. Landscaping: Palm Trees along Inner & Outer Perimeters
  const palmPositions = useMemo(() => {
    const list: [number, number, number][] = [];
    const count = 32;

    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const xc = A * Math.cos(theta);
      const zc = B * Math.sin(theta);

      let nx = B * Math.cos(theta);
      let nz = A * Math.sin(theta);
      const len = Math.hypot(nx, nz) || 1;
      nx /= len;
      nz /= len;

      // Outer palm line (8.5m outside outer road curb, avoiding Experience District front [ -56, 66 ])
      const opx = xc + nx * (roadWidth / 2 + 8.5);
      const opz = zc + nz * (roadWidth / 2 + 8.5);
      if (Math.hypot(opx - 26, opz - 18) > 13 && Math.hypot(opx - (-56), opz - 66) > 16) {
        list.push([opx, 0, opz]);
      }

      // Inner palm line (8.5m inside inner road curb, avoiding center plaza, showroom [26, 18], H-Building [22, -12] & Experience [-56, 66])
      if (Math.hypot(xc, zc) > 22) {
        const ipx = xc - nx * (roadWidth / 2 + 8.5);
        const ipz = zc - nz * (roadWidth / 2 + 8.5);
        if (
          Math.hypot(ipx - 26, ipz - 18) > 13 &&
          Math.hypot(ipx - 22, ipz - (-12)) > 15 &&
          Math.hypot(ipx - (-56), ipz - 66) > 16
        ) {
          list.push([ipx, 0, ipz]);
        }
      }
    }

    // Plaza perimeter palm cluster (clearing view corridors towards Showroom [26, 18] and H-building [22, -12])
    for (let ang = 0; ang < Math.PI * 2; ang += Math.PI / 4) {
      const px = Math.cos(ang) * 18;
      const pz = Math.sin(ang) * 18;
      if (Math.hypot(px - 26, pz - 18) > 12 && Math.hypot(px - 22, pz - (-12)) > 15) {
        list.push([px, 0, pz]);
      }
    }

    return list;
  }, [A, B, roadWidth]);

  // 6. Modern Sleek Silver Streetlights along Outer Curve
  const lampPositions = useMemo(() => {
    const list: Array<{ pos: [number, number, number]; rotY: number }> = [];
    const count = 24;

    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const xc = A * Math.cos(theta);
      const zc = B * Math.sin(theta);

      let nx = B * Math.cos(theta);
      let nz = A * Math.sin(theta);
      const len = Math.hypot(nx, nz) || 1;
      nx /= len;
      nz /= len;

      const px = xc + nx * (roadWidth / 2 + 2.5);
      const pz = zc + nz * (roadWidth / 2 + 2.5);
      const rotY = Math.atan2(-nx, -nz);

      list.push({ pos: [px, 0, pz], rotY });
    }
    return list;
  }, [A, B, roadWidth]);

  return (
    <group name="RoadNetwork">
      {/* Expansive Metropolitan Ground: Crisp Modern Dubai Limestone Pavement */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Northern Coastal Marina Horizon Basin */}
      <mesh position={[0, -0.2, -220]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1000, 220]} />
        <meshStandardMaterial color="#0284c7" roughness={0.15} metalness={0.8} />
      </mesh>
      {/* Marina Boardwalk Promenade */}
      <mesh position={[0, 0.08, -110]} receiveShadow>
        <boxGeometry args={[1000, 0.25, 8]} />
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

      {/* Centerline Highway Dashes */}
      {centerlineDashes.map((dash, idx) => (
        <mesh
          key={`ellipse-dash-${idx}`}
          position={dash.pos}
          rotation={[-Math.PI / 2, 0, dash.rotY]}
        >
          <planeGeometry args={[0.35, 4.5]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
      ))}

      {/* ========================================================
          CENTRAL GRAND PLAZA & CONNECTOR BOULEVARDS
          ======================================================== */}
      {/* Central Grand Plaza Roundabout */}
      <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[16, 64]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[15.3, 16, 64]} />
        <meshBasicMaterial color="#d97706" />
      </mesh>
      <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.2, 5.6, 64]} />
        <meshBasicMaterial color="#0284c7" />
      </mesh>

      {/* Central West Connector Boulevard */}
      <mesh position={[-28, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[56, 12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.35} />
      </mesh>
      {[-10, -18, -26, -34, -42, -50].map((x, idx) => (
        <mesh key={`west-dash-${idx}`} position={[x, 0.035, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.35, 4.5]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
      ))}

      {/* Central East Connector Boulevard */}
      <mesh position={[28, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[56, 12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.35} />
      </mesh>

      {/* Central South Connector Boulevard */}
      <mesh position={[0, 0.02, 22]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 44]} />
        <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.35} />
      </mesh>

      {/* ========================================================
          PALM TREES & ARCHITECTURAL STREETLIGHTS
          ======================================================== */}
      {palmPositions.map((pos, idx) => (
        <group key={`palm-${idx}`} position={pos}>
          {/* Trunk */}
          <mesh position={[0, 3, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.42, 6, 8]} />
            <meshStandardMaterial color="#78350f" roughness={0.9} />
          </mesh>
          {/* Palm Fronds */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <mesh
              key={`frond-${i}`}
              position={[0, 5.8, 0]}
              rotation={[0.35, (deg * Math.PI) / 180, 0.55]}
            >
              <coneGeometry args={[1.3, 3.8, 4]} />
              <meshStandardMaterial color="#15803d" roughness={0.6} />
            </mesh>
          ))}
        </group>
      ))}

      {lampPositions.map((lamp, idx) => (
        <group key={`lamp-${idx}`} position={lamp.pos} rotation={[0, lamp.rotY, 0]}>
          {/* Vertical Pole */}
          <mesh position={[0, 4.2, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.14, 8.4, 8]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Curved Arm */}
          <mesh position={[0, 8.4, 0.7]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 1.8, 8]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Lamp Head */}
          <mesh position={[0, 8.8, 1.4]}>
            <boxGeometry args={[0.4, 0.15, 0.8]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
          {/* Emissive LED Face */}
          <mesh position={[0, 8.72, 1.4]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.32, 0.65]} />
            <meshBasicMaterial color="#fffbeb" />
          </mesh>
        </group>
      ))}
    </group>
  );
};
