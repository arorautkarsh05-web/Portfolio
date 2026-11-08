import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
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
  const exhaustFlamesRef = useRef<THREE.Group>(null);
  const flameLightsRef = useRef<THREE.PointLight>(null);
  const flameShockwaveRef = useRef<THREE.Mesh>(null);
  const underglowRef = useRef<THREE.PointLight>(null);
  const hologramRingRef = useRef<THREE.Group>(null);

  // Load authentic user portrait texture for hologram pedestal
  const userPhotoTexture = useTexture('/utkarsh_arora.jpeg');

  // Load official GLTF models
  const carGLTF = useGLTF('/models/sports_car.glb');
  const charGLTF = useGLTF('/models/character.glb');

  // Clone car scene so we have independent instance with working shadow and custom materials
  const { carScene, wheelNodes } = useMemo<{
    carScene: THREE.Group;
    wheelNodes: {
      fl: THREE.Object3D | null;
      fr: THREE.Object3D | null;
      rl: THREE.Object3D | null;
      rr: THREE.Object3D | null;
    };
  }>(() => {
    const clone = carGLTF.scene.clone(true);

    let fl: THREE.Object3D | null = null;
    let fr: THREE.Object3D | null = null;
    let rl: THREE.Object3D | null = null;
    let rr: THREE.Object3D | null = null;

    clone.traverse((child) => {
      const name = child.name.toLowerCase();
      if (name === 'wheel_fl') fl = child;
      else if (name === 'wheel_fr') fr = child;
      else if (name === 'wheel_rl') rl = child;
      else if (name === 'wheel_rr') rr = child;

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

    return { carScene: clone, wheelNodes: { fl, fr, rl, rr } };
  }, [carGLTF.scene]);

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

  // Animation frame loop
  useFrame((state, delta) => {
    // Car positioning & heading
    if (carGroupRef.current) {
      carGroupRef.current.position.set(
        vehicleState.position[0],
        vehicleState.position[1],
        vehicleState.position[2]
      );
      carGroupRef.current.rotation.y = vehicleState.rotationY;
    }

    // Wheel spin & steering
    const wheelSpin = vehicleState.speed * delta * 4.5;
    const wheels = wheelNodes;
    if (wheels.fl) {
      wheels.fl.rotation.x += wheelSpin;
      wheels.fl.rotation.y = vehicleState.steering;
    }
    if (wheels.fr) {
      wheels.fr.rotation.x += wheelSpin;
      wheels.fr.rotation.y = vehicleState.steering;
    }
    if (wheels.rl) wheels.rl.rotation.x += wheelSpin;
    if (wheels.rr) wheels.rr.rotation.x += wheelSpin;

    // Subtle engine idle vibration
    if (carGroupRef.current && Math.abs(vehicleState.speed) < 0.1) {
      carGroupRef.current.position.y = 0.45 + Math.sin(state.clock.elapsedTime * 12.0) * 0.003;
    }

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
          PHASE 3: LICENSED HIGH-PERFORMANCE SPORTS CAR (GLB)
          Full PBR materials, detailed alloy wheels, functional headlights,
          taillights, dynamic reflections & exhaust fire flames
          ======================================================== */}
      <group ref={carGroupRef} position={vehicleState.position}>
        {/* GLB Sports Car Model */}
        <primitive
          object={carScene}
          scale={[1.05, 1.05, 1.05]}
          position={[0, 0, 0]}
          rotation={[0, Math.PI, 0]} // Model faces +Z
        />

        {/* Forward Xenon Projector Spotlights */}
        {vehicleState.isHeadlightsOn && (
          <>
            <spotLight
              position={[-0.75, 0.65, 2.3]}
              target-position={[-0.75, 0, 30]}
              angle={0.55}
              penumbra={0.4}
              intensity={7.0}
              distance={60}
              color="#ffffff"
              castShadow
            />
            <spotLight
              position={[0.75, 0.65, 2.3]}
              target-position={[0.75, 0, 30]}
              angle={0.55}
              penumbra={0.4}
              intensity={7.0}
              distance={60}
              color="#ffffff"
            />
          </>
        )}

        {/* Rear Neon Taillight Bar & Diffuser Accent */}
        <mesh position={[0, 0.65, -2.25]}>
          <boxGeometry args={[1.85, 0.05, 0.06]} />
          <meshBasicMaterial color={vehicleState.isBraked ? "#ff0000" : "#ef4444"} />
        </mesh>

        {/* ========================================================
            QUAD TITANIUM EXHAUST SYSTEM & SUPER-GEAR FIRE FLAMES
            ======================================================== */}
        {[-0.45, -0.22, 0.22, 0.45].map((x, i) => (
          <group key={`pipe-${i}`} position={[x, 0.32, -2.35]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.075, 0.075, 0.22, 16]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.96} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0, -0.11]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.072, 0.012, 8, 16]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
          </group>
        ))}

        {/* DYNAMIC SUPER-GEAR FIRE FLAMES GROUP */}
        <group ref={exhaustFlamesRef} position={[0, 0.32, -2.55]}>
          {[-0.45, -0.22, 0.22, 0.45].map((x, i) => (
            <group key={`flame-${i}`} position={[x, 0, 0]}>
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
              {/* Electric Cyan Shock Diamond Ignition Needle */}
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

          {/* Dynamic Flame Point-Light */}
          <pointLight
            ref={flameLightsRef}
            position={[0, 0, -0.8]}
            color="#ff5500"
            intensity={4.0}
            distance={14}
            decay={1.8}
          />
        </group>

        {/* Cyan Neon Ground Underglow */}
        <pointLight
          ref={underglowRef}
          position={[0, 0.12, 0]}
          color="#0284c7"
          intensity={3.2}
          distance={9}
          decay={1.8}
        />
      </group>

      {/* ========================================================
          PHASE 2: REALISTIC HUMAN CHARACTER (GLB)
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
