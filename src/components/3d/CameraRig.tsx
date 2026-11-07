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
      // Third-person vehicle chase camera
      const carPos = new THREE.Vector3(...vehicleState.position);
      const rotY = vehicleState.rotationY;

      // Distance pulls back slightly as speed increases
      const chaseDistance = 7.5 + Math.abs(vehicleState.speed) * 0.15;
      const chaseHeight = 2.8 + Math.abs(vehicleState.speed) * 0.05;

      const targetCamX = carPos.x - Math.sin(rotY) * chaseDistance;
      const targetCamZ = carPos.z - Math.cos(rotY) * chaseDistance;
      const targetCamY = carPos.y + chaseHeight;

      const targetLookAt = new THREE.Vector3(
        carPos.x + Math.sin(rotY) * 3,
        carPos.y + 1.2,
        carPos.z + Math.cos(rotY) * 3
      );

      // Smooth lerp
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

