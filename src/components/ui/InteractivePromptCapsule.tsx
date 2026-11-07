import React from 'react';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { SceneCheckpoint } from '../../types';

interface InteractivePromptCapsuleProps {
  currentScene: SceneCheckpoint;
  onTriggerAction: () => void;
  isDrivingMode: boolean;
  nearDistrictName?: string | null;
}

export const InteractivePromptCapsule: React.FC<InteractivePromptCapsuleProps> = ({
  currentScene,
  onTriggerAction,
  isDrivingMode,
  nearDistrictName
}) => {
  // If in driving mode and near a landmark, show dynamic capsule
  if (isDrivingMode && nearDistrictName) {
    return (
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 pointer-events-auto animate-bounce">
        <button
          onClick={onTriggerAction}
          className="flex items-center space-x-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-2xl shadow-amber-500/40 border-2 border-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles size={16} className="text-slate-950 animate-spin" />
          <span className="tracking-wide">CLICK HERE: Inspect {nearDistrictName}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  // In driving mode without landmark nearby, don't show cinematic capsule
  if (isDrivingMode) return null;

  // Cinematic Tour Mode Prompts for Scenes 2-8
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
        {/* Pulsing Outer Glow Ring */}
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

