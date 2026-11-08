import React from 'react';
import {
  RotateCcw,
  Lightbulb,
  X,
  Zap,
  ChevronsDown,
  Octagon,
  Play,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Gauge,
  Sliders,
  Sparkles
} from 'lucide-react';
import { VehicleState } from '../../hooks/useVehicleControls';
import { CityMinimap } from './CityMinimap';
import { CityDistrictConfig } from '../../data/ellipseConfig';

interface DriveHUDProps {
  vehicleState: VehicleState;
  onExitDriving: () => void;
  onResetPosition: () => void;
  onToggleLights: () => void;
  onToggleDriveMode: () => void;
  onSpeedUp: () => void;
  onSpeedLow: () => void;
  onToggleBrake: () => void;
  onVirtualControl: (key: string, pressed: boolean) => void;
  onInspectDistrict?: (district: CityDistrictConfig) => void;
}

export const DriveHUD: React.FC<DriveHUDProps> = ({
  vehicleState,
  onExitDriving,
  onResetPosition,
  onToggleLights,
  onToggleDriveMode,
  onSpeedUp,
  onSpeedLow,
  onToggleBrake,
  onVirtualControl,
  onInspectDistrict
}) => {
  const speedKmh = Math.round(Math.abs(vehicleState.speed) * 3.6); // standard m/s to km/h
  const targetSpeedKmh = Math.round(vehicleState.targetSpeed * 3.6);
  const isMovingForward = vehicleState.speed > 0.4;
  const isReversing = vehicleState.speed < -0.4;
  const gear = vehicleState.isHandbrake || vehicleState.isBraked || Math.abs(vehicleState.speed) < 0.2
    ? 'P'
    : isMovingForward
    ? 'D'
    : isReversing
    ? 'R'
    : 'N';

  const isManual = vehicleState.driveMode === 'manual';
  const nearDistrict = vehicleState.nearDistrict;

  return (
    <div className="fixed inset-0 pointer-events-none z-35 select-none flex flex-col justify-between p-4 pt-20 sm:pt-24">
      {/* Top Banner Notice & Actions */}
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-start pointer-events-auto gap-3">
        {/* Status Card */}
        <div className="bg-slate-900/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-xs text-slate-200 shadow-2xl max-w-md">
          <div className="flex items-center space-x-2 font-extrabold mb-1">
            <Gauge size={15} className="text-amber-400" />
            <span className="text-white">
              {isManual ? 'MANUAL SPORTS DRIVE' : 'CONTINUOUS AUTONOMOUS CRUISE'}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                vehicleState.isHandbrake || vehicleState.isBraked
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {vehicleState.isHandbrake ? 'HANDBRAKE' : vehicleState.isBraked ? 'PAUSED' : 'CRUISING'}
            </span>
          </div>

          <p className="text-[11px] text-slate-300">
            {isManual ? (
              <>
                <strong className="text-amber-300">W / S:</strong> Throttle & Reverse •{' '}
                <strong className="text-amber-300">A / D:</strong> Steer •{' '}
                <strong className="text-amber-300">Space:</strong> Handbrake •{' '}
                <strong className="text-amber-300">E:</strong> Inspect •{' '}
                <strong className="text-amber-300">R:</strong> Reset
              </>
            ) : (
              <>
                Smoothly cruising the Grand Elliptical Boulevard.{' '}
                {nearDistrict ? (
                  <span className="text-sky-300 font-bold">Passing {nearDistrict.name}</span>
                ) : (
                  <span className="text-slate-400">Press E or click landmark to inspect</span>
                )}
              </>
            )}
          </p>
        </div>

        {/* Top Right Controls & Minimap */}
        <div className="flex flex-col items-end space-y-2 pointer-events-auto">
          <div className="flex items-center space-x-2">
            {/* Drive Mode Toggle (Manual vs Cruise) */}
            <button
              onClick={onToggleDriveMode}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold border shadow-lg transition cursor-pointer ${
                isManual
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-300 shadow-amber-500/20'
                  : 'bg-sky-600 hover:bg-sky-500 text-white border-sky-400 shadow-sky-500/20'
              }`}
              title="Switch between Manual driving and Autonomous cruise"
            >
              <Sliders size={14} />
              <span>{isManual ? 'Mode: Manual' : 'Mode: Auto Cruise'}</span>
            </button>

            {/* Reset Car Position */}
            <button
              onClick={onResetPosition}
              className="flex items-center space-x-1.5 px-3 py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-white/20 rounded-xl text-xs font-semibold shadow-lg transition cursor-pointer"
              title="Reset sports car to track start"
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

          {/* Integrated Elliptical Navigation Minimap */}
          <CityMinimap
            vehicleState={vehicleState}
            onSelectDistrict={onInspectDistrict}
            className="hidden sm:flex"
          />
        </div>
      </div>

      {/* Approaching Landmark Non-Intrusive Interaction Indicator */}
      {nearDistrict && (
        <div className="self-center pointer-events-auto animate-in fade-in slide-in-from-top-3 duration-300">
          <button
            onClick={() => onInspectDistrict?.(nearDistrict)}
            className="flex items-center space-x-3 px-5 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-800 text-white border-2 border-amber-400 shadow-2xl shadow-amber-500/30 transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles size={16} className="text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="text-xs sm:text-sm font-bold tracking-wide">
              Approaching <strong className="text-amber-300">{nearDistrict.name}</strong> — Click or Press <kbd className="px-1.5 py-0.5 rounded bg-white/20 font-mono text-xs">E</kbd> to Inspect
            </span>
          </button>
        </div>
      )}

      {/* Bottom Dashboard Cluster & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-3 pb-2">
        {/* Digital Speedometer Gauge */}
        <div className="pointer-events-auto bg-slate-900/95 backdrop-blur-xl border border-white/20 p-3 sm:p-4 rounded-2xl shadow-2xl flex items-center space-x-4">
          <div className="text-center min-w-[50px]">
            <div className="text-3xl font-black tracking-tight text-white font-mono">
              {speedKmh}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">
              KM / H
            </div>
          </div>

          <div className="h-10 w-[1px] bg-white/20" />

          {/* Gear Indicator (P / R / N / D) */}
          <div className="flex flex-col items-center space-y-0.5 text-xs font-bold font-mono">
            <span className={gear === 'P' ? 'text-amber-400 font-black' : 'text-slate-600'}>P</span>
            <span className={gear === 'R' ? 'text-rose-400 font-black' : 'text-slate-600'}>R</span>
            <span className={gear === 'D' ? 'text-emerald-400 font-black' : 'text-slate-600'}>D</span>
          </div>

          <div className="h-10 w-[1px] bg-white/20" />

          {/* Coordinates / Setpoint */}
          <div className="text-[11px] text-slate-300">
            <span className="text-slate-400 block uppercase text-[9px] font-mono font-semibold">
              {isManual ? 'City Telemetry' : 'Cruise Target'}
            </span>
            <span className="text-amber-300 font-mono font-bold">
              {isManual
                ? `X: ${Math.round(vehicleState.position[0])} | Z: ${Math.round(vehicleState.position[2])}`
                : `${targetSpeedKmh} KM/H`}
            </span>
          </div>
        </div>

        {/* Dynamic Controls: Manual Touch Arrows OR Cruise Simple Buttons */}
        {isManual ? (
          /* MANUAL TOUCH / ONSCREEN CONTROLS */
          <div className="pointer-events-auto flex items-center space-x-3 bg-slate-900/95 backdrop-blur-2xl border border-white/25 p-2 rounded-2xl shadow-2xl">
            {/* Steering Controls */}
            <div className="flex space-x-1.5">
              <button
                onMouseDown={() => onVirtualControl('a', true)}
                onMouseUp={() => onVirtualControl('a', false)}
                onTouchStart={() => onVirtualControl('a', true)}
                onTouchEnd={() => onVirtualControl('a', false)}
                className="w-11 h-11 bg-slate-800 hover:bg-slate-700 active:bg-amber-400 active:text-slate-950 text-white rounded-xl border border-white/20 flex items-center justify-center transition shadow-lg cursor-pointer"
                title="Steer Left (A or Arrow Left)"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onMouseDown={() => onVirtualControl('d', true)}
                onMouseUp={() => onVirtualControl('d', false)}
                onTouchStart={() => onVirtualControl('d', true)}
                onTouchEnd={() => onVirtualControl('d', false)}
                className="w-11 h-11 bg-slate-800 hover:bg-slate-700 active:bg-amber-400 active:text-slate-950 text-white rounded-xl border border-white/20 flex items-center justify-center transition shadow-lg cursor-pointer"
                title="Steer Right (D or Arrow Right)"
              >
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Handbrake Button */}
            <button
              onClick={onToggleBrake}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                vehicleState.isHandbrake
                  ? 'bg-rose-600 text-white border-rose-400 font-black animate-pulse'
                  : 'bg-white/10 hover:bg-white/15 text-slate-300 border-white/15'
              }`}
              title="Handbrake (Spacebar)"
            >
              Handbrake
            </button>

            {/* Throttle & Brake/Reverse */}
            <div className="flex space-x-1.5">
              <button
                onMouseDown={() => onVirtualControl('s', true)}
                onMouseUp={() => onVirtualControl('s', false)}
                onTouchStart={() => onVirtualControl('s', true)}
                onTouchEnd={() => onVirtualControl('s', false)}
                className="w-11 h-11 bg-slate-800 hover:bg-slate-700 active:bg-rose-500 active:text-white text-white rounded-xl border border-white/20 flex items-center justify-center transition shadow-lg cursor-pointer"
                title="Brake / Reverse (S or Arrow Down)"
              >
                <ArrowDown size={18} />
              </button>
              <button
                onMouseDown={() => onVirtualControl('w', true)}
                onMouseUp={() => onVirtualControl('w', false)}
                onTouchStart={() => onVirtualControl('w', true)}
                onTouchEnd={() => onVirtualControl('w', false)}
                className="w-11 h-11 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 rounded-xl border border-amber-300 flex items-center justify-center transition shadow-lg shadow-amber-500/20 cursor-pointer"
                title="Accelerate Forward (W or Arrow Up)"
              >
                <ArrowUp size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ) : (
          /* AUTONOMOUS CRUISE CONTROLS: SPEED UP, SPEED LOW, BRAKE */
          <div className="pointer-events-auto flex items-center space-x-2 sm:space-x-3 bg-slate-900/95 backdrop-blur-2xl border border-white/25 p-2 rounded-2xl shadow-2xl">
            <button
              onClick={onSpeedLow}
              className="flex items-center space-x-1.5 px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-sky-300 border border-sky-500/30 rounded-xl text-xs font-bold shadow-lg transition cursor-pointer"
              title="Slow down cruising speed"
            >
              <ChevronsDown size={16} />
              <span className="tracking-wider uppercase">Speed Low</span>
            </button>

            <button
              onClick={onToggleBrake}
              className={`flex items-center space-x-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs font-black shadow-xl transition cursor-pointer active:scale-95 border ${
                vehicleState.isBraked
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 animate-pulse'
                  : 'bg-rose-600 hover:bg-rose-500 text-white border-rose-400'
              }`}
              title="Pause or Resume cruising"
            >
              {vehicleState.isBraked ? (
                <>
                  <Play size={16} fill="currentColor" />
                  <span className="tracking-wider uppercase">Resume</span>
                </>
              ) : (
                <>
                  <Octagon size={16} />
                  <span className="tracking-wider uppercase">Pause</span>
                </>
              )}
            </button>

            <button
              onClick={onSpeedUp}
              className="flex items-center space-x-1.5 px-3 sm:px-4 py-2.5 sm:py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 border border-amber-300 rounded-xl text-xs font-black shadow-lg shadow-amber-500/30 transition cursor-pointer"
              title="Accelerate cruise speed"
            >
              <Zap size={16} fill="currentColor" />
              <span className="tracking-wider uppercase">Speed Up</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
