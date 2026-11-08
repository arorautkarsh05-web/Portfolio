import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { AtmosphereLighting } from './AtmosphereLighting';
import { RoadNetwork } from './RoadNetwork';
import { CitySkyline } from './CitySkyline';
import { CharacterAndCar } from './CharacterAndCar';
import { ProjectLandmarks } from './ProjectLandmarks';
import { EducationBoulevard } from './EducationBoulevard';
import { TechTower } from './TechTower';
import { ExperienceDistrict } from './ExperienceDistrict';
import { ContactGarage } from './ContactGarage';
import { CameraRig } from './CameraRig';
import { WebGLErrorFallback } from '../ui/WebGLErrorFallback';
import { SceneCheckpoint, ProjectLandmark } from '../../types';
import { VehicleState } from '../../hooks/useVehicleControls';

interface CityWorldProps {
  currentScene: SceneCheckpoint;
  isDrivingMode: boolean;
  vehicleState: VehicleState;
  onSelectProject: (p: ProjectLandmark) => void;
  onCharacterClick: () => void;
  onOpenEducationModal: () => void;
  onOpenSkillsModal: () => void;
  onOpenExperienceModal: () => void;
  onOpenContactModal: () => void;
  onSwitchTo2D?: () => void;
}

export const CityWorld: React.FC<CityWorldProps> = ({
  currentScene,
  isDrivingMode,
  vehicleState,
  onSelectProject,
  onCharacterClick,
  onOpenEducationModal,
  onOpenSkillsModal,
  onOpenExperienceModal,
  onOpenContactModal,
  onSwitchTo2D
}) => {
  const [hasWebGL] = useState<boolean>(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      return false;
    }
  });
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 768);

  // Monitor resize for mobile resolution
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Performance-adjusted DPR for high vs low-power mobile devices
  const dpr = useMemo<[number, number]>(() => {
    return isMobile ? [1, 1.25] : [1, 2];
  }, [isMobile]);

  if (!hasWebGL) {
    return <WebGLErrorFallback onSwitchTo2D={onSwitchTo2D || (() => {})} />;
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-sky-400 via-amber-200 to-amber-100">
      <Canvas
        shadows={!isMobile} // Disable real-time shadow passes on mobile for 60fps performance
        dpr={dpr}
        camera={{ position: [0, 48, 85], fov: 45, near: 0.1, far: 320 }}
        gl={{
          antialias: !isMobile,
          powerPreference: isMobile ? "default" : "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.45
        }}
      >
        <Suspense fallback={null}>
          <AtmosphereLighting />
          <RoadNetwork />
          <CitySkyline />

          {/* Core Interactive Districts */}
          <CharacterAndCar
            vehicleState={vehicleState}
            onCharacterClick={onCharacterClick}
            isDrivingMode={isDrivingMode}
          />
          <ProjectLandmarks onSelectProject={onSelectProject} />
          <EducationBoulevard onOpenEducationModal={onOpenEducationModal} />
          <TechTower onOpenSkillsModal={onOpenSkillsModal} />
          <ExperienceDistrict onOpenExperienceModal={onOpenExperienceModal} />
          <ContactGarage onOpenContactModal={onOpenContactModal} />

          {/* Dynamic Smooth Camera Control with GSAP transitions */}
          <CameraRig
            currentScene={currentScene}
            isDrivingMode={isDrivingMode}
            vehicleState={vehicleState}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
