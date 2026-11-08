import { useEffect, useRef, useState, useCallback } from 'react';
import { circuitWaypoints, CircuitWaypoint } from '../data/waypoints';

export interface BoundingBox2D {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  name: string;
}

// Bounding boxes for buildings & district landmarks to prevent driving through structures
export const buildingColliders: BoundingBox2D[] = [
  // 1. Central Plaza character pedestal
  { minX: -2.5, maxX: 2.5, minZ: -2.5, maxZ: 2.5, name: 'Central Pedestal' },
  // 2. Technology Tower (North Boulevard)
  { minX: -16, maxX: 16, minZ: -62, maxZ: -36, name: 'Technology Tower' },
  // 3. Education Boulevard (Galgotias Campus)
  { minX: -48, maxX: -22, minZ: -26, maxZ: -4, name: 'Education Boulevard' },
  // 4. Bayora Security Citadel (North-West)
  { minX: -58, maxX: -32, minZ: -48, maxZ: -22, name: 'Bayora Citadel' },
  // 5. Eurogrip Ustaad Hub (North-East)
  { minX: 32, maxX: 58, minZ: -48, maxZ: -22, name: 'Eurogrip Ustaad Hub' },
  // 6. WebGuard AI Observatory (South-East)
  { minX: 32, maxX: 58, minZ: 22, maxZ: 48, name: 'WebGuard AI Observatory' },
  // 7. The Executive Garage (South-East)
  { minX: 18, maxX: 42, minZ: 24, maxZ: 46, name: 'Contact Garage' },
  // 8. Experience District Skybridge (South)
  { minX: -42, maxX: -18, minZ: 26, maxZ: 44, name: 'Experience District' },
  // 9. PayPal Resolve Spire (South-West)
  { minX: -58, maxX: -32, minZ: 24, maxZ: 46, name: 'PayPal Resolve Spire' },

  // Skyline Flank Towers
  { minX: 68, maxX: 92, minZ: -35, maxZ: 35, name: 'East Flank Towers' },
  { minX: -92, maxX: -68, minZ: -35, maxZ: 35, name: 'West Flank Towers' },
  { minX: -35, maxX: 35, minZ: -95, maxZ: -70, name: 'North Perimeter Towers' },
  { minX: -35, maxX: 35, minZ: 70, maxZ: 95, name: 'South Perimeter Towers' }
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
  currentWaypointIndex: number;
  targetModuleName: string;
  activeStop: CircuitWaypoint | null;
  isStoppedAtModule: boolean;
}

