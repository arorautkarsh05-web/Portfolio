import React from 'react';
import { Sparkles, ArrowRight, Play, CheckCircle2, ChevronRight } from 'lucide-react';
import { SceneCheckpoint } from '../../types';
import { CircuitWaypoint } from '../../data/waypoints';

interface InteractivePromptCapsuleProps {
  currentScene: SceneCheckpoint;
  onTriggerAction: () => void;
  isDrivingMode: boolean;
  nearDistrictName?: string | null;
  activeStop?: CircuitWaypoint | null;
  onExploreActiveStop?: () => void;
  onSkipActiveStop?: () => void;
  showResumePrompt?: boolean;
  onResumeMove?: () => void;
}

export const InteractivePromptCapsule: React.FC<InteractivePromptCapsuleProps> = ({
  currentScene,
  onTriggerAction,
  isDrivingMode,
  nearDistrictName,
  activeStop,
  onExploreActiveStop,
  onSkipActiveStop,
  showResumePrompt = false,
  onResumeMove
}) => {
  // 1. CAR IS STOPPED BESIDE A MODULE: Prompt user if they want to explore it
  if (isDrivingMode && activeStop) {
    return (
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 pointer-events-auto max-w-lg w-full px-4 animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="bg-slate-900/98 backdrop-blur-2xl border-2 border-amber-400 p-4 rounded-3xl shadow-2xl shadow-amber-500/20 text-center">
          <div className="flex items-center justify-center space-x-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider mb-1">
            <Sparkles size={15} className="animate-spin" style={{ animationDuration: '6s' }} />
            <span>Module Reached</span>
          </div>

          <h3 className="text-base font-black text-white tracking-wide mb-1">
            {activeStop.moduleTitle || activeStop.name}
          </h3>
          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Do you want to explore this module?
          </p>

          <div className="flex items-center justify-center space-x-3">
            {/* Yes, Explore Button */}
            <button
              onClick={onExploreActiveStop}
              className="flex-1 flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <CheckCircle2 size={16} />
              <span>Yes, Explore</span>
            </button>

            {/* Skip & Move Again Button */}
            <button
              onClick={onSkipActiveStop}
              className="flex items-center justify-center space-x-1.5 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white border border-white/20 font-bold text-xs transition cursor-pointer"
            >
              <span>Skip & Move</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. USER JUST EXITED A MODULE: Show "Move Again" button to resume cruising!
  if (isDrivingMode && showResumePrompt) {
    return (
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 pointer-events-auto animate-bounce">
        <button
          onClick={onResumeMove}
          className="flex items-center space-x-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black text-sm shadow-2xl shadow-emerald-500/40 border-2 border-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Play size={16} fill="currentColor" />
          <span className="tracking-wide uppercase">Click to Move to Next Module</span>
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  // 3. Driving Mode Nearby Landmark Proximity Capsule
  if (isDrivingMode && nearDistrictName) {
    return (
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 pointer-events-auto animate-bounce">
        <button
          onClick={onTriggerAction}
          className="flex items-center space-x-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-2xl shadow-amber-500/40 border-2 border-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles size={16} className="text-slate-950" />
          <span className="tracking-wide">CLICK HERE: Inspect {nearDistrictName}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  // In driving mode without prompt, don't show cinematic capsule
  if (isDrivingMode) return null;

  // 4. Cinematic Tour Mode Prompts for Scenes 2-8
  const getPromptText = (sceneId: number) => {
    switch (sceneId) {
      case 2:
        return "CLICK HERE: Utkarsh Arora Bio & Profile";
      case 3:
        return "CLICK HERE: Ignite Supercar & Drive";
      case 4:
        return "CLICK HERE: View Education & Academic Details";
      case 5:
        return "CLICK HERE: View All Technical Skills";
      case 6:
        return "CLICK HERE: Inspect Bayora & Featured Projects";
      case 7:
        return "CLICK HERE: View Internship History";
      case 8:
        return "CLICK HERE: Open Contact Terminal & Resume";
      default:
        return null;
    }
  };

  const promptText = getPromptText(currentScene.id);
  if (!promptText) return null;

  return (
    <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
      <div className="relative group">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-sky-400 to-amber-400 opacity-75 blur-md group-hover:opacity-100 animate-pulse transition duration-500" />
        <button
          onClick={onTriggerAction}
          className="relative flex items-center space-x-2.5 px-6 py-3.5 rounded-full bg-slate-950 border-2 border-amber-400 hover:border-white text-white font-black text-xs sm:text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0">
            <Sparkles size={14} />
          </div>
          <span className="text-amber-300 font-extrabold tracking-wide uppercase">
            {promptText}
          </span>
          <ArrowRight size={16} className="text-amber-400 group-hover:translate-x-1 transition" />
        </button>
      </div>
    </div>
  );
};
