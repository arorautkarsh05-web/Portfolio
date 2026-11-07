import React, { useState, useEffect, useCallback, useRef } from 'react';
import { scenesList } from './data/scenes';
import { featuredProjects } from './data/projects';
import { SceneCheckpoint, ProjectLandmark } from './types';
import { useAudio } from './hooks/useAudio';
import { useVehicleControls } from './hooks/useVehicleControls';
import { CityWorld } from './components/3d/CityWorld';
import { Navbar } from './components/ui/Navbar';
import { DriveHUD } from './components/ui/DriveHUD';
import { SceneDirectorNav } from './components/ui/SceneDirectorNav';
import { ProjectDetailModal } from './components/ui/ProjectDetailModal';
import { TechSkillsOverlay } from './components/ui/TechSkillsOverlay';
import { ExperienceDistrictView } from './components/ui/ExperienceDistrictView';
import { EducationModal } from './components/ui/EducationModal';
import { AchievementsModal } from './components/ui/AchievementsModal';
import { ContactModal } from './components/ui/ContactModal';
import { CharacterProfileModal } from './components/ui/CharacterProfileModal';
import { Full2DPortfolio } from './components/ui/Full2DPortfolio';
import { IntroOverlay } from './components/ui/IntroOverlay';

export function App() {
  const [currentSceneId, setCurrentSceneId] = useState<number>(1);
  const [isDrivingMode, setIsDrivingMode] = useState<boolean>(false);
  const [is2DView, setIs2DView] = useState<boolean>(false);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);

  // Modals
  const [selectedProject, setSelectedProject] = useState<ProjectLandmark | null>(null);
  const [isSkillsOpen, setIsSkillsOpen] = useState<boolean>(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState<boolean>(false);
  const [isEducationOpen, setIsEducationOpen] = useState<boolean>(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isCharacterProfileOpen, setIsCharacterProfileOpen] = useState<boolean>(false);

  // Audio system
  const { isMuted, toggleSound, playIgnition, playChime, updateEngineSpeed } = useAudio();

  // Vehicle Controls & Physics
  const { vehicleState, updatePhysics, resetPosition, setControlKey, setVehicleState } = useVehicleControls([0, 0.45, 0]);

  const currentScene = scenesList.find(s => s.id === currentSceneId) || scenesList[0];

  // Run vehicle physics loop when driving mode is active
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (isDrivingMode) {
        const nextState = updatePhysics(delta);
        updateEngineSpeed(Math.abs(nextState.speed) / 12.0);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDrivingMode, updatePhysics, updateEngineSpeed]);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlay || isDrivingMode || is2DView) return;

    const timer = setInterval(() => {
      setCurrentSceneId(prev => (prev % scenesList.length) + 1);
      playChime(520);
    }, 7500);

    return () => clearInterval(timer);
  }, [isAutoPlay, isDrivingMode, is2DView, playChime]);

  // Ignition trigger
  const handleIgnition = useCallback(() => {
    playIgnition();
    setVehicleState(prev => ({
      ...prev,
      isHeadlightsOn: true,
      isEngineStarted: true
    }));
    setCurrentSceneId(3);
  }, [playIgnition, setVehicleState]);

  // Scene selection
  const handleSelectScene = useCallback((id: number) => {
    setCurrentSceneId(id);
    setIsDrivingMode(false);
    playChime(480);

    // If scene 3 (ignition) selected, trigger ignition effects
    if (id === 3) {
      handleIgnition();
    }
  }, [handleIgnition, playChime]);

  // Context action from director nav
  const handleSceneAction = (sceneId: number) => {
    playChime(600);
    switch (sceneId) {
      case 2:
        setIsCharacterProfileOpen(true);
        break;
      case 3:
        handleIgnition();
        break;
      case 4:
        setIsEducationOpen(true);
        break;
      case 5:
        setIsSkillsOpen(true);
        break;
      case 6:
        // Open first project if none selected
        setSelectedProject(featuredProjects[0]);
        break;
      case 7:
        setIsAchievementsOpen(true);
        break;
      case 8:
        setIsExperienceOpen(true);
        break;
      case 9:
        setIsContactOpen(true);
        break;
      default:
        break;
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'Escape') {
        setSelectedProject(null);
        setIsSkillsOpen(false);
        setIsExperienceOpen(false);
        setIsEducationOpen(false);
        setIsAchievementsOpen(false);
        setIsContactOpen(false);
        setIsCharacterProfileOpen(false);
        if (isDrivingMode) setIsDrivingMode(false);
      } else if (e.key === 'm' || e.key === 'M') {
        toggleSound();
      } else if (e.key >= '1' && e.key <= '9') {
        handleSelectScene(parseInt(e.key, 10));
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isDrivingMode, toggleSound, handleSelectScene]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#080811] text-white">
      {/* Intro Modal on First Load */}
      <IntroOverlay
        onEnterCinematic={() => {
          handleSelectScene(1);
        }}
        onEnterDrive={() => {
          setIsDrivingMode(true);
          handleIgnition();
        }}
        onSkipTo2D={() => {
          setIs2DView(true);
        }}
      />

      {/* Primary Top Navigation */}
      <Navbar
        currentSceneId={currentSceneId}
        onSelectScene={handleSelectScene}
        isDrivingMode={isDrivingMode}
        onToggleDrivingMode={() => {
          setIsDrivingMode(prev => !prev);
          playChime(500);
        }}
        is2DView={is2DView}
        onToggle2DView={() => {
          setIs2DView(prev => !prev);
          playChime(500);
        }}
        isMuted={isMuted}
        onToggleSound={toggleSound}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content Area */}
      {is2DView ? (
        <Full2DPortfolio onReturnTo3D={() => setIs2DView(false)} />
      ) : (
        <>
          {/* 3D WebGL Canvas Metropolis */}
          <CityWorld
            currentScene={currentScene}
            isDrivingMode={isDrivingMode}
            vehicleState={vehicleState}
            onSelectProject={(project) => {
              playChime(620);
              setSelectedProject(project);
            }}
            onCharacterClick={() => {
              playChime(540);
              setIsCharacterProfileOpen(true);
            }}
            onOpenEducationModal={() => {
              playChime(540);
              setIsEducationOpen(true);
            }}
            onOpenSkillsModal={() => {
              playChime(540);
              setIsSkillsOpen(true);
            }}
            onOpenAchievementsModal={() => {
              playChime(540);
              setIsAchievementsOpen(true);
            }}
            onOpenExperienceModal={() => {
              playChime(540);
              setIsExperienceOpen(true);
            }}
            onOpenContactModal={() => {
              playChime(540);
              setIsContactOpen(true);
            }}
          />

          {/* Drive HUD overlay (Active when Driving Mode is on) */}
          {isDrivingMode && (
            <DriveHUD
              vehicleState={vehicleState}
              onExitDriving={() => setIsDrivingMode(false)}
              onResetPosition={() => resetPosition([0, 0.45, 0], 0)}
              onToggleLights={() => {
                setVehicleState(prev => ({
                  ...prev,
                  isHeadlightsOn: !prev.isHeadlightsOn
                }));
              }}
              onVirtualControl={setControlKey}
            />
          )}

          {/* Cinematic Director Bar (Active when not in Free Drive) */}
          {!isDrivingMode && (
            <SceneDirectorNav
              currentScene={currentScene}
              onSelectScene={handleSelectScene}
              isAutoPlay={isAutoPlay}
              onToggleAutoPlay={() => setIsAutoPlay(prev => !prev)}
              onStartDrive={() => {
                setIsDrivingMode(true);
                handleIgnition();
              }}
              onActionClick={handleSceneAction}
            />
          )}
        </>
      )}

      {/* Modals & Dossiers */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <TechSkillsOverlay
        isOpen={isSkillsOpen}
        onClose={() => setIsSkillsOpen(false)}
      />

      <ExperienceDistrictView
        isOpen={isExperienceOpen}
        onClose={() => setIsExperienceOpen(false)}
      />

      <EducationModal
        isOpen={isEducationOpen}
        onClose={() => setIsEducationOpen(false)}
      />

      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <CharacterProfileModal
        isOpen={isCharacterProfileOpen}
        onClose={() => setIsCharacterProfileOpen(false)}
        onStartIgnition={() => {
          handleIgnition();
          setIsDrivingMode(true);
        }}
      />
    </div>
  );
}

export default App;
