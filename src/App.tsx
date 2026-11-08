import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { scenesList } from './data/scenes';
import { featuredProjects } from './data/projects';
import { ProjectLandmark } from './types';
import { CityDistrictConfig } from './data/ellipseConfig';
import { useAudio } from './hooks/useAudio';
import { useVehicleControls } from './hooks/useVehicleControls';
import { CityWorld } from './components/3d/CityWorld';
import { Navbar } from './components/ui/Navbar';
import { DriveHUD } from './components/ui/DriveHUD';
import { SceneDirectorNav } from './components/ui/SceneDirectorNav';
import { IntroOverlay } from './components/ui/IntroOverlay';

// Code-split modals and 2D portfolio for optimized initial bundle loading
const ProjectDetailModal = lazy(() => import('./components/ui/ProjectDetailModal').then(m => ({ default: m.ProjectDetailModal })));
const TechSkillsOverlay = lazy(() => import('./components/ui/TechSkillsOverlay').then(m => ({ default: m.TechSkillsOverlay })));
const ExperienceDistrictView = lazy(() => import('./components/ui/ExperienceDistrictView').then(m => ({ default: m.ExperienceDistrictView })));
const EducationModal = lazy(() => import('./components/ui/EducationModal').then(m => ({ default: m.EducationModal })));
const AchievementsModal = lazy(() => import('./components/ui/AchievementsModal').then(m => ({ default: m.AchievementsModal })));
const ContactModal = lazy(() => import('./components/ui/ContactModal').then(m => ({ default: m.ContactModal })));
const CharacterProfileModal = lazy(() => import('./components/ui/CharacterProfileModal').then(m => ({ default: m.CharacterProfileModal })));
const Full2DPortfolio = lazy(() => import('./components/ui/Full2DPortfolio').then(m => ({ default: m.Full2DPortfolio })));