export function useVehicleControls(initialPos: [number, number, number] = [0, 0.45, 8]) {
  const [vehicleState, setVehicleState] = useState<VehicleState>({
    position: initialPos,
    rotationY: -Math.PI / 2, // Facing west toward first boulevard
    speed: 0,
    steering: 0,
    isHeadlightsOn: true,
    isEngineStarted: true,
    isBraked: false,
    isHandbrake: false,
    driveMode: 'manual', // Manual by default with seamless cruise option
    targetSpeed: 14.0,
    currentWaypointIndex: 1,
    targetModuleName: circuitWaypoints[1].name,
    activeStop: null,
    isStoppedAtModule: false
  });

  const stateRef = useRef<VehicleState>(vehicleState);
  useEffect(() => {
    stateRef.current = vehicleState;
  }, [vehicleState]);

  const currentSpeed = useRef<number>(0);
  const currentSteering = useRef<number>(0);
  const waypointIdxRef = useRef<number>(1);
  const isBrakedRef = useRef<boolean>(false);
  const isHandbrakeRef = useRef<boolean>(false);
  const targetSpeedRef = useRef<number>(14.0);
  const isStoppedAtModuleRef = useRef<boolean>(false);
  const lastPromptedWaypointId = useRef<string | null>(null);
  const driveModeRef = useRef<'manual' | 'cruise'>('manual');

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
      isStoppedAtModuleRef.current = false;
      if (currentSpeed.current < 6.0) {
        currentSpeed.current = 8.0;
      }
    }
    setVehicleState(prev => ({
      ...prev,
      driveMode: nextMode,
      isBraked: false,
      isStoppedAtModule: false
    }));
  }, []);

  // Speed Up: in cruise mode, increases cruising velocity; in manual, provides forward burst
  const speedUp = useCallback(() => {
    isBrakedRef.current = false;
    isStoppedAtModuleRef.current = false;
    const newSpeed = Math.min(targetSpeedRef.current + 3.5, 24.0);
    targetSpeedRef.current = newSpeed;
    if (driveModeRef.current === 'manual') {
      currentSpeed.current = Math.min(currentSpeed.current + 4.0, 22.0);
    }
    setVehicleState(prev => ({
      ...prev,
      isBraked: false,
      isStoppedAtModule: false,
      targetSpeed: newSpeed
    }));
  }, []);

  // Speed Low: decreases cruising velocity
  const speedLow = useCallback(() => {
    const newSpeed = Math.max(targetSpeedRef.current - 3.5, 4.5);
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

  // Resume driving to next waypoint / module
  const resumeDrive = useCallback(() => {
    isBrakedRef.current = false;
    isStoppedAtModuleRef.current = false;
    waypointIdxRef.current = (waypointIdxRef.current + 1) % circuitWaypoints.length;
    const nextWp = circuitWaypoints[waypointIdxRef.current];

    setVehicleState(prev => ({
      ...prev,
      isBraked: false,
      isStoppedAtModule: false,
      activeStop: null,
      currentWaypointIndex: waypointIdxRef.current,
      targetModuleName: nextWp.moduleTitle || nextWp.name
    }));
  }, []);

  // Toggle headlights
  const toggleLights = useCallback(() => {
    setVehicleState(prev => ({
      ...prev,
      isHeadlightsOn: !prev.isHeadlightsOn
    }));
  }, []);

  // Reset vehicle to circuit start
  const resetPosition = useCallback((pos: [number, number, number] = [0, 0.45, 8], rotY = -Math.PI / 2) => {
    currentSpeed.current = 0;
    currentSteering.current = 0;
    waypointIdxRef.current = 1;
    isBrakedRef.current = false;
    isHandbrakeRef.current = false;
    isStoppedAtModuleRef.current = false;
    lastPromptedWaypointId.current = null;
    targetSpeedRef.current = 14.0;

    const startWp = circuitWaypoints[1];
    setVehicleState({
      position: pos,
      rotationY: rotY,
      speed: 0,
      steering: 0,
      isHeadlightsOn: true,
      isEngineStarted: true,
      isBraked: false,
      isHandbrake: false,
      driveMode: driveModeRef.current,
      targetSpeed: 14.0,
      currentWaypointIndex: 1,
      targetModuleName: startWp.moduleTitle || startWp.name,
      activeStop: null,
      isStoppedAtModule: false
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

  // Main vehicle physics & collision avoidance loop
  const updatePhysics = useCallback((delta: number) => {
    const keys = keysPressed.current;
    let { position, rotationY, isHeadlightsOn, isEngineStarted } = stateRef.current;
    const mode = driveModeRef.current;

    let activeStop = stateRef.current.activeStop;

    if (mode === 'cruise') {
      // ==========================================
      // AUTONOMOUS CRUISE NAVIGATION
      // ==========================================
      const waypoints = circuitWaypoints;
      const currentWaypoint = waypoints[waypointIdxRef.current];

      const dx = currentWaypoint.position[0] - position[0];
      const dz = currentWaypoint.position[2] - position[2];
      const distToWaypoint = Math.hypot(dx, dz);

      if (currentWaypoint.isModuleStop && distToWaypoint < 5.0 && lastPromptedWaypointId.current !== currentWaypoint.id) {
        isStoppedAtModuleRef.current = true;
        lastPromptedWaypointId.current = currentWaypoint.id;
        activeStop = currentWaypoint;
      } else if (!currentWaypoint.isModuleStop && distToWaypoint < 5.0) {
        waypointIdxRef.current = (waypointIdxRef.current + 1) % waypoints.length;
      }

      const nextTarget = waypoints[waypointIdxRef.current];
      const targetDx = nextTarget.position[0] - position[0];
      const targetDz = nextTarget.position[2] - position[2];

      const targetRotY = Math.atan2(targetDx, targetDz);
      let angleDiff = targetRotY - rotationY;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

      const turnRate = 3.0;
      rotationY += angleDiff * Math.min(delta * turnRate, 1.0);

      const targetSteerAngle = Math.max(Math.min(angleDiff * 1.5, 0.45), -0.45);
      currentSteering.current += (targetSteerAngle - currentSteering.current) * Math.min(delta * 6.0, 1.0);

      const mustStop = isBrakedRef.current || isStoppedAtModuleRef.current;
      const effectiveTargetSpeed = mustStop ? 0 : targetSpeedRef.current;
      const accelDecelRate = mustStop ? 16.0 : 6.0;

      if (currentSpeed.current < effectiveTargetSpeed) {
        currentSpeed.current += accelDecelRate * delta;
        if (currentSpeed.current > effectiveTargetSpeed) currentSpeed.current = effectiveTargetSpeed;
      } else if (currentSpeed.current > effectiveTargetSpeed) {
        currentSpeed.current -= accelDecelRate * delta;
        if (currentSpeed.current < effectiveTargetSpeed) currentSpeed.current = effectiveTargetSpeed;
      }
    } else {
      // ==========================================
      // ACTUAL MANUAL DRIVING PHYSICS (W/A/S/D / Arrows / Space)
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
          // Braking while moving forward
          currentSpeed.current -= brakeRate * delta;
          if (currentSpeed.current < 0) currentSpeed.current = 0;
        } else {
          // Reversing
          currentSpeed.current -= (accelRate * 0.6) * delta;
          if (currentSpeed.current < maxReverseSpeed) currentSpeed.current = maxReverseSpeed;
        }
      } else {
        // Natural rolling friction / deceleration
        if (Math.abs(currentSpeed.current) < 0.1) {
          currentSpeed.current = 0;
        } else {
          currentSpeed.current -= Math.sign(currentSpeed.current) * coastFriction * delta;
        }
      }

      // Progressive steering with speed-dependent response
      const maxSteerAngle = 0.48;
      const targetSteerVal = targetSteer * maxSteerAngle;
      currentSteering.current += (targetSteerVal - currentSteering.current) * Math.min(delta * 8.0, 1.0);

      // Turn vehicle when in motion
      if (Math.abs(currentSpeed.current) > 0.05) {
        const turnDirection = currentSpeed.current >= 0 ? 1.85 : -1.85;
        rotationY += currentSteering.current * turnDirection * delta;
      }
    }

    // Proposed forward / reverse movement
    const moveDx = Math.sin(rotationY) * currentSpeed.current * delta;
    const moveDz = Math.cos(rotationY) * currentSpeed.current * delta;

    let candidateX = position[0] + moveDx;
    let candidateZ = position[2] + moveDz;

    // Outer Metropolitan Perimeter boundary limits (prevent leaving city world)
    const boundLimit = 95.0;
    candidateX = Math.max(Math.min(candidateX, boundLimit), -boundLimit);
    candidateZ = Math.max(Math.min(candidateZ, boundLimit), -boundLimit);

    // Building Collision Detection & Sliding Resolution
    // If the full move hits a building, try X-only and Z-only sliding
    if (checkCollision(candidateX, candidateZ)) {
      if (!checkCollision(candidateX, position[2])) {
        // Can slide along X axis
        candidateZ = position[2];
        currentSpeed.current *= 0.85;
      } else if (!checkCollision(position[0], candidateZ)) {
        // Can slide along Z axis
        candidateX = position[0];
        currentSpeed.current *= 0.85;
      } else {
        // Direct head-on collision: stop vehicle firmly
        candidateX = position[0];
        candidateZ = position[2];
        currentSpeed.current = -currentSpeed.current * 0.2; // slight elastic rebound
      }
    }

    const nextTarget = circuitWaypoints[waypointIdxRef.current];

    const nextState: VehicleState = {
      position: [candidateX, 0.45, candidateZ],
      rotationY,
      speed: currentSpeed.current,
      steering: currentSteering.current,
      isHeadlightsOn,
      isEngineStarted,
      isBraked: isBrakedRef.current,
      isHandbrake: isHandbrakeRef.current,
      driveMode: driveModeRef.current,
      targetSpeed: targetSpeedRef.current,
      currentWaypointIndex: waypointIdxRef.current,
      targetModuleName: nextTarget.moduleTitle || nextTarget.name,
      activeStop,
      isStoppedAtModule: isStoppedAtModuleRef.current
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
