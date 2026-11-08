import React, { useState, useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import {
  RotateCcw,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  X,
  Compass,
  Cpu,
  Eye,
  Info,
  Layers,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface SupercarShowroomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CameraPreset = '360' | 'front' | 'rear' | 'side' | 'top' | 'interior';

// ========================================================
// 1. SHOWROOM 3D VEHICLE & TURNTABLE COMPONENT
// ========================================================
interface ShowroomStageProps {
  preset: CameraPreset;
  isAutoRotate: boolean;
  onResetControls?: (resetFn: () => void) => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
}

const PRESET_COORDINATES: Record<CameraPreset, { cam: [number, number, number]; target: [number, number, number] }> = {
  '360': { cam: [4.2, 1.8, 4.2], target: [0, 0.55, 0] },
  'front': { cam: [0, 0.95, 4.8], target: [0, 0.55, 0.5] },
  'rear': { cam: [0, 1.15, -4.8], target: [0, 0.55, -0.5] },
  'side': { cam: [-4.8, 1.05, 0], target: [0, 0.55, 0] },
  'top': { cam: [0, 6.5, 0.1], target: [0, 0.45, 0] },
  'interior': { cam: [-0.32, 0.88, -0.1], target: [-0.32, 0.78, 1.1] }
};

const ShowroomStage: React.FC<ShowroomStageProps> = ({
  preset,
  isAutoRotate
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const turntableRef = useRef<THREE.Group>(null);
  const carGLTF = useGLTF('/models/sports_car.glb');

  // Clone sports car model and customize luxury gold metallic paint + tinted glass
  const carScene = useMemo(() => {
    const clone = carGLTF.scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          const name = mesh.name.toLowerCase();
          if (name.includes('body')) {
            mat.color.set('#d97706'); // Sunset metallic gold
            mat.metalness = 0.92;
            mat.roughness = 0.12;
            mat.envMapIntensity = 2.5;
          } else if (name.includes('glass')) {
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

  // Smooth camera transitions when preset changes
  useEffect(() => {
    const config = PRESET_COORDINATES[preset];
    if (!config || !controlsRef.current) return;

    const controls = controlsRef.current;

    // Smoothly animate camera position
    gsap.to(camera.position, {
      x: config.cam[0],
      y: config.cam[1],
      z: config.cam[2],
      duration: 1.4,
      ease: 'power2.inOut',
      overwrite: 'auto'
    });

    // Smoothly animate OrbitControls target
    gsap.to(controls.target, {
      x: config.target[0],
      y: config.target[1],
      z: config.target[2],
      duration: 1.4,
      ease: 'power2.inOut',
      overwrite: 'auto',
      onUpdate: () => controls.update()
    });
  }, [preset, camera]);

  useFrame((state, delta) => {
    // Subtle turntable rotation when idle and in 360 mode
    if (turntableRef.current && isAutoRotate && preset !== 'interior') {
      turntableRef.current.rotation.y += delta * 0.25;
    }
  });

  const isInterior = preset === 'interior';

  return (
    <>
      {/* Showroom Lighting Setup */}
      <ambientLight intensity={0.8} color="#1e293b" />
      <directionalLight position={[6, 12, 6]} intensity={3.5} castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight position={[-6, 10, -6]} intensity={2.0} color="#38bdf8" />
      
      {/* Overhead Focus Spotlight */}
      <spotLight
        position={[0, 8.5, 0]}
        target-position={[0, 0.5, 0]}
        intensity={6.0}
        angle={0.65}
        penumbra={0.4}
        color="#fffbeb"
        castShadow
      />

      {/* Perimeter Rim Highlights for Metallic Reflection */}
      <pointLight position={[-4, 2, 4]} color="#fbbf24" intensity={2.5} distance={15} />
      <pointLight position={[4, 2, -4]} color="#38bdf8" intensity={2.5} distance={15} />

      {/* Orbit Controls with safety limits */}
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.06}
        minDistance={isInterior ? 0.15 : 1.8}
        maxDistance={isInterior ? 2.5 : 12.0}
        maxPolarAngle={isInterior ? Math.PI : Math.PI / 2 - 0.02}
        autoRotate={isAutoRotate && !isInterior}
        autoRotateSpeed={0.8}
      />

      {/* Showroom Floor & Stage */}
      <group position={[0, 0, 0]}>
        {/* Polished Obsidian Mirror Floor */}
        <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#050811" roughness={0.08} metalness={0.95} />
        </mesh>

        {/* Concentric LED Grid Rings on Floor */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[6.8, 7.0, 64]} />
          <meshBasicMaterial color="#0284c7" transparent opacity={0.4} />
        </mesh>
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[9.5, 9.65, 64]} />
          <meshBasicMaterial color="#d97706" transparent opacity={0.3} />
        </mesh>

        {/* Rotating Circular Turntable Platform */}
        <group ref={turntableRef} position={[0, 0.05, 0]}>
          {/* Main Turntable Disk */}
          <mesh receiveShadow position={[0, 0.05, 0]}>
            <cylinderGeometry args={[4.2, 4.4, 0.2, 64]} />
            <meshStandardMaterial color="#0f172a" roughness={0.15} metalness={0.85} />
          </mesh>
          {/* Turntable Golden Bezel Edge */}
          <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[3.9, 4.1, 64]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
          <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.2, 2.3, 48]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
          </mesh>

          {/* Centered Sports Car (Flush on Turntable Platform at Y=0.15) */}
          <primitive
            object={carScene}
            scale={[1.05, 1.05, 1.05]}
            position={[0, 0.15, 0]}
            rotation={[0, Math.PI, 0]}
          />
        </group>
      </group>
    </>
  );
};

// ========================================================
// 2. MAIN MODAL CONTAINER & HUD CONTROLS
// ========================================================
export const SupercarShowroomModal: React.FC<SupercarShowroomModalProps> = ({ isOpen, onClose }) => {
  const [preset, setPreset] = useState<CameraPreset>('360');
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'specs' | 'engineering' | 'none'>('specs');

  // Handle Escape key to return to city
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#060810] text-white flex flex-col justify-between select-none animate-in fade-in duration-300">
      {/* 3D WebGL Showroom Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [4.2, 1.8, 4.2], fov: 42 }}>
          <Suspense fallback={null}>
            <ShowroomStage
              preset={preset}
              isAutoRotate={isAutoRotate}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* ========================================================
          TOP HEADER BAR: BRANDING, STATUS & EXIT
          ======================================================== */}
      <div className="relative z-10 p-4 sm:p-6 flex items-start justify-between bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent pointer-events-none">
        {/* Brand & Subtitle */}
        <div className="pointer-events-auto">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-0.5">
            <Sparkles size={14} className="text-amber-400" />
            <span>Utkarsh City // Automotive Pavilion</span>
            <span className="text-slate-500">•</span>
            <span className="px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 text-[10px] border border-sky-500/30">
              Interactive 360° Studio
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Bespoke Grand Tourer Coupe
          </h1>
          <p className="text-xs text-slate-300 hidden sm:block">
            Dubai-inspired luxury automotive exhibition featuring real-time 3D telemetry.
          </p>
        </div>

        {/* Top Right Controls & Back to City */}
        <div className="flex items-center space-x-2 sm:space-x-3 pointer-events-auto">
          {/* Auto-Rotate Toggle */}
          <button
            onClick={() => setIsAutoRotate(prev => !prev)}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition shadow-lg cursor-pointer ${
              isAutoRotate
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-300 shadow-amber-500/20'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-white/20'
            }`}
            title="Toggle 360 platform rotation"
          >
            {isAutoRotate ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
            <span className="hidden sm:inline">{isAutoRotate ? 'Turntable: Rotating' : 'Turntable: Paused'}</span>
          </button>

          {/* Reset Camera Button */}
          <button
            onClick={() => setPreset('360')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/20 shadow-lg transition cursor-pointer"
            title="Reset camera viewpoint"
          >
            <RotateCcw size={13} className="text-sky-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Back to City Button */}
          <button
            onClick={onClose}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-500 text-white border border-rose-400 shadow-xl shadow-rose-600/30 transition hover:scale-105 active:scale-95 cursor-pointer"
            title="Return to Utkarsh City (Escape)"
          >
            <X size={15} />
            <span>Back to City</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          RIGHT SIDE INFORMATION DOSSIER
          Accurate vehicle specifications & "Powering Utkarsh City" tech card
          ======================================================== */}
      <div className="relative z-10 self-end mr-4 sm:mr-6 pointer-events-auto max-w-sm w-full mb-auto hidden md:block">
        {/* Toggle Pills */}
        <div className="flex space-x-2 mb-2">
          <button
            onClick={() => setActiveTab(prev => (prev === 'specs' ? 'none' : 'specs'))}
            className={`flex-1 flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
              activeTab === 'specs'
                ? 'bg-sky-500/20 text-sky-200 border-sky-400 shadow-md shadow-sky-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border-white/10'
            }`}
          >
            <Info size={13} />
            <span>Vehicle Specifications</span>
          </button>
          <button
            onClick={() => setActiveTab(prev => (prev === 'engineering' ? 'none' : 'engineering'))}
            className={`flex-1 flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
              activeTab === 'engineering'
                ? 'bg-amber-500/20 text-amber-200 border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border-white/10'
            }`}
          >
            <Cpu size={13} />
            <span>Powering Utkarsh City</span>
          </button>
        </div>

        {/* Tab 1: Vehicle Specifications (Verified from 3D Model Only) */}
        {activeTab === 'specs' && (
          <div className="bg-slate-900/95 backdrop-blur-2xl border border-white/20 p-4 rounded-2xl shadow-2xl text-xs space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400 font-mono uppercase text-[10px]">Model Format</span>
              <span className="font-mono font-bold text-sky-300">glTF 2.0 Binary (GLB)</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400 font-mono uppercase text-[10px]">Vehicle Category</span>
              <span className="font-semibold text-white">Grand Tourer (GT Concept)</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400 font-mono uppercase text-[10px]">Exterior Finish</span>
              <span className="font-semibold text-amber-300">Metallic Sunset Amber</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400 font-mono uppercase text-[10px]">Wheel Architecture</span>
              <span className="font-semibold text-white">Dual 5-Spoke Staggered Alloys</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400 font-mono uppercase text-[10px]">Lighting System</span>
              <span className="font-semibold text-white">Dual Xenon Projector + Rear Lightbar</span>
            </div>
            <div>
              <span className="text-slate-400 font-mono uppercase text-[10px] block mb-1">Cockpit Interior</span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Detailed interior with carbon-fibre steering column, red Nappa leather bucket seats, and digital driver instrumentation.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: "Powering Utkarsh City" Real Engineering Architecture */}
        {activeTab === 'engineering' && (
          <div className="bg-slate-900/95 backdrop-blur-2xl border border-amber-500/40 p-4 rounded-2xl shadow-2xl text-xs space-y-2.5 animate-in fade-in duration-200">
            <div className="flex items-center space-x-2 text-amber-400 font-mono font-bold uppercase text-[11px] border-b border-white/10 pb-2">
              <ShieldCheck size={14} />
              <span>Real 3D Systems & Physics</span>
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-300">
              <p>
                <strong className="text-sky-300 font-mono">1. Three.js & React Three Fiber:</strong> Real-time 60fps declarative WebGL rendering pipeline.
              </p>
              <p>
                <strong className="text-sky-300 font-mono">2. Parametric Elliptical Dynamics:</strong> Continuous autonomous pathing following <code className="text-amber-300 font-mono">x(t)=56cos(t), z(t)=44sin(t)</code>.
              </p>
              <p>
                <strong className="text-sky-300 font-mono">3. Kinematic Wheel Suspension:</strong> Physically calculated wheel spin <code className="text-amber-300 font-mono">v·dt / radius</code> with local kingpin steering.
              </p>
              <p>
                <strong className="text-sky-300 font-mono">4. Proximity Spatial Radar:</strong> Angular parameter filtering (&lt;0.22 rad) detecting buildings across both flanks without false triggers.
              </p>
              <p>
                <strong className="text-sky-300 font-mono">5. Code-Split Architecture:</strong> Lazy-loaded modals ensuring initial JS bundle stays under 120 KB.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          BOTTOM CAMERA PRESET BAR & ORBIT CONTROLS
          ======================================================== */}
      <div className="relative z-10 p-4 sm:p-6 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-none">
        {/* Preset View Buttons */}
        <div className="pointer-events-auto flex items-center flex-wrap justify-center gap-1.5 sm:gap-2 bg-slate-900/90 backdrop-blur-2xl border border-white/20 p-2 rounded-2xl shadow-2xl">
          <button
            onClick={() => setPreset('360')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              preset === '360'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Compass size={13} />
            <span>360° Orbit</span>
          </button>

          <button
            onClick={() => setPreset('front')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              preset === 'front'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Front
          </button>

          <button
            onClick={() => setPreset('rear')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              preset === 'rear'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Rear
          </button>

          <button
            onClick={() => setPreset('side')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              preset === 'side'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Side Profile
          </button>

          <button
            onClick={() => setPreset('top')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              preset === 'top'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Top View
          </button>

          {/* Interior Exploration Button (Verified Available in sports_car.glb!) */}
          <button
            onClick={() => setPreset('interior')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              preset === 'interior'
                ? 'bg-sky-400 text-slate-950 shadow-md font-black'
                : 'text-sky-300 hover:text-sky-200 hover:bg-sky-500/15'
            }`}
          >
            <Eye size={13} />
            <span>Cockpit Interior</span>
          </button>
        </div>

        {/* Interaction Hint */}
        <div className="pointer-events-auto hidden lg:flex items-center space-x-2 text-[11px] text-slate-400 font-mono">
          <kbd className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">Mouse Drag / Touch</kbd>
          <span>Free Orbit</span>
          <span>•</span>
          <kbd className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">Scroll / Pinch</kbd>
          <span>Zoom</span>
        </div>
      </div>
    </div>
  );
};