export function App() {
  const [currentSceneId, setCurrentSceneId] = useState<number>(1);
  const [isDrivingMode, setIsDrivingMode] = useState<boolean>(true); // Autonomous Cruise active on launch
  // Independent 2D portfolio URL query (?view=2d or #2d) support for guaranteed accessibility
  const [is2DView, setIs2DView] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === '2d' || window.location.hash === '#2d' || window.location.hash === '#portfolio') {
        return true;
      }
    }
    return false;
  });
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

  // Vehicle Controls & Autonomous Physics
  const {
    vehicleState,
    updatePhysics,
    speedUp,
    speedLow,
    toggleBrake,
    resumeDrive,
    toggleLights,
    toggleDriveMode,
    resetPosition,
    setControlKey,
    setVehicleState
  } = useVehicleControls();

  const currentScene = scenesList.find(s => s.id === currentSceneId) || scenesList[0];

  // Inspect any district landmark
  const handleInspectDistrict = useCallback((district: CityDistrictConfig) => {
    playChime(620);
    switch (district.id) {
      case 'education':
        setIsEducationOpen(true);
        break;
      case 'experience':
        setIsExperienceOpen(true);
        break;
      case 'achievements':
        setIsAchievementsOpen(true);
        break;
      case 'skills':
        setIsSkillsOpen(true);
        break;
      case 'bayora':
        setSelectedProject(featuredProjects[0]);
        break;
      case 'ustaad':
        setSelectedProject(featuredProjects[1]);
        break;
      case 'paypal':
        setSelectedProject(featuredProjects[2]);
        break;
      case 'webguard':
        setSelectedProject(featuredProjects[3]);
        break;
      case 'contact':
        setIsContactOpen(true);
        break;
      case 'profile':
        setIsCharacterProfileOpen(true);
        break;
      default:
        break;
    }
  }, [playChime]);

  // Run vehicle physics loop when driving mode is active
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.08);
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

  // Auto-play timer for 3D cinematic tour mode
  useEffect(() => {
    if (!isAutoPlay || isDrivingMode || is2DView) return;

    const timer = setInterval(() => {
      setCurrentSceneId(prev => (prev % scenesList.length) + 1);
      playChime(520);
    }, 7500);

    return () => clearInterval(timer);
  }, [isAutoPlay, isDrivingMode, is2DView, playChime]);

  // Ignition trigger: activates headlights, starts engine and engages autonomous road cruise
  const handleIgnition = useCallback(() => {
    playIgnition();
    setVehicleState(prev => ({
      ...prev,
      isHeadlightsOn: true,
      isEngineStarted: true,
      isBraked: false,
      speed: Math.max(prev.speed, 6.67)
    }));
    setCurrentSceneId(3);
    setIsDrivingMode(true);
  }, [playIgnition, setVehicleState]);

  // Scene selection
  const handleSelectScene = useCallback((id: number) => {
    setCurrentSceneId(id);
    setIsDrivingMode(false);
    playChime(480);

    if (id === 3) {
      handleIgnition();
    }
  }, [handleIgnition, playChime]);

  // Universal modal close handler: smoothly resumes driving if in driving mode
  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
    setIsSkillsOpen(false);
    setIsExperienceOpen(false);
    setIsEducationOpen(false);
    setIsAchievementsOpen(false);
    setIsContactOpen(false);
    setIsCharacterProfileOpen(false);
    if (isDrivingMode) {
      resumeDrive();
    }
  }, [isDrivingMode, resumeDrive]);

  // Handle scene direct actions
  const handleSceneAction = useCallback((sceneId: number) => {
    playChime(580);
    switch (sceneId) {
      case 1:
        setIsDrivingMode(true);
        break;
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
        setSelectedProject(featuredProjects[0]);
        break;
      case 7:
        setIsExperienceOpen(true);
        break;
      case 8:
        setIsContactOpen(true);
        break;
      default:
        break;
    }
  }, [handleIgnition, playChime]);

  // Keyboard shortcuts (Escape, Mute, Number keys, E to inspect near district)
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
      } else if (e.key === 'e' || e.key === 'E') {
        if (vehicleState.nearDistrict) {
          handleInspectDistrict(vehicleState.nearDistrict);
        }
      } else if (e.key === 'm' || e.key === 'M') {
        toggleSound();
      } else if (e.key >= '1' && e.key <= '8') {
        handleSelectScene(parseInt(e.key, 10));
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [vehicleState.nearDistrict, handleInspectDistrict, toggleSound, handleSelectScene]);

  return (
    <div className={`relative w-full ${is2DView ? 'min-h-screen overflow-y-auto' : 'h-screen overflow-hidden'} bg-slate-950 text-white`}>
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

      {/* Primary Top Navigation (Only shown in 3D City view) */}
      {!is2DView && (
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
      )}

      {/* Main Content Area */}
      {is2DView ? (
        <Suspense fallback={
          <div className="min-h-screen bg-slate-950 flex items-center justify-center text-sky-400 font-mono text-sm">
            Loading Utkarsh Arora 2D Portfolio...
          </div>
        }>
          <Full2DPortfolio onReturnTo3D={() => setIs2DView(false)} />
        </Suspense>
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
            onOpenExperienceModal={() => {
              playChime(540);
              setIsExperienceOpen(true);
            }}
            onOpenContactModal={() => {
              playChime(540);
              setIsContactOpen(true);
            }}
            onOpenAchievementsModal={() => {
              playChime(540);
              setIsAchievementsOpen(true);
            }}
            onSwitchTo2D={() => setIs2DView(true)}
          />

          {/* Drive HUD overlay with GTA-style Controls, Minimap & District HUD */}
          {isDrivingMode && (
            <DriveHUD
              vehicleState={vehicleState}
              onExitDriving={() => setIsDrivingMode(false)}
              onResetPosition={() => resetPosition(0)}
              onToggleLights={toggleLights}
              onToggleDriveMode={() => {
                playChime(500);
                toggleDriveMode();
              }}
              onSpeedUp={() => {
                playChime(640);
                speedUp();
              }}
              onSpeedLow={() => {
                playChime(420);
                speedLow();
              }}
              onToggleBrake={() => {
                playChime(320);
                toggleBrake();
              }}
              onVirtualControl={setControlKey}
              onInspectDistrict={handleInspectDistrict}
            />
          )}

          {/* Cinematic Director Scrubber Bar (when in guided tour mode) */}
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

      {/* Modals & Detailed Dossiers (Lazy Loaded) */}
      <Suspense fallback={null}>
        <ProjectDetailModal
          project={selectedProject}
          onClose={handleCloseModal}
          onSelectProject={setSelectedProject}
        />

        <TechSkillsOverlay
          isOpen={isSkillsOpen}
          onClose={handleCloseModal}
        />

        <ExperienceDistrictView
          isOpen={isExperienceOpen}
          onClose={handleCloseModal}
        />

        <EducationModal
          isOpen={isEducationOpen}
          onClose={handleCloseModal}
        />

        <AchievementsModal
          isOpen={isAchievementsOpen}
          onClose={handleCloseModal}
        />

        <ContactModal
          isOpen={isContactOpen}
          onClose={handleCloseModal}
        />

        <CharacterProfileModal
          isOpen={isCharacterProfileOpen}
          onClose={handleCloseModal}
          onStartIgnition={() => {
            handleIgnition();
            setIsDrivingMode(true);
          }}
        />
      </Suspense>
    </div>
  );
}

export default App;
