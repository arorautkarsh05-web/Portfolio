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
  const frontLeftWheelRef = useRef<THREE.Group>(null);
  const frontRightWheelRef = useRef<THREE.Group>(null);
  const rearLeftWheelRef = useRef<THREE.Group>(null);
  const rearRightWheelRef = useRef<THREE.Group>(null);
  const underglowRef = useRef<THREE.PointLight>(null);
  const exhaustFlamesRef = useRef<THREE.Group>(null);
  const flameLightsRef = useRef<THREE.PointLight>(null);
  const flameShockwaveRef = useRef<THREE.Mesh>(null);
  const hologramRingRef = useRef<THREE.Group>(null);
  const characterGroupRef = useRef<THREE.Group>(null);

  // Load the authentic user photo for the holographic pedestal
  const userPhotoTexture = useTexture('/utkarsh_arora.jpeg');

  useFrame((state, delta) => {
    // Update car position and rotation smoothly
    if (carGroupRef.current) {
      carGroupRef.current.position.set(
        vehicleState.position[0],
        vehicleState.position[1],
        vehicleState.position[2]
      );
      carGroupRef.current.rotation.y = vehicleState.rotationY;
    }

    // Wheel rotation based on forward/backward velocity
    const wheelSpin = vehicleState.speed * delta * 4.0;
    if (frontLeftWheelRef.current) frontLeftWheelRef.current.rotation.x += wheelSpin;
    if (frontRightWheelRef.current) frontRightWheelRef.current.rotation.x += wheelSpin;
    if (rearLeftWheelRef.current) rearLeftWheelRef.current.rotation.x += wheelSpin;
    if (rearRightWheelRef.current) rearRightWheelRef.current.rotation.x += wheelSpin;

    // Front wheels steering angle
    if (frontLeftWheelRef.current) frontLeftWheelRef.current.rotation.y = vehicleState.steering;
    if (frontRightWheelRef.current) frontRightWheelRef.current.rotation.y = vehicleState.steering;

    // Dynamic Super-Gear Exhaust Fire Flames & Turbo Backfire Effect
    if (exhaustFlamesRef.current) {
      const absSpeed = Math.abs(vehicleState.speed);
      const isMoving = absSpeed > 0.3;
      const speedNorm = Math.min(absSpeed / 18.0, 1.0);
      const time = state.clock.elapsedTime;

      if (isMoving || !isDrivingMode) {
        // High-velocity roaring super-gear turbo flames
        const jitterLength = 1.2 + Math.random() * 0.9 + speedNorm * 1.8;
        const jitterWidth = 0.85 + Math.random() * 0.4;
        exhaustFlamesRef.current.scale.set(jitterWidth, jitterWidth, jitterLength);
        exhaustFlamesRef.current.visible = true;

        // Dynamic shockwave ring pulsing behind exhaust
        if (flameShockwaveRef.current) {
          flameShockwaveRef.current.scale.set(
            1.0 + Math.sin(time * 25.0) * 0.3,
            1.0 + Math.sin(time * 25.0) * 0.3,
            1.0
          );
        }

        if (flameLightsRef.current) {
          flameLightsRef.current.intensity = 3.5 + Math.random() * 3.0 + speedNorm * 4.5;
        }
      } else {
        // Idle pilot flames pulsing gently
        const idleJitter = 0.35 + Math.sin(time * 12.0) * 0.15;
        exhaustFlamesRef.current.scale.set(idleJitter, idleJitter, idleJitter * 1.6);
        exhaustFlamesRef.current.visible = true;

        if (flameLightsRef.current) {
          flameLightsRef.current.intensity = 1.0 + Math.random() * 0.8;
        }
      }
    }

    // Holographic ring rotation
    if (hologramRingRef.current) {
      hologramRingRef.current.rotation.y += delta * 0.8;
    }

    // Neon underglow pulse
    if (underglowRef.current) {
      underglowRef.current.intensity = 2.8 + Math.sin(state.clock.elapsedTime * 4.0) * 0.8;
    }
  });

  return (
    <group name="CharacterAndCarSystem">
      {/* ========================================================
          HIGH-PERFORMANCE DUBAI LUXURY SPORTS CAR / HYPERCAR
          Aggressive low-slung GT styling, sculpted carbon bodywork,
          deep aero diffusers, swan-neck GT wing & super-gear exhaust flames
          ======================================================== */}
      <group ref={carGroupRef} position={vehicleState.position}>
        {/* 1. Low Ground-Clearance Carbon-Fiber Underbody & Splitters */}
        <mesh position={[0, 0.14, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.95, 0.1, 4.6]} />
          <meshStandardMaterial color="#09090b" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* 2. Front Carbon Aero Splitter with Side Winglets */}
        <mesh position={[0, 0.1, 2.38]}>
          <boxGeometry args={[2.1, 0.04, 0.45]} />
          <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[-1.08, 0.16, 2.38]}>
          <boxGeometry args={[0.04, 0.16, 0.38]} />
          <meshStandardMaterial color="#09090b" />
        </mesh>
        <mesh position={[1.08, 0.16, 2.38]}>
          <boxGeometry args={[0.04, 0.16, 0.38]} />
          <meshStandardMaterial color="#09090b" />
        </mesh>

        {/* 3. Sculpted Front Nose & Wedge Hood (Metallic Gold / Sunset Amber) */}
        <mesh position={[0, 0.32, 1.62]} rotation={[-0.14, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.78, 0.22, 1.55]} />
          <meshStandardMaterial
            color="#d97706"
            metalness={0.92}
            roughness={0.14}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* Hood Carbon Aerodynamic Heat Extractor Louvers */}
        <mesh position={[0, 0.37, 1.48]} rotation={[-0.14, 0, 0]}>
          <boxGeometry args={[0.85, 0.02, 0.55]} />
          <meshStandardMaterial color="#09090b" roughness={0.5} />
        </mesh>

        {/* 4. Muscular Front Wheel Fenders (Flared around wheels) */}
        <mesh position={[-0.96, 0.34, 1.4]} castShadow>
          <boxGeometry args={[0.26, 0.32, 1.2]} />
          <meshStandardMaterial color="#d97706" metalness={0.92} roughness={0.14} />
        </mesh>
        <mesh position={[0.96, 0.34, 1.4]} castShadow>
          <boxGeometry args={[0.26, 0.32, 1.2]} />
          <meshStandardMaterial color="#d97706" metalness={0.92} roughness={0.14} />
        </mesh>

        {/* 5. Aerodynamic Side Skirts & Large Mid-Engine NACA Air Intakes */}
        <mesh position={[-0.98, 0.18, 0]} castShadow>
          <boxGeometry args={[0.18, 0.12, 3.8]} />
          <meshStandardMaterial color="#09090b" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0.98, 0.18, 0]} castShadow>
          <boxGeometry args={[0.18, 0.12, 3.8]} />
          <meshStandardMaterial color="#09090b" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Sculpted Mid-Body Taper */}
        <mesh position={[-0.88, 0.33, 0]} castShadow>
          <boxGeometry args={[0.24, 0.28, 1.6]} />
          <meshStandardMaterial color="#d97706" metalness={0.92} roughness={0.14} />
        </mesh>
        <mesh position={[0.88, 0.33, 0]} castShadow>
          <boxGeometry args={[0.24, 0.28, 1.6]} />
          <meshStandardMaterial color="#d97706" metalness={0.92} roughness={0.14} />
        </mesh>
        {/* Deep Carbon Side Intake Inlets */}
        <mesh position={[-0.99, 0.34, 0.35]}>
          <boxGeometry args={[0.06, 0.2, 0.5]} />
          <meshStandardMaterial color="#09090b" />
        </mesh>
        <mesh position={[0.99, 0.34, 0.35]}>
          <boxGeometry args={[0.06, 0.2, 0.5]} />
          <meshStandardMaterial color="#09090b" />
        </mesh>

        {/* 6. Muscular Rear Haunches (Wide Supercar Hips) */}
        <mesh position={[-1.02, 0.38, -1.35]} castShadow>
          <boxGeometry args={[0.32, 0.36, 1.3]} />
          <meshStandardMaterial color="#d97706" metalness={0.92} roughness={0.14} />
        </mesh>
        <mesh position={[1.02, 0.38, -1.35]} castShadow>
          <boxGeometry args={[0.32, 0.36, 1.3]} />
          <meshStandardMaterial color="#d97706" metalness={0.92} roughness={0.14} />
        </mesh>

        {/* 7. Low Aerodynamic Teardrop Cockpit (Tinted Reflective Azure Glass) */}
        <mesh position={[0, 0.58, 0.08]} castShadow>
          <boxGeometry args={[1.36, 0.35, 1.95]} />
          <meshStandardMaterial
            color="#0284c7"
            metalness={0.95}
            roughness={0.05}
            envMapIntensity={3.0}
          />
        </mesh>
        {/* Carbon Roof Spine & A-Pillars */}
        <mesh position={[0, 0.74, -0.04]} castShadow>
          <boxGeometry args={[1.15, 0.05, 1.45]} />
          <meshStandardMaterial color="#d97706" metalness={0.92} roughness={0.14} />
        </mesh>
        {/* Roof Air Induction Scoop (Hypercar Feature) */}
        <mesh position={[0, 0.79, 0.2]}>
          <boxGeometry args={[0.35, 0.08, 0.45]} />
          <meshStandardMaterial color="#09090b" metalness={0.8} />
        </mesh>

        {/* Sleek Aerodynamic Side Mirrors */}
        <mesh position={[-0.8, 0.58, 0.62]}>
          <boxGeometry args={[0.22, 0.06, 0.12]} />
          <meshStandardMaterial color="#09090b" />
        </mesh>
        <mesh position={[0.8, 0.58, 0.62]}>
          <boxGeometry args={[0.22, 0.06, 0.12]} />
          <meshStandardMaterial color="#09090b" />
        </mesh>

        {/* 8. Rear Mid-Engine Deck with V12 Heat Dissipation Louvers */}
        <mesh position={[0, 0.44, -1.48]} rotation={[0.08, 0, 0]} castShadow>
          <boxGeometry args={[1.65, 0.22, 1.45]} />
          <meshStandardMaterial color="#d97706" metalness={0.92} roughness={0.14} />
        </mesh>
        {/* Glass Inspection Window over V12 Engine */}
        <mesh position={[0, 0.54, -1.35]}>
          <boxGeometry args={[0.85, 0.03, 0.85]} />
          <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.08} />
        </mesh>

        {/* 9. Swan-Neck Carbon GT Rear Wing */}
        <mesh position={[0, 0.88, -2.18]} castShadow>
          <boxGeometry args={[2.24, 0.05, 0.44]} />
          <meshStandardMaterial color="#09090b" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Wing Aerodynamic Endplates */}
        <mesh position={[-1.12, 0.94, -2.18]}>
          <boxGeometry args={[0.04, 0.2, 0.48]} />
          <meshStandardMaterial color="#d97706" />
        </mesh>
        <mesh position={[1.12, 0.94, -2.18]}>
          <boxGeometry args={[0.04, 0.2, 0.48]} />
          <meshStandardMaterial color="#d97706" />
        </mesh>
        {/* Carbon Uprights / Swan-Neck Stanchions */}
        <mesh position={[-0.55, 0.68, -2.06]} rotation={[0.16, 0, 0]}>
          <boxGeometry args={[0.05, 0.38, 0.12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
        </mesh>
        <mesh position={[0.55, 0.68, -2.06]} rotation={[0.16, 0, 0]}>
          <boxGeometry args={[0.05, 0.38, 0.12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
        </mesh>

        {/* 10. Aggressive Rear Venturi Diffuser with 4 Vertical Aero Fins */}
        <mesh position={[0, 0.14, -2.28]}>
          <boxGeometry args={[1.92, 0.14, 0.4]} />
          <meshStandardMaterial color="#09090b" roughness={0.4} />
        </mesh>
        {[-0.65, -0.22, 0.22, 0.65].map((x, i) => (
          <mesh key={`venturi-fin-${i}`} position={[x, 0.11, -2.32]}>
            <boxGeometry args={[0.03, 0.18, 0.42]} />
            <meshStandardMaterial color="#09090b" />
          </mesh>
        ))}

        {/* 11. Full-Width Seamless Crimson LED Taillight Strip */}
        <mesh position={[0, 0.42, -2.3]}>
          <boxGeometry args={[2.05, 0.05, 0.06]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>

        {/* 12. Angular Sharp Xenon LED Headlights */}
        <mesh position={[-0.78, 0.3, 2.26]} rotation={[0, 0.22, 0]}>
          <boxGeometry args={[0.42, 0.08, 0.08]} />
          <meshBasicMaterial color={vehicleState.isHeadlightsOn ? "#ffffff" : "#94a3b8"} />
        </mesh>
        <mesh position={[0.78, 0.3, 2.26]} rotation={[0, -0.22, 0]}>
          <boxGeometry args={[0.42, 0.08, 0.08]} />
          <meshBasicMaterial color={vehicleState.isHeadlightsOn ? "#ffffff" : "#94a3b8"} />
        </mesh>

        {/* Forward Xenon Headlight Beams */}
        {vehicleState.isHeadlightsOn && (
          <>
            <spotLight
              position={[-0.78, 0.36, 2.35]}
              target-position={[-0.78, 0, 26]}
              angle={0.55}
              penumbra={0.4}
              intensity={6.0}
              distance={50}
              color="#ffffff"
              castShadow
            />
            <spotLight
              position={[0.78, 0.36, 2.35]}
              target-position={[0.78, 0, 26]}
              angle={0.55}
              penumbra={0.4}
              intensity={6.0}
              distance={50}
              color="#ffffff"
            />
          </>
        )}

        {/* ========================================================
            13. QUAD TITANIUM EXHAUST SYSTEM & SUPER-GEAR FIRE FLAMES
            Titanium exhaust barrels with heat-treated blue anodized tips
            Dynamic pulsating 3-stage turbo afterburner backfire flames
            ======================================================== */}
        {[-0.46, -0.22, 0.22, 0.46].map((x, i) => (
          <group key={`exhaust-pipe-${i}`} position={[x, 0.25, -2.28]}>
            {/* Polished Titanium Exhaust Barrel */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.085, 0.085, 0.25, 20]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.96} roughness={0.1} />
            </mesh>
            {/* Heat-treated Blue/Purple Anodized Exhaust Rim */}
            <mesh position={[0, 0, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.082, 0.014, 8, 20]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
          </group>
        ))}

        {/* DYNAMIC SUPER-GEAR FIRE FLAMES GROUP */}
        <group ref={exhaustFlamesRef} position={[0, 0.25, -2.5]}>
          {[-0.46, -0.22, 0.22, 0.46].map((x, i) => (
            <group key={`flame-jet-${i}`} position={[x, 0, 0]}>
              {/* Outer Roaring Fiery Orange Flame Cone */}
              <mesh position={[0, 0, -0.6]} rotation={[-Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.15, 1.25, 14]} />
                <meshBasicMaterial color="#ff4500" transparent opacity={0.85} />
              </mesh>
              {/* Mid Blazing Golden Flame Core */}
              <mesh position={[0, 0, -0.45]} rotation={[-Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.1, 0.95, 12]} />
                <meshBasicMaterial color="#fbbf24" transparent opacity={0.92} />
              </mesh>
              {/* Super-Gear Electric Cyan Shock Diamond Ignition Needle */}
              <mesh position={[0, 0, -0.28]} rotation={[-Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.06, 0.6, 10]} />
                <meshBasicMaterial color="#00f0ff" />
              </mesh>
            </group>
          ))}

          {/* Shockwave Ignition Ring */}
          <mesh ref={flameShockwaveRef} position={[0, 0, -0.3]}>
            <ringGeometry args={[0.65, 0.72, 32]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>

          {/* Dynamic Flame Point-Light illuminating road & diffuser */}
          <pointLight
            ref={flameLightsRef}
            position={[0, 0, -0.8]}
            color="#ff5500"
            intensity={4.0}
            distance={14}
            decay={1.8}
          />
        </group>

        {/* 14. Cyan Neon Ground Underglow */}
        <pointLight
          ref={underglowRef}
          position={[0, 0.08, 0]}
          color="#0284c7"
          intensity={3.2}
          distance={8}
          decay={1.8}
        />

        {/* ========================================================
            15. 4x PERFORMANCE WHEEL ASSEMBLIES
            Low-profile track tires, forged multi-spoke rims, drilled
            carbon-ceramic discs, and glowing Brembo brake calipers
            ======================================================== */}
        {/* Front Left Wheel */}
        <group ref={frontLeftWheelRef} position={[-1.02, 0.28, 1.35]}>
          <WheelAssembly side="left" />
        </group>

        {/* Front Right Wheel */}
        <group ref={frontRightWheelRef} position={[1.02, 0.28, 1.35]}>
          <WheelAssembly side="right" />
        </group>

        {/* Rear Left Wheel */}
        <group ref={rearLeftWheelRef} position={[-1.04, 0.3, -1.35]}>
          <WheelAssembly side="left" isRear />
        </group>

        {/* Rear Right Wheel */}
        <group ref={rearRightWheelRef} position={[1.04, 0.3, -1.35]}>
          <WheelAssembly side="right" isRear />
        </group>
      </group>

      {/* ========================================================
          PERSONAL CHARACTER: UTKARSH ARORA (Central Grand Plaza)
          Charcoal-grey formal tailored suit, crisp white shirt,
          black-framed spectacles, authentic photograph hologram pedestal
          ======================================================== */}
      {!isDrivingMode && (
        <group
          ref={characterGroupRef}
          position={[2.4, 0, 0.8]}
          onClick={(e) => {
            e.stopPropagation();
            onCharacterClick?.();
          }}
        >
          {/* Holographic Glowing Pedestal */}
          <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1.4, 48]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.7} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.3, 1.4, 48]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>

          {/* Rotating Holographic Technology Ring */}
          <group ref={hologramRingRef} position={[0, 0.06, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.5, 1.55, 48]} />
              <meshBasicMaterial color="#d97706" />
            </mesh>
          </group>

          {/* Character Body Hierarchy */}
          {/* Polished Black Formal Oxford Shoes */}
          <mesh position={[-0.14, 0.08, 0]} castShadow>
            <boxGeometry args={[0.14, 0.12, 0.3]} />
            <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0.14, 0.08, 0]} castShadow>
            <boxGeometry args={[0.14, 0.12, 0.3]} />
            <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.8} />
          </mesh>

          {/* Charcoal-Grey Tailored Suit Trousers */}
          <mesh position={[-0.14, 0.52, 0]} castShadow>
            <cylinderGeometry args={[0.11, 0.1, 0.78, 16]} />
            <meshStandardMaterial color="#1e293b" roughness={0.6} />
          </mesh>
          <mesh position={[0.14, 0.52, 0]} castShadow>
            <cylinderGeometry args={[0.11, 0.1, 0.78, 16]} />
            <meshStandardMaterial color="#1e293b" roughness={0.6} />
          </mesh>

          {/* Tailored Suit Jacket (Charcoal-Grey Slim Cut) */}
          <mesh position={[0, 1.22, 0]} castShadow>
            <cylinderGeometry args={[0.26, 0.22, 0.65, 16]} />
            <meshStandardMaterial color="#1e293b" roughness={0.6} />
          </mesh>

          {/* White Formal Dress Shirt & Tie Inlay */}
          <mesh position={[0, 1.34, 0.12]}>
            <planeGeometry args={[0.14, 0.36]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
          {/* Midnight Blue Tie */}
          <mesh position={[0, 1.28, 0.13]}>
            <planeGeometry args={[0.04, 0.3]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>

          {/* Character Head */}
          <mesh position={[0, 1.74, 0]} castShadow>
            <sphereGeometry args={[0.14, 24, 24]} />
            <meshStandardMaterial color="#d4a373" roughness={0.5} />
          </mesh>

          {/* Neat Professional Dark Hair */}
          <mesh position={[0, 1.84, -0.02]} castShadow>
            <sphereGeometry args={[0.15, 20, 20]} />
            <meshStandardMaterial color="#09090b" roughness={0.7} />
          </mesh>

          {/* Black-Framed Eyeglasses (per photo reference) */}
          <group position={[0, 1.76, 0.13]}>
            <mesh position={[-0.05, 0, 0]}>
              <ringGeometry args={[0.025, 0.035, 16]} />
              <meshBasicMaterial color="#09090b" side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0.05, 0, 0]}>
              <ringGeometry args={[0.025, 0.035, 16]} />
              <meshBasicMaterial color="#09090b" side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.03, 0.008, 0.008]} />
              <meshBasicMaterial color="#09090b" />
            </mesh>
          </group>

          {/* Authentic Photograph Hologram Display (Floating above Utkarsh) */}
          <group position={[0, 2.35, 0]}>
            <mesh castShadow>
              <planeGeometry args={[0.75, 0.75]} />
              <meshBasicMaterial
                map={userPhotoTexture}
                side={THREE.DoubleSide}
                transparent
                opacity={0.96}
              />
            </mesh>
            {/* Holographic Glowing Border Frame */}
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <ringGeometry args={[0.54, 0.56, 4]} />
              <meshBasicMaterial color="#0284c7" side={THREE.DoubleSide} />
            </mesh>
          </group>

          {/* Subtle Spotlight on Utkarsh */}
          <pointLight position={[0, 2.5, 0.5]} color="#ffffff" intensity={2.0} distance={6} />
        </group>
      )}
    </group>
  );
};

