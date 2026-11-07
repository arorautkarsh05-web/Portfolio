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
    // Quick, smooth realistic progress simulation
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 15;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080811]/95 backdrop-blur-xl text-white select-none transition-opacity duration-700">
      {/* Background Dubai Sunset Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-600/20 via-sky-600/15 to-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full text-center space-y-6 p-6 sm:p-10">
        {/* Brand Monogram */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-sky-500 to-purple-600 p-[1.5px] shadow-2xl shadow-sky-500/25 mb-2">
          <div className="w-full h-full bg-[#0d0f1a] rounded-[14px] flex items-center justify-center text-xl font-black text-sky-400">
            UA
          </div>
        </div>

        {/* Project Title & Tagline */}
        <div>
          <div className="inline-block px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono font-bold tracking-widest uppercase mb-3">
            Interactive 3D Metropolis
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">
            UTKARSH CITY
          </h1>
          <p className="text-sm sm:text-base font-medium text-amber-300 tracking-wide mt-2">
            "{personalProfile.tagline}"
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {personalProfile.name} • {personalProfile.title}
          </p>
        </div>

        {/* Loading Progress */}
        {loadingProgress < 100 ? (
          <div className="space-y-2 max-w-xs mx-auto">
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-sky-400 to-purple-500 transition-all duration-150"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              Initializing 3D Shaders & Environment... {loadingProgress}%
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
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-sm shadow-xl shadow-amber-500/25 transition flex items-center justify-center space-x-2 group"
            >
              <Sparkles size={16} />
              <span>Enter Cinematic Tour (Scene 01)</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
            </button>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => {
                  setIsVisible(false);
                  onEnterDrive();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition flex items-center justify-center space-x-2"
              >
                <Compass size={14} className="text-amber-400" />
                <span>Explore Freely (Drive Car)</span>
              </button>

              <button
                onClick={() => {
                  setIsVisible(false);
                  onSkipTo2D();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium text-xs border border-white/10 transition"
              >
                <span>Skip to 2D Portfolio</span>
              </button>
            </div>
          </div>
        )}

        <div className="text-[11px] text-slate-500 pt-2 flex items-center justify-center space-x-2">
          <Volume2 size={13} />
          <span>Interactive spatial audio generated via Web Audio API.</span>
        </div>
      </div>
    </div>
  );
};
