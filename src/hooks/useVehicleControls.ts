import { useEffect, useRef, useState, useCallback } from 'react';
import { circuitWaypoints, CircuitWaypoint } from '../data/waypoints';

export interface VehicleState {
  position: [number, number, number];
  rotationY: number;
  speed: number;
  steering: number;
  isHeadlightsOn: boolean;
  isEngineStarted: boolean;
  isBraked: boolean;
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
    speed: 12.0,
    steering: 0,
    isHeadlightsOn: true,
    isEngineStarted: true,
    isBraked: false,
    targetSpeed: 14.0,
    currentWaypointIndex: 1,
    targetModuleName: circuitWaypoints[1].name,
    activeStop: null,
    isStoppedAtModule: false
  });

  const stateRef = useRef<VehicleState>(vehicleState);
  stateRef.current = vehicleState;

  const currentSpeed = useRef<number>(12.0);
  const currentSteering = useRef<number>(0);
  const waypointIdxRef = useRef<number>(1);
  const isBrakedRef = useRef<boolean>(false);
  const targetSpeedRef = useRef<number>(14.0);
  const isStoppedAtModuleRef = useRef<boolean>(false);
  const lastPromptedWaypointId = useRef<string | null>(null);

  // Speed Up: increases cruising velocity
  const speedUp = useCallback(() => {
    isBrakedRef.current = false;
    isStoppedAtModuleRef.current = false;
    const newSpeed = Math.min(targetSpeedRef.current + 3.5, 24.0);
    targetSpeedRef.current = newSpeed;
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

  // Brake: halts the vehicle or resumes cruise
  const toggleBrake = useCallback(() => {
    isBrakedRef.current = !isBrakedRef.current;
    setVehicleState(prev => ({
      ...prev,
      isBraked: isBrakedRef.current
    }));
  }, []);

  // Resume driving to next waypoint / module
  const resumeDrive = useCallback(() => {
    isBrakedRef.current = false;
    isStoppedAtModuleRef.current = false;
    // Advance to next waypoint
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
    currentSpeed.current = 10.0;
    currentSteering.current = 0;
    waypointIdxRef.current = 1;
    isBrakedRef.current = false;
    isStoppedAtModuleRef.current = false;
    lastPromptedWaypointId.current = null;
    targetSpeedRef.current = 14.0;

    const startWp = circuitWaypoints[1];
    setVehicleState({
      position: pos,
      rotationY: rotY,
      speed: 10.0,
      steering: 0,
      isHeadlightsOn: true,
      isEngineStarted: true,
      isBraked: false,
      targetSpeed: 14.0,
      currentWaypointIndex: 1,
      targetModuleName: startWp.moduleTitle || startWp.name,
      activeStop: null,
      isStoppedAtModule: false
    });
  }, []);

  // Keyboard controls for speed & brake
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') {
        speedUp();
      } else if (key === 's' || key === 'arrowdown') {
        speedLow();
      } else if (key === ' ' || key === 'b') {
        toggleBrake();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [speedUp, speedLow, toggleBrake]);

  // Main vehicle physics & automatic road waypoint cruise loop
  const updatePhysics = useCallback((delta: number) => {
    let { position, rotationY, isHeadlightsOn, isEngineStarted } = stateRef.current;

    const waypoints = circuitWaypoints;
    const currentWaypoint = waypoints[waypointIdxRef.current];

    // Calculate vector to target waypoint
    const dx = currentWaypoint.position[0] - position[0];
    const dz = currentWaypoint.position[2] - position[2];
    const distToWaypoint = Math.hypot(dx, dz);

    let activeStop = stateRef.current.activeStop;

    // Check if reaching a designated module stop along the road
    if (currentWaypoint.isModuleStop && distToWaypoint < 5.0 && lastPromptedWaypointId.current !== currentWaypoint.id) {
      // Arrived at module stop on the road!
      isStoppedAtModuleRef.current = true;
      lastPromptedWaypointId.current = currentWaypoint.id;
      activeStop = currentWaypoint;
    } else if (!currentWaypoint.isModuleStop && distToWaypoint < 5.0) {
      // Transit waypoint reached, advance to next
      waypointIdxRef.current = (waypointIdxRef.current + 1) % waypoints.length;
    }

    const nextTarget = waypoints[waypointIdxRef.current];
    const targetDx = nextTarget.position[0] - position[0];
    const targetDz = nextTarget.position[2] - position[2];

    // Compute target rotation angle towards waypoint
    const targetRotY = Math.atan2(targetDx, targetDz);

    // Shortest angular turn interpolation
    let angleDiff = targetRotY - rotationY;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

    // Smooth progressive steering
    const turnRate = 3.0;
    rotationY += angleDiff * Math.min(delta * turnRate, 1.0);

    // Front wheels steering visual angle
    const targetSteerAngle = Math.max(Math.min(angleDiff * 1.5, 0.45), -0.45);
    currentSteering.current += (targetSteerAngle - currentSteering.current) * Math.min(delta * 6.0, 1.0);

    // Speed physics interpolation towards target cruise speed
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

    // Move forward along vehicle heading
    const moveDx = Math.sin(rotationY) * currentSpeed.current * delta;
    const moveDz = Math.cos(rotationY) * currentSpeed.current * delta;

    const newX = position[0] + moveDx;
    const newZ = position[2] + moveDz;

    const nextState: VehicleState = {
      position: [newX, 0.45, newZ],
      rotationY,
      speed: currentSpeed.current,
      steering: currentSteering.current,
      isHeadlightsOn,
      isEngineStarted,
      isBraked: isBrakedRef.current,
      targetSpeed: targetSpeedRef.current,
      currentWaypointIndex: waypointIdxRef.current,
      targetModuleName: nextTarget.moduleTitle || nextTarget.name,
      activeStop,
      isStoppedAtModule: isStoppedAtModuleRef.current
    };

    setVehicleState(nextState);
    return nextState;
  }, []);

  return {
    vehicleState,
    updatePhysics,
    speedUp,
    speedLow,
    toggleBrake,
    resumeDrive,
    toggleLights,
    resetPosition,
    setVehicleState
  };
}
