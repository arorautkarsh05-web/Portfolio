import React from 'react';
import { Compass } from 'lucide-react';
import { CITY_DISTRICTS, CityDistrictConfig } from '../../data/ellipseConfig';
import { VehicleState } from '../../hooks/useVehicleControls';

interface CityMinimapProps {
  vehicleState: VehicleState;
  onSelectDistrict?: (district: CityDistrictConfig) => void;
  className?: string;
}

export const CityMinimap: React.FC<CityMinimapProps> = ({
  vehicleState,
  onSelectDistrict,
  className = ''
}) => {
  // SVG dimensions
  const width = 150;
  const height = 120;
  const cx = width / 2;
  const cy = height / 2;

  // Scale: World [-95, 95] X and [-90, 90] Z comfortably into SVG viewport with safety margins
  const scaleX = (width * 0.40) / 56;
  const scaleZ = (height * 0.38) / 44;

  const worldToSvg = (x: number, z: number): [number, number] => {
    return [cx + x * scaleX, cy + z * scaleZ];
  };

  const [carX, carY] = worldToSvg(vehicleState.position[0], vehicleState.position[2]);
  const headingDeg = (vehicleState.rotationY * 180) / Math.PI;

  return (
    <div
      className={`pointer-events-auto bg-slate-950/90 backdrop-blur-xl border border-white/20 rounded-2xl p-2.5 shadow-2xl select-none flex flex-col items-center ${className}`}
      title="UTKARSH CITY GPS Minimap"
    >
      <div className="w-full flex items-center justify-between text-[10px] font-mono font-bold tracking-wider text-slate-400 mb-1 px-1">
        <div className="flex items-center space-x-1 text-amber-400">
          <Compass size={11} className="text-amber-400 animate-pulse" />
          <span>GPS RADAR</span>
        </div>
        <span className="text-slate-500 font-semibold">N ↑</span>
      </div>

      <svg width={width} height={height} className="overflow-visible">
        {/* Radar Background Radial Gradients */}
        <defs>
          <radialGradient id="minimapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width={width} height={height} rx={12} fill="url(#minimapGlow)" />

        {/* Central Plaza Roundabout */}
        <circle cx={cx} cy={cy} r={8} fill="#334155" stroke="#f59e0b" strokeWidth={1} />

        {/* Connector Boulevards */}
        <line x1={cx - 36} y1={cy} x2={cx + 36} y2={cy} stroke="#1e293b" strokeWidth={4} strokeLinecap="round" />
        <line x1={cx} y1={cy - 28} x2={cx} y2={cy + 28} stroke="#1e293b" strokeWidth={4} strokeLinecap="round" />

        {/* Outer Glowing Azure Curb */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={56 * scaleX + 3}
          ry={44 * scaleZ + 3}
          fill="none"
          stroke="#0284c7"
          strokeWidth={1.2}
          opacity={0.8}
        />

        {/* Elliptical Asphalt Roadbed */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={56 * scaleX}
          ry={44 * scaleZ}
          fill="none"
          stroke="#1e293b"
          strokeWidth={6.5}
        />

        {/* Inner Glowing Sunset Gold Curb */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={56 * scaleX - 3}
          ry={44 * scaleZ - 3}
          fill="none"
          stroke="#d97706"
          strokeWidth={1.2}
          opacity={0.8}
        />

        {/* Dashed Centerline Highway */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={56 * scaleX}
          ry={44 * scaleZ}
          fill="none"
          stroke="#fbbf24"
          strokeWidth={0.8}
          strokeDasharray="2,3"
        />

        {/* District Landmark Markers along both sides */}
        {CITY_DISTRICTS.map(district => {
          const [dx, dy] = worldToSvg(district.position[0], district.position[2]);
          const isNear = vehicleState.nearDistrict?.id === district.id;

          return (
            <g
              key={district.id}
              onClick={() => onSelectDistrict?.(district)}
              className="cursor-pointer transition hover:scale-125"
            >
              {/* Highlight Pulse Ripple */}
              {isNear && (
                <circle
                  cx={dx}
                  cy={dy}
                  r={7}
                  fill={district.color}
                  opacity={0.4}
                  className="animate-ping"
                />
              )}

              {/* District Node */}
              <circle
                cx={dx}
                cy={dy}
                r={isNear ? 4.5 : 3}
                fill={district.color}
                stroke="#ffffff"
                strokeWidth={isNear ? 1.5 : 0.8}
              />
            </g>
          );
        })}

        {/* Player Supercar Position & Directional Arrow */}
        <g transform={`translate(${carX}, ${carY}) rotate(${-headingDeg})`}>
          {/* Subtle vehicle underglow radar pulse */}
          <circle r={6.5} fill="#fbbf24" opacity={0.35} />
          {/* Vehicle Arrow Chevron */}
          <polygon
            points="0,-5 3.5,4 0,2.2 -3.5,4"
            fill="#fbbf24"
            stroke="#ffffff"
            strokeWidth={0.8}
          />
        </g>
      </svg>

      {/* Current District HUD Readout */}
      <div className="w-full text-center mt-1 pt-1 border-t border-white/10">
        <span className="text-[9px] font-mono uppercase font-bold text-sky-300 truncate block max-w-[140px]">
          {vehicleState.nearDistrict ? `📍 ${vehicleState.nearDistrict.name}` : 'Grand Elliptical Loop'}
        </span>
      </div>
    </div>
  );
};

