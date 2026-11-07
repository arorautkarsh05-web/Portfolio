import React from 'react';
import { Compass, RotateCcw, Lightbulb, X, Zap, ChevronsDown, Octagon, Play } from 'lucide-react';
import { VehicleState } from '../../hooks/useVehicleControls';

interface DriveHUDProps {
  vehicleState: VehicleState;
  onExitDriving: () => void;
  onResetPosition: () => void;
  onToggleLights: () => void;
  onSpeedUp: () => void;
  onSpeedLow: () => void;
  onToggleBrake: () => void;
}

export const DriveHUD: React.FC<DriveHUDProps> = ({
  vehicleState,
  onExitDriving,
  onResetPosition,
  onToggleLights,
  onSpeedUp,
  onSpeedLow,
  onToggleBrake
}) => {
  const speedKmh = Math.round(Math.abs(vehicleState.speed) * 8.5);
  const targetSpeedKmh = Math.round(vehicleState.targetSpeed * 8.5);
  const gear = vehicleState.isBraked || Math.abs(vehicleState.speed) < 0.2 ? 'P' : 'D';

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none flex flex-col justify-between p-4 pt-16">
      {/* Top Banner Notice */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="bg-slate-900/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-xs text-slate-200 shadow-2xl max-w-md">
          <div className="flex items-center space-x-2 text-amber-400 font-extrabold mb-1">
            <Compass size={15} className="animate-spin" style={{ animationDuration: '8s' }} />
            <span>AUTONOMOUS CRUISE ACTIVE</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              vehicleState.isBraked
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}>
              {vehicleState.isBraked ? 'BRAKED' : 'CRUISING'}
            </span>
          </div>
          <p className="text-[12px] text-white font-medium">
            Next Module: <strong className="text-sky-300">{vehicleState.targetModuleName}</strong>
          </p>
        </div>

        <div className="flex space-x-2 pointer-events-auto">
          {/* Reset Car Position */}
          <button
            onClick={onResetPosition}
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-white/20 rounded-xl text-xs font-semibold shadow-lg transition cursor-pointer"
            title="Reset car to central plaza"
          >
            <RotateCcw size={14} className="text-amber-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Toggle Headlights */}
          <button
            onClick={onToggleLights}
            className={`flex items-center space-x-1.5 px-3 py-2 backdrop-blur-md border rounded-xl text-xs font-semibold shadow-lg transition cursor-pointer ${
              vehicleState.isHeadlightsOn
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold'
                : 'bg-slate-900/90 border-white/20 text-slate-300'
            }`}
          >
            <Lightbulb size={14} />
            <span className="hidden sm:inline">Lights</span>
          </button>

          {/* Exit Drive Mode */}
          <button
            onClick={onExitDriving}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white border border-rose-400 rounded-xl text-xs font-bold shadow-lg transition cursor-pointer"
          >
            <X size={14} />
            <span>Exit Drive</span>
          </button>
        </div>
      </div>

      {/* Bottom Dashboard Cluster & Simple Speed Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-3 pb-2">
        {/* Digital Speedometer Gauge */}
        <div className="pointer-events-auto bg-slate-900/95 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl flex items-center space-x-5">
          <div className="text-center">
            <div className="text-3xl font-black tracking-tight text-white font-mono">
              {speedKmh}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">
              KM / H
            </div>
          </div>

          <div className="h-10 w-[1px] bg-white/20" />

          {/* Gear Indicator */}
          <div className="flex flex-col items-center space-y-1 text-xs font-bold">
            <span className={gear === 'P' ? 'text-rose-400 font-extrabold' : 'text-slate-500'}>P</span>
            <span className={gear === 'D' ? 'text-emerald-400 font-extrabold' : 'text-slate-500'}>D</span>
          </div>

          <div className="h-10 w-[1px] bg-white/20" />

          {/* Target Speed Setting */}
          <div className="text-[11px] text-slate-300">
            <span className="text-slate-400 block uppercase text-[9px] font-mono font-semibold">Cruise Setpoint</span>
            <span className="text-amber-300 font-mono font-bold">
              {targetSpeedKmh} KM/H
            </span>
          </div>
        </div>

        {/* ========================================================
            REQUESTED SIMPLE CONTROLS: SPEED UP, SPEED LOW, BRAKE
            ======================================================== */}
        <div className="pointer-events-auto flex items-center space-x-3 bg-slate-900/95 backdrop-blur-2xl border border-white/25 p-2 rounded-2xl shadow-2xl">
          {/* Speed Low Button */}
          <button
            onClick={onSpeedLow}
            className="flex items-center space-x-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-sky-300 border border-sky-500/30 rounded-xl text-xs font-bold shadow-lg transition cursor-pointer"
            title="Slow down cruising speed (S or Arrow Down)"
          >
            <ChevronsDown size={18} />
            <span className="tracking-wider uppercase">Speed Low</span>
          </button>

          {/* Brake / Resume Button */}
          <button
            onClick={onToggleBrake}
            className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-black shadow-xl transition cursor-pointer active:scale-95 border ${
              vehicleState.isBraked
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 animate-pulse'
                : 'bg-rose-600 hover:bg-rose-500 text-white border-rose-400'
            }`}
            title="Stop car in place / Resume cruise (Spacebar or B)"
          >
            {vehicleState.isBraked ? (
              <>
                <Play size={18} fill="currentColor" />
                <span className="tracking-wider uppercase">Resume Drive</span>
              </>
            ) : (
              <>
                <Octagon size={18} />
                <span className="tracking-wider uppercase">Brake</span>
              </>
            )}
          </button>

          {/* Speed Up Button */}
          <button
            onClick={onSpeedUp}
            className="flex items-center space-x-2 px-4 py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 border border-amber-300 rounded-xl text-xs font-black shadow-lg shadow-amber-500/30 transition cursor-pointer"
            title="Accelerate cruise speed (W or Arrow Up)"
          >
            <Zap size={18} fill="currentColor" />
            <span className="tracking-wider uppercase">Speed Up</span>
          </button>
        </div>
      </div>
    </div>
  );
};
