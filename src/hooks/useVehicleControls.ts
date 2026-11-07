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

  const setControlKey = useCallback((key: string, pressed: boolean) => {
    keysPressed.current[key.toLowerCase()] = pressed;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid capturing shortcuts if typing in an input
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

    const throttle = forward - backward;
    const steer = left - right;

    let { position, rotationY, speed, steering, isHeadlightsOn, isEngineStarted } = stateRef.current;

    // Acceleration & Braking
    const maxSpeed = 18.0;
    const accel = 12.0;
    const friction = 4.5;

    if (throttle !== 0) {
      speed += throttle * accel * delta;
      speed = Math.max(-maxSpeed * 0.4, Math.min(maxSpeed, speed));
    } else {
      // Natural deceleration
      if (Math.abs(speed) < 0.1) {
        speed = 0;
      } else {
        speed -= Math.sign(speed) * friction * delta;
      }
    }

    // Steering response
    const maxSteer = 0.55;
    const steerSpeed = 4.0;
    if (steer !== 0) {
      steering += steer * steerSpeed * delta;
      steering = Math.max(-maxSteer, Math.min(maxSteer, steering));
    } else {
      steering -= Math.sign(steering) * steerSpeed * 1.5 * delta;
      if (Math.abs(steering) < 0.05) steering = 0;
    }

    // Turn when moving
    if (Math.abs(speed) > 0.05) {
      const turnRate = (speed / maxSpeed) * steering * 2.2;
      rotationY += turnRate * delta;
    }

    // Update X and Z position along heading
    const dx = Math.sin(rotationY) * speed * delta;
    const dz = Math.cos(rotationY) * speed * delta;

    let newX = position[0] + dx;
    let newZ = position[2] + dz;

    // Soft city boundary boundaries ([-120, 120])
    newX = Math.max(-110, Math.min(110, newX));
    newZ = Math.max(-110, Math.min(110, newZ));

    const nextState: VehicleState = {
      position: [newX, position[1], newZ],
      rotationY,
      speed,
      steering,
      isHeadlightsOn,
      isEngineStarted
    };

    setVehicleState(nextState);
    return nextState;
  }, []);

  const resetPosition = useCallback((pos: [number, number, number] = [0, 0.45, 0], rotY = 0) => {
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
