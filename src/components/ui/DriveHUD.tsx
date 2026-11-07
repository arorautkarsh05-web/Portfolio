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
  const speedKmh = Math.round(Math.abs(vehicleState.speed) * 8.5);
  const gear = vehicleState.speed > 0.4 ? 'D' : vehicleState.speed < -0.4 ? 'R' : 'P';

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none flex flex-col justify-between p-4 pt-16">
      {/* Top Banner Notice */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="bg-slate-900/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-xs text-slate-200 shadow-2xl max-w-sm">
          <div className="flex items-center space-x-2 text-amber-400 font-extrabold mb-1">
            <Compass size={15} />
            <span>SMOOTH FREE DRIVE ACTIVE</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Use <strong className="text-amber-300">W / S</strong> to accelerate & brake, <strong className="text-amber-300">A / D</strong> to steer smoothly. Drive toward any district!
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
            <span>Reset Pos</span>
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
            <span>Lights</span>
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

      {/* Bottom Dashboard Cluster */}
      <div className="flex justify-between items-end">
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
            <span className={gear === 'P' ? 'text-amber-400 font-extrabold' : 'text-slate-500'}>P</span>
            <span className={gear === 'D' ? 'text-emerald-400 font-extrabold' : 'text-slate-500'}>D</span>
            <span className={gear === 'R' ? 'text-rose-400 font-extrabold' : 'text-slate-500'}>R</span>
          </div>

          <div className="h-10 w-[1px] bg-white/20" />

          {/* District Telemetry */}
          <div className="text-[11px] text-slate-300">
            <span className="text-slate-400 block uppercase text-[9px] font-mono font-semibold">City Coordinates</span>
            <span className="text-amber-300 font-mono font-bold">
              X: {Math.round(vehicleState.position[0])} | Z: {Math.round(vehicleState.position[2])}
            </span>
          </div>
        </div>

        {/* Touch / Onscreen Driving Controls */}
        <div className="pointer-events-auto flex flex-col items-center space-y-2 pb-2">
          {/* Forward */}
          <button
            onMouseDown={() => onVirtualControl('w', true)}
            onMouseUp={() => onVirtualControl('w', false)}
            onTouchStart={() => onVirtualControl('w', true)}
            onTouchEnd={() => onVirtualControl('w', false)}
            className="w-13 h-13 bg-slate-900/90 active:bg-amber-400 active:text-slate-950 text-white rounded-2xl backdrop-blur-md border border-white/20 flex items-center justify-center transition shadow-2xl cursor-pointer"
          >
            <ArrowUp size={22} />
          </button>

          {/* Left / Reverse / Right */}
          <div className="flex space-x-2">
            <button
              onMouseDown={() => onVirtualControl('a', true)}
              onMouseUp={() => onVirtualControl('a', false)}
              onTouchStart={() => onVirtualControl('a', true)}
              onTouchEnd={() => onVirtualControl('a', false)}
              className="w-13 h-13 bg-slate-900/90 active:bg-amber-400 active:text-slate-950 text-white rounded-2xl backdrop-blur-md border border-white/20 flex items-center justify-center transition shadow-2xl cursor-pointer"
            >
              <ArrowLeft size={22} />
            </button>
            <button
              onMouseDown={() => onVirtualControl('s', true)}
              onMouseUp={() => onVirtualControl('s', false)}
              onTouchStart={() => onVirtualControl('s', true)}
              onTouchEnd={() => onVirtualControl('s', false)}
              className="w-13 h-13 bg-slate-900/90 active:bg-amber-400 active:text-slate-950 text-white rounded-2xl backdrop-blur-md border border-white/20 flex items-center justify-center transition shadow-2xl cursor-pointer"
            >
              <ArrowDown size={22} />
            </button>
            <button
              onMouseDown={() => onVirtualControl('d', true)}
              onMouseUp={() => onVirtualControl('d', false)}
              onTouchStart={() => onVirtualControl('d', true)}
              onTouchEnd={() => onVirtualControl('d', false)}
              className="w-13 h-13 bg-slate-900/90 active:bg-amber-400 active:text-slate-950 text-white rounded-2xl backdrop-blur-md border border-white/20 flex items-center justify-center transition shadow-2xl cursor-pointer"
            >
              <ArrowRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
