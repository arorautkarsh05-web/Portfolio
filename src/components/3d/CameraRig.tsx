import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
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
  const prevSceneIdRef = useRef<number>(currentScene.id);

  // GSAP Cinematic Scene Transitions
  useEffect(() => {
    if (isDrivingMode) return;

    // Trigger smooth GSAP camera sweep on scene transition
    if (prevSceneIdRef.current !== currentScene.id) {
      prevSceneIdRef.current = currentScene.id;

      const targetPos = new THREE.Vector3(...currentScene.cameraPosition);
      const targetLook = new THREE.Vector3(...currentScene.cameraTarget);

      gsap.to(currentPos.current, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 1.8,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      gsap.to(currentTarget.current, {
        x: targetLook.x,
        y: targetLook.y,
        z: targetLook.z,
        duration: 1.8,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  }, [currentScene, isDrivingMode]);

  useFrame((state, delta) => {
    const camera = state.camera as THREE.PerspectiveCamera;

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

      // Look forward along vehicle trajectory
      const targetLookAt = new THREE.Vector3(
        carPos.x + Math.sin(rotY) * 8.0,
        carPos.y + 1.25,
        carPos.z + Math.cos(rotY) * 8.0
      );

      // Smooth camera dampening
      currentPos.current.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), delta * 4.5);
      currentTarget.current.lerp(targetLookAt, delta * 5.0);

      // Dynamic Speed FOV expansion (45 to 54 deg)
      const targetFov = 45 + speedNorm * 9.0;
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, delta * 3.0);
      camera.updateProjectionMatrix();

      camera.position.copy(currentPos.current);
      camera.lookAt(currentTarget.current);
    } else {
      // Normal FOV in cinematic tour mode
      if (Math.abs(camera.fov - 45) > 0.1) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, 45, delta * 2.5);
        camera.updateProjectionMatrix();
      }

      camera.position.copy(currentPos.current);
      camera.lookAt(currentTarget.current);
    }
  });

  return null;
};
