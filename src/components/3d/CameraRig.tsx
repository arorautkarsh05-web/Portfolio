import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneCheckpoint } from '../../types';
import { VehicleState } from '../../hooks/useVehicleControls';

interface CameraRigProps {
  currentScene: SceneCheckpoint;
  isDrivingMode: boolean;
  vehicleState: VehicleState;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  currentScene,
  isDrivingMode,
  vehicleState
}) => {
  const currentPos = useRef(new THREE.Vector3(0, 48, 85));
  const currentTarget = useRef(new THREE.Vector3(0, 8, 0));

  useFrame((state, delta) => {
    const camera = state.camera;

    if (isDrivingMode) {
      // Elevated Open-World Chase Camera
      const carPos = new THREE.Vector3(...vehicleState.position);
      const rotY = vehicleState.rotationY;

      // Dynamic Cinematic Supercar Chase Camera (Low-slung, high-speed immersion)
      const speedNorm = Math.min(Math.abs(vehicleState.speed) / 18.0, 1.0);
      const chaseDistance = 8.2 + speedNorm * 3.0;
      const chaseHeight = 2.6 + speedNorm * 1.0;

      const targetCamX = carPos.x - Math.sin(rotY) * chaseDistance;
      const targetCamZ = carPos.z - Math.cos(rotY) * chaseDistance;
      const targetCamY = carPos.y + chaseHeight;

      // Look forward along the vehicle trajectory
      const targetLookAt = new THREE.Vector3(
        carPos.x + Math.sin(rotY) * 8.0,
        carPos.y + 1.25,
        carPos.z + Math.cos(rotY) * 8.0
      );

      // Smooth camera dampening
      currentPos.current.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), delta * 4.5);
      currentTarget.current.lerp(targetLookAt, delta * 5.0);

      camera.position.copy(currentPos.current);
      camera.lookAt(currentTarget.current);
    } else {
      // Cinematic Tour Mode: Lerp towards current scene checkpoint
      const targetCamPos = new THREE.Vector3(...currentScene.cameraPosition);
      const targetLookAt = new THREE.Vector3(...currentScene.cameraTarget);

      currentPos.current.lerp(targetCamPos, delta * 2.8);
      currentTarget.current.lerp(targetLookAt, delta * 3.2);

      camera.position.copy(currentPos.current);
      camera.lookAt(currentTarget.current);
    }
  });

  return null;
};
