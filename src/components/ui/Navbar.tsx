import React from 'react';
import {
  Building2,
  User,
  Car,
  GraduationCap,
  Cpu,
  Layers,
  Briefcase,
  Send,
  Volume2,
  VolumeX,
  Film,
  FileText,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
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
  { id: 1, num: '01', short: 'City', full: 'City Panorama', icon: Building2 },
  { id: 2, num: '02', short: 'Bio', full: 'Character Reveal', icon: User },
  { id: 3, num: '03', short: 'Supercar', full: 'Supercar Showroom', icon: Car },
  { id: 4, num: '04', short: 'Education', full: 'Education Pavilion', icon: GraduationCap },
  { id: 5, num: '05', short: 'Skills', full: 'Technology Tower', icon: Cpu },
  { id: 6, num: '06', short: 'Projects', full: 'Innovation Quad', icon: Layers },
  { id: 7, num: '07', short: 'Experience', full: 'Career District', icon: Briefcase },
  { id: 8, num: '08', short: 'Contact', full: 'Executive Terminal', icon: Send }
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
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-5 py-2 bg-[#090d16]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)] flex items-center justify-between text-white select-none h-16 max-h-16 before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-sky-400/35 before:to-transparent">
      {/* 1. Brand Identity (Left - Protected from shrinking) */}
      <div
        className="flex items-center space-x-2.5 cursor-pointer shrink-0 mr-2 group"
        onClick={() => onSelectScene(1)}
        title="View Utkarsh City Top Panorama"
      >
        <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-sky-400 to-indigo-500 p-[1.5px] shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
          <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center font-black tracking-wider text-xs sm:text-sm text-sky-400">
            UA
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold tracking-wider text-sm sm:text-base bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent truncate group-hover:brightness-110 transition">
              UTKARSH CITY
            </span>
            <div className="hidden sm:flex items-center space-x-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono font-bold tracking-widest shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
              <span>3D LIVE</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 hidden xl:block truncate max-w-[190px]">
            {personalProfile.name} • {personalProfile.title}
          </p>
        </div>
      </div>

      {/* 2. Professional 9/10 Segmented Module Navigation Dock (Center) */}
      <nav className="hidden md:flex items-center space-x-1 bg-slate-950/70 p-1.5 rounded-2xl border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_8px_20px_rgba(0,0,0,0.5)] backdrop-blur-md shrink min-w-0 overflow-x-auto no-scrollbar mx-2">
        {NAV_MODULES.map(m => {
          const isActive = currentSceneId === m.id && !isDrivingMode && !is2DView;
          const Icon = m.icon;

          return (
            <button
              key={m.id}
              onClick={() => onSelectScene(m.id)}
              className={`group relative flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl transition-all duration-200 border cursor-pointer whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-gradient-to-b from-sky-500/25 to-sky-600/10 text-white border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)]'
                  : 'bg-transparent text-slate-400 hover:text-white hover:bg-white/[0.06] border-transparent'
              }`}
              title={`${m.num} // ${m.full}`}
            >
              <Icon
                size={13}
                className={`transition-colors shrink-0 ${
                  isActive
                    ? 'text-sky-300 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]'
                    : 'text-slate-500 group-hover:text-amber-300'
                }`}
              />
              <span className={`font-mono text-[10px] ${isActive ? 'text-amber-300 font-bold' : 'text-slate-500'}`}>
                {m.num}
              </span>
              <span className={`text-xs tracking-wide ${isActive ? 'font-bold text-white' : 'font-medium'}`}>
                {m.short}
              </span>

              {/* Glowing Active Indicator Micro-pill */}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-sky-400 rounded-full shadow-[0_0_6px_#38bdf8]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Compact Scene Stepper Indicator (Mobile < 768px) */}
      {!isDrivingMode && !is2DView && (
        <div className="flex md:hidden items-center space-x-1.5 bg-slate-950/80 px-2.5 py-1 rounded-xl border border-white/10 text-xs shrink min-w-0">
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
          <span className="text-slate-200 font-semibold truncate max-w-[90px] text-[11px]">
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

      {/* 3. Action Controls Cluster (Right - Fixed shrink-0, Protected from any truncation) */}
      <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0 ml-1">
        {/* Drive Supercar Toggle */}
        <button
          onClick={onToggleDrivingMode}
          className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
            isDrivingMode
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border-amber-300 font-bold shadow-[0_0_16px_rgba(245,158,11,0.4)]'
              : 'bg-white/[0.04] text-amber-300 border-amber-500/30 hover:bg-amber-500/15'
          }`}
          title="Drive luxury sports car with WASD or arrow keys"
        >
          <Car size={13} className="shrink-0" />
          <span className="hidden sm:inline whitespace-nowrap">{isDrivingMode ? 'Driving' : 'Drive'}</span>
        </button>

        {/* 2D Portfolio View Toggle */}
        <button
          onClick={onToggle2DView}
          className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
            is2DView
              ? 'bg-purple-600 text-white border-purple-400 font-bold shadow-[0_0_16px_rgba(168,85,247,0.4)]'
              : 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.08]'
          }`}
          title="Switch between 3D City and Standard 2D Portfolio"
        >
          {is2DView ? <Film size={13} className="shrink-0" /> : <FileText size={13} className="shrink-0" />}
          <span className="hidden sm:inline whitespace-nowrap">{is2DView ? '3D City' : '2D View'}</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          className={`p-2 rounded-xl text-xs border transition-all shrink-0 cursor-pointer ${
            !isMuted
              ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
              : 'bg-white/[0.04] text-slate-400 border-white/10 hover:text-white hover:bg-white/[0.08]'
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
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-[0_2px_12px_rgba(2,132,199,0.35)] border border-sky-400/30 transition-all shrink-0 whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          title="Open Utkarsh Arora Resume (PDF)"
        >
          <span>Resume</span>
          <ExternalLink size={11} className="shrink-0" />
        </a>

        {/* Contact Button - Guaranteed Visible */}
        <button
          onClick={onOpenContact}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all shrink-0 whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          title="Open Contact Garage"
        >
          Contact
        </button>
      </div>
    </header>
  );
};
