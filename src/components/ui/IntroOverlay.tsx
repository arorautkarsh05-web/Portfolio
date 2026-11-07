import React, { useEffect, useState } from 'react';
import { Sparkles, Compass, Volume2, ArrowRight } from 'lucide-react';
import { personalProfile } from '../../data/profile';

interface IntroOverlayProps {
  onEnterCinematic: () => void;
  onEnterDrive: () => void;
  onSkipTo2D: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({
  onEnterCinematic,
  onEnterDrive,
  onSkipTo2D
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 25;
      });
    }, 60);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xl text-white select-none transition-opacity duration-700">
      {/* Radiant Dubai Sunset Ambient Halo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-amber-500/30 via-sky-400/25 to-purple-500/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full text-center space-y-6 p-7 sm:p-10 rounded-3xl bg-slate-900/90 border border-white/20 shadow-2xl">
        {/* Brand Monogram */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-sky-400 to-amber-500 p-[2px] shadow-2xl shadow-amber-500/30 mb-1">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-xl font-black text-amber-400">
            UA
          </div>
        </div>

        {/* Project Title & Tagline */}
        <div>
          <div className="inline-block px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold tracking-widest uppercase mb-3">
            Dubai Golden-Hour 3D Metropolis
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-md">
            UTKARSH CITY
          </h1>
          <p className="text-sm sm:text-base font-semibold text-amber-300 tracking-wide mt-2">
            "{personalProfile.tagline}"
          </p>
          <p className="text-xs text-slate-300 mt-1 font-medium">
            {personalProfile.name} • {personalProfile.title}
          </p>
        </div>

        {/* Loading Progress */}
        {loadingProgress < 100 ? (
          <div className="space-y-2 max-w-xs mx-auto">
            <div className="w-full h-2 bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-sky-400 to-amber-500 transition-all duration-150"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="text-[11px] font-mono text-slate-300">
              Loading Golden-Hour 3D Metropolis... {loadingProgress}%
            </div>
          </div>
        ) : (
          /* Entrance Action Buttons */
          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                setIsVisible(false);
                onEnterCinematic();
              }}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 transition flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <Sparkles size={18} />
              <span>Enter Golden-Hour Tour (Scene 01)</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition" />
            </button>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => {
                  setIsVisible(false);
                  onEnterDrive();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Compass size={15} className="text-amber-400" />
                <span>Drive Supercar (Free Mode)</span>
              </button>

              <button
                onClick={() => {
                  setIsVisible(false);
                  onSkipTo2D();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white font-semibold text-xs border border-white/15 transition cursor-pointer"
              >
                <span>View 2D Executive Portfolio</span>
              </button>
            </div>
          </div>
        )}

        <div className="text-[11px] text-slate-400 pt-2 flex items-center justify-center space-x-2">
          <Volume2 size={13} />
          <span>Interactive procedural spatial audio via Web Audio API.</span>
        </div>
      </div>
    </div>
  );
};
