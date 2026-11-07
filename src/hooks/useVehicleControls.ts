import { useEffect, useRef, useState, useCallback } from 'react';

export interface VehicleState {
  position: [number, number, number];
  rotationY: number;
  speed: number;
  steering: number;
  isHeadlightsOn: boolean;
  isEngineStarted: boolean;
}

export function useVehicleControls(initialPos: [number, number, number] = [0, 0.45, 0]) {
  const [vehicleState, setVehicleState] = useState<VehicleState>({
    position: initialPos,
    rotationY: 0,
    speed: 0,
    steering: 0,
    isHeadlightsOn: true,
    isEngineStarted: true,
  });

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const stateRef = useRef<VehicleState>(vehicleState);
  stateRef.current = vehicleState;

  const currentSpeed = useRef<number>(0);
  const currentSteering = useRef<number>(0);

  const setControlKey = useCallback((key: string, pressed: boolean) => {
    keysPressed.current[key.toLowerCase()] = pressed;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      keysPressed.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const updatePhysics = useCallback((delta: number) => {
    const keys = keysPressed.current;
    const forward = (keys['w'] || keys['arrowup']) ? 1 : 0;
    const backward = (keys['s'] || keys['arrowdown']) ? 1 : 0;
    const left = (keys['a'] || keys['arrowleft']) ? 1 : 0;
    const right = (keys['d'] || keys['arrowright']) ? 1 : 0;

    const targetThrottle = forward - backward;
    const targetSteer = left - right;

    let { position, rotationY, isHeadlightsOn, isEngineStarted } = stateRef.current;

    // Ultra-smooth acceleration & braking dynamics
    const maxSpeed = 22.0;
    const maxReverse = -8.0;
    const accelRate = 14.0;
    const brakeRate = 18.0;
    const coastFriction = 5.0;

    if (targetThrottle > 0) {
      currentSpeed.current += accelRate * delta;
      if (currentSpeed.current > maxSpeed) currentSpeed.current = maxSpeed;
    } else if (targetThrottle < 0) {
      if (currentSpeed.current > 0) {
        currentSpeed.current -= brakeRate * delta;
      } else {
        currentSpeed.current -= (accelRate * 0.6) * delta;
        if (currentSpeed.current < maxReverse) currentSpeed.current = maxReverse;
      }
    } else {
      // Natural rolling friction / coasting
      if (Math.abs(currentSpeed.current) < 0.1) {
        currentSpeed.current = 0;
      } else {
        currentSpeed.current -= Math.sign(currentSpeed.current) * coastFriction * delta;
      }
    }

    // Smooth progressive steering with speed-dependent response
    const maxSteerAngle = 0.52;
    const steerDamping = 6.0;
    const targetAngle = targetSteer * maxSteerAngle;
    currentSteering.current += (targetAngle - currentSteering.current) * Math.min(delta * steerDamping, 1.0);

    // Turn vehicle smoothly when moving
    const speedRatio = currentSpeed.current / maxSpeed;
    if (Math.abs(currentSpeed.current) > 0.05) {
      const turnMultiplier = currentSpeed.current >= 0 ? 1.8 : -1.8;
      rotationY += currentSteering.current * turnMultiplier * delta;
    }

    // Compute delta X and Z
    const dx = Math.sin(rotationY) * currentSpeed.current * delta;
    const dz = Math.cos(rotationY) * currentSpeed.current * delta;

    let newX = position[0] + dx;
    let newZ = position[2] + dz;

    // Soft boundary cushioning (smoothly prevent leaving city district)
    const boundLimit = 100;
    if (Math.abs(newX) > boundLimit) {
      newX = Math.sign(newX) * boundLimit;
      currentSpeed.current *= 0.5; // gentle slow-down instead of jarring wall stop
    }
    if (Math.abs(newZ) > boundLimit) {
      newZ = Math.sign(newZ) * boundLimit;
      currentSpeed.current *= 0.5;
    }

    const nextState: VehicleState = {
      position: [newX, 0.45, newZ],
      rotationY,
      speed: currentSpeed.current,
      steering: currentSteering.current,
      isHeadlightsOn,
      isEngineStarted
    };

    setVehicleState(nextState);
    return nextState;
  }, []);

  const resetPosition = useCallback((pos: [number, number, number] = [0, 0.45, 0], rotY = 0) => {
    currentSpeed.current = 0;
    currentSteering.current = 0;
    setVehicleState(prev => ({
      ...prev,
      position: pos,
      rotationY: rotY,
      speed: 0,
      steering: 0
    }));
  }, []);

  return {
    vehicleState,
    updatePhysics,
    resetPosition,
    setControlKey,
    setVehicleState
  };
}
