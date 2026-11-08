import { useEffect, useRef, useState, useCallback } from 'react';
import {
  CITY_DISTRICTS,
  CityDistrictConfig,
  getEllipsePoint,
  getEllipseHeading,
  getEllipseSpeedMultiplier,
  projectPointToEllipseT
} from '../data/ellipseConfig';

export interface BoundingBox2D {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  name: string;
}

// Bounding boxes for buildings & district landmarks to prevent manual driving through structures
export const buildingColliders: BoundingBox2D[] = [
  // 1. Central Grand Plaza pedestal
  { minX: -4, maxX: 4, minZ: -4, maxZ: 4, name: 'Central Pedestal' },
  // 2. Technology Tower (North apex)
  { minX: -24, maxX: 24, minZ: -102, maxZ: -56, name: 'Technology Tower' },
  // 3. Education Boulevard (Outer West)
  { minX: -95, maxX: -69, minZ: -18, maxZ: 6, name: 'Education Boulevard' },
  // 4. Experience District (Outer South-West)
  { minX: -70, maxX: -42, minZ: 52, maxZ: 80, name: 'Experience District' },
  // 5. Achievements Plaza (Outer South)
  { minX: -18, maxX: 18, minZ: 56, maxZ: 92, name: 'Achievements Plaza' },
  // 6. Bayora Security Citadel (Outer North-West)
  { minX: -76, maxX: -40, minZ: -84, maxZ: -48, name: 'Bayora Citadel' },
  // 7. Eurogrip Ustaad Hub (Outer North-East)
  { minX: 40, maxX: 76, minZ: -84, maxZ: -48, name: 'Eurogrip Ustaad Hub' },
  // 8. WebGuard AI Observatory (Outer East)
  { minX: 66, maxX: 98, minZ: -10, maxZ: 22, name: 'WebGuard AI Observatory' },
  // 9. The Executive Garage (Outer South-East)
  { minX: 46, maxX: 74, minZ: 46, maxZ: 74, name: 'Contact Garage' },
  // 10. PayPal Resolve Spire (Inner East)
  { minX: 8, maxX: 36, minZ: -24, maxZ: 0, name: 'PayPal Resolve Spire' }
];

export interface VehicleState {
  position: [number, number, number];
  rotationY: number;
  speed: number;
  steering: number;
  isHeadlightsOn: boolean;
  isEngineStarted: boolean;
  isBraked: boolean;
  isHandbrake: boolean;
  driveMode: 'manual' | 'cruise';
  targetSpeed: number;
  ellipseT: number;
  currentDistrict: CityDistrictConfig | null;
  nearDistrict: CityDistrictConfig | null;
}

