import React from 'react';
import { Volume2, VolumeX, Car, Film, FileText, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { personalProfile } from '../../data/profile';
import { scenesList } from '../../data/scenes';

interface NavbarProps {
  currentSceneId: number;
  onSelectScene: (id: number) => void;
  isDrivingMode: boolean;
  onToggleDrivingMode: () => void;
  is2DView: boolean;
  onToggle2DView: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenContact: () => void;
}

const NAV_MODULES = [
  { id: 1, num: '01', short: 'City', full: 'City Reveal' },
  { id: 2, num: '02', short: 'About', full: 'Character Reveal' },
  { id: 3, num: '03', short: 'Supercar', full: 'Supercar Ignition' },
  { id: 4, num: '04', short: 'Education', full: 'Education Boulevard' },
  { id: 5, num: '05', short: 'Tech', full: 'Technology Tower' },
  { id: 6, num: '06', short: 'Projects', full: 'Projects Boulevard' },
  { id: 7, num: '07', short: 'Experience', full: 'Experience District' },
  { id: 8, num: '08', short: 'Contact', full: 'Contact Garage' }
] as const;

export const Navbar: React.FC<NavbarProps> = ({
  currentSceneId,
  onSelectScene,
  isDrivingMode,
  onToggleDrivingMode,
  is2DView,
  onToggle2DView,
  isMuted,
  onToggleSound,
  onOpenContact
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-900/95 backdrop-blur-md border-b border-white/15 flex items-center justify-between text-white select-none shadow-xl h-16 max-h-16 overflow-hidden">
      {/* Brand & Identity */}
      <div className="flex items-center space-x-2.5 cursor-pointer shrink-0" onClick={() => onSelectScene(1)}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-sky-500 to-purple-600 p-[1px] shadow-lg shadow-sky-500/20 shrink-0">
          <div className="w-full h-full bg-[#0d0d1a] rounded-[11px] flex items-center justify-center font-black tracking-wider text-sm text-sky-400">
            UA
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold tracking-wider text-base bg-gradient-to-r from-white via-slate-200 to-amber-300 bg-clip-text text-transparent truncate">
              UTKARSH CITY
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30 rounded-md shrink-0">
              3D Interactive
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block truncate">
            {personalProfile.name} • {personalProfile.title}
          </p>
        </div>
      </div>

      {/* Primary City Modules Navigation Bar (Visible on lg: 1024px and up) */}
      <nav className={`hidden ${isDrivingMode ? '2xl:flex' : 'lg:flex'} items-center space-x-1 bg-black/50 p-1 rounded-xl border border-white/10 shrink-0 shadow-inner`}>
        {NAV_MODULES.map(m => {
          const isActive = currentSceneId === m.id && !isDrivingMode && !is2DView;
          return (
            <button
              key={m.id}
              onClick={() => onSelectScene(m.id)}
              className={`flex items-center space-x-1 px-2 lg:px-2.5 py-1 text-xs rounded-lg transition-all duration-200 border cursor-pointer ${
                isActive
                  ? 'bg-sky-500/25 text-sky-200 border-sky-400 font-bold shadow-md shadow-sky-500/25'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/10 border-white/5'
              }`}
              title={m.full}
            >
              <span className={`font-mono text-[10px] ${isActive ? 'text-amber-300 font-bold' : 'text-slate-500'}`}>
                {m.num}
              </span>
              <span className="hidden 2xl:inline">{m.full}</span>
              <span className="2xl:hidden">{m.short}</span>
            </button>
          );
        })}
      </nav>

      {/* Compact Scene Stepper Indicator (Mobile & Tablet < 1024px) */}
      {!isDrivingMode && !is2DView && (
        <div className="hidden sm:flex lg:hidden items-center space-x-2 bg-black/50 px-3 py-1.5 rounded-xl border border-white/10 text-xs shrink-0">
          <button
            onClick={() => onSelectScene(currentSceneId > 1 ? currentSceneId - 1 : NAV_MODULES.length)}
            className="p-1 hover:text-amber-400 text-slate-400 transition"
            title="Previous scene"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="font-mono text-sky-400 font-bold">
            {currentSceneId.toString().padStart(2, '0')}/08
          </span>
          <span className="text-slate-200 font-medium truncate max-w-[130px]">
            {NAV_MODULES[currentSceneId - 1]?.full}
          </span>
          <button
            onClick={() => onSelectScene(currentSceneId < NAV_MODULES.length ? currentSceneId + 1 : 1)}
            className="p-1 hover:text-amber-400 text-slate-400 transition"
            title="Next scene"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Action Controls */}
      <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
        {/* Drive Supercar Toggle */}
        <button
          onClick={onToggleDrivingMode}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            isDrivingMode
              ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-lg shadow-amber-500/30'
              : 'bg-white/5 text-amber-300 border-amber-500/30 hover:bg-amber-500/15'
          }`}
          title="Drive luxury sports car with WASD or arrow keys"
        >
          <Car size={14} />
          <span className="hidden sm:inline">{isDrivingMode ? 'Driving Mode' : 'Drive Car'}</span>
        </button>

        {/* 2D Portfolio View Toggle */}
        <button
          onClick={onToggle2DView}
          className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            is2DView
              ? 'bg-purple-600 text-white border-purple-400 font-bold'
              : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
          }`}
          title="Switch between 3D City and Standard 2D Portfolio"
        >
          {is2DView ? <Film size={14} /> : <FileText size={14} />}
          <span className="hidden sm:inline">{is2DView ? '3D City' : '2D View'}</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          className={`p-2 rounded-lg text-xs border transition-all ${
            !isMuted
              ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
          }`}
          title={isMuted ? 'Unmute city ambiance' : 'Mute audio'}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        {/* Resume Direct Download Link */}
        <a
          href="/Utkarsh_Arora_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white shadow-md shadow-sky-600/25 transition-all"
        >
          <span>Resume</span>
          <ExternalLink size={12} />
        </a>

        {/* Contact Button */}
        <button
          onClick={onOpenContact}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all"
        >
          Contact
        </button>
      </div>
    </header>
  );
};

