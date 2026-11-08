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

// Static reusable vectors to eliminate per-frame GC allocations and stutter
const _tempCarPos = new THREE.Vector3();
const _tempCamTarget = new THREE.Vector3();
const _tempLookTarget = new THREE.Vector3();

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
      // Dynamic Cinematic Supercar Chase Camera (Lag-free zero allocation)
      _tempCarPos.set(...vehicleState.position);
      const rotY = vehicleState.rotationY;

      const speedNorm = Math.min(Math.abs(vehicleState.speed) / 22.0, 1.0);
      const chaseDistance = 8.5 + speedNorm * 3.5;
      const chaseHeight = 2.8 + speedNorm * 1.2;

      const targetCamX = _tempCarPos.x - Math.sin(rotY) * chaseDistance;
      const targetCamZ = _tempCarPos.z - Math.cos(rotY) * chaseDistance;
      const targetCamY = _tempCarPos.y + chaseHeight;

      _tempCamTarget.set(targetCamX, targetCamY, targetCamZ);

      // Look forward along vehicle trajectory
      _tempLookTarget.set(
        _tempCarPos.x + Math.sin(rotY) * 9.0,
        _tempCarPos.y + 1.25,
        _tempCarPos.z + Math.cos(rotY) * 9.0
      );

      // Smooth camera dampening
      currentPos.current.lerp(_tempCamTarget, Math.min(delta * 5.5, 1.0));
      currentTarget.current.lerp(_tempLookTarget, Math.min(delta * 6.5, 1.0));

      // Dynamic Speed FOV expansion (45 to 54 deg)
      const targetFov = 45 + speedNorm * 9.0;
      if (Math.abs(camera.fov - targetFov) > 0.08) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, delta * 3.0);
        camera.updateProjectionMatrix();
      }

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
