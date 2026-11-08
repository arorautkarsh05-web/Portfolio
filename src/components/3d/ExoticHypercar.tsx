import React from 'react';
import * as THREE from 'three';

interface ExoticHypercarProps {
  color?: string;
  accentColor?: string;
  isHeadlightsOn?: boolean;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

/**
 * ExoticHypercar: A bespoke high-downforce, mid-engine exotic track hypercar.
 * Distinct from the road GT coupe: lower, wider, twin-nostril front bonnet,
 * prominent carbon-fiber aerodynamic aero-diffusers, dual side air intakes,
 * gooseneck GT3 rear wing, and razor-sharp OLED light signatures.
 */
export const ExoticHypercar: React.FC<ExoticHypercarProps> = ({
  color = '#0284c7', // Liquid Electric Cyan Pearl
  accentColor = '#0f172a', // Forged Carbon Fiber
  isHeadlightsOn = true,
  scale = 1.0,
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}) => {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* ========================================================
          1. CHASSIS & LOWER AERO TRAY
          Ultra-low ground clearance with full-length flat carbon floor
          ======================================================== */}
      {/* Flat Undertray / Carbon Splitter Floor */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 0.06, 4.7]} />
        <meshStandardMaterial color="#09090b" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Front Carbon-Fiber Aerodynamic Splitter with Endplate Winglets */}
      <mesh position={[0, 0.12, 2.38]} castShadow>
        <boxGeometry args={[2.18, 0.04, 0.35]} />
        <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.95} />
      </mesh>
      {[-1.09, 1.09].map((x, i) => (
        <mesh key={`winglet-${i}`} position={[x, 0.22, 2.38]}>
          <boxGeometry args={[0.04, 0.2, 0.3]} />
          <meshStandardMaterial color="#09090b" metalness={0.9} />
        </mesh>
      ))}

      {/* Rear High-Downforce Multi-Strake Race Diffuser */}
      <group position={[0, 0.16, -2.35]}>
        <mesh castShadow>
          <boxGeometry args={[2.0, 0.14, 0.4]} />
          <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Diffuser Aerodynamic Vertical Strakes */}
        {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
          <mesh key={`strake-${i}`} position={[x, 0, 0]}>
            <boxGeometry args={[0.03, 0.18, 0.45]} />
            <meshStandardMaterial color="#0f172a" metalness={0.95} />
          </mesh>
        ))}
      </group>

      {/* ========================================================
          2. SCULPTED HYPERCAR BODYWORK
          Low-slung muscular fenders, teardrop greenhouse & side pontoon pods
          ======================================================== */}
      {/* Lower Main Tub / Sills */}
      <mesh position={[0, 0.34, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.38, 4.5]} />
        <meshStandardMaterial color={color} roughness={0.08} metalness={0.92} />
      </mesh>

      {/* Sculpted Front Bonnet Nose (Low Slanted Wedge) */}
      <mesh position={[0, 0.44, 1.55]} rotation={[0.15, 0, 0]} castShadow>
        <boxGeometry args={[1.86, 0.22, 1.4]} />
        <meshStandardMaterial color={color} roughness={0.08} metalness={0.92} />
      </mesh>

      {/* Dual Hood Aero Extraction Nostrils (Exposed Carbon Inset) */}
      <mesh position={[0, 0.52, 1.45]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.7, 0.04, 0.8]} />
        <meshStandardMaterial color="#09090b" roughness={0.4} metalness={0.95} />
      </mesh>

      {/* Wide Muscular Front Wheel Arches */}
      {[-0.96, 0.96].map((x, i) => (
        <group key={`front-arch-${i}`} position={[x, 0.42, 1.4]}>
          <mesh castShadow>
            <boxGeometry args={[0.22, 0.42, 1.1]} />
            <meshStandardMaterial color={color} roughness={0.08} metalness={0.92} />
          </mesh>
        </group>
      ))}

      {/* Wide Aggressive Rear Haunches / Intercooler Pontoons */}
      {[-0.98, 0.98].map((x, i) => (
        <group key={`rear-haunch-${i}`} position={[x, 0.52, -1.1]}>
          <mesh castShadow>
            <boxGeometry args={[0.26, 0.58, 1.5]} />
            <meshStandardMaterial color={color} roughness={0.08} metalness={0.92} />
          </mesh>
          {/* Carbon Fiber Side Air Intake Scoop */}
          <mesh position={[x > 0 ? -0.1 : 0.1, 0, 0.6]}>
            <boxGeometry args={[0.1, 0.35, 0.4]} />
            <meshStandardMaterial color="#09090b" roughness={0.3} metalness={0.95} />
          </mesh>
        </group>
      ))}

      {/* Carbon Side Skirts with Longitudinal Vortex Blades */}
      {[-1.02, 1.02].map((x, i) => (
        <mesh key={`skirt-${i}`} position={[x, 0.14, 0]}>
          <boxGeometry args={[0.08, 0.08, 2.4]} />
          <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.95} />
        </mesh>
      ))}

      {/* Mid-Engine Cover & Louvered Slats */}
      <group position={[0, 0.68, -0.9]}>
        <mesh castShadow>
          <boxGeometry args={[1.4, 0.22, 1.5]} />
          <meshStandardMaterial color={accentColor} roughness={0.15} metalness={0.9} />
        </mesh>
        {/* Heat Extraction Louvers */}
        {[-0.4, -0.15, 0.1, 0.35].map((z, idx) => (
          <mesh key={`louver-${idx}`} position={[0, 0.12, z]} rotation={[-0.3, 0, 0]}>
            <boxGeometry args={[1.1, 0.02, 0.14]} />
            <meshStandardMaterial color="#09090b" metalness={0.95} />
          </mesh>
        ))}
        {/* Central Roof Air Scoop (Formula 1 / Le Mans Style) */}
        <mesh position={[0, 0.35, 0.45]} castShadow>
          <boxGeometry args={[0.32, 0.22, 0.7]} />
          <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.95} />
        </mesh>
        <mesh position={[0, 0.38, 0.82]}>
          <boxGeometry args={[0.26, 0.14, 0.05]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>

      {/* ========================================================
          3. JET-FIGHTER COCKPIT GREENHOUSE & INTERIOR
          Streamlined tinted glass canopy with visible racing yoke
          ======================================================== */}
      {/* Aerodynamic Glass Canopy */}
      <mesh position={[0, 0.78, 0.15]} castShadow>
        <boxGeometry args={[1.42, 0.48, 1.9]} />
        <meshStandardMaterial
          color="#0284c7"
          metalness={0.96}
          roughness={0.04}
          transparent
          opacity={0.65}
        />
      </mesh>
      {/* Windshield Black Ceramic Frit Perimeter Trim */}
      <mesh position={[0, 0.8, 0.15]}>
        <boxGeometry args={[1.44, 0.44, 1.86]} />
        <meshStandardMaterial color="#09090b" roughness={0.1} metalness={0.9} wireframe />
      </mesh>

      {/* Interior Racing Cockpit Silhouette: Carbon Dashboard & F1-Style Yoke */}
      <group position={[0, 0.6, 0.3]}>
        {/* Black Alcantara Dashboard */}
        <mesh position={[0, 0.1, 0.35]}>
          <boxGeometry args={[1.2, 0.15, 0.5]} />
          <meshStandardMaterial color="#18181b" roughness={0.9} />
        </mesh>
        {/* Driver F1-Style Yoke Steering Wheel */}
        <mesh position={[-0.32, 0.16, 0.18]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.26, 0.14, 0.04]} />
          <meshStandardMaterial color="#09090b" metalness={0.8} />
        </mesh>
        {/* Glowing Digital Telemetry Cluster Display */}
        <mesh position={[-0.32, 0.22, 0.32]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[0.22, 0.08]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        {/* Twin Carbon-Kevlar Racing Bucket Seats */}
        {[-0.32, 0.32].map((x, i) => (
          <group key={`seat-${i}`} position={[x, -0.05, -0.2]}>
            <mesh position={[0, 0.15, -0.1]} rotation={[-0.25, 0, 0]}>
              <boxGeometry args={[0.38, 0.48, 0.08]} />
              <meshStandardMaterial color="#b91c1c" roughness={0.7} />
            </mesh>
            <mesh position={[0, -0.05, 0.08]}>
              <boxGeometry args={[0.38, 0.08, 0.4]} />
              <meshStandardMaterial color="#18181b" roughness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ========================================================
          4. GOOSENECK GT3 REAR AERO WING & DUAL TITANIUM EXHAUSTS
          ======================================================== */}
      <group position={[0, 1.05, -2.1]}>
        {/* Carbon-Fiber Aero Wing Blade */}
        <mesh castShadow>
          <boxGeometry args={[2.15, 0.06, 0.42]} />
          <meshStandardMaterial color="#09090b" roughness={0.15} metalness={0.95} />
        </mesh>
        {/* Wing Endplates */}
        {[-1.08, 1.08].map((x, i) => (
          <mesh key={`endplate-${i}`} position={[x, 0.04, 0]}>
            <boxGeometry args={[0.04, 0.32, 0.52]} />
            <meshStandardMaterial color="#0284c7" roughness={0.1} metalness={0.9} />
          </mesh>
        ))}
        {/* Twin Gooseneck Top-Mounted Pylons */}
        {[-0.55, 0.55].map((x, i) => (
          <mesh key={`pylon-${i}`} position={[x, -0.25, 0.08]} rotation={[-0.25, 0, 0]}>
            <boxGeometry args={[0.05, 0.55, 0.12]} />
            <meshStandardMaterial color="#09090b" metalness={0.95} />
          </mesh>
        ))}
      </group>

      {/* Quad Center-Exit Inconel Titanium Exhaust Pipes */}
      <group position={[0, 0.42, -2.28]}>
        {[-0.24, -0.08, 0.08, 0.24].map((x, i) => (
          <group key={`pipe-${i}`} position={[x, 0, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.065, 0.07, 0.18, 16]} />
              <meshStandardMaterial color="#1e293b" metalness={0.95} roughness={0.15} />
            </mesh>
            {/* Heat-Treated Blue Titanium Rim */}
            <mesh position={[0, 0, -0.09]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.05, 0.066, 16]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
          </group>
        ))}
      </group>

      {/* ========================================================
          5. RAZOR-SHARP LED LIGHTING SIGNATURES
          ======================================================== */}
      {/* Front Quad LED Headlight Blades */}
      {[-0.72, 0.72].map((x, i) => (
        <group key={`headlight-${i}`} position={[x, 0.42, 2.22]} rotation={[0.1, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.32, 0.05, 0.04]} />
            <meshBasicMaterial color={isHeadlightsOn ? '#e0f2fe' : '#334155'} />
          </mesh>
          {isHeadlightsOn && (
            <pointLight position={[0, 0, 0.4]} color="#38bdf8" intensity={2.5} distance={12} />
          )}
        </group>
      ))}

      {/* Continuous Full-Width Rear OLED Lightbar Blade */}
      <group position={[0, 0.58, -2.26]}>
        <mesh>
          <boxGeometry args={[1.9, 0.04, 0.02]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
        <pointLight position={[0, 0, -0.2]} color="#ef4444" intensity={2.0} distance={6} />
      </group>

      {/* ========================================================
          6. STAGGERED COMPETITION RACE WHEELS & CERAMIC BRAKES
          Large concave forged alloy rims with illuminated brake calipers
          ======================================================== */}
      {/* Front Wheels (Left & Right) */}
      {[
        { x: -1.02, z: 1.4, isLeft: true },
        { x: 1.02, z: 1.4, isLeft: false }
      ].map((w, i) => (
        <group key={`fw-${i}`} position={[w.x, 0.38, w.z]}>
          {/* Performance Slick Tire */}
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.28, 28]} />
            <meshStandardMaterial color="#111827" roughness={0.8} />
          </mesh>
          {/* Forged Multi-Spoke Alloy Rim */}
          <mesh position={[w.isLeft ? -0.02 : 0.02, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.27, 16]} />
            <meshStandardMaterial color="#f1f5f9" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Drilled Carbon-Ceramic Brake Rotor */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.1, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.3} />
          </mesh>
          {/* Acid Gold / Electric Cyan 6-Piston Brake Caliper */}
          <mesh position={[w.isLeft ? -0.06 : 0.06, 0.14, 0]}>
            <boxGeometry args={[0.08, 0.12, 0.16]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>
      ))}

      {/* Rear Staggered Extra-Wide Wheels (Left & Right) */}
      {[
        { x: -1.05, z: -1.3, isLeft: true },
        { x: 1.05, z: -1.3, isLeft: false }
      ].map((w, i) => (
        <group key={`rw-${i}`} position={[w.x, 0.42, w.z]}>
          {/* Wide Rear Track Slick Tire */}
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.36, 28]} />
            <meshStandardMaterial color="#111827" roughness={0.8} />
          </mesh>
          {/* Deep-Dish Concave Forged Alloy Rim */}
          <mesh position={[w.isLeft ? -0.03 : 0.03, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.29, 0.29, 0.35, 16]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Carbon-Ceramic Rotor */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.25, 0.25, 0.12, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.3} />
          </mesh>
          {/* Brembo-Style Acid Gold Rear Brake Caliper */}
          <mesh position={[w.isLeft ? -0.08 : 0.08, 0.16, 0]}>
            <boxGeometry args={[0.1, 0.14, 0.18]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

