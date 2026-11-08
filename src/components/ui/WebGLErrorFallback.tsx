import React from 'react';
import { AlertCircle, FileText, ArrowRight } from 'lucide-react';

interface WebGLErrorFallbackProps {
  onSwitchTo2D: () => void;
}

export const WebGLErrorFallback: React.FC<WebGLErrorFallbackProps> = ({ onSwitchTo2D }) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-slate-950 text-white select-none">
      <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={28} />
        </div>
        <h2 className="text-xl font-extrabold tracking-tight mb-2">
          3D WebGL Acceleration Unavailable
        </h2>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Your browser or device does not currently have WebGL 3D hardware acceleration enabled.
          You can explore the full, interactive portfolio in responsive 2D Executive mode.
        </p>
        <button
          onClick={onSwitchTo2D}
          className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition cursor-pointer"
        >
          <FileText size={16} />
          <span>Explore 2D Executive Portfolio</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

