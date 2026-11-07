import React, { Suspense } from 'react';
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
  onOpenContactModal
}) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-sky-400 via-amber-200 to-amber-100">
      <Canvas
        shadows
        camera={{ position: [0, 48, 85], fov: 45, near: 0.1, far: 300 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.45
        }}
      >
        <Suspense fallback={null}>
          <AtmosphereLighting />
          <RoadNetwork />
          <CitySkyline />

          {/* Core Interactive Districts (Achievements Plaza removed as requested) */}
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

          {/* Dynamic Smooth Camera Control */}
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
