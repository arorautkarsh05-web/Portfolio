import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Compass, Sparkles } from 'lucide-react';
import { scenesList } from '../../data/scenes';
import { SceneCheckpoint } from '../../types';

interface SceneDirectorNavProps {
  currentScene: SceneCheckpoint;
  onSelectScene: (id: number) => void;
  isAutoPlay: boolean;
  onToggleAutoPlay: () => void;
  onStartDrive: () => void;
  onActionClick: (sceneId: number) => void;
}

export const SceneDirectorNav: React.FC<SceneDirectorNavProps> = ({
  currentScene,
  onSelectScene,
  isAutoPlay,
  onToggleAutoPlay,
  onStartDrive,
  onActionClick
}) => {
  const currentIndex = scenesList.findIndex(s => s.id === currentScene.id);
  const total = scenesList.length;

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + total) % total;
    onSelectScene(scenesList[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % total;
    onSelectScene(scenesList[nextIdx].id);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 pointer-events-none flex justify-center">
      <div className="pointer-events-auto max-w-3xl w-full bg-[#0a0a14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Scene Info */}
        <div className="flex-1 min-w-0 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
              {currentScene.district}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {currentScene.id.toString().padStart(2, '0')} / {total.toString().padStart(2, '0')}
            </span>
          </div>

          <h3 className="text-base font-bold text-white tracking-wide truncate">
            {currentScene.name.split('//')[1]?.trim() || currentScene.name}
          </h3>
          <p className="text-xs text-slate-300 line-clamp-1">
            {currentScene.description}
          </p>
        </div>

        {/* Scene Context Action Button */}
        <div className="flex items-center space-x-2">
          {currentScene.id >= 4 && (
            <button
              onClick={() => onActionClick(currentScene.id)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 transition flex items-center space-x-1"
            >
              <Sparkles size={13} />
              <span>
                {currentScene.id === 4 && 'View Education'}
                {currentScene.id === 5 && 'View All Skills'}
                {currentScene.id === 6 && 'Inspect Projects'}
                {currentScene.id === 7 && 'View Certificates'}
                {currentScene.id === 8 && 'View Experience'}
                {currentScene.id === 9 && 'Open Contact'}
              </span>
            </button>
          )}

          {/* Supercar Drive trigger shortcut */}
          <button
            onClick={onStartDrive}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition flex items-center space-x-1"
            title="Switch to car driving mode"
          >
            <Compass size={13} />
            <span className="hidden sm:inline">Drive World</span>
          </button>
        </div>

        {/* Playback & Direction Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition"
            title="Previous scene"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={onToggleAutoPlay}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center space-x-1.5 transition ${
              isAutoPlay
                ? 'bg-amber-500 text-black border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
            }`}
            title={isAutoPlay ? 'Pause cinematic tour' : 'Auto-play cinematic tour'}
          >
            {isAutoPlay ? <Pause size={14} /> : <Play size={14} />}
            <span className="hidden sm:inline">{isAutoPlay ? 'Auto Tour' : 'Play Tour'}</span>
          </button>

          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition"
            title="Next scene"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