// ========================================================
// REUSABLE HIGH-PERFORMANCE WHEEL COMPONENT
// Wide forged alloy rim, ventilated carbon disc & Brembo caliper
// ========================================================
interface WheelAssemblyProps {
  side: 'left' | 'right';
  isRear?: boolean;
}

const WheelAssembly: React.FC<WheelAssemblyProps> = ({ side, isRear = false }) => {
  const radius = isRear ? 0.38 : 0.35;
  const tireWidth = isRear ? 0.32 : 0.28;

  return (
    <group rotation={[0, 0, side === 'left' ? -Math.PI / 2 : Math.PI / 2]}>
      {/* 1. Low-Profile Sport Compound Tire */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, tireWidth, 28]} />
        <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* 2. Forged Deep-Dish Alloy Rim Lip */}
      <mesh position={[0, (tireWidth / 2) * 1.01, 0]}>
        <cylinderGeometry args={[radius * 0.78, radius * 0.78, 0.02, 28]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* 3. 5-Twin Spoke Forged Center Star */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * Math.PI * 2) / 5;
        return (
          <mesh
            key={`spoke-${i}`}
            position={[Math.cos(angle) * radius * 0.38, (tireWidth / 2) * 1.02, Math.sin(angle) * radius * 0.38]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.045, 0.02, radius * 0.65]} />
            <meshStandardMaterial color="#09090b" metalness={0.9} roughness={0.2} />
          </mesh>
        );
      })}

      {/* 4. Center Lock Wheel Hub Cap (Anodized Gold) */}
      <mesh position={[0, (tireWidth / 2) * 1.03, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 0.03, 16]} />
        <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 5. Drilled Carbon-Ceramic Brake Disc */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[radius * 0.68, radius * 0.68, tireWidth * 0.4, 24]} />
        <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* 6. High-Performance Orange Brembo Brake Caliper */}
      <mesh position={[radius * 0.45, 0, 0]}>
        <boxGeometry args={[0.1, tireWidth * 0.48, 0.16]} />
        <meshStandardMaterial color="#f97316" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};
