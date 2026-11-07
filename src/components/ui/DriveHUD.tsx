import React from 'react';
import { Compass, RotateCcw, Lightbulb, X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { VehicleState } from '../../hooks/useVehicleControls';

interface DriveHUDProps {
  vehicleState: VehicleState;
  onExitDriving: () => void;
  onResetPosition: () => void;
  onToggleLights: () => void;
  onVirtualControl: (key: string, pressed: boolean) => void;
}

export const DriveHUD: React.FC<DriveHUDProps> = ({
  vehicleState,
  onExitDriving,
  onResetPosition,
  onToggleLights,
  onVirtualControl
}) => {
  const speedKmh = Math.round(Math.abs(vehicleState.speed) * 9.5);
  const gear = vehicleState.speed > 0.5 ? 'D' : vehicleState.speed < -0.5 ? 'R' : 'P';

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none flex flex-col justify-between p-4 pt-18">
      {/* Top Banner Notice */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="bg-[#0b0f19]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs text-slate-300 shadow-xl max-w-sm">
          <div className="flex items-center space-x-2 text-amber-400 font-bold mb-1">
            <Compass size={14} />
            <span>FREE DRIVE MODE ACTIVE</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Use <strong className="text-white">W / S</strong> to accelerate/brake, <strong className="text-white">A / D</strong> to steer. Explore project landmarks and architectural zones freely!
          </p>
        </div>

        <div className="flex space-x-2 pointer-events-auto">
          {/* Reset Car Position */}
          <button
            onClick={onResetPosition}
            className="flex items-center space-x-1 px-3 py-2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-slate-200 border border-white/15 rounded-xl text-xs font-medium transition"
            title="Reset car to central plaza"
          >
            <RotateCcw size={14} />
            <span>Reset Pos</span>
          </button>

          {/* Toggle Headlights */}
          <button
            onClick={onToggleLights}
            className={`flex items-center space-x-1 px-3 py-2 backdrop-blur-md border rounded-xl text-xs font-medium transition ${
              vehicleState.isHeadlightsOn
                ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                : 'bg-black/60 border-white/15 text-slate-400'
            }`}
          >
            <Lightbulb size={14} />
            <span>Lights</span>
          </button>

          {/* Exit Drive Mode */}
          <button
            onClick={onExitDriving}
            className="flex items-center space-x-1 px-3 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold transition"
          >
            <X size={14} />
            <span>Exit Drive</span>
          </button>
        </div>
      </div>

      {/* Bottom Dashboard Cluster */}
      <div className="flex justify-between items-end">
        {/* Digital Speedometer Gauge */}
        <div className="pointer-events-auto bg-[#0a0a14]/85 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center space-x-5">
          <div className="text-center">
            <div className="text-3xl font-black tracking-tight text-white font-mono">
              {speedKmh}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
              KM / H
            </div>
          </div>

          <div className="h-10 w-[1px] bg-white/10" />

          {/* Gear Indicator */}
          <div className="flex flex-col items-center space-y-1 text-xs font-bold">
            <span className={gear === 'P' ? 'text-amber-400' : 'text-slate-600'}>P</span>
            <span className={gear === 'D' ? 'text-emerald-400' : 'text-slate-600'}>D</span>
            <span className={gear === 'R' ? 'text-rose-400' : 'text-slate-600'}>R</span>
          </div>

          <div className="h-10 w-[1px] bg-white/10" />

          {/* District Location Readout */}
          <div className="text-[11px] text-slate-400">
            <span className="text-slate-500 block uppercase text-[9px] font-mono">Telemetry</span>
            <span className="text-sky-300 font-mono">
              X: {Math.round(vehicleState.position[0])} | Z: {Math.round(vehicleState.position[2])}
            </span>
          </div>
        </div>

        {/* Touch / Onscreen Driving Controls (for Mobile & quick mouse steering) */}
        <div className="pointer-events-auto flex flex-col items-center space-y-2 pb-2">
          {/* Forward */}
          <button
            onMouseDown={() => onVirtualControl('w', true)}
            onMouseUp={() => onVirtualControl('w', false)}
            onTouchStart={() => onVirtualControl('w', true)}
            onTouchEnd={() => onVirtualControl('w', false)}
            className="w-12 h-12 bg-white/10 active:bg-amber-500 active:text-black text-white rounded-xl backdrop-blur-md border border-white/20 flex items-center justify-center transition shadow-lg"
          >
            <ArrowUp size={20} />
          </button>

          {/* Left / Reverse / Right */}
          <div className="flex space-x-2">
            <button
              onMouseDown={() => onVirtualControl('a', true)}
              onMouseUp={() => onVirtualControl('a', false)}
              onTouchStart={() => onVirtualControl('a', true)}
              onTouchEnd={() => onVirtualControl('a', false)}
              className="w-12 h-12 bg-white/10 active:bg-amber-500 active:text-black text-white rounded-xl backdrop-blur-md border border-white/20 flex items-center justify-center transition shadow-lg"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onMouseDown={() => onVirtualControl('s', true)}
              onMouseUp={() => onVirtualControl('s', false)}
              onTouchStart={() => onVirtualControl('s', true)}
              onTouchEnd={() => onVirtualControl('s', false)}
              className="w-12 h-12 bg-white/10 active:bg-amber-500 active:text-black text-white rounded-xl backdrop-blur-md border border-white/20 flex items-center justify-center transition shadow-lg"
            >
              <ArrowDown size={20} />
            </button>
            <button
              onMouseDown={() => onVirtualControl('d', true)}
              onMouseUp={() => onVirtualControl('d', false)}
              onTouchStart={() => onVirtualControl('d', true)}
              onTouchEnd={() => onVirtualControl('d', false)}
              className="w-12 h-12 bg-white/10 active:bg-amber-500 active:text-black text-white rounded-xl backdrop-blur-md border border-white/20 flex items-center justify-center transition shadow-lg"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

