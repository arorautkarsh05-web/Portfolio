import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { VehicleState } from '../../hooks/useVehicleControls';

interface CharacterAndCarProps {
  vehicleState: VehicleState;
  onCharacterClick?: () => void;
  isDrivingMode?: boolean;
}

// Actual wheel radius calculated from GLTF tire geometry bounds (0.358m * 1.05 scale = 0.3759m)
const WHEEL_RADIUS = 0.3759;

export const CharacterAndCar: React.FC<CharacterAndCarProps> = ({
  vehicleState,
  onCharacterClick,
  isDrivingMode = false
}) => {
  const carGroupRef = useRef<THREE.Group>(null);
  const hologramRingRef = useRef<THREE.Group>(null);
  const taillightMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const brakeLightRef = useRef<THREE.PointLight>(null);

  // Suspension & wheel rotation physics refs
  const wheelSpinRef = useRef<number>(0);
  const prevSpeedRef = useRef<number>(vehicleState.speed);
  const bodyPitchRef = useRef<number>(0);
  const bodyRollRef = useRef<number>(0);

  // Load authentic user portrait texture for hologram pedestal
  const userPhotoTexture = useTexture('/utkarsh_arora.jpeg');

  // Load official GLTF models
  const carGLTF = useGLTF('/models/sports_car.glb');
  const charGLTF = useGLTF('/models/character.glb');

  // Clone car scene so we have independent instance with working shadow and custom materials
  const wheelNodesRef = useRef<{
    fl: THREE.Object3D | null;
    fr: THREE.Object3D | null;
    rl: THREE.Object3D | null;
    rr: THREE.Object3D | null;
  }>({ fl: null, fr: null, rl: null, rr: null });

  const carScene = useMemo(() => {
    const clone = carGLTF.scene.clone(true);

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Customize luxury car paint (Sunset Amber / Metallic Gold)
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          if (mesh.name.toLowerCase().includes('body')) {
            mat.color.set('#d97706'); // Metallic sunset gold
            mat.metalness = 0.92;
            mat.roughness = 0.12;
            mat.envMapIntensity = 2.5;
          } else if (mesh.name.toLowerCase().includes('glass')) {
            mat.color.set('#0284c7');
            mat.transparent = true;
            mat.opacity = 0.45;
            mat.roughness = 0.05;
            mat.metalness = 0.95;
          }
          mesh.material = mat;
        }
      }
    });

    return clone;
  }, [carGLTF.scene]);

  useEffect(() => {
    let fl: THREE.Object3D | null = null;
    let fr: THREE.Object3D | null = null;
    let rl: THREE.Object3D | null = null;
    let rr: THREE.Object3D | null = null;

    carScene.traverse((child) => {
      const name = child.name.toLowerCase();
      if (name === 'wheel_fl') fl = child;
      else if (name === 'wheel_fr') fr = child;
      else if (name === 'wheel_rl') rl = child;
      else if (name === 'wheel_rr') rr = child;
    });

    wheelNodesRef.current = { fl, fr, rl, rr };
  }, [carScene]);

  // Clone character scene and style formal charcoal suit & shoes
  const charScene = useMemo(() => {
    const clone = charGLTF.scene.clone(true);

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          const name = mesh.name.toLowerCase();

          // Charcoal-grey tailored suit jacket & trousers
          if (name.includes('top') || name.includes('jacket') || name.includes('outfit_top')) {
            mat.color.set('#1e293b'); // Charcoal grey
            mat.roughness = 0.65;
          } else if (name.includes('bottom') || name.includes('pant') || name.includes('outfit_bottom')) {
            mat.color.set('#1e293b'); // Matching charcoal trousers
            mat.roughness = 0.7;
          } else if (name.includes('footwear') || name.includes('shoe')) {
            mat.color.set('#09090b'); // Polished Oxford shoes
            mat.roughness = 0.2;
            mat.metalness = 0.8;
          }
          mesh.material = mat;
        }
      }
    });

    return clone;
  }, [charGLTF.scene]);

  // Realistic vehicle dynamics & wheel animation frame loop
  useFrame((_, delta) => {
    if (!carGroupRef.current) return;

    const currentSpeed = vehicleState.speed;
    const isBraking =
      vehicleState.isBraked ||
      vehicleState.isHandbrake ||
      (currentSpeed < prevSpeedRef.current - 0.3 && currentSpeed > 0.5);

    // 1. Physically Calculated Distance Wheel Roll (v * dt / radius)
    const distanceTraveled = currentSpeed * delta;
    const deltaWheelSpin = distanceTraveled / WHEEL_RADIUS;
    wheelSpinRef.current += deltaWheelSpin;

    // 2. Realistic Wheel Rotation & Kingpin Steering
    const wheels = wheelNodesRef.current;
    if (wheels.fl) {
      wheels.fl.rotation.x = wheelSpinRef.current;
      // In GLTF coordinates, local Z is the true vertical steering axis
      wheels.fl.rotation.z = vehicleState.steering;
    }
    if (wheels.fr) {
      wheels.fr.rotation.x = wheelSpinRef.current;
      wheels.fr.rotation.z = vehicleState.steering;
    }
    if (wheels.rl) {
      wheels.rl.rotation.x = wheelSpinRef.current;
    }
    if (wheels.rr) {
      wheels.rr.rotation.x = wheelSpinRef.current;
    }

    // 3. Subtle, Planted Suspension Physics (No flying, no float, no artificial bounce)
    const accel = delta > 0 ? (currentSpeed - prevSpeedRef.current) / delta : 0;
    prevSpeedRef.current = currentSpeed;

    // Subtle front dive under heavy braking, slight rear squat under hard throttle
    let targetPitch = 0;
    if (accel < -1.5) {
      targetPitch = Math.max(accel * 0.0015, -0.018); // Slight forward pitch
    } else if (accel > 2.0) {
      targetPitch = Math.min(accel * 0.0012, 0.012); // Subtle rear squat
    }

    // Subtle body roll away from corner direction
    const speedRatio = Math.min(Math.abs(currentSpeed) / 12.0, 1.0);
    const targetRoll = -vehicleState.steering * speedRatio * 0.015;

    // Dampen chassis pitch & roll with realistic sports spring rates
    bodyPitchRef.current = THREE.MathUtils.lerp(bodyPitchRef.current, targetPitch, Math.min(delta * 8.0, 1.0));
    bodyRollRef.current = THREE.MathUtils.lerp(bodyRollRef.current, targetRoll, Math.min(delta * 8.0, 1.0));

    // Grounded placement directly on road surface (Y = 0.02)
    carGroupRef.current.position.set(
      vehicleState.position[0],
      vehicleState.position[1],
      vehicleState.position[2]
    );

    // Apply smooth orientation with subtle suspension attitude
    carGroupRef.current.rotation.set(
      bodyPitchRef.current,
      vehicleState.rotationY,
      bodyRollRef.current
    );

    // 4. Realistic Dynamic Brake Lights
    if (taillightMatRef.current) {
      if (isBraking) {
        taillightMatRef.current.color.set('#ff0000');
        taillightMatRef.current.emissive.set('#ff0000');
        taillightMatRef.current.emissiveIntensity = 3.5;
        if (brakeLightRef.current) brakeLightRef.current.intensity = 2.0;
      } else {
        taillightMatRef.current.color.set('#b91c1c');
        taillightMatRef.current.emissive.set('#ef4444');
        taillightMatRef.current.emissiveIntensity = 0.8;
        if (brakeLightRef.current) brakeLightRef.current.intensity = 0.3;
      }
    }

    // 5. Holographic ring rotation at plaza pedestal
    if (hologramRingRef.current) {
      hologramRingRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group name="CharacterAndCarSystem">
      {/* ========================================================
          LICENSED HIGH-PERFORMANCE SPORTS CAR (GLB)
          Solid asphalt contact, realistic wheel spin, kingpin steering,
          functional xenon headlights, and dynamic brake lights.
          Zero exhaust flames, zero artificial bouncing.
          ======================================================== */}
      <group ref={carGroupRef} position={vehicleState.position}>
        {/* GLB Sports Car Model - Flush Ground Alignment */}
        <primitive
          object={carScene}
          scale={[1.05, 1.05, 1.05]}
          position={[0, 0, 0]}
          rotation={[0, Math.PI, 0]} // Model faces +Z
        />

        {/* Forward Xenon Projector Headlights */}
        {vehicleState.isHeadlightsOn && (
          <>
            <spotLight
              position={[-0.75, 0.65, 2.3]}
              target-position={[-0.75, 0, 32]}
              angle={0.52}
              penumbra={0.35}
              intensity={6.0}
              distance={55}
              color="#f8fafc"
              castShadow
            />
            <spotLight
              position={[0.75, 0.65, 2.3]}
              target-position={[0.75, 0, 32]}
              angle={0.52}
              penumbra={0.35}
              intensity={6.0}
              distance={55}
              color="#f8fafc"
            />
          </>
        )}

        {/* Rear Taillight / Active Brake Light Bar */}
        <mesh position={[0, 0.65, -2.25]}>
          <boxGeometry args={[1.85, 0.05, 0.06]} />
          <meshStandardMaterial
            ref={taillightMatRef}
            color="#b91c1c"
            emissive="#ef4444"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>

        {/* Subtle rear brake light glow on asphalt */}
        <pointLight
          ref={brakeLightRef}
          position={[0, 0.45, -2.5]}
          color="#ef4444"
          intensity={0.3}
          distance={4.5}
        />

        {/* Authentic Quad Titanium Exhaust Tips (Realistic - No Flames, No Particles) */}
        {[-0.45, -0.22, 0.22, 0.45].map((x, i) => (
          <group key={`pipe-${i}`} position={[x, 0.32, -2.35]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.075, 0.075, 0.22, 16]} />
              <meshStandardMaterial color="#334155" metalness={0.96} roughness={0.15} />
            </mesh>
            <mesh position={[0, 0, -0.11]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.055, 0.075, 16]} />
              <meshStandardMaterial color="#0f172a" roughness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ========================================================
          REALISTIC HUMAN CHARACTER (GLB)
          Charcoal-grey formal suit, white shirt, black eyeglasses,
          natural human proportions, authentic photograph hologram pedestal
          ======================================================== */}
      {!isDrivingMode && (
        <group
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

          {/* GLB Human Character */}
          <primitive
            object={charScene}
            scale={[1.0, 1.0, 1.0]}
            position={[0, 0, 0]}
            rotation={[0, -Math.PI / 6, 0]} // Angled towards viewer & sports car
          />

          {/* Black Eyeglasses attached at eye level */}
          <group position={[0, 1.63, 0.13]}>
            <mesh position={[-0.05, 0, 0]}>
              <ringGeometry args={[0.026, 0.036, 16]} />
              <meshBasicMaterial color="#09090b" side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0.05, 0, 0]}>
              <ringGeometry args={[0.026, 0.036, 16]} />
              <meshBasicMaterial color="#09090b" side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.035, 0.008, 0.008]} />
              <meshBasicMaterial color="#09090b" />
            </mesh>
            {/* Spectacle Temples / Arms */}
            <mesh position={[-0.08, 0, -0.06]} rotation={[0, 0.1, 0]}>
              <boxGeometry args={[0.006, 0.006, 0.12]} />
              <meshBasicMaterial color="#09090b" />
            </mesh>
            <mesh position={[0.08, 0, -0.06]} rotation={[0, -0.1, 0]}>
              <boxGeometry args={[0.006, 0.006, 0.12]} />
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

          {/* Subtle Key Lighting on Utkarsh */}
          <pointLight position={[0, 2.5, 0.6]} color="#ffffff" intensity={2.2} distance={7} />
        </group>
      )}
    </group>
  );
};

// Preload GLTF assets for instant cinematic entry
useGLTF.preload('/models/sports_car.glb');
useGLTF.preload('/models/character.glb');
