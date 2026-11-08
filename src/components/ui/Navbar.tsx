import React from 'react';
import { Volume2, VolumeX, Car, Film, FileText, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { personalProfile } from '../../data/profile';

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
  { id: 2, num: '02', short: 'Bio', full: 'Character Reveal' },
  { id: 3, num: '03', short: 'Supercar', full: 'Supercar Ignition' },
  { id: 4, num: '04', short: 'Education', full: 'Education Boulevard' },
  { id: 5, num: '05', short: 'Skills', full: 'Technology Tower' },
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
    <header className="fixed top-0 left-0 right-0 z-40 px-2 sm:px-4 py-2 bg-slate-900/95 backdrop-blur-md border-b border-white/15 flex items-center justify-between text-white select-none shadow-xl h-16 max-h-16">
      {/* 1. Brand & Identity (Left - Shrink Protected) */}
      <div
        className="flex items-center space-x-2 sm:space-x-2.5 cursor-pointer shrink-0 mr-2"
        onClick={() => onSelectScene(1)}
        title="Return to Utkarsh City Entrance"
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-sky-500 to-purple-600 p-[1px] shadow-lg shadow-sky-500/20 shrink-0">
          <div className="w-full h-full bg-[#0d0d1a] rounded-[11px] flex items-center justify-center font-black tracking-wider text-xs sm:text-sm text-sky-400">
            UA
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center space-x-1.5">
            <span className="font-extrabold tracking-wider text-sm sm:text-base bg-gradient-to-r from-white via-slate-200 to-amber-300 bg-clip-text text-transparent truncate">
              UTKARSH CITY
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30 rounded-md shrink-0">
              3D
            </span>
          </div>
          <p className="text-[10px] text-slate-400 hidden xl:block truncate max-w-[180px]">
            {personalProfile.name} • {personalProfile.title}
          </p>
        </div>
      </div>

      {/* 2. All 8 Modules Navigation Bar (Center - Horizontally scrollable if tight, never overflows) */}
      <nav className="hidden md:flex items-center space-x-1 bg-black/60 p-1 rounded-xl border border-white/10 shrink min-w-0 overflow-x-auto no-scrollbar shadow-inner mx-1">
        {NAV_MODULES.map(m => {
          const isActive = currentSceneId === m.id && !isDrivingMode && !is2DView;
          return (
            <button
              key={m.id}
              onClick={() => onSelectScene(m.id)}
              className={`flex items-center space-x-1 px-2 py-1 text-xs rounded-lg transition-all duration-200 border cursor-pointer whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-sky-500/25 text-sky-200 border-sky-400 font-bold shadow-md shadow-sky-500/25 ring-1 ring-sky-400/50'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/10 border-white/5'
              }`}
              title={`${m.num} // ${m.full}`}
            >
              <span className={`font-mono text-[10px] ${isActive ? 'text-amber-300 font-bold' : 'text-slate-500'}`}>
                {m.num}
              </span>
              <span className="font-medium text-[11px] lg:text-xs">{m.short}</span>
            </button>
          );
        })}
      </nav>

      {/* Compact Scene Stepper Indicator (Mobile < 768px) */}
      {!isDrivingMode && !is2DView && (
        <div className="flex md:hidden items-center space-x-1.5 bg-black/50 px-2 py-1 rounded-xl border border-white/10 text-xs shrink min-w-0">
          <button
            onClick={() => onSelectScene(currentSceneId > 1 ? currentSceneId - 1 : NAV_MODULES.length)}
            className="p-1 hover:text-amber-400 text-slate-400 transition"
            title="Previous scene"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="font-mono text-sky-400 font-bold text-[11px]">
            {currentSceneId.toString().padStart(2, '0')}/08
          </span>
          <span className="text-slate-200 font-medium truncate max-w-[90px] text-[11px]">
            {NAV_MODULES[currentSceneId - 1]?.short}
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

      {/* 3. Action Controls (Right - Fixed shrink-0, ALWAYS 100% visible) */}
      <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0 ml-1">
        {/* Drive Supercar Toggle */}
        <button
          onClick={onToggleDrivingMode}
          className={`flex items-center space-x-1 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all shrink-0 ${
            isDrivingMode
              ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-lg shadow-amber-500/30'
              : 'bg-white/5 text-amber-300 border-amber-500/30 hover:bg-amber-500/15'
          }`}
          title="Drive luxury sports car with WASD or arrow keys"
        >
          <Car size={13} className="shrink-0" />
          <span className="hidden sm:inline whitespace-nowrap">{isDrivingMode ? 'Driving' : 'Drive'}</span>
        </button>

        {/* 2D Portfolio View Toggle */}
        <button
          onClick={onToggle2DView}
          className={`flex items-center space-x-1 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all shrink-0 ${
            is2DView
              ? 'bg-purple-600 text-white border-purple-400 font-bold'
              : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
          }`}
          title="Switch between 3D City and Standard 2D Portfolio"
        >
          {is2DView ? <Film size={13} className="shrink-0" /> : <FileText size={13} className="shrink-0" />}
          <span className="hidden sm:inline whitespace-nowrap">{is2DView ? '3D City' : '2D View'}</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          className={`p-1.5 sm:p-2 rounded-lg text-xs border transition-all shrink-0 ${
            !isMuted
              ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
          }`}
          title={isMuted ? 'Unmute city ambiance' : 'Mute audio'}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        {/* Resume Direct Download Link - Guaranteed Visible */}
        <a
          href="/Utkarsh_Arora_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white shadow-md shadow-sky-600/25 transition-all shrink-0 whitespace-nowrap cursor-pointer"
          title="Open Utkarsh Arora Resume (PDF)"
        >
          <span>Resume</span>
          <ExternalLink size={11} className="shrink-0" />
        </a>

        {/* Contact Button - Guaranteed Visible */}
        <button
          onClick={onOpenContact}
          className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all shrink-0 whitespace-nowrap cursor-pointer"
          title="Open Contact Garage"
        >
          Contact
        </button>
      </div>
    </header>
  );
};