export function useVehicleControls(initialPos?: [number, number, number]) {
  // Start right on the aerodynamic ellipse track at t = 0 (East apex) facing +Z tangent
  const initialT = 0;
  const startPos = initialPos || getEllipsePoint(initialT);
  const startRotY = getEllipseHeading(initialT);

  const [vehicleState, setVehicleState] = useState<VehicleState>({
    position: startPos,
    rotationY: startRotY,
    speed: 6.67, // ~24 km/h
    steering: 0,
    isHeadlightsOn: true,
    isEngineStarted: true,
    isBraked: false,
    isHandbrake: false,
    driveMode: 'cruise', // Autonomous continuous cruise by default
    targetSpeed: 6.67,
    ellipseT: initialT,
    currentDistrict: null,
    nearDistrict: null
  });

  const stateRef = useRef<VehicleState>(vehicleState);
  useEffect(() => {
    stateRef.current = vehicleState;
  }, [vehicleState]);

  const currentSpeed = useRef<number>(6.67);
  const currentSteering = useRef<number>(0);
  const ellipseTRef = useRef<number>(initialT);
  const isBrakedRef = useRef<boolean>(false);
  const isHandbrakeRef = useRef<boolean>(false);
  const targetSpeedRef = useRef<number>(6.67);
  const driveModeRef = useRef<'manual' | 'cruise'>('cruise');

  const keysPressed = useRef<{ [key: string]: boolean }>({});

  const setControlKey = useCallback((key: string, pressed: boolean) => {
    keysPressed.current[key.toLowerCase()] = pressed;
  }, []);

  // Mode Toggle: Manual Drive vs Autonomous Cruise
  const toggleDriveMode = useCallback(() => {
    const nextMode = driveModeRef.current === 'manual' ? 'cruise' : 'manual';
    driveModeRef.current = nextMode;

    if (nextMode === 'cruise') {
      isBrakedRef.current = false;
      isHandbrakeRef.current = false;
      targetSpeedRef.current = 6.67;
      if (currentSpeed.current < 3.0) {
        currentSpeed.current = 5.0;
      }
      // Project current position onto closest parameter T on the ellipse
      const [curX, , curZ] = stateRef.current.position;
      ellipseTRef.current = projectPointToEllipseT(curX, curZ);
    }

    setVehicleState(prev => ({
      ...prev,
      driveMode: nextMode,
      isBraked: false,
      isHandbrake: false
    }));
  }, []);

  // Speed Up: in cruise mode increases cruising velocity; in manual gives a forward boost
  const speedUp = useCallback(() => {
    isBrakedRef.current = false;
    const newSpeed = Math.min(targetSpeedRef.current + 2.0, 11.0); // up to ~40 km/h
    targetSpeedRef.current = newSpeed;
    if (driveModeRef.current === 'manual') {
      currentSpeed.current = Math.min(currentSpeed.current + 3.0, 24.0);
    }
    setVehicleState(prev => ({
      ...prev,
      isBraked: false,
      targetSpeed: newSpeed
    }));
  }, []);

  // Speed Low: decreases cruising velocity
  const speedLow = useCallback(() => {
    const newSpeed = Math.max(targetSpeedRef.current - 2.0, 3.5); // down to ~12 km/h
    targetSpeedRef.current = newSpeed;
    setVehicleState(prev => ({
      ...prev,
      targetSpeed: newSpeed
    }));
  }, []);

  // Brake / Handbrake toggle
  const toggleBrake = useCallback(() => {
    isBrakedRef.current = !isBrakedRef.current;
    isHandbrakeRef.current = isBrakedRef.current;
    setVehicleState(prev => ({
      ...prev,
      isBraked: isBrakedRef.current,
      isHandbrake: isHandbrakeRef.current
    }));
  }, []);

  // Resume driving smoothly
  const resumeDrive = useCallback(() => {
    isBrakedRef.current = false;
    isHandbrakeRef.current = false;
    currentSpeed.current = Math.max(currentSpeed.current, 5.0);
    setVehicleState(prev => ({
      ...prev,
      isBraked: false,
      isHandbrake: false
    }));
  }, []);

  // Toggle headlights
  const toggleLights = useCallback(() => {
    setVehicleState(prev => ({
      ...prev,
      isHeadlightsOn: !prev.isHeadlightsOn
    }));
  }, []);

  // Reset vehicle to ellipse track start
  const resetPosition = useCallback((paramT = 0) => {
    ellipseTRef.current = paramT;
    const pos = getEllipsePoint(paramT);
    const rotY = getEllipseHeading(paramT);
    currentSpeed.current = driveModeRef.current === 'cruise' ? 6.67 : 0;
    currentSteering.current = 0;
    isBrakedRef.current = false;
    isHandbrakeRef.current = false;
    targetSpeedRef.current = 6.67;

    setVehicleState({
      position: pos,
      rotationY: rotY,
      speed: currentSpeed.current,
      steering: 0,
      isHeadlightsOn: true,
      isEngineStarted: true,
      isBraked: false,
      isHandbrake: false,
      driveMode: driveModeRef.current,
      targetSpeed: 6.67,
      ellipseT: paramT,
      currentDistrict: null,
      nearDistrict: null
    });
  }, []);

  // Collision detection helper: checks if [x, z] penetrates any building bounding box
  const checkCollision = useCallback((x: number, z: number): boolean => {
    const carRadius = 1.6;
    for (const b of buildingColliders) {
      if (
        x + carRadius > b.minX &&
        x - carRadius < b.maxX &&
        z + carRadius > b.minZ &&
        z - carRadius < b.maxZ
      ) {
        return true;
      }
    }
    return false;
  }, []);

  // Keyboard controls listener (WASD, Arrows, Space, R)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      const key = e.key.toLowerCase();
      keysPressed.current[key] = true;

      if (key === 'r') {
        resetPosition();
      } else if (key === ' ' || key === 'b') {
        toggleBrake();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysPressed.current[key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [resetPosition, toggleBrake]);

  // Main vehicle physics & continuous elliptical navigation loop
  const updatePhysics = useCallback((delta: number) => {
    const keys = keysPressed.current;
    let { position, rotationY, isHeadlightsOn, isEngineStarted } = stateRef.current;
    const mode = driveModeRef.current;

    let candidateX = position[0];
    let candidateZ = position[2];

    if (mode === 'cruise') {
      // ==========================================
      // 1. CONTINUOUS AUTONOMOUS ELLIPTICAL CRUISING
      // Infinite seamless laps with exact tangent alignment
      // ==========================================
      const mustStop = isBrakedRef.current;
      const effectiveTargetSpeed = mustStop ? 0 : targetSpeedRef.current;
      const accelDecelRate = mustStop ? 14.0 : 6.0;

      if (currentSpeed.current < effectiveTargetSpeed) {
        currentSpeed.current += accelDecelRate * delta;
        if (currentSpeed.current > effectiveTargetSpeed) currentSpeed.current = effectiveTargetSpeed;
      } else if (currentSpeed.current > effectiveTargetSpeed) {
        currentSpeed.current -= accelDecelRate * delta;
        if (currentSpeed.current < effectiveTargetSpeed) currentSpeed.current = effectiveTargetSpeed;
      }

      // Advance ellipse parameter t with arc-length compensation
      if (currentSpeed.current > 0.01) {
        const speedMultiplier = getEllipseSpeedMultiplier(ellipseTRef.current);
        const dt = currentSpeed.current * speedMultiplier * delta;
        ellipseTRef.current = (ellipseTRef.current + dt) % (Math.PI * 2);
      }

      // Exact track point & heading
      const exactPos = getEllipsePoint(ellipseTRef.current);
      const exactHeading = getEllipseHeading(ellipseTRef.current);

      // Smooth merge if the car was transitioning from off-road manual
      candidateX = exactPos[0];
      candidateZ = exactPos[2];

      // Smooth heading interpolation to eliminate any micro-jitter
      let angleDiff = exactHeading - rotationY;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

      rotationY += angleDiff * Math.min(delta * 10.0, 1.0);

      // Front wheel steering corresponds to turn angle
      const targetSteering = Math.max(Math.min(angleDiff * 1.5, 0.45), -0.45);
      currentSteering.current += (targetSteering - currentSteering.current) * Math.min(delta * 8.0, 1.0);
    } else {
      // ==========================================
      // 2. ACTUAL MANUAL GTA-STYLE DRIVING
      // W/A/S/D / Arrows / Space / R
      // ==========================================
      const forward = (keys['w'] || keys['arrowup']) ? 1 : 0;
      const backward = (keys['s'] || keys['arrowdown']) ? 1 : 0;
      const steerLeft = (keys['a'] || keys['arrowleft']) ? 1 : 0;
      const steerRight = (keys['d'] || keys['arrowright']) ? 1 : 0;
      const handbrake = keys[' '] ? 1 : 0;

      const targetThrottle = forward - backward;
      const targetSteer = steerLeft - steerRight;

      const maxForwardSpeed = 22.0;
      const maxReverseSpeed = -7.5;
      const accelRate = 14.0;
      const brakeRate = 20.0;
      const coastFriction = 4.5;

      if (handbrake) {
        currentSpeed.current -= Math.sign(currentSpeed.current) * 26.0 * delta;
        if (Math.abs(currentSpeed.current) < 0.2) currentSpeed.current = 0;
      } else if (targetThrottle > 0) {
        currentSpeed.current += accelRate * delta;
        if (currentSpeed.current > maxForwardSpeed) currentSpeed.current = maxForwardSpeed;
      } else if (targetThrottle < 0) {
        if (currentSpeed.current > 0.5) {
          currentSpeed.current -= brakeRate * delta;
          if (currentSpeed.current < 0) currentSpeed.current = 0;
        } else {
          currentSpeed.current -= (accelRate * 0.6) * delta;
          if (currentSpeed.current < maxReverseSpeed) currentSpeed.current = maxReverseSpeed;
        }
      } else {
        if (Math.abs(currentSpeed.current) < 0.1) {
          currentSpeed.current = 0;
        } else {
          currentSpeed.current -= Math.sign(currentSpeed.current) * coastFriction * delta;
        }
      }

      // Progressive steering
      const maxSteerAngle = 0.48;
      const targetSteerVal = targetSteer * maxSteerAngle;
      currentSteering.current += (targetSteerVal - currentSteering.current) * Math.min(delta * 8.0, 1.0);

      // Turn vehicle in motion
      if (Math.abs(currentSpeed.current) > 0.05) {
        const turnDirection = currentSpeed.current >= 0 ? 1.85 : -1.85;
        rotationY += currentSteering.current * turnDirection * delta;
      }

      // Proposed manual movement
      const moveDx = Math.sin(rotationY) * currentSpeed.current * delta;
      const moveDz = Math.cos(rotationY) * currentSpeed.current * delta;

      candidateX += moveDx;
      candidateZ += moveDz;

      // Outer boundary limit
      const boundLimit = 110.0;
      candidateX = Math.max(Math.min(candidateX, boundLimit), -boundLimit);
      candidateZ = Math.max(Math.min(candidateZ, boundLimit), -boundLimit);

      // Building Collision Detection & Sliding Resolution
      if (checkCollision(candidateX, candidateZ)) {
        if (!checkCollision(candidateX, position[2])) {
          candidateZ = position[2];
          currentSpeed.current *= 0.85;
        } else if (!checkCollision(position[0], candidateZ)) {
          candidateX = position[0];
          currentSpeed.current *= 0.85;
        } else {
          candidateX = position[0];
          candidateZ = position[2];
          currentSpeed.current = -currentSpeed.current * 0.2;
        }
      }

      // Update projected parameter t
      ellipseTRef.current = projectPointToEllipseT(candidateX, candidateZ);
    }

    // ==========================================
    // 3. DISTRICT PROXIMITY DETECTION
    // Detects when the car approaches any portfolio district
    // ==========================================
    let closestDistrict: CityDistrictConfig | null = null;
    let closestDist = Infinity;

    for (const d of CITY_DISTRICTS) {
      const dist = Math.hypot(candidateX - d.position[0], candidateZ - d.position[2]);
      if (dist < closestDist) {
        closestDist = dist;
        closestDistrict = d;
      }
    }

    const nearDistrict = closestDist < 28.0 ? closestDistrict : null;
    const currentDistrict = closestDist < 16.0 ? closestDistrict : null;

    const nextState: VehicleState = {
      position: [candidateX, 0.02, candidateZ],
      rotationY,
      speed: currentSpeed.current,
      steering: currentSteering.current,
      isHeadlightsOn,
      isEngineStarted,
      isBraked: isBrakedRef.current,
      isHandbrake: isHandbrakeRef.current,
      driveMode: driveModeRef.current,
      targetSpeed: targetSpeedRef.current,
      ellipseT: ellipseTRef.current,
      currentDistrict,
      nearDistrict
    };

    setVehicleState(nextState);
    return nextState;
  }, [checkCollision]);

  return {
    vehicleState,
    updatePhysics,
    speedUp,
    speedLow,
    toggleBrake,
    resumeDrive,
    toggleLights,
    toggleDriveMode,
    resetPosition,
    setControlKey,
    setVehicleState
  };
}
